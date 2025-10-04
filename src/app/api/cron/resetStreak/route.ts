import { prisma } from '~/server/db'

import * as Sentry from '@sentry/nextjs'

import { errorResponse, successResponse } from '../../responses'

export async function GET() {
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24)

  try {
    await prisma.userProfile.updateMany({
      data: {
        currentStreak: 0,
      },
      where: {
        lastTrained: {
          lt: twentyFourHoursAgo,
        },
        currentStreak: {
          gt: 0,
        },
      },
    })

    return successResponse('Reset streaks', {}, 200)
  } catch (e) {
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    return errorResponse('Something went wrong', 500)
  }
}
