import { UpdateCourseStatsSchema } from '@schemas/courses-mgmt'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export async function POST(
  request: Request,
  props: { params: Promise<{ courseId: string; lineId: string }> },
) {
  return apiWrapper(async (req, { user }) => {
    const params = await props.params
    const { courseId, lineId } = params

    const { lineCorrect, revisionDate } = await validateBody(
      req,
      UpdateCourseStatsSchema,
    )

    if (!courseId || !lineId) throw new BadRequest('Missing fields')

    const line = await prisma.userLine.update({
      where: {
        id: parseInt(lineId),
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

    return successResponse('Stats updated', { line })
  })(request)
}
