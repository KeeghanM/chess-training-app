import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { successResponse } from '@utils/server-responses'

export const GET = apiWrapper(async (_request, { user, isPremium }) => {
  const courseCount = await prisma.userCourse.count({
    where: {
      userId: user.id,
      active: false,
    },
  })

  const maxCourses = Number(process.env.NEXT_PUBLIC_MAX_COURSES) || 10
  const canCreate = isPremium || courseCount < maxCourses

  return successResponse('Check complete', { canCreate })
})
