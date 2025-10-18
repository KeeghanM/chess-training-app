import { MiscBadges, StreakBadges, TacticStreakBadges } from './RanksAndBadges'

export default function CalculateBadgePercentage(userBadgeCount: number) {
  const totalBadgeCount =
    StreakBadges.length + MiscBadges.length + TacticStreakBadges.length

  return {
    totalBadgeCount,
    percentage: (userBadgeCount / totalBadgeCount) * 100,
  }
}
