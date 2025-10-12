'use client'

import Link from 'next/link'
import { RoundProgress } from '../_elements/progress'

interface XpDisplayProps {
  data: {
    currentXp: number
    rank: {
      rank: string
      name: string
      xp: number
    }
    nextRank: {
      rank: string
      name: string
      xp: number
    }
    percentage: number
  }
  width?: string
}
export default function XpDisplay({ data, width = 'w-30' }: XpDisplayProps) {
  const { currentXp, rank, nextRank, percentage } = data

  return (
    <div className="bg-card/10 text-white rounded-lg p-4 flex flex-col gap-2 items-center">
      <RoundProgress
        width={width}
        percentages={[{ percentage, color: 'text-green-500' }]}
      >
        <text
          fill="white"
          x="50"
          y="47"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {percentage > 99
            ? Math.round(percentage * 10) / 10
            : Math.round(percentage)}
          %
        </text>
        <text
          fill="white"
          x="50"
          y="62"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="0.5rem"
        >
          {currentXp.toLocaleString('en-GB')}
          {nextRank && `/${nextRank.xp.toLocaleString('en-GB')}xp`}
        </text>
      </RoundProgress>
      <p className="text-xl">
        <strong>{rank?.rank}:</strong> {rank?.name}
      </p>
      <div className="flex gap-1 flex-col text-xs w-full bg-card-light/10 p-2 rounded shadow">
        <Link className="hover:underline" href="/members/page/1">
          View Leaderboard
        </Link>
        <Link href="/about/ranks-and-badges" className="hover:underline">
          View All Ranks
        </Link>
      </div>
    </div>
  )
}
