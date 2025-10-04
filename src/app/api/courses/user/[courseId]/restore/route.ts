import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function POST(
  request: Request,
  props: { params: Promise<{ courseId: string }> },
) {
  const params = await props.params
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { courseId } = params as { courseId: string }

  if (!courseId) return errorResponse('Missing required fields', 400)

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const userCourse = await prisma.userCourse.findFirst({
        where: {
          id: courseId,
        },
        include: {
          course: {
            include: {
              lines: true,
            },
          },
        },
      })

      if (!userCourse) throw new Error('Course not found')

      // update userCourse with line count
      await prisma.userCourse.update({
        where: {
          id: courseId,
        },
        data: {
          active: true,
          linesUnseen: userCourse.course.lines.length,
        },
      })

      // Create each new line and userLine
      await Promise.all(
        userCourse.course.lines.map(async (line) => {
          await prisma.userLine.create({
            data: {
              userId: user.id,
              userCourseId: userCourse.id,
              lineId: line.id,
            },
          })
        }),
      )

      return { userCourseId: userCourse.id }
    })

    return successResponse('Course restored', result, 200)
  } catch (e) {
    Sentry.captureException(e)
    return errorResponse('Internal server error', 500)
  }
}
