'use client'

import { useState } from 'react'

import { useCourseQueries } from '@hooks/use-course-queries'
import type { Group, Line, Move, UserLine } from '@prisma/client'

import Button from '~/app/components/_elements/button'
import PrettyPrintLine from '~/app/components/general/PrettyPrintLine'
import Spinner from '~/app/components/general/Spinner'
import type { Line as NiceLine } from '~/app/components/training/courses/create/parse/ParsePGNtoLineData'

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
        'border-4 bg-purple-700 bg-opacity-20 text-black  py-2 flex flex-col md:flex-row gap-2 justify-between ' +
        (status === 'unseen' ? 'border-gray-300' : '') +
        (status === 'learning' ? 'border-blue-600' : '') +
        (status === 'learned' ? 'border-green-500' : '') +
        (status === 'hard' ? 'border-red-500' : '')
      }
    >
      <div className="px-2">
        <h3 className="text-sm border-b w-full mb-2 text-orange-500 italic">
          {line.line.group.groupName}
        </h3>
        <div className="text-sm">
          <PrettyPrintLine line={niceLine} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center border-t pt-2 mx-2 md:border-t-0 md:border-l md:pl-4 md:ml-0 md:min-w-fit">
        <div>
          {line.revisionDate?.toLocaleTimeString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }) ?? 'Not yet seen'}
        </div>
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
  )
}
