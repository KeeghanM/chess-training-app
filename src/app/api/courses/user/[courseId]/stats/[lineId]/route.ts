import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function POST(
  request: Request,
  props: { params: Promise<{ courseId: string; lineId: number }> },
) {
  const params = await props.params
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)
  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { courseId, lineId } = params
  const { lineCorrect, revisionDate } = (await request.json()) as {
    lineCorrect: boolean
    revisionDate: Date
  }

  if (
    courseId === undefined ||
    lineId === undefined ||
    lineCorrect === undefined ||
    revisionDate === undefined
  )
    return errorResponse('Missing fields', 400)

  try {
    const line = await prisma.userLine.update({
      where: {
        id: parseInt(lineId.toString()),
        userId: user.id,
      },
      data: {
        lastTrained: new Date(),
        timesTrained: {
          increment: 1,
        },
        revisionDate,
        ...(lineCorrect
          ? {
              timesCorrect: {
                increment: 1,
              },
              currentStreak: {
                increment: 1,
              },
            }
          : {
              timesWrong: {
                increment: 1,
              },
              currentStreak: 0,
            }),
      },
    })

    const allLines = await prisma.userLine.findMany({
      where: {
        userCourseId: courseId,
        userId: user.id,
      },
    })

    await prisma.userCourse.update({
      where: {
        id: courseId,
        userId: user.id,
      },
      data: {
        lastTrained: new Date(),
        linesLearned: allLines.filter(
          (line) =>
            line.currentStreak > 4 && line.timesCorrect >= line.timesWrong,
        ).length,
        linesLearning: allLines.filter(
          (line) =>
            line.currentStreak <= 4 &&
            line.timesTrained > 0 &&
            line.timesCorrect >= line.timesWrong,
        ).length,
        linesHard: allLines.filter(
          (line) => line.timesWrong > line.timesCorrect,
        ).length,
        linesUnseen: allLines.filter((line) => line.timesTrained == 0).length,
      },
    })

    return successResponse('Stats updated', { line }, 200)
  } catch (e) {
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
