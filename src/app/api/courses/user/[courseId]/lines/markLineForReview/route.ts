import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

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
  const { lineId, minDate } = (await request.json()) as {
    lineId: number
    minDate: Date
  }

  if (!courseId) return errorResponse('Missing courseId', 400)
  if (lineId === undefined) return errorResponse('Missing lineId', 400)
  if (!minDate) return errorResponse('Missing minDate', 400)

  try {
    await prisma.userLine.update({
      where: {
        userId: user.id,
        id: lineId,
      },
      data: {
        revisionDate: minDate,
      },
    })

    return successResponse('Lines updated', {}, 200)
  } catch (e) {
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
