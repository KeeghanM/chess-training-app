'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

import { useProfileQueries } from '@hooks/use-profile-queries'
import { type TrainingPuzzle } from '@hooks/use-puzzle-queries'
import { useVisualisationQueries } from '@hooks/use-visualisation-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import * as Sentry from '@sentry/nextjs'
import Tippy from '@tippyjs/react'
import { useWindowSize } from '@uidotdev/usehooks'
import trackEventOnClient from '@utils/trackEventOnClient'
import type { Square } from 'chess.js'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import 'tippy.js/dist/tippy.css'
import useSound from 'use-sound'

import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import XpTracker from '@components/general/XpTracker'
import ThemeSwitch from '@components/template/header/ThemeSwitch'

/**
 * Renders the chess training visualization interface.
 *
 * This component manages the state and user interactions required for practicing chess puzzles. It handles fetching puzzles based on user settings
 * (rating, difficulty, and number of moves), updates the chess game state, and provides real-time feedback using visual cues and sound effects. The
 * interface toggles between training and settings modes, tracks user performance, and logs errors via Sentry when fetching puzzles fails.
 *
 * @returns A React element representing the visualization trainer.
 */
export default function VisualisationTrainer() {
  const { user } = useKindeBrowserClient()

  // --- Hooks ---
  const { updateStreak } = useProfileQueries()
  const { useRandomVisualisationQuery, updateVisualisationStreak } =
    useVisualisationQueries()

  // Setup main state for the game/puzzles
  const [currentPuzzle, setCurrentPuzzle] = useState<TrainingPuzzle>()
  const [fetchPuzzle, setFetchPuzzle] = useState(false)
  const [game, setGame] = useState(new Chess())
  const [orientation, setOrientation] = useState<'white' | 'black'>('white')
  const [position, setPosition] = useState(game.fen())
  const [displayGame, setDisplayGame] = useState(new Chess())
  const [displayPosition, setDisplayPosition] = useState(displayGame.fen())
  const [length, setLength] = useState(6)
  const [rating, setRating] = useState(1500)
  const [difficulty, setDifficulty] = useState(1)
  const [startSquare, setStartSquare] = useState<Square>()
  const [selectedSquares, setSelectedSquares] = useState<
    Record<string, React.CSSProperties>
  >({})

  // Setup SFX
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [correctSound] = useSound('/sfx/correct.mp3')
  const [incorrectSound] = useSound('/sfx/incorrect.mp3')

  // React Query for puzzle fetching
  const puzzleQuery = useRandomVisualisationQuery({
    rating,
    difficulty,
    length,
  })

  // Update current puzzle when query succeeds
  useEffect(() => {
    if (puzzleQuery.data && fetchPuzzle) {
      setCurrentPuzzle(puzzleQuery.data)
      setFetchPuzzle(false)
      setLoading(false)
      setError('')
    }
  }, [puzzleQuery.data, fetchPuzzle])

  // Handle query errors
  useEffect(() => {
    if (puzzleQuery.error) {
      Sentry.captureException(puzzleQuery.error)
      setError(puzzleQuery.error.message || 'Failed to fetch puzzle')
      setLoading(false)
    }
  }, [puzzleQuery.error])

  // Setup state for the settings/general
  const [autoNext, setAutoNext] = useState(false)
  const [loading, setLoading] = useState(true)
  const [readyForInput, setReadyForInput] = useState(false)
  const [puzzleFinished, setPuzzleFinished] = useState(false)
  const [puzzleStatus, setPuzzleStatus] = useState<
    'none' | 'correct' | 'incorrect'
  >('none')
  const [mode, setMode] = useState<'training' | 'settings'>('settings')
  const [error, setError] = useState('')

  const [xpCounter, setXpCounter] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

  const difficultyAdjuster = (d: number) => {
    return d == 0 ? 0.9 : d == 1 ? 1 : 1.2
  }

  const getNewPuzzle = () => {
    const trueRating = Math.max(
      Math.round(rating * difficultyAdjuster(difficulty)),
      500,
    )
    if (trueRating < 500 || trueRating > 3000) {
      setError(
        'Puzzle ratings must be between 500 & 3000, try adjusting the difficulty or the base rating',
      )
      return
    }

    setFetchPuzzle(true)
    setLoading(true)
    puzzleQuery.refetch()
  }

  const goToNextPuzzle = async (status: string) => {
    setLoading(true)

    // Increase the "Last Trained" on the profile
    updateStreak.mutate(undefined, {
      onError: (e) => Sentry.captureException(e),
    })

    // Increase the streak if correct
    // and send it to the server incase a badge needs adding
    if (status == 'correct') {
      trackEventOnClient('Visualisation_correct', {})
      updateVisualisationStreak.mutate(
        { currentStreak: currentStreak + 1 },
        {
          onError: (e) => Sentry.captureException(e),
        },
      )
      setCurrentStreak(currentStreak + 1)
    } else if (status == 'incorrect') {
      trackEventOnClient('visualisation_incorrect', {})
    }
    getNewPuzzle()

    setPuzzleStatus('none')
    setSelectedSquares({})
  }

  const markMoveAs = async (status: 'correct' | 'incorrect') => {
    setPuzzleStatus(status)
    setReadyForInput(false)
    setPuzzleFinished(true)
    if (status == 'correct') {
      setXpCounter(xpCounter + 1)
      if (soundEnabled) correctSound()
    } else {
      if (soundEnabled) incorrectSound()
    }

    setStartSquare(undefined)

    if (autoNext && status == 'correct') await goToNextPuzzle(status)
  }

  const getCorrectMoves = () => {
    if (!currentPuzzle?.moves) return {}

    const correctMove = currentPuzzle.moves[currentPuzzle.moves.length - 1]!
    const correctStartSquare = correctMove.substring(0, 2)
    const correctEndSquare = correctMove.substring(2, 4)
    return {
      [correctStartSquare]: {
        backgroundColor: 'rgba(25,255,0,0.4)',
      },
      [correctEndSquare]: {
        backgroundColor: 'rgba(0,255,0,0.8)',
      },
    }
  }

  const squareClicked = async (square: Square) => {
    if (puzzleFinished) return
    if (!readyForInput) return

    // if we click the same square twice
    // then unselect the piece
    if (startSquare === square) {
      setStartSquare(undefined)
      setSelectedSquares({})
      return
    }
    // If we click a square, and we don't already have a
    // square selected, then select the square
    if (!startSquare) {
      setStartSquare(square)
      setSelectedSquares({
        [square]: {
          backgroundColor: 'rgba(25,255,0,0.4)',
        },
      })
      return
    }

    // If we click a square, and we already have a square selected
    // then check if that move matches the puzzle's last move
    // if it does, then we have a correct move, otherwise it's incorrect
    const moveString = `${startSquare}${square}`
    const finalMove = currentPuzzle?.moves[currentPuzzle.moves.length - 1]

    if (moveString == finalMove?.substring(0, 4)) {
      setSelectedSquares({
        [square]: {
          backgroundColor: 'rgba(25,255,0,0.8)',
        },
        [startSquare]: {
          backgroundColor: 'rgba(25,255,0,0.4)',
        },
      })
      await markMoveAs('correct')
    } else {
      setSelectedSquares({
        [square]: {
          backgroundColor: 'rgba(255,25,0,0.8)',
        },
        [startSquare]: {
          backgroundColor: 'rgba(255,25,0,0.4)',
        },
        ...getCorrectMoves(),
      })
      await markMoveAs('incorrect')
    }
  }

  const PgnDisplay = game.history().map((move, index) => {
    if (index == game.history().length - 1 && !puzzleFinished) return null // Don't show the last move until the puzzle is finished

    const moveNumber = Math.floor(index / 2) + 1 + displayGame.moveNumber()
    const moveColour = game.history({ verbose: true })[index]!.color
    const FlexText = () => (
      <p>
        {(moveColour == 'w' || (moveColour == 'b' && index == 0)) && (
          <span className="font-bold">
            {/* This weird calc is to fix the first black number being too high */}
            {moveNumber - (moveColour == 'b' && index == 0 ? 1 : 0)}.
            {moveColour == 'b' && index == 0 && '..'}
          </span>
        )}{' '}
        <span>{move}</span>
      </p>
    )
    if (puzzleFinished) {
      return (
        <button
          key={'btn' + moveNumber.toString() + move + moveColour}
          className="h-max max-h-fit bg-none p-1 hover:bg-purple-800"
          onClick={async () => {
            const newGame = new Chess(currentPuzzle!.fen)
            for (let i = 0; i <= index; i++) {
              newGame.move(game.history()[i]!)
            }
            setDisplayPosition(newGame.fen())
            trackEventOnClient('calculation_set_jump_to_move', {})
          }}
        >
          <FlexText />
        </button>
      )
    } else {
      return (
        <div
          key={moveNumber.toString() + move + moveColour}
          className="px-1 py-1"
        >
          <FlexText />
        </div>
      )
    }
  })

  const exit = async () => {
    setMode('settings')
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
    if (mode == 'settings') return
    getNewPuzzle()
  }, [mode])

  useEffect(() => {
    // Create a new game from the puzzle whenever it changes
    if (!currentPuzzle) return
    setLoading(true)
    const newGame = new Chess(currentPuzzle.fen)
    const newDisplayGame = new Chess(currentPuzzle.fen)
    setOrientation(newGame.turn() == 'w' ? 'black' : 'white') // reversed because the first move is opponents

    for (const move of currentPuzzle.moves) {
      newGame.move(move)
    }
    setPosition(newGame.fen())
    setGame(newGame)

    setDisplayPosition(newDisplayGame.fen())
    setDisplayGame(newDisplayGame)
    setReadyForInput(true)
    setPuzzleFinished(false)
    setLoading(false)
  }, [currentPuzzle])

  if (!user) return null

  return (
    <>
      {mode == 'settings' ? (
        <>
          <div className="border border-gray-300 text-black dark:text-white dark:border-slate-600 shadow-md dark:shadow-slate-900 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)]">
            <div className="flex flex-wrap items-center justify-between px-2 py-1 border-b border-gray-300 dark:border-slate-600 font-bold text-orange-500">
              <p id="tooltip-0">Adjust your settings</p>
            </div>
            <div className="flex flex-col p-2 gap-4">
              <div className="flex gap-2 flex-col md:flex-row items-center">
                <div>
                  <label className="font-bold">Your Rating</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 bg-gray-100 px-4 py-1 text-black"
                    min={'500'}
                    max={'3000'}
                    step={'10'}
                    value={rating}
                    onInput={(e) => {
                      setRating(parseInt(e.currentTarget.value))
                    }}
                  />
                </div>
                <div>
                  <label className="font-bold">Difficulty</label>
                  <div className="flex flex-col gap-1 md:flex-row ">
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
              </div>
              <div>
                <Tippy content="This is the total moves to see, including yours and your opponents.">
                  <label className="font-bold">Moves to visualise</label>
                </Tippy>
                <select
                  id="tooltip-1"
                  className="w-fit ml-2 border border-gray-300 px-4 py-1 bg-gray-100 text-black"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.currentTarget.value))}
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                </select>
              </div>
              <Button
                variant="primary"
                onClick={async () => {
                  setMode('training')
                  trackEventOnClient('Visualisation_start', {})
                }}
              >
                Start Training
              </Button>
              {error && (
                <p className="bg-red-500 italic text-sm p-2 text-white">
                  {error}
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative border border-gray-300 text-black dark:text-white dark:border-slate-600 shadow-md dark:shadow-slate-900 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)]">
            {loading && (
              <div className="absolute inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.3)]">
                <Spinner />
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between text-sm">
              <div className="flex gap-1 p-2 pb-0 justify-center text-xs md:text-sm lg:text-base">
                <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
                  <p className="font-bold py-1 px-1 border-b border-gray-300 dark:border-slate-600">
                    Rating:
                  </p>
                  <p>{rating}</p>
                </div>
                <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
                  <p className="font-bold py-1 px-1 border-b border-gray-300 dark:border-slate-600">
                    Difficulty:
                  </p>
                  <p>{getDifficulty()}</p>
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
            <div className="flex flex-col gap-4 lg:flex-row p-2">
              <div id="tooltip-3" className="relative cursor-pointer">
                <Chessboard // This is the visible board, set at the start position
                  arePiecesDraggable={false}
                  position={displayPosition}
                  boardOrientation={orientation}
                  boardWidth={Math.min(
                    windowSize.height / 1.5,
                    windowSize.width - 120,
                  )}
                  customBoardStyle={{
                    marginInline: 'auto',
                  }}
                  customSquareStyles={{ ...selectedSquares }}
                />
                <div className="absolute inset-0 opacity-0">
                  <Chessboard // This is the hidden board for the moves
                    onSquareClick={squareClicked}
                    onSquareRightClick={() => {
                      setStartSquare(undefined)
                      setSelectedSquares({})
                    }}
                    arePiecesDraggable={false}
                    position={position}
                    boardOrientation={orientation}
                    boardWidth={Math.min(
                      windowSize.height / 1.5,
                      windowSize.width - 120,
                    )}
                    customBoardStyle={{
                      marginInline: 'auto',
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  <p className="flex items-center gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className={
                        orientation === 'white'
                          ? 'text-white'
                          : 'rotate-180 transform text-black'
                      }
                    >
                      <path fill="currentColor" d="M1 21h22L12 2" />
                    </svg>
                    {orientation === 'white' ? 'White' : 'Black'} to move
                  </p>
                  {puzzleStatus === 'correct' && (
                    <div className="z-50 flex flex-wrap  items-center gap-2">
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
                      <Link
                        href={`https://lichess.org/training/${currentPuzzle?.puzzleid}`}
                        target="_blank"
                      >
                        <span className="flex flex-row items-center gap-1 text-sm underline">
                          Lichess
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2l8-8m0 0v5m0-5h-5"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  )}
                  {puzzleStatus === 'incorrect' && (
                    <div className="z-50 flex flex-wrap items-center gap-2">
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
                      <Link
                        href={`https://lichess.org/training/${currentPuzzle?.puzzleid}`}
                        target="_blank"
                      >
                        <span className="flex flex-row items-center gap-1 text-sm underline">
                          Lichess
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2l8-8m0 0v5m0-5h-5"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col-reverse gap-2 lg:flex-col">
                  <div
                    id="tooltip-2"
                    className="flex h-full flex-wrap content-start gap-1 border lg:border-4 border-purple-700 p-2 bg-purple-700 bg-opacity-20 text-black dark:text-white"
                  >
                    {PgnDisplay.map((item) => item)}
                  </div>
                  <label className="ml-auto flex items-center gap-2 text-sm">
                    {/* @ts-expect-error - react-toggle type compatibility issue */}
                    <Toggle
                      defaultChecked={autoNext}
                      onChange={async () => {
                        setAutoNext(!autoNext)
                        if (puzzleFinished && puzzleStatus == 'correct')
                          await goToNextPuzzle(puzzleStatus)
                      }}
                    />
                    <span>Auto Next on correct</span>
                  </label>
                  <div className="flex flex-col gap-2">
                    {puzzleFinished ? (
                      (!autoNext || puzzleStatus == 'incorrect') && (
                        <Button
                          variant="primary"
                          onClick={() => goToNextPuzzle(puzzleStatus)}
                        >
                          Next
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={async () => {
                          setPuzzleStatus('incorrect')
                          setReadyForInput(false)
                          setReadyForInput(true)
                          setPuzzleFinished(true)
                          if (soundEnabled) incorrectSound()
                          setSelectedSquares(getCorrectMoves())
                        }}
                      >
                        Skip/Show Solution
                      </Button>
                    )}

                    <Button variant="danger" onClick={exit}>
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
