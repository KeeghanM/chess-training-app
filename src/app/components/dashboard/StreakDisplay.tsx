'use client'

import type { UserBadge } from '@prisma/client'

import { Tooltip, TooltipContent, TooltipTrigger } from '../_elements/tooltip'

interface StreakDisplayProps {
  data: {
    trainedToday: boolean
    currentStreak: number
    streakBadge:
      | {
          name: string
          description: string
          streak: number
        }
      | undefined
  }
  badges: UserBadge[]
}
export default function StreakDisplay(props: StreakDisplayProps) {
  const { trainedToday, currentStreak, streakBadge } = props.data

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-fit w-fit  flex-row items-center border-2 border-orange-500 bg-white">
        <div className="flex flex-row items-center gap-1 p-2">
          <Tooltip>
            <TooltipTrigger>
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 512 512"
                className={trainedToday ? 'text-orange-500' : 'text-gray-500'}
              >
                <g transform="translate(512 0) scale(-1 1)">
                  <path
                    fill="currentColor"
                    d="M60.81 476.91h300v-60h-300zm233.79-347.3l13.94 7.39c31.88-43.62 61.34-31.85 61.34-31.85l-21.62 53l35.64 19l2.87 33l64.42 108.75l-43.55 29.37s-26.82-36.39-39.65-43.66c-10.66-6-41.22-10.25-56.17-12l-67.54-76.91l-12 10.56l37.15 42.31c-.13.18-.25.37-.38.57c-35.78 58.17 23 105.69 68.49 131.78H84.14C93 85 294.6 129.61 294.6 129.61"
                  />
                </g>
              </svg>
            </TooltipTrigger>
            <TooltipContent>
              {trainedToday ? 'Trained Today' : 'Not Trained Today'}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <p>
                {currentStreak} day{currentStreak > 1 && 's'}
              </p>
            </TooltipTrigger>
            <TooltipContent>Current Streak</TooltipContent>
          </Tooltip>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <p className="min-w-[50px] bg-orange-500 p-2 text-white">
              {streakBadge ? `${streakBadge.name} Badge` : 'No Badge..'}
            </p>
          </TooltipTrigger>
          <TooltipContent>Your best training streak badge</TooltipContent>
        </Tooltip>
      </div>

      <a
        href="/dashboard/badges"
        className="text-sm text-white underline hover:no-underline"
      >
        Your Badges ({props.badges.length})
      </a>
    </div>
  )
}
