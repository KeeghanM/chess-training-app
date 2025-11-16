import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { TacticsSetStatus } from '@prisma/client'
import { errorResponse, successResponse } from '~/app/api/responses'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'

const posthog = getPostHogServer()

export async function POST(
  request: Request,
  props: { params: Promise<{ setId: string }> },
) {
  const params = await props.params
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
          status: TacticsSetStatus.ACTIVE,
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
    posthog.captureException(e)
    return errorResponse('Internal server error', 500)
  }
}
