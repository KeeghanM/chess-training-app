import type { CustomPuzzle } from '@prisma/client'

import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

import { withAdminAuth } from '@utils/admin-auth'
import { errorResponse, successResponse } from '@utils/server-responsses'

const posthog = getPostHogServer()

export const POST = withAdminAuth(async (request) => {
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
})

export const GET = withAdminAuth(async () => {
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
})
