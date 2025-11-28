import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { RemoveCourseFromUser } from '~/app/api/ecomm/functions/RemoveCourseFromUser'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const permissions = await session.getPermissions()
  if (!permissions?.permissions.includes('staff-member'))
    return errorResponse('Unauthorized', 401)

  const { courseId, userId } = (await request.json()) as {
    courseId: string
    userId: string
  }
  if (!courseId || !userId) return errorResponse('Missing required fields', 400)

  try {
    const removed = await RemoveCourseFromUser(courseId, userId)
    if (!removed) return errorResponse('Failed to remove course', 500)
    return successResponse('Course removed from user', {}, 200)
  } catch (e) {
    Sentry.captureException(e)
    return errorResponse('An error occurred', 500)
  }
}
