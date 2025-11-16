import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { courseId } = (await request.json()) as {
    courseId: string
  }

  if (!courseId) return errorResponse('Missing required fields', 400)

  try {
    const course = await prisma.course.findFirst({
      where: { id: courseId, createdBy: user.id },
      include: { groups: true, lines: { include: { moves: true } } },
    })

    if (!course) return errorResponse('Course not found', 404)

    return successResponse('Success', { course }, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('Unknown error', 500)
  }
}
