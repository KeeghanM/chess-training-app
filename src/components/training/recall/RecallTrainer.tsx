'use client'

import { useEffect, useState } from 'react'
import { useProfileQueries } from '@hooks/use-profile-queries'
import { useRecallQueries } from '@hooks/use-recall-queries'
import { useSounds } from '@hooks/use-sound'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useAppStore } from '@stores/app-store'
import type { Color, PieceSymbol, Square } from 'chess.js'
import { Chess, SQUARES } from 'chess.js'
import { Chessboard, SquareHandlerArgs } from 'react-chessboard'
import 'react-toggle/style.css'
import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import XpTracker from '@components/general/XpTracker'
import trackEventOnClient from '@utils/trackEventOnClient'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../_elements/tooltip'
import StatusIndicator from '../shared/StatusIndicator'

// TODO: On multiple recalls, show a temporary green/red border on square clicked for feedback
// TODO: On multiple recalls, have the piece to select flash on change to alert that it's changed
// TODO: Increase XP for each correct recall in a row

export default function RecallTrainer() {
  const { user } = useKindeBrowserClient()

  // --- Hooks ---
  const { useRandomRecallQuery, updateRecallStreak } = useRecallQueries()
  const { updateStreak } = useProfileQueries()
  const { preferences, setSoundEnabled } = useAppStore()
  const { soundEnabled } = preferences
  const { correctSound, incorrectSound } = useSounds()

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
    // Hide all pieces (but not the squares themselves)
    const allPieceSquares = game.board().flatMap((row, rowIndex) =>
      row
        .map((piece, colIndex) => {
          if (piece) {
            const square = SQUARES[rowIndex * 8 + colIndex] as Square
            return square
          }
          return null
        })
        .filter(Boolean),
    ) as Square[]

    const hidePieces = allPieceSquares.reduce(
      (acc, square) => {
        acc[square] = {
          opacity: 0,
        }
        return acc
      },
      {} as Record<string, React.CSSProperties>,
    )

    setHiddenSquares(hidePieces)
    setReadyForInput(true)
  }

  const squareClicked = async ({ square }: SquareHandlerArgs) => {
    if (puzzleFinished) return
    if (!readyForInput) return

    const correctSquare = correctSquares[counter]! // We know this will always be defined, as we only allow clicks when readyForInput is true

    const pieceClicked = game.get(square as Square)
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
    setCurrentStreak(0)
    setSelectedSquares({})
    setHiddenSquares({})
    setAvailableSquares([])
    setCorrectSquares([])
    setCounter(0)
    setReadyForInput(false)
    setPuzzleFinished(false)
    setTimer(timerLength)
    setPuzzleStatus('none')
    recallQuery.refetch()
  }

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

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          markImReady()
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [mode, timed, currentPuzzle])

  if (!user) return null

  return recallQuery.error ? (
    <div className="p-4 bg-card-light/20 rounded-lg">
      <h2 className="text-red-500 text-xl font-bold mb-4">Oops, something went wrong</h2>
      <div className="text-white">{recallQuery.error.message}</div>
    </div>
  ) : (
    <>
      {mode == 'settings' ? (
        <>
          <div className="p-4 bg-card-light/20 rounded-lg">
            <h2 className="text-white text-xl font-bold mb-4">Adjust your settings</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-bold flex items-center gap-1 w-fit">
                  <span id="tooltip-1">Difficulty</span>
                  <Tooltip>
                    <TooltipTrigger asChild={true}>
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
                    </TooltipTrigger>
                    <TooltipContent>
                      Difficulty sets how many pieces are on the board
                    </TooltipContent>
                  </Tooltip>
                </label>
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
                  <Button
                    variant={difficulty == 0 ? 'accent' : undefined}
                    onClick={() => setDifficulty(0)}
                  >
                    Easy
                  </Button>
                  <Button
                    variant={difficulty == 1 ? 'accent' : undefined}
                    onClick={() => setDifficulty(1)}
                  >
                    Medium
                  </Button>
                  <Button
                    variant={difficulty == 2 ? 'accent' : undefined}
                    onClick={() => setDifficulty(2)}
                  >
                    Hard
                  </Button>
                </div>
              </div>
              <div>
                <label className=" w-fit font-bold flex items-center h-fit gap-1">
                  <span id="tooltip-2">Number to recall</span>
                  <Tooltip>
                    <TooltipTrigger asChild={true}>
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
                    </TooltipTrigger>
                    <TooltipContent>
                      The number of pieces in a row you'll have to recall from a
                      single position
                    </TooltipContent>
                  </Tooltip>
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
                    <Tooltip>
                      <TooltipTrigger asChild={true}>
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
                      </TooltipTrigger>
                      <TooltipContent>
                        Timed mode will give you a set amount of time to
                        remember the position before you have to recall it.
                      </TooltipContent>
                    </Tooltip>
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
          <div className="flex gap-4 flex-wrap text-white text-lg mb-4">
            <p>
              <span className="font-bold">Difficulty: </span>
              {getDifficulty()}
            </p>
            <p>
              <span className="font-bold">Recall Count: </span>
              {piecesToRecall}
            </p>
            <p>
              <span className="font-bold">Timer: </span>
              {timed ? `${timerLength}s` : 'none'}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.3)]">
                  <Spinner />
                </div>
              )}
              <Chessboard
                options={{
                  onSquareClick: squareClicked,
                  allowDragging: false,
                  position: position,
                  boardOrientation: 'white',
                  squareStyles: {
                    ...selectedSquares,
                    ...hiddenSquares,
                  },
                }}
              />
              <XpTracker counter={xpCounter} type={'tactic'} />
            </div>
            <div className="w-1/3 min-w-1/3 p-4 bg-card-light/20 rounded-lg h-fit my-auto">
              <div className="flex flex-col gap-2 bg-card rounded-lg p-4">
                <StatusIndicator status={puzzleStatus} />
                {!puzzleFinished && !readyForInput && (
                  <>
                    <p className="text-sm italic text-center">
                      Memorise the position shown, you'll be asked to remember & recall the pieces (not pawns)
                    </p>
                    {!timed ? (
                      <Button variant="accent" onClick={markImReady}>
                        I'm Ready!
                      </Button>
                    ) : (
                      <p className="text-xl font-bold text-center mt-4">{timer}s</p>
                    )}
                  </>
                )}
                {!puzzleFinished && correctSquares[counter] && readyForInput && (
                  <p className="text-center">
                    Where is a{' '}
                    <span className="font-bold underline">
                      {correctSquares[counter].color == 'w' ? 'White' : 'Black'}{' '}
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
                <div className="flex flex-col gap-2 mt-auto">
                  {puzzleFinished && (
                    <Button variant="primary" onClick={() => goToNextPuzzle(puzzleStatus)}>
                      Next
                    </Button>
                  )}
                  <Button className="w-full" variant="danger" onClick={exit}>
                    Exit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
