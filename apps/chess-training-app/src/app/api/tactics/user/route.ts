import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { successResponse } from '@utils/server-responses'

export const GET = apiWrapper(async (_request, { user }) => {
  const sets = await prisma.tacticsSet.findMany({
    where: {
      userId: user.id,
      status: 'ACTIVE',
    },
    include: {
      rounds: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return successResponse('Tactics sets retrieved', { sets })
})
