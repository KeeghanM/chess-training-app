'use client'

import { useEffect, useState } from 'react'

import { useProfileQueries } from '@hooks/use-profile-queries'
import { useRecallQueries } from '@hooks/use-recall-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useAppStore } from '@stores/app-store'
import Tippy from '@tippyjs/react'
import { useWindowSize } from '@uidotdev/usehooks'
import trackEventOnClient from '@utils/trackEventOnClient'
import type { Color, PieceSymbol, Square } from 'chess.js'
import { Chess, SQUARES } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import 'react-toggle/style.css'
import 'tippy.js/dist/tippy.css'
import useSound from 'use-sound'

import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import XpTracker from '@components/general/XpTracker'
import ThemeSwitch from '@components/template/header/ThemeSwitch'

// TODO: On multiple recalls, show a temporary green/red border on square clicked for feedback
// TODO: On multiple recalls, have the piece to select flash on change to alert that it's changed
// TODO: Increase XP for each correct recall in a row

export default function RecallTrainer() {
  const { user } = useKindeBrowserClient()

  // --- Hooks ---
  const { useRandomRecallQuery, updateRecallStreak, logRecallAttempt } =
    useRecallQueries()
  const { updateStreak } = useProfileQueries()
  const { preferences, setSoundEnabled } = useAppStore()
  const { soundEnabled } = preferences

  // Get random recall puzzle using React Query
  const recallQuery = useRandomRecallQuery()
  const currentPuzzle = recallQuery.data

  // Setup main state for the game/puzzles
  const [game, setGame] = useState(new Chess())
  const [position, setPosition] = useState(game.fen())
  const [difficulty, setDifficulty] = useState(1)
  const [timed, setTimed] = useState(false)
  const [timerLength, setTimerLength] = useState(10)
  const [piecesToRecall, setPiecesToRecall] = useState(1)
  const [counter, setCounter] = useState(0)
  const [timer, setTimer] = useState(timerLength)
  const [selectedSquares, setSelectedSquares] = useState<
    Record<string, React.CSSProperties>
  >({})
  const [hiddenSquares, setHiddenSquares] = useState<
    Record<string, React.CSSProperties>
  >({})
  const [availableSquares, setAvailableSquares] = useState<
    {
      square: Square
      type: PieceSymbol
      color: Color
    }[]
  >([])
  const [correctSquares, setCorrectSquares] = useState<
    {
      square: Square
      type: PieceSymbol
      color: Color
    }[]
  >([])

  // Setup SFX
  const [correctSound] = useSound('/sfx/correct.mp3')
  const [incorrectSound] = useSound('/sfx/incorrect.mp3')

  // Setup state for the settings/general
  const [loading, setLoading] = useState(true)
  const [readyForInput, setReadyForInput] = useState(false)
  const [puzzleFinished, setPuzzleFinished] = useState(false)
  const [mode, setMode] = useState<'training' | 'settings'>('settings')
  const [puzzleStatus, setPuzzleStatus] = useState<
    'none' | 'correct' | 'incorrect'
  >('none')
  const [xpCounter, setXpCounter] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

  const goToNextPuzzle = async (status: string) => {
    setLoading(true)
    setPuzzleStatus('none')

    // Log the attempt using React Query mutation
    if (currentPuzzle) {
      logRecallAttempt.mutate({
        puzzleId: currentPuzzle.puzzleid,
        correct: status === 'correct',
        timeTaken: 0, // You may want to track this
      })
    }

    // Increase the "Last Trained" on the profile
    updateStreak.mutate()

    // Increase the streak if correct
    // and send it to the server incase a badge needs adding
    if (status == 'correct') {
      trackEventOnClient('recall_correct', {})
      updateRecallStreak.mutate({ currentStreak: currentStreak + 1 })
      setCurrentStreak(currentStreak + 1)
    } else if (status == 'incorrect') {
      trackEventOnClient('recall_incorrect', {})
    }

    // Refetch a new puzzle instead of calling getPuzzle
    await recallQuery.refetch()

    setSelectedSquares({})
    setLoading(false)
    setTimer(timerLength)
  }

  const markMoveAs = async (status: 'correct' | 'incorrect') => {
    if (status == 'correct') {
      setXpCounter(xpCounter + 1)
      if (soundEnabled) correctSound()
    } else {
      if (soundEnabled) incorrectSound()
    }

    if (
      counter == piecesToRecall - 1 ||
      counter == availableSquares.length - 1 // Some puzzles won't have enough pieces to recall, so we'll just end it early
    ) {
      // If we're on the last piece, mark the puzzle as finished
      setPuzzleFinished(true)
      setPuzzleStatus(status)
      setCounter(0)
      setHiddenSquares({})
      setReadyForInput(false)
      trackEventOnClient('recall_complete', {})
    } else {
      // Otherwise, increase the counter and move the piece
      setCounter(counter + 1)
      let newPiece =
        availableSquares[Math.floor(Math.random() * availableSquares.length)]!
      const max = availableSquares.length
      let breakpoint = 0

      // We don't want to show the same piece twice
      // so we'll keep generating a new piece until we get one that isn't already in the correctSquares array
      while (correctSquares.includes(newPiece)) {
        breakpoint++
        newPiece =
          availableSquares[Math.floor(Math.random() * availableSquares.length)]!

        if (breakpoint > max) break // Prevent infinite loop, not that it should ever happen - but while's are scary
      }

      // Add the new piece to the correctSquares array
      setCorrectSquares([...correctSquares, newPiece])
    }
  }

  const markImReady = () => {
    setHiddenSquares({
      ...SQUARES.reduce(
        (acc, square) => {
          acc[square] = {
            opacity: 0,
          }
          return acc
        },
        {} as Record<string, React.CSSProperties>,
      ),
    })
    setReadyForInput(true)
  }

  const squareClicked = async (square: Square) => {
    if (puzzleFinished) return
    if (!readyForInput) return

    const correctSquare = correctSquares[counter]! // We know this will always be defined, as we only allow clicks when readyForInput is true

    const pieceClicked = game.get(square)
    const pieceString = pieceClicked
      ? pieceClicked.color + pieceClicked.type
      : ''
    const correctString = correctSquare.color + correctSquare.type

    if (pieceString == correctString) {
      setSelectedSquares({
        [square]: {
          backgroundColor: 'rgba(25,255,0,0.8)',
        },
      })
      await markMoveAs('correct')
    } else {
      setSelectedSquares({
        [square]: {
          backgroundColor: 'rgba(255,25,0,0.8)',
        },
        [correctSquare.square]: {
          backgroundColor: 'rgba(25,255,0,0.8)',
        },
      })
      await markMoveAs('incorrect')
    }
  }

  const exit = async () => {
    setMode('settings')
    setXpCounter(0)
  }

  const windowSize = useWindowSize() as { width: number; height: number }

  const getDifficulty = () => {
    switch (difficulty) {
      case 0:
        return 'Easy'
      case 1:
        return 'Medium'
      case 2:
        return 'Hard'
      default:
        return 'Medium'
    }
  }

  // Here are all our useEffect functions
  useEffect(() => {
    setSelectedSquares({})
    if (mode == 'settings') return
    // The puzzle data will be fetched automatically by React Query
    // when the component mounts or mode changes
    setLoading(recallQuery.isLoading)
  }, [mode, recallQuery.isLoading])

  useEffect(() => {
    // Create a new game from the puzzle whenever it changes
    if (!currentPuzzle) return

    setLoading(true)
    setPosition(currentPuzzle.fen)
    const newGame = new Chess(currentPuzzle.fen)
    setGame(newGame)

    const squaresWithPieces = newGame
      .board()
      .flatMap((row) =>
        row
          .filter((square) => square && square.type != 'p')
          .map((square) => square),
      )

    const amountToShow = Math.min(
      difficulty === 2 ? 100 : difficulty === 1 ? 6 : 3, // all the pieces for hard, 6 for medium, 3 for easy
      squaresWithPieces.length, // but if there's less pieces than that, just show them all
    )
    const squaresToHide = squaresWithPieces
      .sort(() => 0.5 - Math.random())
      .slice(0, squaresWithPieces.length - amountToShow)
      .reduce(
        (acc, square) => {
          if (square)
            acc[square.square] = {
              opacity: 0,
              backgroundColor: 'rgba(255,0,0,0.5)',
            }
          return acc
        },
        {} as Record<string, React.CSSProperties>,
      )

    const visibleSquares = squaresWithPieces.filter(
      (
        square,
      ): square is { square: Square; type: PieceSymbol; color: Color } => {
        return square !== null && !squaresToHide[square.square]
      },
    )

    setHiddenSquares(squaresToHide)
    setAvailableSquares(visibleSquares)
    setCorrectSquares([
      visibleSquares[Math.floor(Math.random() * visibleSquares.length)]!,
    ])

    setReadyForInput(false)
    setPuzzleFinished(false)
    setLoading(false)
    if (timed) setTimer(timerLength)
  }, [currentPuzzle])

  useEffect(() => {
    if (mode == 'settings' || !timed || !currentPuzzle) return
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      markImReady()
    }
  }, [timer, currentPuzzle])

  if (!user) return null

  return recallQuery.error ? (
    <div className="border border-gray-300 dark:text-white dark:border-slate-600 shadow-md dark:shadow-slate-900 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)]">
      <div className="flex flex-wrap items-center justify-between px-2 py-1 border-b border-gray-300 dark:border-slate-600 font-bold text-red-500">
        <p>Oops, something went wrong</p>
      </div>
      <div className="p-2 text-white">{recallQuery.error.message}</div>
    </div>
  ) : (
    <>
      {mode == 'settings' ? (
        <>
          <div className="border border-gray-300 text-black dark:text-white dark:border-slate-600 shadow-md dark:shadow-slate-900 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)]">
            <div className="flex flex-wrap items-center justify-between px-2 py-1 border-b border-gray-300 dark:border-slate-600 font-bold text-orange-500">
              <p id="tooltip-0">Adjust your settings</p>
            </div>
            <div className="flex flex-col gap-2 md:gap-4 p-2">
              <div>
                <label className="font-bold flex items-center gap-1 w-fit">
                  <span id="tooltip-1">Difficulty</span>
                  <Tippy content="Difficulty sets how many pieces are on the board">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .438-.177q.177-.177.177-.438q0-.262-.177-.439q-.176-.177-.438-.177t-.438.177q-.177.177-.177.439q0 .261.177.438q.176.177.438.177M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                      />
                    </svg>
                  </Tippy>
                </label>
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
                  <Button
                    variant={difficulty == 0 ? 'accent' : 'secondary'}
                    onClick={() => setDifficulty(0)}
                  >
                    Easy
                  </Button>
                  <Button
                    variant={difficulty == 1 ? 'accent' : 'secondary'}
                    onClick={() => setDifficulty(1)}
                  >
                    Medium
                  </Button>
                  <Button
                    variant={difficulty == 2 ? 'accent' : 'secondary'}
                    onClick={() => setDifficulty(2)}
                  >
                    Hard
                  </Button>
                </div>
              </div>
              <div>
                <label className=" w-fit font-bold flex items-center h-fit gap-1">
                  <span id="tooltip-2">Number to recall</span>
                  <Tippy content="The number of pieces in a row you'll have to recall from a single position">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .438-.177q.177-.177.177-.438q0-.262-.177-.439q-.176-.177-.438-.177t-.438.177q-.177.177-.177.439q0 .261.177.438q.176.177.438.177M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                      />
                    </svg>
                  </Tippy>
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={piecesToRecall}
                    onChange={(e) =>
                      setPiecesToRecall(parseInt(e.target.value))
                    }
                  />
                  <span className="text-sm italic">
                    {piecesToRecall} piece{piecesToRecall > 1 && 's'}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="timed"
                    className=" w-fit font-bold flex items-center h-fit gap-1"
                  >
                    <span>Timed Mode</span>
                    <Tippy content="Timed mode will give you a set amount of time to remember the position before you have to recall it.">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .438-.177q.177-.177.177-.438q0-.262-.177-.439q-.176-.177-.438-.177t-.438.177q-.177.177-.177.439q0 .261.177.438q.176.177.438.177M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                        />
                      </svg>
                    </Tippy>
                  </label>
                  <input
                    id="timed"
                    type="checkbox"
                    className="w-6 h-6 !bg-gray-100 text-black"
                    checked={timed}
                    onChange={() => setTimed(!timed)}
                  />
                </div>
                {timed && (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="range"
                      min={1}
                      max={60}
                      step={1}
                      value={timerLength}
                      onChange={(e) => setTimerLength(parseInt(e.target.value))}
                    />
                    <span className="text-sm italic">
                      {timerLength} seconds
                    </span>
                  </div>
                )}
              </div>
              <Button
                variant="primary"
                onClick={async () => {
                  setMode('training')
                  trackEventOnClient('recall_start', {})
                }}
              >
                Start Training
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative border border-gray-300 text-black dark:text-white dark:border-slate-600 shadow-md dark:shadow-slate-900 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] w-fit mx-auto">
            {loading && (
              <div className="absolute inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.3)]">
                <Spinner />
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between text-sm">
              <div className="flex gap-1 p-2 pb-0 justify-center text-xs md:text-sm lg:text-base">
                <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
                  <p className="w-full text-center font-bold py-1 px-1 border-b border-gray-300 dark:border-slate-600">
                    Difficulty:
                  </p>
                  <p>{getDifficulty()}</p>
                </div>
                <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
                  <p className="font-bold py-1 px-1 border-b border-gray-300 dark:border-slate-600">
                    Recall Count:
                  </p>
                  <p>{piecesToRecall}</p>
                </div>
                <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
                  <p className="font-bold py-1 px-1 border-b border-gray-300 dark:border-slate-600">
                    Timer:
                  </p>
                  <p>{timed ? <>{timerLength}s</> : 'none'}</p>
                </div>
                <XpTracker counter={xpCounter} type={'tactic'} />
              </div>
              <div className="flex items-center gap-2 w-fit mx-auto md:mx-0">
                <ThemeSwitch />
                <div
                  className="ml-auto flex cursor-pointer flex-row items-center gap-2 hover:text-orange-500"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  <Tippy content={`Sound ${soundEnabled ? 'On' : 'Off'}`}>
                    {soundEnabled ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M1.75 5.75v4.5h2.5l4 3V2.75l-4 3zm9 .5s1 .5 1 1.75s-1 1.75-1 1.75"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M1.75 5.75v4.5h2.5l4 3V2.75l-4 3zm12.5 0l-3.5 4.5m0-4.5l3.5 4.5"
                        />
                      </svg>
                    )}
                  </Tippy>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row p-2 gap-2">
              <div className="flex flex-col gap-2 w-fit mx-auto">
                <Chessboard
                  onSquareClick={squareClicked}
                  arePiecesDraggable={false}
                  position={position}
                  boardOrientation={'white'}
                  boardWidth={Math.min(
                    (windowSize.height ?? 800) * 0.7,
                    (windowSize.width ?? 300) * 0.9,
                  )}
                  customBoardStyle={{
                    marginInline: 'auto',
                  }}
                  customSquareStyles={{
                    ...selectedSquares,
                    ...hiddenSquares,
                  }}
                />
                <Button className="lg:hidden" variant="danger" onClick={exit}>
                  Exit
                </Button>
              </div>
              <div className="flex w-full flex-col">
                {puzzleStatus === 'correct' && (
                  <div className="flex items-center gap-2  w-fit mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 512 512"
                      className="text-lime-500"
                    >
                      <path
                        fill="currentColor"
                        d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2h144c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48h-97.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192h64c17.7 0 32 14.3 32 32v224c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
                      />
                    </svg>
                    <p>Correct!</p>
                  </div>
                )}
                {puzzleStatus === 'incorrect' && (
                  <div className="flex items-center gap-2 w-fit mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 512 512"
                      className="text-red-500"
                    >
                      <path
                        fill="currentColor"
                        d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2h144c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48h-97.5c-19 0-37.5 5.6-53.3 16.1l-38.5 25.7C176 91.6 160 121.6 160 153.7v111.2c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384h64c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32v224c0 17.7 14.3 32 32 32z"
                      />
                    </svg>
                    <p>Incorrect!</p>
                  </div>
                )}
                <div className="flex flex-1 flex-col-reverse gap-2 lg:flex-col">
                  {!puzzleFinished && (
                    <div className="h-full flex-wrap content-start gap-1 border lg:border-4 border-purple-700 p-2 bg-purple-700 bg-opacity-20 text-black dark:text-white flex flex-col">
                      {!readyForInput && (
                        <>
                          <p className="text-sm italic text-center">
                            Memorise the position shown, you'll be asked to
                            remember & recall the pieces (not pawns)
                          </p>
                          {!timed ? (
                            <Button variant="accent" onClick={markImReady}>
                              I'm Ready!
                            </Button>
                          ) : (
                            <p className="text-xl font-bold text-center mt-4">
                              {timer}s
                            </p>
                          )}
                        </>
                      )}
                      {correctSquares[counter] && readyForInput && (
                        <p id="tooltip-3">
                          Where is a{' '}
                          <span className="font-bold underline">
                            {correctSquares[counter].color == 'w'
                              ? 'White'
                              : 'Black'}{' '}
                            {correctSquares[counter].type == 'b'
                              ? 'Bishop'
                              : correctSquares[counter].type == 'k'
                                ? 'King'
                                : correctSquares[counter].type == 'n'
                                  ? 'Knight'
                                  : correctSquares[counter].type == 'q'
                                    ? 'Queen'
                                    : 'Rook'}
                          </span>
                          ?
                        </p>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    {puzzleFinished && (
                      <Button
                        variant="primary"
                        onClick={() => goToNextPuzzle(puzzleStatus)}
                        id="tooltip-4"
                      >
                        Next
                      </Button>
                    )}
                    <Button
                      className="hidden lg:block"
                      variant="danger"
                      onClick={exit}
                    >
                      Exit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
