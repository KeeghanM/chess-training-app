import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  const session = getKindeServerSession(request)
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

    if (!course) return errorResponse('Course not found', 404)

    return successResponse('Course Fetched', { course }, 200)
  } catch (e) {
    Sentry.captureException(e)
    return errorResponse('Internal Server Error', 500)
  }
}
