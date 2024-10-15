import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)
  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { courseId } = params
  const { groupId } = (await request.json()) as { groupId: string }

  if (!courseId) return errorResponse('Missing courseId', 400)
  if (!groupId) return errorResponse('Missing groupId', 400)

  try {
    const minDate = await prisma.userLine.findFirst({
      where: {
        userId: user.id,
        userCourseId: courseId,
        revisionDate: { not: null },
      },
      orderBy: {
        revisionDate: 'asc',
      },
      select: {
        revisionDate: true,
      },
    })

    // Subtract 1 second from the minDate to ensure that the line is marked for review
    const adjustedDate = minDate?.revisionDate
      ? new Date(minDate.revisionDate.getTime() - 1000)
      : new Date()

    await prisma.userLine.updateMany({
      where: {
        userId: user.id,
        userCourseId: courseId,
        line: { groupId: groupId },
      },
      data: {
        revisionDate: adjustedDate,
      },
    })

    return successResponse('Lines updated', {}, 200)
  } catch (e) {
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  } finally {
    await prisma.$disconnect()
  }
}
