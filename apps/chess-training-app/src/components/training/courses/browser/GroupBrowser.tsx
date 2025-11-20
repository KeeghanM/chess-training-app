'use client'

import { useEffect, useState } from 'react'

import { Chess } from 'chess.js'
import type { Arrow } from 'react-chessboard'
import getArrows from '~/utils/get-arrows'

import type { Move } from '@utils/build-pgn'
import buildPgn from '@utils/build-pgn'

import ChessBoard from '../../ChessBoard'
import BoardContainer from '../../shared/BoardContainer'
import type { UserLineWithData } from './CourseBrowser'
import PgnBrowser from './PgnBrowser'

export default function GroupBrowser(props: { lines: UserLineWithData[] }) {
  const pgn = buildPgn(
    props.lines.map((line) =>
      line.line.moves.map((move) => {
        return {
          notation: move.move,
          number: move.moveNumber,
          colour: move.colour,
          comment: move.comment?.comment,
          arrows: move.arrows,
          lineId: line.id,
        }
      }),
    ),
  )

  const [game, setGame] = useState(new Chess())
  const [position, setPosition] = useState(game.fen())
  const [orientation, setOrientation] = useState<'white' | 'black'>('white')
  const [soundEnabled] = useState(true)
  const [currentMove, setCurrentMove] = useState<Move | undefined>()
  const [arrows, setArrows] = useState<Arrow[]>([])
  const [highlightSquares, setHighlightSquares] = useState<
    Record<string, { backgroundColor: string }>
  >({})

  useEffect(() => {
    if (!currentMove) {
      setArrows([])
      setHighlightSquares({})
      return
    }
    const newGame = new Chess()
    const line = props.lines.find((line) => line.id === currentMove.lineId)
    if (!line) return

    for (const move of line.line.moves) {
      newGame.move(move.move)
      if (
        move.move === currentMove.notation &&
        move.colour == currentMove.colour &&
        move.moveNumber === currentMove.number
      )
        break
    }

    const lastMove = newGame.history({ verbose: true })[
      newGame.history().length - 1
    ]!

    setHighlightSquares({
      [lastMove.to]: { backgroundColor: 'rgba(126,34,206, 0.3)' },
      [lastMove.from]: { backgroundColor: 'rgba(126,34,206, 0.3)' },
    })
    setPosition(newGame.fen())
    setGame(newGame)

    if (currentMove.arrows) {
      setArrows(getArrows(currentMove.arrows))
    } else {
      setArrows([])
    }
  }, [currentMove])

  useEffect(() => {
    setCurrentMove(undefined)
    setGame(new Chess())
    setPosition(new Chess().fen())
    if (props.lines[0]) {
      setOrientation(
        props.lines[0].line.colour.toLowerCase() as 'white' | 'black',
      )
    }
  }, [props.lines])

  return (
    <>
      <div className="relative">
        <BoardContainer>
          <ChessBoard
            game={game}
            position={position}
            orientation={orientation}
            readyForInput={false}
            additionalSquares={highlightSquares}
            additionalArrows={arrows}
            enableArrows={true}
            enableHighlights={true}
            soundEnabled={soundEnabled}
            moveMade={null}
          />
        </BoardContainer>
      </div>
      <div className="min-w-1/3 md:max-w-1/3 p-4 bg-card-light/20 rounded-lg h-fit my-auto">
        <PgnBrowser
          pgn={pgn}
          moveSelected={setCurrentMove}
          currentMove={currentMove}
        />
      </div>
    </>
  )
}
