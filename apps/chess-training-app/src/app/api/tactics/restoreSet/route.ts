import { TacticsSetIdSchema } from '@schemas/tactics-mgmt'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export const POST = apiWrapper(async (request, { user }) => {
  const { setId } = await validateBody(request, TacticsSetIdSchema)

  await prisma.tacticsSet.update({
    where: { id: setId, userId: user.id },
    data: { status: 'ACTIVE' },
  })

  return successResponse('Set restored', {})
})
