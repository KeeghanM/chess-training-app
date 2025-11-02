import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { TacticsSetStatus } from '@prisma/client'
import { errorResponse, successResponse } from '../../responses'

const posthog = getPostHogServer()

export async function POST(req: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  try {
    const { setId } = await req.json()

    if (!setId) {
      return errorResponse('Missing setId', 400)
    }

    await prisma.tacticsSet.update({
      where: {
        id: setId,
        userId: user.id,
      },
      data: {
        status: TacticsSetStatus.ARCHIVED,
      },
    })

    return successResponse('Set Archived', { setId }, 200)
  } catch (error) {
    posthog.captureException(error)
    return errorResponse('Internal Error', 500)
  }
}
