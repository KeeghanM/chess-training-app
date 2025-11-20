import { apiWrapper } from '~/utils/api-wrapper'
import { successResponse } from '~/utils/server-responses'

import { prisma } from '@server/db'

export const GET = apiWrapper(async (_request, { user }) => {
  const courses = await prisma.userCourse.findMany({
    where: {
      userId: user.id,
      active: true,
    },
    include: {
      lines: true,
    },
    orderBy: { lastTrained: 'desc' },
  })

  return successResponse('Active courses retrieved', { courses })
})
