import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'

const posthog = getPostHogServer()

/**
 * Record additional time spent on a tactics round and update the set's last trained timestamp.
 *
 * Expects the request JSON body to contain `timeTaken` (number), `roundId` (string) and `setId` (string); `timeTaken` and `roundId` are required. Authenticates the user and applies updates scoped to that user's records.
 *
 * @param request - The incoming HTTP request with a JSON body `{ timeTaken, roundId, setId }`
 * @returns An API response object: on success, a message "Time taken updated" with HTTP 200; on failure, an error message with an appropriate HTTP status (401 for unauthorized, 400 for missing fields, 500 for server errors).
 */
export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { roundId, timeTaken, setId } = (await request.json()) as {
    timeTaken: number
    roundId: string
    setId: string
  }
  if (!roundId || !timeTaken) return errorResponse('Missing fields', 400)

  try {
    await prisma.tacticsSetRound.update({
      where: {
        id: roundId,
        set: {
          userId: user.id,
        },
      },
      data: {
        timeSpent: {
          increment: timeTaken,
        },
      },
    })

    const date = new Date()
    await prisma.tacticsSet.update({
      where: {
        id: setId,
        userId: user.id,
      },
      data: {
        lastTrained: date,
      },
    })

    return successResponse('Time taken updated', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
