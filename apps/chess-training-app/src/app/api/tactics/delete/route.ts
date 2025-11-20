import { TacticsSetIdSchema } from '@schemas/tactics-mgmt'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, NotFound } from '@utils/errors'
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

  // check if the set is a purchased one, we can't delete purchased sets
  if (existingSet.curatedSetId)
    throw new BadRequest('Cannot delete purchased set')

  await prisma.tacticsSet.delete({
    where: {
      id: setId,
      userId: user.id,
    },
  })

  return successResponse('Set Deleted', { setId })
})
