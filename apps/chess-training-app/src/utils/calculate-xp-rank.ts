import { XP_RANKS } from './ranks-and-badges'

export default function calculateXpRank(currentXp: number) {
  const rank = XP_RANKS.reverse().find((rank) => currentXp >= rank.xp)!
  const nextRank = XP_RANKS.reverse().find((rank) => currentXp < rank.xp)!
  const percentage = (currentXp / (nextRank?.xp ?? currentXp)) * 100
  return {
    currentXp: currentXp,
    rank: rank,
    nextRank: nextRank,
    percentage: percentage,
  }
}
