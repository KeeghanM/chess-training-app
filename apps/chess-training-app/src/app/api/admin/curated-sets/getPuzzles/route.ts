import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

import type { TrainingPuzzle } from '@components/training/tactics/TacticsTrainer'

import getPuzzleById from '@utils/GetPuzzleById'
import { withAdminAuth } from '@utils/admin-auth'
import { errorResponse, successResponse } from '@utils/server-responsses'

const posthog = getPostHogServer()

export const POST = withAdminAuth(async (request) => {
  const { setId } = (await request.json()) as {
    setId: string
  }
  if (!setId) return errorResponse('Missing required fields', 400)

  try {
    const setPuzzles = await prisma.curatedSetPuzzle.findMany({
      where: {
        setId,
      },
    })

    const puzzles: (TrainingPuzzle & { curatedPuzzleId: number })[] = []

    await Promise.all(
      setPuzzles.map(async (puzzle) => {
        const foundPuzzle = await getPuzzleById(puzzle.puzzleid)
        if (foundPuzzle)
          puzzles.push({
            ...foundPuzzle,
            sortOrder: puzzle.sortOrder,
            curatedPuzzleId: puzzle.id,
          })
      }),
    )

    if (puzzles.length == 0) return errorResponse('Puzzles not found', 404)

    return successResponse('Puzzles found', { puzzles: puzzles }, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('Internal Server Error', 500)
  }
})
