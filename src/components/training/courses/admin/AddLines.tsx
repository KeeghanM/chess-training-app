'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCourseQueries } from '@hooks/use-course-queries'
import type { Course, Move } from '@prisma/client'
import posthog from 'posthog-js'
import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import trackEventOnClient from '@utils/trackEventOnClient'
import GroupSelector from '../create/GroupSelector'
import PgnToLinesForm from '../create/PgnToLinesForm'
import type { Line, Tags } from '../create/parse/ParsePGNtoLineData'

type FullCourseData = Course & {
  lines: { tags: Tags[]; moves: Move[] }[]
}

export default function AddLines(props: { courseId: string }) {
  const [step, setStep] = useState<'pgn' | 'groups' | 'error' | 'success'>(
    'pgn',
  )
  const [lines, setLines] = useState<Line[]>([])

  const { addLines, getCourseLines } = useCourseQueries()

  const uploadLines = async (group: string, lines: Line[]) => {
    try {
      const cleanLines = lines.map((line) => ({
        groupName: line.tags[group]!,
        colour: line.tags.Colour!,
        moves: line.moves,
      }))
      const allGroups = [...new Set(cleanLines.map((line) => line.groupName))]

      await addLines.mutateAsync({
        courseId: props.courseId,
        groupNames: allGroups,
        lines: cleanLines,
      })

      trackEventOnClient('course_lines_added', {})
      setStep('success')
    } catch (e) {
      posthog.captureException(e)
      setStep('error')
    }
  }

  const processLines = async (lines: Line[]) => {
    // Download existing data
    try {
      const existingCourseData = (await getCourseLines.mutateAsync({
        courseId: props.courseId,
      })) as FullCourseData

      // Now filter out any lines that already exist
      setLines(
        lines.filter(
          (line) =>
            !existingCourseData.lines.some(
              (existingLine) =>
                existingLine.moves.map((move) => move.move).join('') ===
                line.moves.map((move) => move.notation).join(''),
            ),
        ),
      )
      setStep('groups')
    } catch (e) {
      posthog.captureException(e)
      setStep('error')
    }
  }

  return (
    <div className="p-4 bg-slate-900">
      {step === 'error' && (
        <>
          <Heading className="text-red-500" as={'h2'}>
            Oops! Something went wrong
          </Heading>
          <p className="text-white">
            Please refresh and try again, or{' '}
            <StyledLink href="/contact/report-an-issue">
              report an issue
            </StyledLink>
            .
          </p>
        </>
      )}
      {step === 'pgn' && (
        <PgnToLinesForm
          finished={async (lines) => {
            await processLines(lines)
          }}
          back={() => {
            history.back()
          }}
        />
      )}
      {step === 'groups' && (
        <GroupSelector
          lines={lines}
          back={() => setStep('pgn')}
          finished={uploadLines}
        />
      )}
      {step === 'success' && (
        <div className="flex flex-col gap-2">
          <Heading className="text-green-500" as={'h2'}>
            Success!
          </Heading>
          <p className="text-white">
            Your new lines were successfully added to the course.
          </p>
          <div className="flex gap-2">
            <Link href={`/training/courses/`}>
              <Button variant="primary">Back to course list</Button>
            </Link>
            <Link href={`/training/courses/admin/${props.courseId}`}>
              <Button variant="warning">Back to admin page</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
