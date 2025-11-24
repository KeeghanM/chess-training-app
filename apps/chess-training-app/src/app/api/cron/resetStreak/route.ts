import { prisma } from '@server/db'

import { publicApiWrapper } from '@utils/public-api-wrapper'
import { successResponse } from '@utils/server-responses'

export const GET = publicApiWrapper(async () => {
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24)

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

  return successResponse('Reset streaks', {})
})
