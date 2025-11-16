import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { UpdateStreak } from '@utils/UpdateStreak'
import { errorResponse, successResponse } from '~/app/api/responses'
import { getPostHogServer } from '~/server/posthog-server'

const posthog = getPostHogServer()

export async function POST() {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  try {
    await UpdateStreak(user.id)
    return successResponse('Streak updated', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
