import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function POST(
  request: Request,
  { params }: { params: { setId: string } },
) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { setId } = params as { setId: string }

  if (!setId) return errorResponse('Missing required fields', 400)

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const tacticsSet = await prisma.tacticsSet.findFirst({
        where: {
          id: setId,
        },
      })

      if (!tacticsSet) throw new Error('Set not found')

      // Restore the set
      await prisma.tacticsSet.update({
        where: {
          id: setId,
        },
        data: {
          active: true,
          rounds: {
            create: {
              roundNumber: 1,
            },
          },
        },
      })

      return { tacticsSetId: tacticsSet.id }
    })

    return successResponse('Set restored', result, 200)
  } catch (e) {
    Sentry.captureException(e)
    return errorResponse('Internal server error', 500)
  } finally {
    await prisma.$disconnect()
  }
}
