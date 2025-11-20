import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { successResponse } from '@utils/server-responses'

export async function POST(_request: Request) {
  return apiWrapper(async (request, { user }) => {
    // Get setId from URL params
    const url = new URL(request.url)
    const setId = url.pathname.split('/').slice(-2)[0]

    if (!setId) {
      throw new BadRequest('Set ID required')
    }

    await prisma.tacticsSet.update({
      where: { id: setId, userId: user.id },
      data: { status: 'ACTIVE' },
    })

    return successResponse('Set restored', {})
  })(_request)
}
