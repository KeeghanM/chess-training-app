import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'
const posthog = getPostHogServer()

export async function POST(
  request: Request,
  props: { params: Promise<{ courseId: string }> },
) {
  const params = await props.params
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
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
