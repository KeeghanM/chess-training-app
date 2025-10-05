import { redirect } from 'next/navigation'

import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import type { Comment, Group, Line, Move, UserLine } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'

import Container from '~/app/components/_elements/container'
import PageHeader from '~/app/components/_layouts/pageHeader'
import CourseTrainer from '~/app/components/training/courses/CourseTrainer'

export type PrismaUserLine = UserLine & {
  line: Line & {
    group: Group
    moves: (Move & { comment: Comment | null })[]
  }
}

export default async function CourseTrainPage(props: {
  params: Promise<{ userCourseId: string }>
}) {
  const params = await props.params
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) redirect('/auth/signin')

  const { userCourseId } = params

  const { userCourse, userLines, userFens } = await (async () => {
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
          line: {
            trainable: true,
          },
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

      const userFens = await prisma.userFen.findMany({
        where: {
          userCourseId,
        },
      })

      if (!userFens) throw new Error('Fens not found')

      // Sort lines by their groups sortOrder and then by their own sortOrder
      userLines.sort((a, b) => {
        if (a.line.group.sortOrder < b.line.group.sortOrder) return -1
        if (a.line.group.sortOrder > b.line.group.sortOrder) return 1
        if (a.line.sortOrder < b.line.sortOrder) return -1
        if (a.line.sortOrder > b.line.sortOrder) return 1
        return 0
      })

      return { userCourse, userLines, userFens }
    } catch (e) {
      Sentry.captureException(e)
      return {
        userCourse: undefined,
        userLines: undefined,
        userFens: undefined,
      }
    }
  })()

  if (!userCourse || !userLines || !userFens) {
    redirect('/404')
  }

  return (
    <>
      <PageHeader
        title={userCourse.course.courseName}
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <div className="">
        <Container>
          {userCourse && (
            <CourseTrainer
              userCourse={userCourse}
              userLines={userLines}
              userFens={userFens}
            />
          )}
        </Container>
      </div>
    </>
  )
}
