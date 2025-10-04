import Link from 'next/link'
import { redirect } from 'next/navigation'

import { prisma } from '~/server/db'

import * as Sentry from '@sentry/nextjs'

import Button from '~/app/components/_elements/button'
import Container from '~/app/components/_elements/container'
import PageHeader from '~/app/components/_layouts/pageHeader'
import Info from '~/app/components/training/courses/schedule/Info'
import LineList from '~/app/components/training/courses/schedule/LineList'
import ResetButtons from '~/app/components/training/courses/schedule/ResetButtons'

import { getUserServer } from '~/app/_util/getUserServer'

export default async function CourseSchedulePage(props: {
  params: Promise<{ userCourseId: string }>
}) {
  const params = await props.params
  const { user, isPremium } = await getUserServer()
  if (!user) redirect('/auth/signin')
  if (!isPremium) redirect('/premium')

  const { userCourseId } = params

  const { userCourse, userLines } = await (async () => {
    try {
      const userCourse = await prisma.userCourse.findFirst({
        where: {
          id: userCourseId,
          userId: user.id,
        },
        include: {
          course: {
            include: {
              groups: true,
            },
          },
        },
      })

      if (!userCourse) throw new Error('Course not found')

      const userLines = await prisma.userLine.findMany({
        where: {
          userId: user.id,
          userCourseId,
        },
        include: {
          line: {
            include: {
              group: true,
              moves: true,
            },
          },
        },
      })

      if (!userLines) throw new Error('Lines not found')

      // Sort lines by their groups sortOrder and then by their own sortOrder
      userLines.sort((a, b) => {
        if (a.line.group.sortOrder < b.line.group.sortOrder) return -1
        if (a.line.group.sortOrder > b.line.group.sortOrder) return 1
        if (a.line.sortOrder < b.line.sortOrder) return -1
        if (a.line.sortOrder > b.line.sortOrder) return 1
        return 0
      })

      return { userCourse, userLines }
    } catch (e) {
      Sentry.captureException(e)
      return {
        userCourse: undefined,
        userLines: undefined,
      }
    }
  })()

  if (!userCourse || !userLines) {
    redirect('/404')
  }

  const uniqueGroups = userCourse.course.groups
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((group) => ({
      id: group.id,
      name: group.groupName,
    }))

  return (
    <>
      <PageHeader
        title={`${userCourse.course.courseName}`}
        subTitle="Revision Schedule"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden Chess pieces on a chess board',
        }}
      />
      <div className="">
        <Container>
          <Info />
          <div className="flex flex-col lg:flex-row gap-2 mb-4">
            <ResetButtons groups={uniqueGroups} courseId={userCourse.id} />
            <Link href={`/training/courses/`}>
              <Button className="w-full" variant="secondary">
                Back to courses
              </Button>
            </Link>
          </div>
          <div className="flex flex-col text-black  md:flex-row gap-2 md:gap-4 mb-2">
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 bg-gray-300"></div>
              <p>Unseen</p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 bg-green-500"></div>
              <p>Learned</p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 bg-blue-600"></div>
              <p>Learning</p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 bg-red-500"></div>
              <p>Hard</p>
            </div>
          </div>
          <LineList userLines={userLines} courseId={userCourse.id} />
        </Container>
      </div>
    </>
  )
}
