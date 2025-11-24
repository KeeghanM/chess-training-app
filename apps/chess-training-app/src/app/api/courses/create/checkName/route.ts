import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(async (request) => {
  const { name } = (await request.json()) as { name: string }
  if (!name) throw new BadRequest('Missing name')

  const course = await prisma.course.findFirst({
    where: {
      courseName: name,
    },
  })

  if (!course)
    return successResponse('Course name is available', {
      isAvailable: true,
    } as Record<string, unknown>)

  return successResponse('Course name is not available', {
    courseId: course.id,
    isAvailable: false,
  } as Record<string, unknown>)
})
