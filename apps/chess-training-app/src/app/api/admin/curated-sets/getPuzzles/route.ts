import { prisma } from '@server/db'

import type { TrainingPuzzle } from '@components/training/tactics/TacticsTrainer'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, NotFound } from '@utils/errors'
import getPuzzleById from '@utils/get-puzzle-by-id'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(
  async (request) => {
    const { setId } = (await request.json()) as {
      setId: string
    }
    if (!setId) throw new BadRequest('Missing required fields')

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

    if (puzzles.length == 0) throw new NotFound('Puzzles not found')

    return successResponse('Puzzles found', { puzzles: puzzles })
  },
  { needsAdmin: true },
)
