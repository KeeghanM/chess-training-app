import posthog from 'posthog-js'

import { prisma } from '@server/db'

import { STREAK_BADGES } from '@utils/ranks-and-badges'

import { addBadgeToUser } from './add-badge-to-user'

export async function updateStreak(userId: string) {
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
          ...(yesterdayString && { date: yesterdayString }),
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
      const badge = STREAK_BADGES.find(
        (badge) => badge.streak === currentStreak,
      )
      if (!badge) return
      // Add the badge to the user
      await addBadgeToUser(userId, badge.name)
    }

    return
  } catch (e) {
    posthog.captureException(e)
  }
}
