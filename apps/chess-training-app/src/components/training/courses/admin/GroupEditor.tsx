'use client'

import { useMemo, useState } from 'react'

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { Group, Line, Move } from '@prisma/client'

import SortableItem from '@components/general/sortable-item'

import LineDisplay from './LineDisplay'

export type LineWithMoves = Line & { moves: Move[] }

export default function GroupEditor(props: {
  group: Group
  lines: LineWithMoves[]
  setGroup: (group: Group) => void
  setLines: (lines: LineWithMoves[]) => void
  addIdToDelete: (newIds: number) => void
}) {
  const { group, lines, setGroup, setLines, addIdToDelete } = props
  const [parent] = useAutoAnimate()
  const [open, setOpen] = useState(false)
  const [hiddenLineIds, setHiddenLineIds] = useState<number[]>([])
  const [lineItems, setLineItems] = useState(lines.map((line) => line.id))
  const linesToDisplay = useMemo(() => {
    return lines.filter((line) => !hiddenLineIds.includes(line.id))
  }, [lines, hiddenLineIds])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 15,
      },
    }),
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      const oldIndex = lineItems.indexOf(active.id as number)
      const newIndex = lineItems.indexOf(over.id as number)
      setLineItems((items) => {
        return arrayMove(items, oldIndex, newIndex)
      })

      // Update the sortOrder of the lines
      const newLines = arrayMove(lines, oldIndex, newIndex)
      newLines.forEach((line, i) => {
        line.sortOrder = i
      })
      setLines(newLines)
    }
  }

  return (
    <div
      key={group.id}
      ref={parent}
      className="flex flex-col gap-4 bg-card-light text-black rounded-lg p-2 "
    >
      <div className="flex items-center gap-1 p-1">
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
        <p className="font-bold w-10">{lines.length}x</p>
        <input
          className="w-full border-b text-bg-light border-bg px-4 py-2 bg-[rgba(255,255,255,0.2)] font-bold"
          value={group.groupName}
          onChange={(e) => setGroup({ ...group, groupName: e.target.value })}
          type="text"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          onClick={() => setOpen(!open)}
          className={
            (open ? '-rotate-180' : '-rotate-90') +
            ' transition-all duration-200 cursor-pointer hover:text-orange-500 z-10'
          }
        >
          <path
            fill="currentColor"
            d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z"
          />
        </svg>
      </div>
      {open && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={lineItems}
            strategy={verticalListSortingStrategy}
          >
            {linesToDisplay.map((line) => (
              <SortableItem id={line.id} key={line.id}>
                <LineDisplay
                  line={line}
                  onChange={(line) => {
                    setLines(lines.map((l) => (l.id === line.id ? line : l)))
                  }}
                  onDelete={() => {
                    setLines(lines.filter((l) => l.id !== line.id))
                    addIdToDelete(line.id)
                    setHiddenLineIds([...hiddenLineIds, line.id])
                  }}
                />
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
