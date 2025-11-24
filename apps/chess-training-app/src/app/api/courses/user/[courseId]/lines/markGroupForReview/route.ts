import { MarkGroupForReviewSchema } from '@schemas/courses-mgmt'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export async function POST(
  request: Request,
  props: { params: Promise<{ courseId: string }> },
) {
  return apiWrapper(async (req, { user }) => {
    const params = await props.params
    const { courseId } = params

    const { groupId } = await validateBody(req, MarkGroupForReviewSchema)

    if (!courseId) throw new BadRequest('Missing courseId')

    const minDate = await prisma.userLine.findFirst({
      where: {
        userId: user.id,
        userCourseId: courseId,
        revisionDate: { not: null },
      },
      orderBy: {
        revisionDate: 'asc',
      },
      select: {
        revisionDate: true,
      },
    })

    // Subtract 1 second from the minDate to ensure that the line is marked for review
    const adjustedDate = minDate?.revisionDate
      ? new Date(minDate.revisionDate.getTime() - 1000)
      : new Date()

    await prisma.userLine.updateMany({
      where: {
        userId: user.id,
        userCourseId: courseId,
        line: { groupId: groupId },
      },
      data: {
        revisionDate: adjustedDate,
      },
    })

    return successResponse('Lines updated', {})
  })(request)
}
