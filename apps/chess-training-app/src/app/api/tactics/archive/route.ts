import { TacticsSetStatus } from '@prisma/client'
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

  await prisma.tacticsSet.update({
    where: {
      id: setId,
      userId: user.id,
    },
    data: {
      status: TacticsSetStatus.ARCHIVED,
    },
  })

  await prisma.tacticsSetRound.deleteMany({
    where: {
      setId,
    },
  })

  return successResponse('Set Archived', { setId })
})
