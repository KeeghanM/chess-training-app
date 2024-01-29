'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import type { Course, UserCourse } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import Tippy from '@tippyjs/react'
import type { ResponseJson } from '~/app/api/responses'

import Button from '~/app/components/_elements/button'
import Heading from '~/app/components/_elements/heading'
import Spinner from '~/app/components/general/Spinner'
import TimeSince from '~/app/components/general/TimeSince'

import trackEventOnClient from '~/app/_util/trackEventOnClient'

import CourseSettings from './CourseSettings'
import type { PrismaUserCourse } from './CoursesList'

// TODO: Add revision schedule viewer

export default function CourseListItem(props: {
  courseId: string
  courseName: string
  update: () => void
}) {
  const router = useRouter()
  const [userCourse, setUserCourse] = useState<PrismaUserCourse | null>(null)
  const [nextReview, setNextReview] = useState<Date | null>(null)
  const [conicGradient, setConicGradient] = useState('')
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
        setConicGradient(GenerateConicGradient(course))
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
      className="flex flex-col gap-0 border border-gray-300 dark:text-white dark:border-slate-600 shadow-md dark:shadow-slate-900 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] hover:shadow-lg transition-shadow duration-300"
      key={props.courseId}
    >
      {loading ? (
        <div className="flex flex-col gap-2 p-2">
          <div className="px-2 py-1 border-b border-gray-300 dark:border-slate-600 font-bold flex flex-col md:flex-row gap-1 justify-between items-start">
            <p className="flex flex-col gap-1">
              <span className="text-lg text-orange-500">Loading...</span>
              <span className="text-xs italic text-gray-600 dark:text-gray-400">
                Loading...
              </span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gray-300 dark:bg-slate-700"></div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:ml-auto">
              <Button variant="primary" disabled>
                <Spinner />
              </Button>
              <Button variant="secondary" disabled>
                <Spinner />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="px-2 py-1 border-b border-gray-300 dark:border-slate-600 font-bold flex flex-col md:flex-row gap-1 justify-between items-start">
            <p className="flex flex-col gap-1">
              <Tippy content="View lines and other stats">
                <Link
                  className="text-lg cursor-pointer text-orange-500"
                  href={`/training/courses/${userCourse?.id}/lines`}
                >
                  {props.courseName}
                </Link>
              </Tippy>
              <span className="text-xs italic text-gray-600 dark:text-gray-400">
                Last trained{' '}
                {userCourse?.lastTrained ? (
                  <TimeSince
                    text="ago"
                    date={new Date(userCourse?.lastTrained)}
                  />
                ) : (
                  'never'
                )}
              </span>
            </p>
            <CourseSettings userCourse={userCourse!} update={props.update} />
          </div>
          <div className="flex flex-col md:flex-row p-2 items-center gap-2">
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <Tippy
                className="text-base"
                content={
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-300">
                      {userCourse?.linesUnseen} lines unseen
                    </p>
                    <p className="text-[#4ade80]">
                      {userCourse?.linesLearned} lines learned
                    </p>
                    <p className="text-[#2563eb]">
                      {userCourse?.linesLearning} lines learning
                    </p>
                    <p className="text-[#ff3030]">
                      {userCourse?.linesHard} lines hard
                    </p>
                  </div>
                }
              >
                <div
                  className="grid h-16 w-16 place-items-center rounded-full"
                  style={{
                    background: conicGradient,
                  }}
                >
                  <div className="h-4 w-4 rounded-full bg-gray-300 dark:bg-slate-700"></div>
                </div>
              </Tippy>
              <Tippy
                content={
                  nextReview && (
                    <p>
                      Next review in <TimeSince date={nextReview} />
                    </p>
                  )
                }
                disabled={!!userCourse?.lines?.length}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm italic">
                    {
                      userCourse?.lines?.filter(
                        (line) => line.revisionDate != null,
                      ).length
                    }{' '}
                    {userCourse?.lines?.length == 1
                      ? 'line to review.'
                      : 'lines to review.'}
                  </p>
                  <p className="text-sm italic">
                    {
                      userCourse?.lines?.filter(
                        (line) => line.revisionDate === null,
                      ).length
                    }{' '}
                    {userCourse?.lines?.length == 1
                      ? 'line to learn.'
                      : 'lines to learn.'}
                  </p>
                </div>
              </Tippy>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:ml-auto">
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
              <Link href={`/training/courses/${userCourse?.id}/lines`}>
                <Button variant="secondary">View Lines</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function GenerateConicGradient(course: UserCourse & { course: Course }) {
  const totalLines =
    course.linesLearned +
    course.linesLearning +
    course.linesHard +
    course.linesUnseen

  const learnedPercent = Math.round((course.linesLearned / totalLines) * 100)
  const learningPercent = Math.round((course.linesLearning / totalLines) * 100)
  const hardPercent = Math.round((course.linesHard / totalLines) * 100)
  const unseenPercent = Math.round((course.linesUnseen / totalLines) * 100)
  const conicGradient = `conic-gradient(
            #4ade80 ${learnedPercent}%,
            #2563eb ${learnedPercent}% ${learnedPercent + learningPercent}%,
            #ff3030 ${learnedPercent + learningPercent}% ${
              learnedPercent + learningPercent + hardPercent
            }%,
            #6b21a8 ${learnedPercent + learningPercent + hardPercent}% ${
              learnedPercent + learningPercent + hardPercent + unseenPercent
            }%
          )`

  return conicGradient
}
