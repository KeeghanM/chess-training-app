'use client';

import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Badge } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';
import { useEffect, useState } from 'react';

import { SortableItem } from '@/app/_util/sortable-item';
import { Heading } from '@/app/components/_elements/heading';

export function ExistingBadges({ badges }: { badges: Badge[] }) {
  const [existingBadges, setExistingBadges] = useState(badges);
  const [items, setItems] = useState(existingBadges.map((badge) => badge.name));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const newOrderBadges = items.map((name) => {
      const newBadge = existingBadges.find((badge) => badge.name === name);
      if (!newBadge) throw new Error('Badge not found');
      return newBadge;
    });
    setExistingBadges(newOrderBadges);
  }, [items]);

  const categories = Array.from(
    new Set(existingBadges.map((badge) => badge.category)),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      setItems((items) => {
        return arrayMove(items, oldIndex, newIndex);
      });

      try {
        // update sort order in database
        await fetch('/api/admin/badges', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: active.id,
            sort: newIndex,
          }),
        });
        await fetch('/api/admin/badges', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: over.id,
            sort: oldIndex,
          }),
        });
      } catch (e) {
        Sentry.captureException(e);
      }
    }
  };

  return (
    <>
      <Heading as="h2">Existing badges</Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          {categories.map((category) => {
            const items = existingBadges
              .filter((badge) => badge.category === category)
              .map((badge) => badge.name);
            return (
              <div key={category}>
                <Heading as="h3">{category}</Heading>
                <SortableContext
                  id={category}
                  items={items}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col gap-1">
                    {existingBadges
                      .filter((badge) => badge.category === category)
                      .map((badge) => (
                        <SortableItem key={badge.name} id={badge.name}>
                          <p className="bg-gray-200 p-1">
                            <strong>{badge.name}</strong> - {badge.description}
                          </p>
                        </SortableItem>
                      ))}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </DndContext>
      </div>
    </>
  );
}
