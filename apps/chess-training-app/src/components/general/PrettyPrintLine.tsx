import type { Line } from '@components/training/courses/create/parse/ParsePGNtoLineData'

export default function PrettyPrintLine({ line }: { line: Line | string }) {
  // Return the moves, with the move number bolded
  // and each move "set" (i.e one white one black) wrapped in a <p> tag
  // each move, and move number, needs separating by a space
  if (typeof line === 'string') {
    return <span>{line}</span>
  }

  const movePairs: { whiteMove: string; blackMove: string }[] = []
  for (let i = 0; i < line.moves.length; i += 2) {
    movePairs.push({
      whiteMove: line.moves[i]?.notation ?? '',
      blackMove: line.moves[i + 1]?.notation ?? '',
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {movePairs.map((pair, index) => (
        <div
          className="flex items-center gap-1"
          key={pair.blackMove + pair.whiteMove + index}
        >
          <span className="font-bold">{index + 1}.</span>
          {pair.whiteMove && <span>{pair.whiteMove}</span>}
          {pair.blackMove && <span>{pair.blackMove}</span>}
        </div>
      ))}
    </div>
  )
}
