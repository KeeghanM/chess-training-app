import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'

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

    // check if the set is a purchased one, we can't delete purchased sets
    if (existingSet.curatedSetId)
      return errorResponse('Cannot delete purchased set', 400)

    await prisma.tacticsSet.delete({
      where: {
        id: setId,
        userId: user.id,
      },
    })

    return successResponse('Set Deleted', { setId }, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
