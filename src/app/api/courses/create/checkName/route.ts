import { prisma } from '~/server/db'

import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function POST(request: Request) {
  const { name } = (await request.json()) as { name: string }
  if (!name) return errorResponse('Missing name', 400)

  try {
    const course = await prisma.course.findFirst({
      where: {
        courseName: name,
      },
    })

    if (!course)
      return successResponse(
        'Course name is available',
        {
          isAvailable: true,
        },
        200,
      )

    return successResponse(
      'Course name is not available',
      {
        courseId: course.id,
        isAvailable: false,
      },
      200,
    )
  } catch (e) {
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
