import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function GET() {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)
  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  try {
    const courses = await prisma.userCourse.findMany({
      where: {
        userId: user.id,
      },
      include: {
        course: true,
      },
    })

    return successResponse(
      'Courses found',
      {
        courses: courses.filter((course) => course.active == false),
        activeCount: courses.reduce(
          (acc, course) => (course.active ? acc + 1 : acc),
          0,
        ),
      },
      200,
    )
  } catch (e) {
    Sentry.captureException(e)
    return errorResponse('Internal Server Error', 500)
  } finally {
    await prisma.$disconnect()
  }
}
