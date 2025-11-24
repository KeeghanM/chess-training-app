import { useCallback, useEffect, useState } from 'react'

import type { Color, PieceSymbol, Square } from 'chess.js'
import { Chess, SQUARES } from 'chess.js'
import { Chessboard, SquareHandlerArgs } from 'react-chessboard'

import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import XpTracker from '@components/general/XpTracker'

import type { TrainingPuzzle } from '@hooks/use-puzzle-queries'
import { useSounds } from '@hooks/use-sound'

import trackEventOnClient from '@utils/track-event-on-client'

import BoardContainer from '../shared/BoardContainer'
import StatusIndicator from '../shared/StatusIndicator'

type RecallTrainProps = {
  // Display props
  difficulty: number
  getDifficulty: () => string
  piecesToRecall: number
  timed: boolean
  timerLength: number

  // Puzzle data
  currentPuzzle?: TrainingPuzzle | undefined
  soundEnabled: boolean
  loading: boolean

  // Puzzle state
  puzzleStatus: 'none' | 'correct' | 'incorrect'
  xpCounter: number

  // Actions
  nextPuzzle: () => Promise<void>
  onPuzzleComplete: (status: 'correct' | 'incorrect') => Promise<void>
  onExit: () => void
}

export default function RecallTrain({
  difficulty,
  getDifficulty,
  piecesToRecall,
  timed,
  timerLength,
  currentPuzzle,
  soundEnabled,
  loading,
  puzzleStatus,
  xpCounter,
  nextPuzzle,
  onPuzzleComplete,
  onExit,
}: RecallTrainProps) {
  // Chess state
  const [game, setGame] = useState(new Chess())
  const [position, setPosition] = useState(game.fen())
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
  const [readyForInput, setReadyForInput] = useState(false)
  const [puzzleFinished, setPuzzleFinished] = useState(false)

  // SFX
  const { correctSound, incorrectSound } = useSounds()

  const markMoveAs = async (status: 'correct' | 'incorrect') => {
    if (status == 'correct') {
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
      setCounter(0)
      setHiddenSquares({})
      setReadyForInput(false)
      trackEventOnClient('recall_complete', {})
      await onPuzzleComplete(status)
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

  const markImReady = useCallback(() => {
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
  }, [game])

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

  const handleNextClick = async () => {
    setSelectedSquares({})
    setTimer(timerLength)
    await nextPuzzle()
  }

  // Create a new game from the puzzle whenever it changes
  useEffect(() => {
    if (!currentPuzzle) return

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
    setSelectedSquares({})
    if (timed) setTimer(timerLength)
  }, [currentPuzzle, difficulty, timed, timerLength])

  // Timer logic
  useEffect(() => {
    if (!timed || !currentPuzzle || readyForInput || puzzleFinished) return

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
  }, [timed, currentPuzzle, readyForInput, markImReady, puzzleFinished])

  return (
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
          <BoardContainer>
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
                boardStyle: {
                  marginInline: 'auto',
                },
                squareStyles: {
                  ...selectedSquares,
                  ...hiddenSquares,
                },
              }}
            />
          </BoardContainer>
          <XpTracker counter={xpCounter} type={'tactic'} />
        </div>
        <div className="lg:w-1/3 lg:min-w-1/3 p-4 bg-card-light/20 rounded-lg h-fit my-auto">
          <div className="flex flex-col gap-2 bg-card rounded-lg p-4">
            <StatusIndicator status={puzzleStatus} />
            {!puzzleFinished && !readyForInput && (
              <>
                <p className="text-sm italic text-center">
                  Memorise the position shown, you'll be asked to remember &
                  recall the pieces (not pawns)
                </p>
                {!timed ? (
                  <Button
                    className="w-full"
                    variant="accent"
                    onClick={markImReady}
                  >
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
                <Button variant="primary" onClick={handleNextClick}>
                  Next
                </Button>
              )}
              <Button className="w-full" variant="danger" onClick={onExit}>
                Exit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
