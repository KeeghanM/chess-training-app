import { UpdateTacticsSetSchema } from '@schemas/tactics'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export const PUT = apiWrapper(async (request, { user }) => {
  const { setId, name } = await validateBody(request, UpdateTacticsSetSchema)

  const set = await prisma.tacticsSet.update({
    where: { id: setId, userId: user.id },
    data: {
      name,
    },
  })

  return successResponse('Set updated', { set })
})
