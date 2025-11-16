'use client'

import { RoundProgress } from '@components/_elements/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/_elements/tooltip'

import { PrismaUserCourse } from '@hooks/use-course-queries'

import { generateCoursePercentages } from '@utils/GenerateCoursePercentages'

import type { UserLineWithData } from './CourseBrowser'

// TODO: Add a "Train by group" button

export default function GroupListItem(props: {
  name: string
  lines: UserLineWithData[]
  onClick: () => void
  open: boolean
}) {
  const { name, lines, open } = props

  const { linesLearned, linesLearning, linesHard, linesUnseen } = lines.reduce(
    (acc, line) => {
      if (line.timesTrained == 0) acc.linesUnseen++
      else if (line.currentStreak > 4 && line.timesCorrect >= line.timesWrong)
        acc.linesLearned++
      else if (
        line.currentStreak <= 4 &&
        line.timesTrained > 0 &&
        line.timesCorrect >= line.timesWrong
      )
        acc.linesLearning++
      else if (line.timesWrong > line.timesCorrect) acc.linesHard++

      return acc
    },
    {
      linesLearned: 0,
      linesLearning: 0,
      linesHard: 0,
      linesUnseen: 0,
    },
  )

  return (
    <div
      className={
        'flex flex-col gap-0 border-2 bg-card rounded-lg shadow ' +
        (open
          ? 'border-orange-500'
          : 'cursor-pointer border-bg-light hover:shadow-lg')
      }
      onClick={() => (!open ? props.onClick() : null)}
    >
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2 transition-all duration-200">
          <h2 className="font-bold">{name}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className="-rotate-90"
          >
            <path
              fill="currentColor"
              d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z"
            />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-black ">
            {lines.length - linesUnseen}/{lines.length}
          </p>
          <Tooltip>
            <TooltipTrigger asChild={true}>
              <RoundProgress
                width="w-20"
                bgColor="text-card-dark/40"
                percentages={generateCoursePercentages({
                  linesHard,
                  linesLearned,
                  linesLearning,
                  linesUnseen,
                } as PrismaUserCourse)}
              />
            </TooltipTrigger>
            <TooltipContent className="text-base">
              <div className="flex flex-col gap-2">
                <p className="text-gray-300">{linesUnseen} lines unseen</p>
                <p className="text-green-500">{linesLearned} lines learned</p>
                <p className="text-blue-600">{linesLearning} lines learning</p>
                <p className="text-red-500">{linesHard} lines hard</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
