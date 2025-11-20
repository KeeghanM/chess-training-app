import type { UserProfile } from '@prisma/client'

import { STREAK_BADGES } from './ranks-and-badges'

export default function calculateStreakBadge(profile: UserProfile) {
  const currentStreak = profile.currentStreak
  const bestStreak = profile.bestStreak

  const streakBadge = [...STREAK_BADGES]
    .reverse()
    .find((badge) => bestStreak >= badge.streak)

  const timeSinceLastTrained = profile.lastTrained
    ? new Date().getTime() - profile.lastTrained.getTime()
    : 0
  const oneDay = 1000 * 60 * 60 * 24
  const trainedToday = timeSinceLastTrained < oneDay && timeSinceLastTrained > 0

  return {
    streakBadge: streakBadge,
    currentStreak: currentStreak,
    bestStreak: bestStreak,
    trainedToday: trainedToday,
  }
}
