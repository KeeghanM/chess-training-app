'use client'

import type { Move, PGN } from '@utils/build-pgn'

type PgnBrowserProps = {
  pgn: PGN
  moveSelected: (move: Move | undefined) => void
  currentMove?: Move | undefined
}

// TODO: Add arrow keys to navigate moves
export default function PgnBrowser({
  pgn,
  currentMove,
  moveSelected,
}: PgnBrowserProps) {
  const isCurrentMove = (move: Move) => {
    return (
      move.number == currentMove?.number &&
      move.colour == currentMove?.colour &&
      move.notation == currentMove?.notation &&
      move.lineId == currentMove?.lineId
    )
  }

  const Move = ({
    move,
    mainLine,
    ellipses,
  }: {
    move: Move
    mainLine?: boolean
    ellipses?: boolean
  }) => {
    return (
      <>
        <span
          onClick={() => {
            moveSelected(move)
          }}
          className={
            'cursor-pointer p-1' +
            (isCurrentMove(move) ? ' bg-primary' : ' hover:bg-primary/20')
          }
        >
          {move.colour && <span>{move.number}. </span>}
          {ellipses && <span>{move.number}... </span>}
          <span>
            {move.notation}
            {!mainLine && move.comment ? (
              <span className="italic text-xs ml-1">{move.comment}</span>
            ) : (
              ''
            )}
          </span>
        </span>
        {move.comment && mainLine && (
          <>
            {move.colour && (
              <div className="flex items-center justify-center">...</div>
            )}
            <span className="text-xs col-span-2 italic">{move.comment}</span>
            {move.colour && (
              <div className="flex items-center justify-center">...</div>
            )}
          </>
        )}
        {move.variations.map((variation) => (
          <Variation
            key={variation.map((m) => m.notation).join('')}
            moves={variation}
          />
        ))}
      </>
    )
  }

  const Variation = ({ moves }: { moves: Move[] }) => {
    return (
      <div className="col-span-2 flex flex-row items-center flex-wrap gap-0.5 text-black px-2 py-1 bg-bg-light/20  mt-2">
        {moves.map((move, i) => (
          <Move
            key={move.colour + move.notation + move.number}
            move={move}
            ellipses={i === 0 && !move.colour}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 auto-rows-min w-full text-sm h-full bg-card rounded-lg p-4 flex-1 max-h-[70vh] overflow-y-auto">
      {pgn.moves.map((move) => (
        <Move
          key={move.colour + move.notation + move.number}
          mainLine={true}
          move={move}
        />
      ))}
    </div>
  )
}
