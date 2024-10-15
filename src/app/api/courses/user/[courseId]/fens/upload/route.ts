import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)
  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { courseId } = params
  const { fens } = (await request.json()) as {
    fens: {
      fen: string
      commentId: number
    }[]
  }

  if (!courseId) return errorResponse('Missing courseId', 400)
  if (!fens) return errorResponse('Missing fens', 400)

  try {
    await prisma.userFen.createMany({
      data: fens.map((fen) => ({
        fen: fen.fen,
        commentId: fen.commentId,
        userCourseId: courseId,
      })),
    })

    return successResponse('Fens uploaded', { count: fens.length }, 200)
  } catch (e) {
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  } finally {
    await prisma.$disconnect()
  }
}
