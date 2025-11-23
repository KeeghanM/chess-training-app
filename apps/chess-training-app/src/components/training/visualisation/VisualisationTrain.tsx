import { useEffect, useState } from 'react'

import { Chess, type Square } from 'chess.js'
import { Chessboard, SquareHandlerArgs } from 'react-chessboard'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'

import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import XpTracker from '@components/general/XpTracker'

import { useChessGame } from '@hooks/use-chess-game'
import type { TrainingPuzzle } from '@hooks/use-puzzle-queries'
import { useSounds } from '@hooks/use-sound'

import trackEventOnClient from '@utils/track-event-on-client'

import BoardContainer from '../shared/BoardContainer'
import PgnNavigator from '../shared/PgnNavigator'
import StatusIndicator from '../shared/StatusIndicator'

interface VisualisationTrainProps {
  // Display props
  rating: number
  getDifficulty: () => string
  length: number

  // Puzzle data
  currentPuzzle?: TrainingPuzzle
  soundEnabled: boolean
  loading: boolean

  // Puzzle state
  puzzleStatus: 'none' | 'correct' | 'incorrect'
  puzzleId?: string
  xpCounter: number

  // Auto next
  autoNext: boolean
  setAutoNext: (autoNext: boolean) => void

  // Actions
  nextPuzzle: () => Promise<void>
  onPuzzleComplete: (status: 'correct' | 'incorrect') => Promise<void>
  onExit: () => void
}

export default function VisualisationTrain({
  rating,
  getDifficulty,
  length,
  currentPuzzle,
  soundEnabled,
  loading,
  puzzleStatus,
  puzzleId,
  xpCounter,
  autoNext,
  nextPuzzle,
  setAutoNext,
  onPuzzleComplete,
  onExit,
}: VisualisationTrainProps) {
  // Hooks
  const {
    game,
    position,
    orientation,
    setOrientation,
    isInteractive: readyForInput,
    setIsInteractive: setReadyForInput,
    setGame,
    setPosition,
  } = useChessGame()

  // Display game state (for showing move progression)
  const [displayGame, setDisplayGame] = useState(new Chess())
  const [displayPosition, setDisplayPosition] = useState(displayGame.fen())
  const [startSquare, setStartSquare] = useState<Square>()
  const [selectedSquares, setSelectedSquares] = useState<
    Record<string, React.CSSProperties>
  >({})
  const [puzzleFinished, setPuzzleFinished] = useState(false)

  // SFX
  const { correctSound, incorrectSound } = useSounds()

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

  const markMoveAs = async (status: 'correct' | 'incorrect') => {
    setReadyForInput(false)
    setPuzzleFinished(true)
    if (status == 'correct') {
      if (soundEnabled) correctSound()
    } else {
      if (soundEnabled) incorrectSound()
    }

    setStartSquare(undefined)
    await onPuzzleComplete(status)

    if (autoNext && status == 'correct') {
      await nextPuzzle()
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

  const handleSquareRightClick = () => {
    setStartSquare(undefined)
    setSelectedSquares({})
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

  const showSkipSolution = async () => {
    setReadyForInput(false)
    setPuzzleFinished(true)
    if (soundEnabled) incorrectSound()
    setSelectedSquares(getCorrectMoves())
    await onPuzzleComplete('incorrect')
  }

  // Create a new game from the puzzle whenever it changes
  useEffect(() => {
    if (!currentPuzzle) return

    // Create a temporary game to calculate the final position
    const tempGame = new Chess(currentPuzzle.fen)
    const newDisplayGame = new Chess(currentPuzzle.fen)
    setOrientation(tempGame.turn() == 'w' ? 'black' : 'white') // reversed because the first move is opponents

    for (const move of currentPuzzle.moves) {
      tempGame.move(move)
    }

    // Reset the main game to the final position
    setGame(tempGame)
    setPosition(tempGame.fen())

    setDisplayPosition(newDisplayGame.fen())
    setDisplayGame(newDisplayGame)

    setReadyForInput(true)
    setPuzzleFinished(false)
    setSelectedSquares({})
  }, [currentPuzzle])

  return (
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
          <BoardContainer>
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
                    onSquareRightClick: handleSquareRightClick,
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
          </BoardContainer>
          <XpTracker counter={xpCounter} type={'tactic'} />
        </div>
        <div className="lg:w-1/3 lg:min-w-1/3 p-4 bg-card-light/20 rounded-lg h-fit my-auto">
          <div className="flex flex-col gap-2 bg-card rounded-lg p-4">
            <StatusIndicator
              status={puzzleStatus}
              orientation={
                orientation === 'white' ? 'black' : 'white' // this is flipped, because we want the user to start from the beginning. Orientation is the USERS orientation, but the first move they need to visualise is OPPONENTS - so we flip it
              }
              puzzleId={puzzleId}
            />
            <PgnNavigator
              game={game}
              puzzleFinished={puzzleFinished}
              onMoveClick={handleMoveClick}
              hideLastMove={true}
            />
            <div className="flex justify between gap-2">
              {puzzleFinished ? (
                (!autoNext || puzzleStatus == 'incorrect') && (
                  <Button variant="primary" onClick={nextPuzzle}>
                    Next
                  </Button>
                )
              ) : (
                <Button variant="dark" onClick={showSkipSolution}>
                  Skip
                </Button>
              )}
              <label className="ml-auto flex items-center gap-2 text-xs text-black">
                <span>Auto Next on correct</span>
                <Toggle
                  defaultChecked={autoNext}
                  onChange={async () => {
                    setAutoNext(!autoNext)
                    if (puzzleFinished && puzzleStatus == 'correct')
                      await nextPuzzle()
                  }}
                />
              </label>
            </div>
            <Button className="w-full" variant="danger" onClick={onExit}>
              Exit
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
