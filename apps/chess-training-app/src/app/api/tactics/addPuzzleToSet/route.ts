import { prisma } from '~/server/db'
import { errorResponse, successResponse } from '../../responses'

export async function POST(req: Request) {
  try {
    const { puzzle, userId, setId, last_puzzle } = await req.json()

    console.log({ puzzle, userId, setId, last_puzzle })

    if (!puzzle || !userId || !setId) {
      return errorResponse('Missing puzzle, userId, or setId', 400)
    }

    // Create a CustomPuzzle
    const newCustomPuzzle = await prisma.customPuzzle.create({
      data: {
        id: puzzle.id,
        fen: puzzle.fen,
        rating: parseInt(puzzle.rating),
        moves: puzzle.moves,
        directStart: puzzle.directStart === 'true',
      },
    })

    // Add the CustomPuzzle to the TacticsSet
    await prisma.tacticsSet.update({
      where: {
        id: setId,
        userId,
      },
      data: {
        puzzles: {
          create: {
            puzzleid: newCustomPuzzle.id,
          },
        },
        size: {
          increment: 1,
        },
        status: last_puzzle ? TacticsSetStatus.ACTIVE : 'PENDING', // Set to ACTIVE if it's the last puzzle
      },
    })

    return successResponse('Puzzle added', {}, 200)
  } catch (error) {
    console.error('[ADD_PUZZLE_TO_SET_ERROR]', error)
    return errorResponse('Internal Error', 500)
  }
}
