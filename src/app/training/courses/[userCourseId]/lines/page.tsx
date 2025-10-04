import Link from 'next/link'
import { redirect } from 'next/navigation'

import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'

import Button from '~/app/components/_elements/button'
import Heading from '~/app/components/_elements/heading'
import CourseBrowser from '~/app/components/training/courses/browser/CourseBrowser'

export default async function CourseTrainPage(props: {
  params: Promise<{ userCourseId: string }>
}) {
  const params = await props.params
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) redirect('/auth/signin')

  const { userCourseId } = params

  const { userCourse, userLines } = await (async () => {
    try {
      const userCourse = await prisma.userCourse.findFirst({
        where: {
          id: userCourseId,
          userId: user.id,
        },
        include: {
          course: true,
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
              moves: {
                include: {
                  comment: true,
                },
              },
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

  return (
    <>
      <div className=" p-2 md:p-4 lg:px-6">
        <Heading as="h1">
          {userCourse.course.courseName}
          <Link className="ml-2" href={`/training/courses/`}>
            <Button variant="accent">Back to courses</Button>
          </Link>
        </Heading>
        <CourseBrowser lines={userLines} />
      </div>
    </>
  )
}
