import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { successResponse } from '@utils/server-responses'

export async function POST(
  _request: Request,
  props: { params: Promise<{ courseId: string }> },
) {
  return apiWrapper(async (_req, { user }) => {
    const params = await props.params
    const { courseId } = params

    if (!courseId) throw new BadRequest('Missing courseId')

    await prisma.userLine.updateMany({
      where: {
        userId: user.id,
        userCourseId: courseId,
      },
      data: {
        revisionDate: new Date(),
      },
    })

    return successResponse('Lines updated', {})
  })(_request)
}
