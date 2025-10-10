'use client'

import { useEffect, useState } from 'react'
import { useProfileQueries } from '@hooks/use-profile-queries'
import { type TrainingPuzzle } from '@hooks/use-puzzle-queries'
import { useSounds } from '@hooks/use-sound'
import { useVisualisationQueries } from '@hooks/use-visualisation-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import * as Sentry from '@sentry/nextjs'
import type { Square } from 'chess.js'
import { Chess } from 'chess.js'
import { Chessboard, SquareHandlerArgs } from 'react-chessboard'
import Toggle from 'react-toggle'
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
import PgnNavigator from '../shared/PgnNavigator'
import StatusIndicator from '../shared/StatusIndicator'

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
  const { correctSound, incorrectSound } = useSounds()

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

  const squareClicked = async ({ square }: SquareHandlerArgs) => {
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
      setStartSquare(square as Square)
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

  const handleMoveClick = (moveIndex: number) => {
    if (!currentPuzzle) return
    const newGame = new Chess(currentPuzzle.fen)
    for (let i = 0; i <= moveIndex; i++) {
      newGame.move(game.history()[i]!)
    }
    setDisplayPosition(newGame.fen())
    trackEventOnClient('calculation_set_jump_to_move', {})
  }

  const exit = async () => {
    setPuzzleStatus('none')
    setPuzzleFinished(false)
    setReadyForInput(false)
    setSelectedSquares({})
    setStartSquare(undefined)
    setCurrentPuzzle(undefined)
    setXpCounter(0)
    setCurrentStreak(0)
    setPuzzleFinished(false)
    setReadyForInput(false)
    setGame(new Chess())
    setMode('settings')
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
          <div className="p-4 bg-card-light/20 rounded-lg">
            <h2 className="text-white text-xl font-bold mb-4">How to Use</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-white">
                <p>
                  Welcome to the Visualisation Trainer! This tool is designed to
                  help you improve your ability to visualize chess moves without
                  seeing the pieces. Here's how to get started:
                </p>
                <ul className="list-inside list-disc">
                  <li>
                    Set your desired rating and difficulty level using the
                    controls below.
                  </li>
                  <li>Click "Start Training" to begin a puzzle.</li>
                  <li>
                    The board will show the starting position of the puzzle.
                  </li>
                  <li>
                    A list of moves, starting with your opponent's move, will be
                    displayed beside the board.
                  </li>
                  <li>
                    Your task is to visualize the position after all the moves
                    have been played.
                  </li>
                  <li>
                    Finally, once you have it - click the squares to indicate
                    where the last move <em>should</em> be played.
                  </li>
                </ul>
              </div>
            </div>
            <h2 className="text-white text-xl font-bold mt-6 mb-4">Adjust your settings</h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 flex-col md:flex-row items-center">
                <div>
                  <label className="font-bold text-white">Your Rating</label>
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
                  <label className="font-bold text-white">Difficulty</label>
                  <div className="flex flex-col gap-1 md:flex-row ">
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
              </div>
              <div>
                <Tooltip>
                  <TooltipTrigger asChild={true}>
                    <label className="font-bold text-white">Moves to visualise</label>
                  </TooltipTrigger>
                  <TooltipContent>
                    This is the total moves to see, including yours and your
                    opponents.
                  </TooltipContent>
                </Tooltip>
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
          <div className="flex gap-4 flex-wrap text-white text-lg mb-4">
            <p>
              <span className="font-bold">Rating: </span>
              {rating}
            </p>
            <p>
              <span className="font-bold">Difficulty: </span>
              {getDifficulty()}
            </p>
            <p>
              <span className="font-bold">Moves: </span>
              {length}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.3)]">
                  <Spinner />
                </div>
              )}
              <div id="tooltip-3" className="relative cursor-pointer">
                <Chessboard // This is the visible board, set at the start position
                  options={{
                    allowDragging: false,
                    position: displayPosition,
                    boardOrientation: orientation,
                    boardStyle: {
                      marginInline: 'auto',
                    },
                    squareStyles: { ...selectedSquares },
                  }}
                />
                <div className="absolute inset-0 opacity-0">
                  <Chessboard // This is the hidden board for the moves
                    options={{
                      onSquareClick: squareClicked,
                      onSquareRightClick: () => {
                        setStartSquare(undefined)
                        setSelectedSquares({})
                      },
                      allowDragging: false,
                      position: position,
                      boardOrientation: orientation,
                      boardStyle: {
                        marginInline: 'auto',
                      },
                    }}
                  />
                </div>
              </div>
              <XpTracker counter={xpCounter} type={'tactic'} />
            </div>
            <div className="w-1/3 min-w-1/3 p-4 bg-card-light/20 rounded-lg h-fit my-auto">
              <div className="flex flex-col gap-2 bg-card rounded-lg p-4">
                <StatusIndicator
                  status={puzzleStatus}
                  orientation={orientation}
                  puzzleId={currentPuzzle?.puzzleid}
                />
                <PgnNavigator
                  game={game}
                  puzzleFinished={puzzleFinished}
                  onMoveClick={handleMoveClick}
                />
                <div className="flex justify between gap-2">
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
                      variant="dark"
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
                  <label className="ml-auto flex items-center gap-2 text-xs text-black">
                    <span>Auto Next on correct</span>
                    <Toggle
                      defaultChecked={autoNext}
                      onChange={async () => {
                        setAutoNext(!autoNext)
                        if (puzzleFinished && puzzleStatus == 'correct')
                          await goToNextPuzzle(puzzleStatus)
                      }}
                    />
                  </label>
                </div>
                <Button className="w-full" variant="danger" onClick={exit}>
                  Exit
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
