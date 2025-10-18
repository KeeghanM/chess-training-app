import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '~/server/db'
import posthog from 'posthog-js'
import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import PageHeader from '@components/_layouts/pageHeader'
import Info from '@components/training/courses/schedule/Info'
import LineList from '@components/training/courses/schedule/LineList'
import ResetButtons from '@components/training/courses/schedule/ResetButtons'
import Backdrop from '~/components/_elements/backdrop'
import { getUserServer } from '@utils/getUserServer'

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
      posthog.captureException(e)
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
    <div className="relative">
      <Backdrop />
      <Container>
        <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 space-y-4 mb-4">
          <Info />
          <div className="flex flex-row flex-wrap gap-2 mb-4">
            <ResetButtons groups={uniqueGroups} courseId={userCourse.id} />
            <Link href={`/training/courses/`} className="w-full md:w-fit">
              <Button className="w-full md:w-fit">Back to courses</Button>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-2 p-4 bg-card-light rounded-lg shadow md:items-center md:justify-center">
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
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 bg-black"></div>
              <p>Unseen</p>
            </div>
          </div>
        </div>
        <LineList userLines={userLines} courseId={userCourse.id} />
      </Container>
    </div>
  )
}
