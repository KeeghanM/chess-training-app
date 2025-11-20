import {
  MISC_BADGES,
  STREAK_BADGES,
  TACTICS_STREAK_BADGES,
} from './ranks-and-badges'

export default function calculateBadgePercentage(userBadgeCount: number) {
  const totalBadgeCount =
    STREAK_BADGES.length + MISC_BADGES.length + TACTICS_STREAK_BADGES.length

  return {
    totalBadgeCount,
    percentage: (userBadgeCount / totalBadgeCount) * 100,
  }
}
