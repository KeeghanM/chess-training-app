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

  const { roundId, currentStreak } = (await request.json()) as {
    roundId: string
    currentStreak: number
  }
  if (!roundId || currentStreak == undefined)
    return errorResponse('Missing fields', 400)

  try {
    await prisma.tacticsSetRound.update({
      where: {
        id: roundId,
        set: {
          userId: user.id,
        },
      },
      data: {
        correct: {
          increment: 1,
        },
      },
    })

    const badge = TacticStreakBadges.find(
      (badge) => badge.streak === currentStreak && badge.level == undefined,
    )

    if (badge) {
      await AddBadgeToUser(user.id, badge.name)
    }

    return successResponse('Time taken updated', {}, 200)
  } catch (e) {
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  } finally {
    await prisma.$disconnect()
  }
}
