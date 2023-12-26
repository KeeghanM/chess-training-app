import { errorResponse, successResponse } from '~/app/api/responses'
import { prisma } from '~/server/db'
import * as Sentry from '@sentry/nextjs'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { TacticStreakBadges } from '~/app/about/ranks-and-badges/page'

export async function POST(request: Request) {
  const session = getKindeServerSession(request)
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
      await prisma.userBadge.create({
        data: {
          badgeName: badge.name,
          userId: user.id,
        },
      })
    }

    return successResponse('Time taken updated', {}, 200)
  } catch (e) {
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
