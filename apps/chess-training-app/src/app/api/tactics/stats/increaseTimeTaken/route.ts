import { IncreaseTimeTakenSchema } from '~/schemas/tactics-mgmt'
import { prisma } from '~/server/db'
import { validateBody } from '~/utils/validators'

import { apiWrapper } from '@utils/api-wrapper'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(async (request, { user }) => {
  const { roundId, timeTaken } = await validateBody(
    request,
    IncreaseTimeTakenSchema,
  )

  await prisma.tacticsSetRound.update({
    where: {
      id: roundId,
      set: {
        userId: user.id,
      },
    },
    data: {
      timeSpent: {
        increment: timeTaken,
      },
    },
  })

  return successResponse('Time taken increased', {})
})
