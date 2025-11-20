import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { successResponse } from '@utils/server-responses'

export const GET = apiWrapper(async (_request, { user }) => {
  const courses = await prisma.userCourse.findMany({
    where: {
      userId: user.id,
      active: false,
    },
    orderBy: { lastTrained: 'desc' },
  })

  return successResponse('Archived courses retrieved', { courses })
})
