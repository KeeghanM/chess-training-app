'use client'

import { useEffect, useRef, useState } from 'react'
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
  const divRef = useRef(null)
  const game = props.game

  // Board State
  const [showPromotionDialog, setShowPromotionDialog] = useState(false)
  const [startSquare, setStartSquare] = useState<Square>()
  const [clickedPiece, setClickedPiece] = useState<Piece>()
  const [moveTo, setMoveTo] = useState<Square | undefined>()
  const [optionSquares, setOptionSquares] = useState<
    Record<string, React.CSSProperties>
  >({})
  const [arrows] = useState<Arrow[]>([])

  // Setup SFX
  const [checkSound] = useSound('/sfx/check.mp3')
  const [captureSound] = useSound('/sfx/capture.mp3')
  const [promotionSound] = useSound('/sfx/promote.mp3')
  const [castleSound] = useSound('/sfx/castle.mp3')
  const [moveSound] = useSound('/sfx/move.mp3')

  const playMoveSound = (move: string) => {
    if (!props.soundEnabled) return

    if (move.includes('+')) {
      checkSound()
    } else if (move.includes('x')) {
      captureSound()
    } else if (move.includes('=')) {
      promotionSound()
    } else if (move.includes('O')) {
      castleSound()
    } else {
      moveSound()
    }
  }

  const checkPromotion = (
    sourceSquare: Square,
    targetSquare: Square,
    piece: string,
  ) => {
    // CHECK IF LAST POSITION, BASED ON SOURCE SQUARE, IS A PAWN
    // This works because we haven't actually made the move yet
    const lastMovePiece = game.get(sourceSquare)
    const sourceCol = sourceSquare.split('')[0]
    const targetCol = targetSquare.split('')[0]
    const targetRank = targetSquare.split('')[1]
    const pieceString = piece as unknown as string // Hacky cause Chess.js types are wrong
    const pieceColor = pieceString.split('')[0]
    const pieceType = pieceString.split('')[1]

    if (
      lastMovePiece?.type === 'p' &&
      ((pieceColor == 'w' && targetRank === '8' && sourceCol == targetCol) ||
        (pieceColor == 'b' && targetRank === '1' && sourceCol == targetCol))
    ) {
      return pieceType?.toLowerCase()
    }
    return undefined
  }

  const handlePieceDrop = (
    sourceSquare: Square,
    targetSquare: Square | null,
    piece: string,
    promotion?: boolean,
  ) => {
    // Handle drop off board
    if (!targetSquare) {
      setStartSquare(undefined)
      setClickedPiece(undefined)
      setMoveTo(undefined)
      setShowPromotionDialog(false)
      setOptionSquares({})
      return false
    }

    // Make the move to see if it's legal
    const playerMove = (() => {
      try {
        const from = sourceSquare ?? startSquare
        const to = targetSquare ?? moveTo
        const promotionPiece = promotion
          ? piece.split('')[1]!.toLowerCase()
          : checkPromotion(from, to, piece)

        const move = game.move({
          from,
          to,
          promotion: promotionPiece,
        })
        return move
        // eslint-disable-next-line
      } catch (e) {
        return null
      }
    })()

    if (playerMove === null) return false // invalid move

    setStartSquare(undefined)
    setClickedPiece(undefined)
    setMoveTo(undefined)
    setShowPromotionDialog(false)
    setOptionSquares({})
    if (props.moveMade) props.moveMade(playerMove)
    return true
  }

  const handleSquareClick = (clickedSquare: Square) => {
    if (!props.readyForInput) return

    const piece = game.get(clickedSquare)
    // if we click the same square twice
    // then unselect the piece
    if (startSquare === clickedSquare) {
      setStartSquare(undefined)
      setClickedPiece(undefined)
      return
    }

    // if we click our own piece
    // then set the start square and clicked piece
    // (highlighting is handled by a useEffect)
    if (piece?.color === game.turn()) {
      setStartSquare(clickedSquare)
      setClickedPiece(piece)
      return
    }

    // If this is our second click, we check if we need to show the promotion dialog
    if (startSquare && clickedPiece) {
      const availableMove = game
        .moves({ square: startSquare, verbose: true })
        .find((move) => move.to === clickedSquare)
      if (!availableMove) return

      // Check if this is a promotion move
      if (
        (clickedPiece.color === 'w' &&
          clickedPiece.type === 'p' &&
          clickedSquare[1] === '8') ||
        (clickedPiece.color === 'b' &&
          clickedPiece.type === 'p' &&
          clickedSquare[1] === '1')
      ) {
        setShowPromotionDialog(true)
        setMoveTo(clickedSquare)
        return
      }

      // Otherwise, make the move
      handlePieceDrop(
        startSquare,
        clickedSquare,
        clickedPiece.type + clickedPiece.color,
      )
      return
    }
  }

  const handlePromotionSelection = (piece: string) => {
    if (!piece || !moveTo) return false

    setShowPromotionDialog(false)
    handlePieceDrop(startSquare!, moveTo, piece, true)
    return true
  }

  useEffect(() => {
    if (!game || !startSquare || !clickedPiece) {
      setOptionSquares({})
      return
    }
    const validMoves = game?.moves({ square: startSquare, verbose: true }) || []
    const newOptions: Record<string, React.CSSProperties> = {}
    // Highlight the start square
    newOptions[startSquare] = {
      background: 'rgba(255, 255, 0, 0.4)',
    }

    if (validMoves.length === 0) {
      setOptionSquares(newOptions)
      return
    }
    // Highlight the valid moves
    validMoves.map((move) => {
      newOptions[move.to] = {
        background:
          game?.get(move.to) &&
          game?.get(move.to)?.color !== game?.get(startSquare)?.color
            ? 'radial-gradient(circle, transparent 50%,  rgba(0, 0, 0, 0.2) 51%,  rgba(0, 0, 0, 0.2) 65%,transparent 66%)'
            : 'radial-gradient(circle, rgba(0,0,0,.2) 20%, transparent 22%)',
        borderRadius: '50%',
        cursor: 'pointer',
      }
      return move
    })
    setOptionSquares(newOptions)
  }, [startSquare, clickedPiece])

  useEffect(() => {
    if (!props.soundEnabled) return
    const lastMove = game?.history({ verbose: true }).slice(-1)[0]
    if (!lastMove) return
    playMoveSound(lastMove.san)
  }, [props.position])

  useEffect(() => {
    if (!divRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLDivElement
        el.style.width = `${el.offsetHeight}px`

        if (el.offsetHeight > el.offsetWidth) {
          el.style.maxHeight = `${el.offsetWidth}px`
        }
      }
    })

    resizeObserver.observe(divRef.current)
  }, [divRef])

  // Calculate promotion square position for custom dialog
  const squareWidth =
    typeof document !== 'undefined'
      ? (document.querySelector(`[data-square]`)?.getBoundingClientRect()
          ?.width ?? 0)
      : 0

  const getPromotionLeft = (targetSquare: string) => {
    const col = targetSquare.charCodeAt(0) - 'a'.charCodeAt(0)
    return props.orientation === 'white'
      ? col * squareWidth
      : (7 - col) * squareWidth
  }

  return (
    <div
      ref={divRef}
      className="relative resize-y overflow-auto p-4 bg-card-light/20 rounded-lg min-h-[300px]"
    >
      {/* Promotion Dialog Overlay */}
      {showPromotionDialog && moveTo && (
        <>
          <div
            onClick={() => setShowPromotionDialog(false)}
            onContextMenu={(e) => {
              e.preventDefault()
              setShowPromotionDialog(false)
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: clickedPiece?.color === 'w' ? 0 : undefined,
              bottom: clickedPiece?.color === 'b' ? 0 : undefined,
              left: getPromotionLeft(moveTo),
              backgroundColor: 'white',
              width: squareWidth,
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
            }}
          >
            {(['q', 'r', 'n', 'b'] as const).map((piece) => (
              <button
                key={piece}
                onClick={() => {
                  handlePromotionSelection(piece + (clickedPiece?.color ?? 'w'))
                }}
                onContextMenu={(e) => {
                  e.preventDefault()
                }}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '3rem',
                }}
              >
                {defaultPieces[`w${piece.toUpperCase()}`]!()}
              </button>
            ))}
          </div>
        </>
      )}
      <Chessboard
        options={{
          position: props.position,
          boardOrientation: props.orientation,
          allowDragging: props.readyForInput,
          onPieceDrop: ({ sourceSquare, targetSquare }) =>
            handlePieceDrop(
              sourceSquare as Square,
              targetSquare as Square,
              '',
              false,
            ),
          onSquareClick: ({ square }) => handleSquareClick(square as Square),
          onSquareRightClick: () => {
            setStartSquare(undefined)
            setClickedPiece(undefined)
          },
          onPieceDrag: ({ square }) => {
            if (!startSquare) {
              setStartSquare(square as Square)
              const piece = game.get(square as Square)
              if (piece) setClickedPiece(piece)
            }
          },
          boardStyle: {
            marginInline: 'auto',
          },
          squareStyles: props.enableHighlights
            ? { ...optionSquares, ...props.additionalSquares }
            : {},
          arrows: props.enableArrows
            ? [...props.additionalArrows, ...arrows]
            : [],
        }}
      />
    </div>
  )
}
