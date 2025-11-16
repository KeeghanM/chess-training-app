'use client'

import { useEffect, useState } from 'react'

import type { DragEndEvent } from '@dnd-kit/core'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { Badge } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import posthog from 'posthog-js'

import Heading from '@components/_elements/heading'

import SortableItem from '@utils/SortableItem'

export default function ExistingBadges(props: { existingBadges: Badge[] }) {
  const queryClient = useQueryClient()
  const [existingBadges, setExistingBadges] = useState(props.existingBadges)
  const [items, setItems] = useState(existingBadges.map((badge) => badge.name))

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const updateBadgeOrder = useMutation({
    mutationFn: async ({ name, sort }: { name: string; sort: number }) => {
      const response = await fetch('/api/admin/badges', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, sort }),
      })
      if (!response.ok) {
        throw new Error('Failed to update badge order')
      }
      return response.json()
    },
    onError: (error) => {
      posthog.captureException(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] })
    },
  })

  useEffect(() => {
    const newOrderBadges = items.map((name) => {
      return existingBadges.find((badge) => badge.name === name)!
    })
    setExistingBadges(newOrderBadges)
  }, [items])

  const categories = Array.from(
    new Set(existingBadges.map((badge) => badge.category)),
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string)
      const newIndex = items.indexOf(over.id as string)
      setItems((items) => {
        return arrayMove(items, oldIndex, newIndex)
      })

      await updateBadgeOrder.mutateAsync({
        name: active.id as string,
        sort: newIndex,
      })
      await updateBadgeOrder.mutateAsync({
        name: over.id as string,
        sort: oldIndex,
      })
    }
  }

  return (
    <>
      <Heading as={'h2'}>Existing badges</Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {categories.map((category) => {
            const items = existingBadges
              .filter((badge) => badge.category === category)
              .map((badge) => badge.name)
            return (
              <div key={category}>
                <Heading as={'h3'}>{category}</Heading>
                <SortableContext
                  items={items}
                  id={category}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col gap-1">
                    {existingBadges
                      .filter((badge) => badge.category === category)
                      .map((badge) => (
                        <SortableItem key={badge.name} id={badge.name}>
                          <p className="bg-gray-200 p-1" key={badge.name}>
                            <strong>{badge.name}</strong> - {badge.description}
                          </p>
                        </SortableItem>
                      ))}
                  </div>
                </SortableContext>
              </div>
            )
          })}
        </DndContext>
      </div>
    </>
  )
}
