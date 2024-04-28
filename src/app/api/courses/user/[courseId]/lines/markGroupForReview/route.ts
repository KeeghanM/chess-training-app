import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  const session = getKindeServerSession(request)
  if (!session) return errorResponse('Unauthorized', 401)
  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { courseId } = params
  const { groupId } = (await request.json()) as { groupId: string }

  if (!courseId) return errorResponse('Missing courseId', 400)
  if (!groupId) return errorResponse('Missing groupId', 400)

  try {
    await prisma.userLine.updateMany({
      where: {
        userId: user.id,
        userCourseId: courseId,
        line: { groupId: groupId },
      },
      data: {
        revisionDate: new Date(),
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
