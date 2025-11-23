import { IncreaseTimeTakenSchema } from '@schemas/tactics-mgmt'
import { apiWrapper } from '~/utils/api-wrapper'
import { successResponse } from '~/utils/server-responses'

import { prisma } from '@server/db'

import { validateBody } from '@utils/validators'

export const POST = apiWrapper(async (request, { user }) => {
  const { roundId, timeTaken } = await validateBody(
    request,
    IncreaseTimeTakenSchema,
  )

  await prisma.tacticsSetRound.update({
    where: { id: roundId, set: { userId: user.id } },
    data: {
      timeSpent: { increment: timeTaken },
      set: {
        update: {
          lastTrained: new Date(),
        },
      },
    },
  })

  return successResponse('Time taken increased', {})
})
