import { ArchiveSetSchema } from '@schemas/tactics-mgmt'
import { apiWrapper } from '~/utils/api-wrapper'
import { successResponse } from '~/utils/server-responses'

import { prisma } from '@server/db'

import { validateBody } from '@utils/validators'

export const POST = apiWrapper(async (request, { user }) => {
  const { setId } = await validateBody(request, ArchiveSetSchema)

  await prisma.tacticsSet.update({
    where: { id: setId, userId: user.id },
    data: { status: 'ARCHIVED' },
  })

  return successResponse('Set archived', {})
})
