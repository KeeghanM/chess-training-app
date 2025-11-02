import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { AddBadgeToUser } from '@utils/AddBadge'
import { TacticStreakBadges } from '@utils/RanksAndBadges'
import { errorResponse, successResponse } from '~/app/api/responses'
import { getPostHogServer } from '~/server/posthog-server'
const posthog = getPostHogServer()

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { currentStreak } = (await request.json()) as {
    currentStreak: number
  }
  if (currentStreak == undefined) return errorResponse('Missing fields', 400)

  try {
    const badge = TacticStreakBadges.find(
      (badge) => badge.streak === currentStreak && badge.level == undefined,
    )
    if (!badge) return successResponse('No badge to add', {}, 200)

    await AddBadgeToUser(user.id, badge.name)

    return successResponse('Badge Added', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
