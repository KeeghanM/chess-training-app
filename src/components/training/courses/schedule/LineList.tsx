'use client'

import { useMemo, useState } from 'react'
import LineRow from './LineRow'
import type { ScheduleLine } from './LineRow'

type LineListProps = {
  userLines: ScheduleLine[]
  courseId: string
}
export default function LineList({ userLines, courseId }: LineListProps) {
  const [lines, setLines] = useState<ScheduleLine[]>(userLines)
  const minDate = useMemo(() => {
    return new Date(
      Math.min(
        ...lines.map((line) => line.revisionDate?.getTime() ?? Infinity),
      ),
    )
  }, [lines])

  return (
    <div className="flex flex-col gap-2">
      {lines
        .sort((a, b) => {
          if (a.revisionDate ?? b.revisionDate) {
            if ((a.revisionDate ?? Infinity) < (b.revisionDate ?? Infinity))
              return -1
            if ((a.revisionDate ?? Infinity) > (b.revisionDate ?? Infinity))
              return 1
          }
          if (a.line.group.sortOrder < b.line.group.sortOrder) return -1
          if (a.line.group.sortOrder > b.line.group.sortOrder) return 1
          if (a.line.sortOrder < b.line.sortOrder) return -1
          if (a.line.sortOrder > b.line.sortOrder) return 1
          return 0
        })
        .map((line) => (
          <LineRow
            key={line.id}
            line={line}
            courseId={courseId}
            minDate={minDate}
            onUpdate={(id) => {
              const newLines = lines.map((l) => {
                if (l.id === id) {
                  return {
                    ...l,
                    revisionDate: new Date(minDate.getTime() - 1000),
                  }
                }
                return l
              })
              setLines(newLines)
            }}
          />
        ))}
    </div>
  )
}
