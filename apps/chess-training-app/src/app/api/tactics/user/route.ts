import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'
const posthog = getPostHogServer()

export async function GET() {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  try {
    const sets = await prisma.tacticsSet.findMany({
      include: {
        rounds: true,
      },
      where: {
        userId: user.id,
        active: true,
      },
    })

    return successResponse('Sets found', { sets }, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
