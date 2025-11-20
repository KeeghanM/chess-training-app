import { IncreaseIncorrectSchema } from '~/schemas/tactics-mgmt'
import { prisma } from '~/server/db'
import { validateBody } from '~/utils/validators'

import { apiWrapper } from '@utils/api-wrapper'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(async (request, { user }) => {
  const { roundId } = await validateBody(request, IncreaseIncorrectSchema)

  await prisma.tacticsSetRound.update({
    where: { id: roundId, set: { userId: user.id } },
    data: { incorrect: { increment: 1 } },
  })

  return successResponse('Incorrect increased', {})
})
