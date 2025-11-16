'use client'

import { useEffect, useState } from 'react'
import type { Chess, Move, Piece, Square } from 'chess.js'
import type { Arrow } from 'react-chessboard'
import { Chessboard, defaultPieces } from 'react-chessboard'
import useSound from 'use-sound'

interface ChessBoardProps {
  game: Chess
  position: string
  orientation: 'white' | 'black'
  readyForInput: boolean
  soundEnabled: boolean
  additionalSquares: Record<string, { backgroundColor: string }>
  additionalArrows: Arrow[]
  enableArrows: boolean
  enableHighlights: boolean
  moveMade: null | ((move: Move) => void)
}

export default function ChessBoard(props: ChessBoardProps) {
  const { game } = props
  const [startSquare, setStartSquare] = useState<Square | undefined>()
  const [clickedPiece, setClickedPiece] = useState<Piece | undefined>()
  const [optionSquares, setOptionSquares] = useState<
    Record<string, React.CSSProperties>
  >({})
  const [promotionMove, setPromotionMove] = useState<{
    from: Square
    to: Square
  } | null>(null)

  const [checkSound] = useSound('/sfx/check.mp3')
  const [captureSound] = useSound('/sfx/capture.mp3')
  const [promotionSound] = useSound('/sfx/promote.mp3')
  const [castleSound] = useSound('/sfx/castle.mp3')
  const [moveSound] = useSound('/sfx/move.mp3')

  const playMoveSound = (move: string) => {
    if (!props.soundEnabled) return
    if (move.includes('+')) checkSound()
    else if (move.includes('x')) captureSound()
    else if (move.includes('=')) promotionSound()
    else if (move.includes('O')) castleSound()
    else moveSound()
  }

  function handleUserMove(sourceSquare: Square, targetSquare: Square): boolean {
    try {
      const moves = game.moves({ square: sourceSquare, verbose: true })
      const move = moves.find((m) => m.to === targetSquare)

      if (!move) return false

      // Check if this move is a promotion
      if (move.promotion) {
        setPromotionMove({ from: sourceSquare, to: targetSquare })
        return true // Block animation until user confirms
      }

      const result = game.move({ from: sourceSquare, to: targetSquare })
      if (result) {
        if (props.moveMade) props.moveMade(result)
      }
      return !!result
    } catch {
      return false
    }
  }

  function confirmPromotion(piece: 'q' | 'r' | 'b' | 'n') {
    if (!promotionMove) return
    try {
      const move = game.move({
        from: promotionMove.from,
        to: promotionMove.to,
        promotion: piece,
      })
      if (move && props.moveMade) props.moveMade(move)
      setPromotionMove(null)
    } catch {
      setPromotionMove(null)
    }
  }

  function handleSquareClick(clickedSquare: Square) {
    if (!props.readyForInput || promotionMove) return

    // deselect by clicking same square
    if (clickedSquare === startSquare) {
      setStartSquare(undefined)
      setClickedPiece(undefined)
      setOptionSquares({})
      return
    }

    const piece = game.get(clickedSquare)
    // select own piece
    if (piece && piece.color === game.turn()) {
      setStartSquare(clickedSquare)
      setClickedPiece(piece)
      return
    }

    // try a move
    if (startSquare && clickedPiece) {
      const moved = handleUserMove(startSquare, clickedSquare)
      if (moved) {
        setStartSquare(undefined)
        setClickedPiece(undefined)
        setOptionSquares({})
      }
      return
    }

    // deselect by clicking empty square
    if (!piece) {
      setStartSquare(undefined)
      setClickedPiece(undefined)
      setOptionSquares({})
      return
    }
  }

  // --- highlights ---
  useEffect(() => {
    if (!startSquare || !clickedPiece || !props.enableHighlights) {
      setOptionSquares({})
      return
    }

    const validMoves = game.moves({ square: startSquare, verbose: true })
    const newOpts: Record<string, React.CSSProperties> = {}
    newOpts[startSquare] = { background: 'rgba(255,255,0,0.4)' }

    validMoves.forEach((m) => {
      newOpts[m.to] = {
        background: game.get(m.to)
          ? 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.25) 52%, rgba(0,0,0,0.25) 60%, transparent 62%)'
          : 'radial-gradient(circle, rgba(0,0,0,.2) 18%, transparent 20%)',
        borderRadius: '50%',
      }
    })
    setOptionSquares(newOpts)
  }, [startSquare, clickedPiece, props.enableHighlights])

  // --- sound effect on move completion ---
  useEffect(() => {
    if (!props.soundEnabled) return
    const lastMove = game.history({ verbose: true }).slice(-1)[0]
    if (lastMove) playMoveSound(lastMove.san)
  }, [props.position])

  // --- promotion dialog placement ---
  const squareWidth =
    typeof document !== 'undefined'
      ? (document.querySelector(`[data-square]`)?.getBoundingClientRect()
          ?.width ?? 0)
      : 0

  const getPromotionLeft = (to: Square) => {
    const col = to.charCodeAt(0) - 'a'.charCodeAt(0)
    return props.orientation === 'white'
      ? col * squareWidth
      : (7 - col) * squareWidth
  }

  return (
    <>
      {/* --- Promotion Dialog --- */}
      {promotionMove && (
        <>
          <div
            role="button"
            aria-label="Cancel promotion"
            tabIndex={0}
            onClick={() => setPromotionMove(null)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setPromotionMove(null)
              }
            }}
            onContextMenu={(e) => {
              e.preventDefault()
              setPromotionMove(null)
            }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 1000,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: getPromotionLeft(promotionMove.to),
              width: squareWidth,
              backgroundColor: 'white',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 0 10px rgba(0,0,0,0.4)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            {(['q', 'r', 'b', 'n'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => confirmPromotion(p)}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'white',
                }}
                className="hover:bg-primary/20"
              >
                {defaultPieces[
                  `${game.turn() === 'w' ? 'w' : 'b'}${p.toUpperCase()}`
                ]!()}
              </button>
            ))}
          </div>
        </>
      )}

      <Chessboard
        options={{
          position: props.position,
          boardOrientation: props.orientation,
          allowDragging: props.readyForInput && !promotionMove,
          onPieceDrop: ({ sourceSquare, targetSquare }) =>
            handleUserMove(sourceSquare as Square, targetSquare as Square),
          onSquareClick: ({ square }) => handleSquareClick(square as Square),
          onSquareRightClick: () => {
            setStartSquare(undefined)
            setClickedPiece(undefined)
            setOptionSquares({})
          },
          onPieceDrag: ({ square }) => {
            if (!startSquare) {
              setStartSquare(square as Square)
              const piece = game.get(square as Square)
              if (piece) setClickedPiece(piece)
            }
          },
          boardStyle: { marginInline: 'auto' },
          squareStyles: props.enableHighlights
            ? { ...optionSquares, ...props.additionalSquares }
            : {},
          arrows: props.enableArrows ? props.additionalArrows : [],
        }}
      />
    </>
  )
}
