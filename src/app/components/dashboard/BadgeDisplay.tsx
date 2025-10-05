'use client'

import Link from 'next/link'

import CalculateBadgePercentage from '~/app/_util/CalculateBadgePercentage'

interface BadgeDisplayProps {
  userBadgeCount: number
}
export default function BadgeDisplay({ userBadgeCount }: BadgeDisplayProps) {
  const { percentage, totalBadgeCount } =
    CalculateBadgePercentage(userBadgeCount)

  return (
    <div className="text-white text-center flex flex-col items-center bg-card/10 p-4 gap-2 rounded-lg">
      <p className="text-xl">Badges Earned</p>
      <div className="relative w-30">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-gray-200/5 stroke-current"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          {/* Progress circle */}
          <circle
            className="text-green-500 progress-ring__circle stroke-current"
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray="251.2"
            strokeDashoffset={`calc(251.2px - (251.2px * ${percentage}) / 100)`}
          ></circle>
          {/* Center text */}
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
        </svg>
      </div>
      <div className="flex gap-1 flex-col text-xs w-full bg-card-light/10 p-2 rounded shadow">
        <Link className="hover:underline" href="/dashboard/badges">
          View Badges
        </Link>
      </div>
    </div>
  )
}
