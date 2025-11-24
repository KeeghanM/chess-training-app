import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, NotFound } from '@utils/errors'
import { successResponse } from '@utils/server-responses'

export async function GET(
  _request: Request,
  props: { params: Promise<{ courseId: string }> },
) {
  return apiWrapper(async (_req, { user }) => {
    const params = await props.params
    const { courseId } = params

    if (!courseId) throw new BadRequest('Missing fields')

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

    if (!course) throw new NotFound('Course not found')

    return successResponse('Course Fetched', {
      course,
      nextReview: nextReview?.revisionDate,
    })
  })(_request)
}

export async function DELETE(
  _request: Request,
  props: { params: Promise<{ courseId: string }> },
) {
  return apiWrapper(async (_req, { user }) => {
    const params = await props.params
    const { courseId } = params

    if (!courseId) throw new BadRequest('Missing fields')

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

    if (!userCourse) throw new NotFound('Course not found')

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

    return successResponse('Course archived', {})
  })(_request)
}
