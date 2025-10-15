'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Course, UserCourse } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { Book } from 'lucide-react'
import TimeAgo from 'react-timeago'
import type { ResponseJson } from '~/app/api/responses'
import { PrismaUserCourse } from '~/hooks/use-course-queries'
import Button from '@components/_elements/button'
import StyledLink from '@components/_elements/styledLink'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/_elements/tooltip'
import PremiumSubscribe from '@components/ecomm/PremiumSubscribe'
import Spinner from '@components/general/Spinner'
import {
  ProgressPercentage,
  RoundProgress,
} from '~/components/_elements/progress'
import trackEventOnClient from '@utils/trackEventOnClient'
import { generateCoursePercentages } from '~/utils/GenerateCoursePercentages'
import CourseSettings from './CourseSettings'

// TODO: Add revision schedule viewer

export default function CourseListItem(props: {
  courseId: string
  courseName: string
  update: () => void
  hasPremium: boolean
}) {
  const router = useRouter()
  const [userCourse, setUserCourse] = useState<PrismaUserCourse | null>(null)
  const [nextReview, setNextReview] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)
  const [opening, setOpening] = useState(false)

  const openCourse = async (mode: 'learn' | 'revise') => {
    if (!userCourse) return

    setOpening(true)
    trackEventOnClient('course_opened', {})
    router.push(
      '/training/courses/' +
        userCourse?.id +
        (mode == 'learn' ? '?mode=newOnly' : ''),
    )
  }

  useEffect(() => {
    setOpening(false)
    ;(async () => {
      try {
        const resp = await fetch(`/api/courses/user/${props.courseId}`)
        const json = (await resp.json()) as ResponseJson
        if (json?.message != 'Course Fetched')
          throw new Error('Course not fetched')

        const course = json.data!.course as PrismaUserCourse

        setUserCourse(course)
        if (json.data!.nextReview) {
          setNextReview(new Date(json.data!.nextReview as string))
        }
      } catch (e) {
        Sentry.captureException(e)
      }
    })()
      .catch((e) => Sentry.captureException(e))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div
      className="space-y-4 rounded-lg p-4 bg-card shadow"
      key={props.courseId}
    >
      {loading ? (
        <div className="flex flex-col gap-2">
          <div className="space-y-2">
            <p className="font-bold text-xl text-orange-500">Loading...</p>
            <p className="text-sm italic text-gray-600">Loading...</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gray-300"></div>
            <div className="flex flex-col md:flex-row gap-2 md:ml-auto">
              <Button variant="primary" disabled>
                <Spinner />
              </Button>
              <Button disabled>
                <Spinner />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2 p-4 bg-card-light rounded-lg shadow ">
            <div className="flex flex-col md:flex-row gap-1 justify-between items-start">
              <Tooltip>
                <TooltipTrigger asChild={true}>
                  <Link href={`/training/courses/${userCourse?.id}/lines`}>
                    <h3 className="font-bold text-xl flex items-center gap-2">
                      <Book />
                      {props.courseName}
                    </h3>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View lines and other stats</TooltipContent>
              </Tooltip>
              <CourseSettings userCourse={userCourse!} update={props.update} />
            </div>
            <p>
              Last trained{' '}
              {userCourse?.lastTrained ? (
                <TimeAgo date={new Date(userCourse?.lastTrained)} />
              ) : (
                'never'
              )}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center bg-card-light rounded-lg shadow p-4">
            <Tooltip>
              <TooltipTrigger>
                <RoundProgress
                  width="w-20"
                  bgColor="text-card-dark/40"
                  percentages={generateCoursePercentages(userCourse)}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-card-light shadow rounded-lg p-2">
                <div className="flex flex-col gap-2">
                  <p className="text-black">
                    {userCourse?.linesUnseen} lines unseen
                  </p>
                  <p className="text-green-500">
                    {userCourse?.linesLearned} lines learned
                  </p>
                  <p className="text-blue-600">
                    {userCourse?.linesLearning} lines learning
                  </p>
                  <p className="text-red-500">
                    {userCourse?.linesHard} lines hard
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild={true}>
                <div className="flex flex-col gap-1">
                  <p className="text-sm">
                    {
                      userCourse?.lines?.filter(
                        (line) => line.revisionDate != null,
                      ).length
                    }{' '}
                    {userCourse?.lines?.length == 1
                      ? 'line to review.'
                      : 'lines to review.'}
                  </p>
                  <p className="text-sm">
                    {
                      userCourse?.lines?.filter(
                        (line) => line.revisionDate === null,
                      ).length
                    }{' '}
                    {userCourse?.lines?.length == 1
                      ? 'line to learn.'
                      : 'lines to learn.'}
                  </p>
                  {props.hasPremium ? (
                    <Link
                      className="text-xs underline hover:no-underline text-purple-700"
                      href={`/training/courses/${userCourse?.id}/schedule`}
                    >
                      Edit revision schedule
                    </Link>
                  ) : (
                    <PremiumSubscribe
                      title="View Revision Schedule"
                      trigger={
                        <p className="text-xs underline hover:no-underline text-purple-700">
                          Edit revision schedule
                        </p>
                      }
                    >
                      <p>
                        With premium, you can view and edit the revision
                        schedule, allowing you to bring forward the next review
                        date for lines you're struggling with. In the future, we
                        will also be adding the ability to customise the
                        revision schedule to your liking.
                      </p>
                      <p>
                        This is super useful if you're preparing for a
                        tournament or just want to revise everything.
                      </p>
                      <p className="font-bold p-4 rounded bg-green-200">
                        It's only £2.99/month to upgrade to premium!{' '}
                        <StyledLink href="/premium">Learn more.</StyledLink>
                      </p>
                      <p>
                        In addition to this, you also get both unlimited tactics
                        sets and openings courses plus a <strong>5%</strong>{' '}
                        discount on all products.
                      </p>
                    </PremiumSubscribe>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent disabled={!!userCourse?.lines?.length}>
                {nextReview && (
                  <p>
                    Next review in <TimeAgo date={nextReview} />
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex gap-2 flex-row justify-center">
            <Button
              variant="primary"
              onClick={() => openCourse('revise')}
              disabled={userCourse?.lines?.length == 0 || opening}
            >
              {opening ? (
                <>
                  Opening... <Spinner />
                </>
              ) : (
                'Study Course'
              )}
            </Button>
            <Link
              className="flex-1"
              href={`/training/courses/${userCourse?.id}/lines`}
            >
              <Button className="w-full">View Lines</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
