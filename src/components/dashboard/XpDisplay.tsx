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
  displayLink?: boolean
}
export default function XpDisplay({
  data,
  displayLink = true,
}: XpDisplayProps) {
  const { currentXp, rank, nextRank, percentage } = data

  return (
    <div className="text-white text-center flex flex-col items-center bg-card/10 p-4 gap-2 rounded-lg">
      <p className="text-xl">
        <strong>{rank?.rank}:</strong> {rank?.name}
      </p>
      <RoundProgress
        percentages={[{ percentage: 25, color: 'text-green-500' }]}
      >
        <text
          x="50"
          y="47"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
        >
          {percentage}%
        </text>
        <text
          x="50"
          y="62"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
          fontSize={'0.5rem'}
        >
          {currentXp.toLocaleString('en-GB')}
          {nextRank && `/${nextRank.xp.toLocaleString('en-GB')}xp`}
        </text>
      </RoundProgress>
      {displayLink && (
        <div className="flex gap-1 flex-col text-xs w-full bg-card-light/10 p-2 rounded shadow">
          <Link className="hover:underline" href="/members">
            View Leaderboard
          </Link>
          <Link href="/about/ranks-and-badges" className="hover:underline">
            View All Ranks
          </Link>
        </div>
      )}
    </div>
  )
}
