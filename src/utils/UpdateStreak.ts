import { prisma } from '~/server/db'
import * as Sentry from '@sentry/nextjs'
import { StreakBadges } from '@utils/RanksAndBadges'
import { AddBadgeToUser } from './AddBadge'

export async function UpdateStreak(userId: string) {
  if (!userId) return
  try {
    const profile = await prisma.userProfile.findUnique({
      where: { id: userId },
    })
    if (!profile) throw new Error('Profile not found')

    const now = new Date()
    const lastTrained = profile.lastTrained ?? now
    let currentStreak = profile.currentStreak
    const yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24)
    let didTrainYesterday = false

    const todayString = now.toISOString().split('T')[0]
    const lastTrainedString = lastTrained.toISOString().split('T')[0]

    if (todayString != lastTrainedString) {
      const yesterdayString = yesterday.toISOString().split('T')[0]
      const trainedYesterday = await prisma.dayTrained.findFirst({
        where: {
          userId,
          date: yesterdayString,
        },
      })
      if (trainedYesterday) {
        didTrainYesterday = true
      }
    }

    if (didTrainYesterday || currentStreak == 0) currentStreak++

    const bestStreak = Math.max(currentStreak, profile.bestStreak)

    await prisma.userProfile.update({
      where: { id: userId },
      data: {
        lastTrained: new Date(),
        currentStreak,
        bestStreak,
      },
    })

    // If the best streak has been updated
    if (bestStreak > profile.bestStreak) {
      // Find the badge that matches the best streak
      const badge = StreakBadges.find((badge) => badge.streak === currentStreak)
      if (!badge) return
      // Add the badge to the user
      await AddBadgeToUser(userId, badge.name)
    }

    return
  } catch (e) {
    Sentry.captureException(e)
  }
}
