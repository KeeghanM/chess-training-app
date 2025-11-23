import { useEffect, useState } from 'react'

import { Chess } from 'chess.js'
import { Arrow } from 'react-chessboard'

export function useChessGame() {
  const [game, setGame] = useState(new Chess())
  const [gameReady, setGameReady] = useState(false)
  const [orientation, setOrientation] = useState<'white' | 'black'>('white')
  const [position, setPosition] = useState(game.fen())
  const [isInteractive, setIsInteractive] = useState(true)
  const [arrows, setArrows] = useState<Arrow[]>([])
  const [highlightSquares, setHighlightSquares] = useState<
    Record<string, { backgroundColor: string }>
  >({})

  useEffect(() => {
    setGameReady(true)
  }, [game])

  const makeMove = (move: string) => {
    try {
      game.move(move)
      setPosition(game.fen())
      return true
    } catch {
      return false
    }
  }

  const resetGame = (fen?: string) => {
    const newGame = new Chess(fen)
    setGame(newGame)
    setPosition(newGame.fen())
    setGameReady(false) // Will be set to true by useEffect
  }

  return {
    game,
    gameReady,
    position,
    setPosition,
    orientation,
    setOrientation,
    isInteractive,
    setIsInteractive,
    arrows,
    setArrows,
    highlightSquares,
    setHighlightSquares,
    makeMove,
    resetGame,
    setGame, // Exposed for advanced cases where we need to replace the instance
  }
}
