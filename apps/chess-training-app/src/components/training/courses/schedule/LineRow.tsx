'use client'

import { useState } from 'react'

import type { Group, Line, Move, UserLine } from '@prisma/client'

import Button from '@components/_elements/button'
import PrettyPrintLine from '@components/general/PrettyPrintLine'
import Spinner from '@components/general/Spinner'
import type { Line as NiceLine } from '@components/training/courses/create/parse/ParsePGNtoLineData'

import { useCourseQueries } from '@hooks/use-course-queries'

export type ScheduleLine = UserLine & {
  line: Line & {
    group: Group
    moves: Move[]
  }
}

export default function LineRow({
  line,
  courseId,
  minDate,
  onUpdate,
}: {
  line: ScheduleLine
  courseId: string
  onUpdate: (id: number) => void
  minDate: Date
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { markLineForReview } = useCourseQueries()

  const markForReview = async (lineId: number) => {
    setLoading(true)
    setError(null)
    try {
      await markLineForReview.mutateAsync({
        courseId,
        lineId: lineId.toString(),
        minDate: minDate.toISOString(),
      })
      onUpdate(lineId)
    } catch (e) {
      if (e instanceof Error) setError(e.message)
      else setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const niceLine = {
    moves: line.line.moves.map((move) => ({
      notation: move.move,
      turn: '',
    })),
  } as NiceLine

  const status: 'unseen' | 'learning' | 'learned' | 'hard' = (() => {
    if (line.timesTrained === 0) return 'unseen'
    if (line.currentStreak > 4 && line.timesCorrect >= line.timesWrong)
      return 'learned'
    if (
      line.currentStreak <= 4 &&
      line.timesTrained > 0 &&
      line.timesCorrect >= line.timesWrong
    )
      return 'learning'
    if (line.timesWrong > line.timesCorrect) return 'hard'
    return 'unseen'
  })()

  return (
    <div
      className={
        'border-4 bg-card rounded-lg p-4 flex flex-col md:flex-row gap-2 justify-between shadow ' +
        (status === 'unseen' ? 'border-black' : '') +
        (status === 'learning' ? 'border-blue-600' : '') +
        (status === 'learned' ? 'border-green-500' : '') +
        (status === 'hard' ? 'border-red-500' : '')
      }
    >
      <div className="px-2">
        <h3 className="text-sm border-b w-full mb-2 italic">
          Group: {line.line.group.groupName}
        </h3>
        <div className="text-sm">
          <PrettyPrintLine line={niceLine} />
        </div>
      </div>
      <div className="justify-center flex flex-col gap-1 items-center border-t pt-2 mx-2 md:border-t-0 md:border-l md:pl-4 md:ml-0 md:min-w-fit">
        <div>
          <p>Review Date:</p>
          <p className="text-bg-light italic">
            {line.revisionDate
              ? line.revisionDate.toLocaleTimeString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : 'Not yet seen'}
          </p>
        </div>
        <div>
          <Button
            variant="primary"
            onClick={() => markForReview(line.id)}
            disabled={loading === true || error !== null}
          >
            {loading ? (
              <>
                Marking <Spinner />
              </>
            ) : (
              'Mark for Review'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
