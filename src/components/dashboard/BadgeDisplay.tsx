'use client'

import Link from 'next/link'
import CalculateBadgePercentage from '@utils/CalculateBadgePercentage'
import { RoundProgress } from '../_elements/progress'

interface BadgeDisplayProps {
  userBadgeCount: number
}
export default function BadgeDisplay({ userBadgeCount }: BadgeDisplayProps) {
  const { percentage, totalBadgeCount } =
    CalculateBadgePercentage(userBadgeCount)

  return (
    <div className="text-white text-center flex flex-col items-center bg-card/10 p-4 gap-2 rounded-lg">
      <p className="text-xl">Badges Earned</p>
      <RoundProgress percentages={[{ percentage, color: 'text-green-500' }]}>
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
          {userBadgeCount}/{totalBadgeCount}
        </text>
      </RoundProgress>
      <div className="flex gap-1 flex-col text-xs w-full bg-card-light/10 p-2 rounded shadow">
        <Link className="hover:underline" href="/dashboard/badges">
          View Badges
        </Link>
      </div>
    </div>
  )
}
