import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

import { AddBadgeToUser } from '@utils/AddBadge'
import { TacticStreakBadges } from '@utils/RanksAndBadges'
import { errorResponse, successResponse } from '@utils/server-responsses'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { setId, roundNumber, puzzleRating } = (await request.json()) as {
    setId: string
    roundNumber: number
    puzzleRating: number
  }
  if (!setId || !roundNumber) return errorResponse('Missing fields', 400)

  try {
    if (roundNumber <= 8) {
      await prisma.tacticsSetRound.create({
        data: {
          setId,
          roundNumber,
        },
      })
    } else {
      if (puzzleRating) {
        const badge = TacticStreakBadges.find(
          (badge) => badge.level && puzzleRating <= badge.level,
        )
        if (badge) await AddBadgeToUser(user.id, badge.name)
      }
    }

    return successResponse('Round created', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
