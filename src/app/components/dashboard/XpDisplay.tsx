'use client'

import Link from 'next/link'

import { Tooltip, TooltipContent, TooltipTrigger } from '../_elements/tooltip'

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
export default function XpDisplay(props: XpDisplayProps) {
  const { currentXp, rank, nextRank, percentage } = props.data
  const displayLink = props.displayLink ?? true

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-fit w-fit  flex-row items-center border-2 border-orange-500 bg-white">
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <div className="px-2">
              <p className="px-4 text-sm">
                {currentXp.toLocaleString('en-GB')}
                {nextRank && (
                  <span>/{nextRank.xp.toLocaleString('en-GB')}xp</span>
                )}
              </p>
              <div className="h-3 w-full bg-purple-200">
                <div
                  className="h-full rounded-r-full bg-orange-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                ></div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            Experience gained from training puzzles, and studying courses.
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <p className="bg-orange-500 p-2 text-white">
              <strong>{rank?.rank}:</strong> {rank?.name}
            </p>
          </TooltipTrigger>
          <TooltipContent>{`Up Next: ${
            nextRank ? `"${nextRank.rank}: ${nextRank.name}"` : 'Max Rank'
          }`}</TooltipContent>
        </Tooltip>
      </div>

      {displayLink && (
        <div className="flex justify-between gap-2">
          <Link
            className="text-white underline text-sm hover:no-underline"
            href="/members"
          >
            View Leaderboard
          </Link>
          <Link
            href="/about/ranks-and-badges"
            className="text-sm text-white underline hover:no-underline"
          >
            View All Ranks
          </Link>
        </div>
      )}
    </div>
  )
}
