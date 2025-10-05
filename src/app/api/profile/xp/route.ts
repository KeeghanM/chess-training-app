import { prisma } from '~/server/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'
import type { availableTypes } from '@components/general/XpTracker'
import { UpdateStreak } from '@utils/UpdateStreak'

export async function PUT(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { xp, type } = (await request.json()) as {
    xp: number
    type: availableTypes
  }

  const calculateXp = (type: availableTypes) => {
    switch (type) {
      case 'line':
        return 15
      case 'tactic':
        return 5
      default:
        return 5
    }
  }

  const xpToAdd = calculateXp(type)

  if (xpToAdd !== xp) return errorResponse('Invalid XP', 401)

  try {
    await UpdateStreak(user.id)

    await prisma.userProfile.update({
      where: {
        id: user.id,
      },
      data: {
        experience: {
          increment: xpToAdd,
        },
      },
    })

    const dateString = new Date().toISOString().split('T')[0]!

    const dayTrained = await prisma.dayTrained.findFirst({
      where: {
        userId: user.id,
        date: dateString,
      },
    })

    if (!dayTrained) {
      await prisma.dayTrained.create({
        data: {
          date: dateString,
          userId: user.id,
          experience: xpToAdd,
        },
      })
    } else {
      await prisma.dayTrained.update({
        where: {
          id: dayTrained.id,
        },
        data: {
          experience: {
            increment: xpToAdd,
          },
        },
      })
    }

    return successResponse('XP added', { xp: xpToAdd }, 200)
  } catch (e) {
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    return errorResponse('Unknown error', 500)
  }
}
