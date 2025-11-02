import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { setId } = (await request.json()) as {
    setId: string
  }

  if (!setId) return errorResponse('Missing required fields', 400)

  try {
    const existingSet = await prisma.tacticsSet.findFirst({
      where: {
        id: setId,
        userId: user.id,
      },
    })

    if (!existingSet) return errorResponse('Set not found', 404)

    // Remove the rounds, which will reset the progress
    await prisma.tacticsSet.update({
      where: {
        id: setId,
      },
      data: {
        rounds: {
          deleteMany: {},
        },
      },
    })

    return successResponse('Progress Reset', { setId }, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
