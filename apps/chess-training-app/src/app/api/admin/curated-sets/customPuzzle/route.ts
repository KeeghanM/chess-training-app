import type { CustomPuzzle } from '@prisma/client'
import { errorResponse, successResponse } from '~/app/api/responses'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'
import { getUserServer } from '~/utils/getUserServer'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  const { user, isStaff } = await getUserServer()
  if (!user) return errorResponse('Unauthorized', 401)
  if (!isStaff) return errorResponse('Unauthorized', 401)

  try {
    const { puzzles } = (await request.json()) as {
      puzzles: CustomPuzzle[]
    }

    await prisma.customPuzzle.createMany({
      data: puzzles,
    })

    return successResponse('Puzzles created', { created: puzzles.length }, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('Internal Server Error', 500)
  }
}

export async function GET() {
  const { user, isStaff } = await getUserServer()
  if (!user) return errorResponse('Unauthorized', 401)
  if (!isStaff) return errorResponse('Unauthorized', 401)

  try {
    const puzzles = await prisma.customPuzzle.findMany()
    const trainingPuzzles = puzzles.map((p) => {
      return { ...p, puzzleid: p.id, moves: p.moves.split(',') }
    })
    return successResponse('Puzzles found', { puzzles: trainingPuzzles }, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('Internal Server Error', 500)
  }
}
