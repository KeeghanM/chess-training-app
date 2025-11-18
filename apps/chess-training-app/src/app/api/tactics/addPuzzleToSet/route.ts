import { TacticsSetStatus } from '@prisma/client'

import { prisma } from '@server/db'

import {
  errorResponse,
  successResponse,
} from '../../../../utils/server-responsses'

export async function POST(req: Request) {
  try {
    const { puzzle, userId, setId, last_puzzle } = await req.json()

    if (!puzzle || !userId || !setId) {
      return errorResponse('Missing puzzle, userId, or setId', 400)
    }

    const existingPuzzle = await prisma.customPuzzle.findUnique({
      where: { id: puzzle.id },
    })

    let puzzleIdToUse = puzzle.id

    if (!existingPuzzle) {
      const newCustomPuzzle = await prisma.customPuzzle.create({
        data: {
          id: puzzle.id,
          fen: puzzle.fen,
          rating: parseInt(puzzle.rating),
          moves: puzzle.moves,
          directStart: puzzle.directStart === 'true',
        },
      })
      puzzleIdToUse = newCustomPuzzle.id
    }

    const alreadyLinked = await prisma.puzzle.findFirst({
      where: {
        setId: setId,
        puzzleid: puzzleIdToUse,
      },
      select: { id: true },
    })

    if (alreadyLinked) {
      console.log(
        `[Puzzle ${puzzleIdToUse}] already exists in set ${setId} — skipping`,
      )
      return successResponse('Puzzle already exists in this set', {}, 200)
    }

    await prisma.tacticsSet.update({
      where: {
        id: setId,
        userId,
      },
      data: {
        puzzles: {
          create: {
            puzzleid: puzzleIdToUse,
          },
        },
        size: {
          increment: 1,
        },
        status: last_puzzle
          ? TacticsSetStatus.ACTIVE
          : TacticsSetStatus.PENDING,
      },
    })

    const message = existingPuzzle
      ? 'Reused existing puzzle for new set'
      : 'Created new puzzle and linked to set'

    return successResponse(message, {}, 200)
  } catch (error) {
    console.error('[ADD_PUZZLE_TO_SET_ERROR]', error)
    return errorResponse('Internal Error', 500)
  }
}
