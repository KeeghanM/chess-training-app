import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

import { errorResponse, successResponse } from '@utils/server-responsses'

const posthog = getPostHogServer()

export async function PATCH(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const {
    courseId,
    courseName,
    courseDescription,
    shortDescription,
    lines,
    groups,
    linesToDelete,
  } = (await request.json()) as {
    courseId: string
    courseName: string
    courseDescription: string
    shortDescription: string
    lines: { id: number; sortOrder: number; trainable: boolean }[]
    linesToDelete: number[]
    groups: {
      id: string
      groupName: string
      sortOrder: number
    }[]
  }

  if (!courseName || !groups || !lines || !courseId)
    return errorResponse('Missing required fields', 400)

  try {
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
      },
    })

    if (!course) return errorResponse('Course not found', 404)
    if (course.createdBy !== user.id) return errorResponse('Unauthorized', 401)

    await prisma.$transaction(async (prisma) => {
      await Promise.all(
        groups.map(async (group) => {
          await prisma.group.update({
            where: {
              id: group.id,
            },
            data: {
              groupName: group.groupName,
              sortOrder: group.sortOrder,
            },
          })
        }),
      )

      await Promise.all(
        lines.map(async (line) => {
          await prisma.line.update({
            where: {
              id: line.id,
            },
            data: {
              sortOrder: line.sortOrder,
              trainable: line.trainable,
            },
          })
        }),
      )

      await prisma.line.deleteMany({
        where: {
          id: {
            in: linesToDelete,
          },
        },
      })

      await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          courseName: courseName,
          courseDescription: courseDescription,
          shortDescription: shortDescription,
        },
      })
    })

    return successResponse('Course updated', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('Internal Server Error', 500)
  }
}
