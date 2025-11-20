import { MarkLineForReviewSchema } from '@schemas/courses-mgmt'

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

    const { lineId, minDate } = await validateBody(req, MarkLineForReviewSchema)

    if (!courseId) throw new BadRequest('Missing courseId')

    await prisma.userLine.update({
      where: {
        userId: user.id,
        id: lineId,
      },
      data: {
        revisionDate: minDate,
      },
    })

    return successResponse('Lines updated', {})
  })(request)
}
