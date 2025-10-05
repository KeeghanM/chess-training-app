import { prisma } from '~/server/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function GET(
  request: Request,
  props: { params: Promise<{ courseId: string }> },
) {
  const params = await props.params
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)
  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { courseId } = params as { courseId: string }

  if (courseId === undefined) return errorResponse('Missing fields', 400)

  try {
    const course = await prisma.userCourse.findUnique({
      where: {
        id: courseId,
      },
      include: {
        course: true,
        lines: {
          where: {
            OR: [
              {
                revisionDate: {
                  lte: new Date(),
                },
              },
              { revisionDate: null },
            ],
          },
        },
      },
    })

    const nextReview = await prisma.userLine.findFirst({
      where: {
        userId: user.id,
        userCourseId: courseId,
        revisionDate: {
          gt: new Date(),
        },
      },
      orderBy: {
        revisionDate: 'asc',
      },
    })

    if (!course) return errorResponse('Course not found', 404)

    return successResponse(
      'Course Fetched',
      { course, nextReview: nextReview?.revisionDate },
      200,
    )
  } catch (e) {
    Sentry.captureException(e)
    return errorResponse('Internal Server Error', 500)
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ courseId: string }> },
) {
  const params = await props.params
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)
  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { courseId } = params as { courseId: string }

  if (courseId === undefined) return errorResponse('Missing fields', 400)

  try {
    // if user is creator and course is unpublished, delete everything
    // if user is creator and course is published, set userCourse to inactive and remove stats
    // if user is not owner, set userCourse to inactive and remove stats
    const userCourse = await prisma.userCourse.findUnique({
      where: {
        id: courseId,
        userId: user.id,
      },
      include: {
        course: true,
      },
    })

    if (!userCourse) return errorResponse('Course not found', 404)

    const isCreator = userCourse.course.createdBy === user.id
    const isPublished = userCourse.course.published

    if (isCreator && !isPublished) {
      await prisma.course.delete({
        where: {
          id: userCourse.courseId,
          createdBy: user.id,
          published: false,
        },
      })
    } else {
      await prisma.userCourse.update({
        where: {
          id: courseId,
        },
        data: {
          active: false,
          linesLearned: 0,
          linesLearning: 0,
          linesHard: 0,
          linesUnseen: 0,
          lastTrained: null,
        },
      })

      await prisma.userLine.deleteMany({
        where: {
          userCourseId: courseId,
        },
      })

      await prisma.userFen.deleteMany({
        where: {
          userCourseId: courseId,
        },
      })
    }

    return successResponse('Course archived', {}, 200)
  } catch (e) {
    Sentry.captureException(e)
    return errorResponse('Internal Server Error', 500)
  }
}
