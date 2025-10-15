import { Chess } from 'chess.js'

interface PgnNavigatorProps {
  game: Chess
  puzzleFinished: boolean
  onMoveClick?: (moveIndex: number) => void
}

export default function PgnNavigator({
  game,
  puzzleFinished,
  onMoveClick,
}: PgnNavigatorProps) {
  const moves = game.history().map((move, index) => {
    const moveNumber =
      Math.floor(index / 2) + 1 + (game.moveNumber() - game.history().length)
    const moveColour = game.history({ verbose: true })[index]!.color
    const FlexText = () => (
      <p>
        {(moveColour == 'w' || (moveColour == 'b' && index == 0)) && (
          <span className="font-bold">
            {moveNumber - (moveColour == 'b' && index == 0 ? 1 : 0)}.
            {moveColour == 'b' && index == 0 && '..'}
          </span>
        )}{' '}
        <span>{move}</span>
      </p>
    )

    if (puzzleFinished && onMoveClick) {
      return (
        <button
          key={'btn' + moveNumber.toString() + move + moveColour}
          className="h-max max-h-fit bg-none px-1 py-1 hover:bg-card-dark/50 rounded"
          onClick={() => onMoveClick(index)}
        >
          <FlexText />
        </button>
      )
    } else {
      return (
        <div
          key={moveNumber.toString() + move + moveColour}
          className="px-1 py-1 text-black"
        >
          <FlexText />
        </div>
      )
    }
  })

  return (
    <div className="flex h-full flex-wrap content-start gap-1 min-h-[200px] mt-4 text-lg">
      {moves.map((item) => item)}
    </div>
  )
}
