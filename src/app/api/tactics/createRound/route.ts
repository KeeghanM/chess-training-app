import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

import { AddBadgeToUser } from '~/app/_util/AddBadge'
import { TacticStreakBadges } from '~/app/_util/RanksAndBadges'

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
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
