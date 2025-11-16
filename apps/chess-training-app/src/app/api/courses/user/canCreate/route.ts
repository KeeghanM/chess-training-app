import { getUserServer } from '@utils/getUserServer'
import { errorResponse, successResponse } from '~/app/api/responses'
import { env } from '~/env'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'

const posthog = getPostHogServer()

export async function GET() {
  const { user, isPremium } = await getUserServer()
  if (!user) return errorResponse('Unauthorized', 401)

  const maxCourses = env.NEXT_PUBLIC_MAX_COURSES
  const hasUnlimitedCourses = isPremium ?? false

  try {
    const courses = await prisma.userCourse.findMany({
      where: {
        userId: user.id,
        active: true,
      },
      include: {
        course: true,
      },
    })

    const canCreate = hasUnlimitedCourses || courses.length < maxCourses

    return successResponse('Courses found', { canCreate }, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('Internal Server Error', 500)
  }
}
