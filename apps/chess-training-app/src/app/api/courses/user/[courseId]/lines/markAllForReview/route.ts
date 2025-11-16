import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

import { errorResponse, successResponse } from '@utils/server-responsses'

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

  if (!courseId) return errorResponse('Missing courseId', 400)

  try {
    await prisma.userLine.updateMany({
      where: {
        userId: user.id,
        userCourseId: courseId,
      },
      data: {
        revisionDate: new Date(),
      },
    })

    return successResponse('Lines updated', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
