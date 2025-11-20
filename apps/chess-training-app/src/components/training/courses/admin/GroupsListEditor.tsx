'use client'

import { useState } from 'react'

import type { DragEndEvent } from '@dnd-kit/core'
import {
  DndContext,
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
import type { Group } from '@prisma/client'

import Heading from '@components/_elements/heading'
import SortableItem from '@components/general/sortable-item'

import type { LineWithMoves } from './GroupEditor'
import GroupEditor from './GroupEditor'

export default function GroupsListEditor(props: {
  groups: Group[]
  setGroups: (groups: Group[]) => void
  lines: LineWithMoves[]
  setLines: (lines: LineWithMoves[]) => void
  addIdToDelete: (id: number) => void
}) {
  const { groups, setGroups, lines, setLines, addIdToDelete } = props
  const [parent] = useAutoAnimate()
  const [groupListItems, setGroupListItems] = useState(
    groups.map((group) => group.id),
  )
  const [open, setOpen] = useState(false)

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
      const oldIndex = groupListItems.indexOf(active.id as string)
      const newIndex = groupListItems.indexOf(over.id as string)
      setGroupListItems((items) => {
        return arrayMove(items, oldIndex, newIndex)
      })
      const newGroups = arrayMove(groups, oldIndex, newIndex)
      newGroups.forEach((group, i) => {
        group.sortOrder = i
      })
      setGroups(newGroups)
    }
  }

  return (
    <>
      <Heading as="h2">
        <span
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer hover:text-orange-500"
        >
          Groups{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            className={
              (open ? '-rotate-180' : '-rotate-90') +
              ' transition-all duration-200'
            }
          >
            <path
              fill="currentColor"
              d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z"
            />
          </svg>
        </span>
      </Heading>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={groupListItems}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2" ref={parent}>
            {open &&
              groups
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((group) => (
                  <SortableItem id={group.id} key={group.id}>
                    <GroupEditor
                      group={group}
                      lines={lines.filter((line) => line.groupId == group.id)}
                      setGroup={(group) => {
                        setGroups(
                          groups.map((g) => (g.id === group.id ? group : g)),
                        )
                      }}
                      setLines={(newLines) => {
                        setLines(
                          lines.map(
                            (line) =>
                              newLines.find((l) => l.id === line.id) ?? line,
                          ),
                        )
                      }}
                      addIdToDelete={addIdToDelete}
                    />
                  </SortableItem>
                ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  )
}
