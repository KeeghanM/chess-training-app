'use client'

import Button from '@components/_elements/button'
import PrettyPrintLine from '@components/general/PrettyPrintLine'
import type { Line } from '@components/training/courses/create/parse/ParsePGNtoLineData'

import type { LineWithMoves } from './GroupEditor'

export default function LineDisplay(props: {
  line: LineWithMoves
  onChange: (line: LineWithMoves) => void
  onDelete: () => void
}) {
  const { line } = props
  const niceLine = {
    moves: line.moves.map((move) => ({
      notation: move.move,
      turn: '',
    })),
  } as Line

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this line? Remember, you'll need to save the course to make this change permanent.",
      )
    ) {
      props.onDelete()
    }
  }

  return (
    <div className="p-2 bg-card-dark grid grid-cols-[auto_1fr] gap-4 cursor-pointer rounded-lg shadow">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="w-fit"
        >
          <path
            fill="currentColor"
            d="M9 3h2v2H9zm4 0h2v2h-2zM9 7h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2z"
          />
        </svg>
      </div>
      <div className="space-y-4">
        {<PrettyPrintLine line={niceLine} />}
        <div className="flex gap-2 w-fit ml-auto">
          <select
            className="border border-bg rounded px-2 py-1 text-sm"
            value={line.trainable ? 1 : 0}
            onChange={(e) =>
              props.onChange({ ...line, trainable: e.target.value === '1' })
            }
          >
            <option value={1}>Trainable</option>
            <option value={0}>Not Trainable</option>
          </select>
          <div>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
