import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'
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
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
