import { useEffect, useState } from 'react'
import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import XpTracker from '@components/general/XpTracker'
import type { TrainingPuzzle } from '@hooks/use-puzzle-queries'
import { useSounds } from '@hooks/use-sound'
import trackEventOnClient from '@utils/trackEventOnClient'
import {
  showMoveSequence,
  makeMove as utilMakeMove,
} from '@utils/trainer-helpers'
import { Chess, type Move } from 'chess.js'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import ChessBoard from '../ChessBoard'
import BoardContainer from '../shared/BoardContainer'
import PgnNavigator from '../shared/PgnNavigator'
import StatusIndicator from '../shared/StatusIndicator'

interface EndgameTrainProps {
  // Display props
  type: 'Queen' | 'Rook' | 'Knight' | 'Bishop' | 'Pawn' | 'All'
  rating: number
  getDifficulty: () => string

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

export default function EndgameTrain({
  type,
  rating,
  getDifficulty,
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
}: EndgameTrainProps) {
  // Chess state
  const [game, setGame] = useState(new Chess())
  const [gameReady, setGameReady] = useState(false)
  const [orientation, setOrientation] = useState<'white' | 'black'>('white')
  const [position, setPosition] = useState(game.fen())
  const [readyForInput, setReadyForInput] = useState(false)
  const [puzzleFinished, setPuzzleFinished] = useState(false)

  // SFX
  const { correctSound, incorrectSound } = useSounds()

  const handleMove = (move: string) => {
    utilMakeMove(game, move)
    setPosition(game.fen())
  }

  // Makes a move for the "opponent"
  const makeBookMove = () => {
    setReadyForInput(false)
    const currentMove = currentPuzzle?.moves[game.history().length]
    if (!currentMove) return

    const timeoutId = setTimeout(() => {
      handleMove(currentMove)
      setReadyForInput(true)
    }, 500)
    return timeoutId
  }

  const makeFirstMove = (move: string) => {
    const timeoutId = setTimeout(() => {
      handleMove(move)
      setReadyForInput(true)
    }, 500)
    return timeoutId
  }

  const checkEndOfLine = async () => {
    if (game.history().length >= currentPuzzle!.moves.length) {
      // We have reached the end of the line
      if (soundEnabled) correctSound()
      setPuzzleFinished(true)

      await onPuzzleComplete('correct')
      if (autoNext) await nextPuzzle()

      return true
    }

    return false
  }

  const showIncorrectSequence = async () => {
    if (!currentPuzzle) return
    setReadyForInput(false)
    await showMoveSequence(
      game,
      currentPuzzle.moves,
      game.history().length,
      handleMove,
    )
    setPosition(game.fen())
    setReadyForInput(true)
    setPuzzleFinished(true)
    await onPuzzleComplete('incorrect')
  }

  const handlePlayerMove = async (playerMove: Move) => {
    const correctMove = currentPuzzle!.moves[game.history().length - 1]

    if (correctMove !== playerMove.lan && !game.isCheckmate()) {
      // We played the wrong move
      if (soundEnabled) incorrectSound()
      game.undo()
      setReadyForInput(false)
      await showIncorrectSequence()

      setReadyForInput(true)
      setPuzzleFinished(true)
      return false
    }

    setPosition(game.fen())
    makeBookMove()
    await checkEndOfLine()
    return true
  }

  const handleMoveClick = (moveIndex: number) => {
    if (!currentPuzzle) return
    const newGame = new Chess(currentPuzzle.fen)
    for (let i = 0; i <= moveIndex; i++) {
      newGame.move(game.history()[i]!)
    }
    setPosition(newGame.fen())
    trackEventOnClient('endgame_set_jump_to_move', {})
  }

  // Create a new game from the puzzle whenever it changes
  useEffect(() => {
    if (!currentPuzzle) return
    const newGame = new Chess(currentPuzzle.fen)
    setGame(newGame)
    setGameReady(false)
  }, [currentPuzzle])

  // We need to ensure the game is set before we can make a move
  useEffect(() => {
    setGameReady(true)
  }, [game])

  // Now, whenever any of the elements associated with the game/puzzle
  // change we can check if we need to make the first move
  useEffect(() => {
    if (gameReady && currentPuzzle) {
      setPuzzleFinished(false)
      setPosition(currentPuzzle.fen)
      setOrientation(game.turn() == 'w' ? 'black' : 'white') // reversed because the first move is opponents
      const firstMove = currentPuzzle?.moves[0]
      const timeoutId = makeFirstMove(firstMove!)
      return () => clearTimeout(timeoutId)
    }
  }, [gameReady, game, currentPuzzle])

  return (
    <>
      <div className="flex gap-4 flex-wrap text-white text-lg mb-4">
        <p>
          <span className="font-bold">Type: </span>
          {type} Endgames
        </p>
        <p>
          <span className="font-bold">Rating: </span>
          {rating}
        </p>
        <p>
          <span className="font-bold">Difficulty: </span>
          {getDifficulty()}
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
            <ChessBoard
              game={game}
              position={position}
              orientation={orientation}
              readyForInput={readyForInput}
              soundEnabled={soundEnabled}
              additionalSquares={{}}
              moveMade={handlePlayerMove}
              additionalArrows={[]}
              enableHighlights={true}
              enableArrows={true}
            />
          </BoardContainer>
          <XpTracker counter={xpCounter} type={'tactic'} />
        </div>
        <div className="lg:w-1/3 lg:min-w-1/3 p-4 bg-card-light/20 rounded-lg h-fit my-auto">
          <div className="flex flex-col gap-2 bg-card rounded-lg p-4">
            <StatusIndicator
              status={puzzleStatus}
              orientation={orientation}
              puzzleId={puzzleId}
            />
            <PgnNavigator
              game={game}
              puzzleFinished={puzzleFinished}
              onMoveClick={handleMoveClick}
            />
            <div className="flex justify between gap-2">
              {puzzleFinished ? (
                (!autoNext || puzzleStatus == 'incorrect') && (
                  <Button variant="primary" onClick={nextPuzzle}>
                    Next
                  </Button>
                )
              ) : (
                <Button
                  variant="dark"
                  onClick={async () => {
                    await showIncorrectSequence()
                  }}
                >
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
