import type { CustomPuzzle } from '@prisma/client'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(
  async (request) => {
    const { puzzles } = (await request.json()) as {
      puzzles: CustomPuzzle[]
    }

    await prisma.customPuzzle.createMany({
      data: puzzles,
    })

    return successResponse('Puzzles created', { created: puzzles.length })
  },
  { needsAdmin: true },
)

export const GET = apiWrapper(
  async () => {
    const puzzles = await prisma.customPuzzle.findMany()
    const trainingPuzzles = puzzles.map((p) => {
      return { ...p, puzzleid: p.id, moves: p.moves.split(',') }
    })
    return successResponse('Puzzles found', { puzzles: trainingPuzzles })
  },
  { needsAdmin: true },
)
