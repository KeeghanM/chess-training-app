import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, NotFound } from '@utils/errors'
import { successResponse } from '@utils/server-responses'

export async function POST(
  _request: Request,
  props: { params: Promise<{ courseId: string }> },
) {
  return apiWrapper(async (_req, { user }) => {
    const params = await props.params
    const { courseId } = params

    if (!courseId) throw new BadRequest('Missing required fields')

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

      if (!userCourse) throw new NotFound('Course not found')

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

    return successResponse('Course restored', result)
  })(_request)
}
