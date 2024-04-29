import { XpRanks } from './RanksAndBadges';

export function CalculateXpRank(currentXp: number) {
  const rank = XpRanks.reverse().find((rank) => currentXp >= rank.xp)!;
  const nextRank = XpRanks.reverse().find((rank) => currentXp < rank.xp)!;
  const percentage = (currentXp / (nextRank.xp ?? currentXp)) * 100;
  return {
    currentXp,
    rank,
    nextRank,
    percentage,
  };
}
