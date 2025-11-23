import { useState } from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Comment, Move } from '@prisma/client'
import { Chess } from 'chess.js'
import posthog from 'posthog-js'
import { PrismaUserLine } from '~/app/training/courses/[userCourseId]/page'

import {
  PrismaUserCourse,
  TrainingFen,
  useCourseQueries,
} from '@hooks/use-course-queries'

type PrismaMove = Move & { comment?: Comment | null }

interface UseCourseStatsProps {
  userCourse: PrismaUserCourse
  userLines: PrismaUserLine[]
  userFens: TrainingFen[]
}

export function useCourseStats({
  userCourse,
  userLines,
  userFens,
}: UseCourseStatsProps) {
  const { user } = useKindeBrowserClient()
  const { uploadTrainedFens, updateLineStats } = useCourseQueries()

  const [lines, setLines] = useState<PrismaUserLine[]>(userLines)
  const [existingFens, setExistingFens] = useState<TrainingFen[]>(userFens)

  const calculateRevisionData = (line: PrismaUserLine, isCorrect: boolean) => {
    const now = new Date()
    const tenMinutes = 10 * 60 * 1000
    const oneHour = 6 * tenMinutes
    const fourHours = 4 * oneHour
    const oneDay = 24 * oneHour
    const threeDays = oneDay * 3
    const oneWeek = oneDay * 7
    const oneMonth = oneDay * 30

    const timeToAdd = isCorrect
      ? (() => {
          switch (line.currentStreak) {
            case 0:
              return oneHour
            case 1:
              return fourHours
            case 2:
              return oneDay
            case 3:
              return threeDays
            case 4:
              return oneWeek
            default:
              return oneMonth
          }
        })()
      : tenMinutes

    return new Date(now.getTime() + timeToAdd)
  }

  const processStats = (currentLine: PrismaUserLine, lineCorrect: boolean) => {
    if (!user || !currentLine) return null

    const revisionDate = calculateRevisionData(currentLine, lineCorrect)
    const optimisticallyUpdatedLine = { ...currentLine, revisionDate }
    const updatedLines = lines.map((line) =>
      line.id === optimisticallyUpdatedLine.id
        ? optimisticallyUpdatedLine
        : line,
    )
    setLines(updatedLines)

    updateLineStats.mutate(
      {
        userCourseId: userCourse.id,
        lineId: currentLine.id.toString(),
        lineCorrect,
        revisionDate,
      },
      {
        onError: (error) => {
          posthog.captureException(error)
        },
      },
    )

    return updatedLines
  }

  const processNewFens = (
    currentLineMoves: PrismaMove[],
    getComment: (id?: number) => string | undefined,
  ) => {
    if (!user) return

    const seenFens = (() => {
      const newGame = new Chess()
      const fens = [] as TrainingFen[]

      const commentId = currentLineMoves[0]?.comment?.id
      fens.push({ fen: newGame.fen(), commentId })

      currentLineMoves.forEach((move) => {
        newGame.move(move.move)
        fens.push({
          fen: newGame.fen(),
          commentId: move.comment?.id,
        })
      })
      return fens
    })()

    const fensToUpload = seenFens.filter((seenFen) => {
      const fenComment = getComment(seenFen.commentId)
      const existingFen = existingFens.find((existingFen) => {
        const existingFenComment = getComment(existingFen.commentId)
        return (
          existingFen.fen == seenFen.fen && existingFenComment == fenComment
        )
      })
      return !existingFen
    })

    const allSeenFens = [...existingFens, ...fensToUpload]
    setExistingFens(allSeenFens)

    if (fensToUpload.length > 0) {
      uploadTrainedFens.mutate(
        {
          userCourseId: userCourse.id,
          fens: fensToUpload,
        },
        {
          onError: (error) => {
            posthog.captureException(error)
          },
        },
      )
    }
  }

  return {
    lines,
    setLines,
    existingFens,
    setExistingFens,
    processStats,
    processNewFens,
  }
}
