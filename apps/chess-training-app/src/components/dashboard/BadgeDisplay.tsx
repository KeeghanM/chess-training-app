'use client'

import Link from 'next/link'

import calculateBadgePercentage from '@utils/calculate-badge-percentage'

import { RoundProgress } from '../_elements/progress'

interface BadgeDisplayProps {
  userBadgeCount: number
}
export default function BadgeDisplay({ userBadgeCount }: BadgeDisplayProps) {
  const { percentage, totalBadgeCount } =
    calculateBadgePercentage(userBadgeCount)

  return (
    <div className="bg-card/10 text-white rounded-lg p-4 flex flex-col gap-2 items-center">
      <RoundProgress percentages={[{ percentage, color: 'text-green-500' }]}>
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
          {userBadgeCount}/{totalBadgeCount}
        </text>
      </RoundProgress>
      <p className="text-xl">Badges Earned</p>
      <div className="flex gap-1 flex-col text-xs w-full bg-card-light/10 p-2 rounded shadow">
        <Link className="hover:underline" href="/dashboard/badges">
          View Badges
        </Link>
        <Link href="/about/ranks-and-badges" className="hover:underline">
          View All Badges
        </Link>
      </div>
    </div>
  )
}
