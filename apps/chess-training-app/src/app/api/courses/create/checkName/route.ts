import { errorResponse, successResponse } from '~/app/api/responses'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'

const posthog = getPostHogServer()

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
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
