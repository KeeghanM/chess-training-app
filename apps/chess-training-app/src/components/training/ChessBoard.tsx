'use client'

import { useEffect, useState } from 'react'

import type { Chess, Move, Piece, Square } from 'chess.js'
import type { Arrow } from 'react-chessboard'
import { Chessboard, defaultPieces } from 'react-chessboard'
import useSound from 'use-sound'

type ChessBoardProps = {
  readonly game: Chess
  readonly position: string
  readonly orientation: 'white' | 'black'
  readonly readyForInput: boolean
  readonly soundEnabled: boolean
  readonly additionalSquares: Record<string, { backgroundColor: string }>
  readonly additionalArrows: Arrow[]
  readonly enableArrows: boolean
  readonly enableHighlights: boolean
  readonly moveMade: null | ((move: Move) => void)
}

type PromotionMove = {
  from: Square
  to: Square
}

/**
 * ChessBoard component
 *
 * Renders a chessboard with interactive features like move validation,
 * promotion handling, sound effects, and visual highlights.
 */
export default function ChessBoard({
  game,
  position,
  orientation,
  readyForInput,
  soundEnabled,
  additionalSquares,
  additionalArrows,
  enableArrows,
  enableHighlights,
  moveMade,
}: ChessBoardProps) {
  const [startSquare, setStartSquare] = useState<Square | undefined>()
  const [clickedPiece, setClickedPiece] = useState<Piece | undefined>()
  const [optionSquares, setOptionSquares] = useState<
    Record<string, React.CSSProperties>
  >({})
  const [promotionMove, setPromotionMove] = useState<PromotionMove | null>(null)

  const [checkSound] = useSound('/sfx/check.mp3')
  const [captureSound] = useSound('/sfx/capture.mp3')
  const [promotionSound] = useSound('/sfx/promote.mp3')
  const [castleSound] = useSound('/sfx/castle.mp3')
  const [moveSound] = useSound('/sfx/move.mp3')

  /**
   * Plays the appropriate sound effect for a move.
   */
  const playMoveSound = (moveSan: string) => {
    if (!soundEnabled) return

    if (moveSan.includes('+')) {
      checkSound()
      return
    }
    if (moveSan.includes('x')) {
      captureSound()
      return
    }
    if (moveSan.includes('=')) {
      promotionSound()
      return
    }
    if (moveSan.includes('O')) {
      castleSound()
      return
    }
    moveSound()
  }

  /**
   * Handles a move attempt by the user.
   * Returns true if the move was successful or a promotion is pending.
   */
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
      if (!result) return false

      if (moveMade) moveMade(result)
      setStartSquare(undefined)
      setClickedPiece(undefined)
      setOptionSquares({})

      return true
    } catch {
      return false
    }
  }

  /**
   * Confirms a pawn promotion.
   */
  function confirmPromotion(piece: 'q' | 'r' | 'b' | 'n') {
    if (!promotionMove) return

    try {
      const move = game.move({
        from: promotionMove.from,
        to: promotionMove.to,
        promotion: piece,
      })
      if (move && moveMade) moveMade(move)
    } catch {
      // Ignore invalid moves during promotion
    } finally {
      setPromotionMove(null)
    }
  }

  /**
   * Handles clicks on squares to select pieces or make moves.
   */
  function handleSquareClick(clickedSquare: Square) {
    if (!readyForInput || promotionMove) return

    // Deselect by clicking same square
    if (clickedSquare === startSquare) {
      setStartSquare(undefined)
      setClickedPiece(undefined)
      setOptionSquares({})
      return
    }

    const piece = game.get(clickedSquare)

    // Select own piece
    if (piece && piece.color === game.turn()) {
      setStartSquare(clickedSquare)
      setClickedPiece(piece)
      return
    }

    // Try a move if a piece is already selected
    if (startSquare && clickedPiece) {
      const moved = handleUserMove(startSquare, clickedSquare)
      if (moved) {
        setStartSquare(undefined)
        setClickedPiece(undefined)
        setOptionSquares({})
      }
      return
    }

    // Deselect by clicking empty square
    if (!piece) {
      setStartSquare(undefined)
      setClickedPiece(undefined)
      setOptionSquares({})
    }
  }

  // --- Highlights ---
  useEffect(() => {
    if (!startSquare || !clickedPiece || !enableHighlights) {
      setOptionSquares({})
      return
    }

    const validMoves = game.moves({ square: startSquare, verbose: true })
    const newOpts: Record<string, React.CSSProperties> = {}

    newOpts[startSquare] = { background: 'rgba(255,255,0,0.4)' }

    validMoves.forEach((m) => {
      const isCapture = game.get(m.to)
      newOpts[m.to] = {
        background: isCapture
          ? 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.25) 52%, rgba(0,0,0,0.25) 60%, transparent 62%)'
          : 'radial-gradient(circle, rgba(0,0,0,.2) 18%, transparent 20%)',
        borderRadius: '50%',
      }
    })
    setOptionSquares(newOpts)
  }, [startSquare, clickedPiece, enableHighlights, game])

  // --- Sound effect on move completion ---
  useEffect(() => {
    if (!soundEnabled) return
    const history = game.history({ verbose: true })
    const lastMove = history[history.length - 1]
    if (lastMove) playMoveSound(lastMove.san)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, soundEnabled]) // Added soundEnabled to deps, kept position as trigger

  // --- Promotion dialog placement ---
  // Note: accessing document directly in render is not ideal for SSR, but this is a client component.
  // Ideally this should be in a useEffect or use a ref, but keeping logic similar for now with safe check.
  const squareWidth =
    typeof document !== 'undefined'
      ? (document.querySelector(`[data-square]`)?.getBoundingClientRect()
          ?.width ?? 0)
      : 0

  const getPromotionLeft = (to: Square) => {
    const col = to.charCodeAt(0) - 'a'.charCodeAt(0)
    return orientation === 'white' ? col * squareWidth : (7 - col) * squareWidth
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
                aria-label={`Promote to ${
                  p === 'q'
                    ? 'Queen'
                    : p === 'r'
                      ? 'Rook'
                      : p === 'b'
                        ? 'Bishop'
                        : 'Knight'
                }`}
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
          position,
          boardOrientation: orientation,
          allowDragging: readyForInput && !promotionMove,
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
          squareStyles: enableHighlights
            ? { ...optionSquares, ...additionalSquares }
            : {},
          arrows: enableArrows ? additionalArrows : [],
        }}
      />
    </>
  )
}
