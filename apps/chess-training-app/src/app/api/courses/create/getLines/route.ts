import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, NotFound } from '@utils/errors'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(async (request, { user }) => {
  const { courseId } = (await request.json()) as {
    courseId: string
  }

  if (!courseId) throw new BadRequest('Missing required fields')

  const course = await prisma.course.findFirst({
    where: { id: courseId, createdBy: user.id },
    include: { groups: true, lines: { include: { moves: true } } },
  })

  if (!course) throw new NotFound('Course not found')

  return successResponse('Success', { course } as Record<string, unknown>)
})
