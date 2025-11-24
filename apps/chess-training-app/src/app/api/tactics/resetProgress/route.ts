import { TacticsSetIdSchema } from '@schemas/tactics-mgmt'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { NotFound } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export const POST = apiWrapper(async (request, { user }) => {
  const { setId } = await validateBody(request, TacticsSetIdSchema)

  const existingSet = await prisma.tacticsSet.findFirst({
    where: {
      id: setId,
      userId: user.id,
    },
  })

  if (!existingSet) throw new NotFound('Set not found')

  // Remove the rounds, which will reset the progress
  await prisma.tacticsSet.update({
    where: {
      id: setId,
    },
    data: {
      rounds: {
        deleteMany: {},
      },
    },
  })

  return successResponse('Progress Reset', { setId })
})
