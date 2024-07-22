'use client'

import Link from 'next/link'

import { useState } from 'react'

import type { Course, Move } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import type { ResponseJson } from '~/app/api/responses'

import Button from '~/app/components/_elements/button'
import Heading from '~/app/components/_elements/heading'
import StyledLink from '~/app/components/_elements/styledLink'

import trackEventOnClient from '~/app/_util/trackEventOnClient'

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

  const uploadLines = async (group: string, lines: Line[]) => {
    try {
      const cleanLines = lines.map((line) => ({
        groupName: line.tags[group],
        colour: line.tags.Colour,
        moves: line.moves,
      }))
      const allGroups = [...new Set(cleanLines.map((line) => line.groupName))]

      const resp = await fetch('/api/courses/create/addLines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: props.courseId,
          groupNames: allGroups,
          lines: cleanLines,
        }),
      })

      const json = (await resp.json()) as ResponseJson

      if (json?.message != 'Lines added')
        throw new Error(json?.message ?? 'Unknown error')

      trackEventOnClient('course_lines_added', {})
      setStep('success')
    } catch (e) {
      Sentry.captureException(e)
      setStep('error')
    }
  }

  const processLines = async (lines: Line[]) => {
    // Download existing data
    const lineResp = await fetch('/api/courses/create/getLines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId: props.courseId }),
    })
    const lineJson = (await lineResp.json()) as ResponseJson

    if (lineJson?.message != 'Success')
      throw new Error(lineJson?.message ?? 'Unknown error')

    const existingCourseData = lineJson.data!.course as FullCourseData

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
  }

  return (
    <div className="p-4 bg-slate-900">
      {step === 'error' && (
        <>
          <Heading color="text-red-500" as={'h2'}>
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
          <Heading color="text-green-500" as={'h2'}>
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
