import { prisma } from '~/server/db'
import { errorResponse, successResponse } from '../../responses'

export async function POST(req: Request) {
  try {
    const { puzzle, userId, setId, last_puzzle } = await req.json()

    if (!puzzle || !userId || !setId) {
      return errorResponse('Missing puzzle, userId, or setId', 400)
    }

    // Create a CustomPuzzle
    const newCustomPuzzle = await prisma.customPuzzle.create({
      data: {
        id: puzzle.id, // Assuming puzzle.id is unique and comes from the worker
        fen: puzzle.fen,
        rating: puzzle.rating,
        moves: JSON.stringify(puzzle.moves), // Store moves as JSON string
        comment: puzzle.comment,
        directStart: puzzle.directStart,
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
        status: last_puzzle ? 'ACTIVE' : 'PENDING', // Set to ACTIVE if it's the last puzzle
      },
    })

    return successResponse('Puzzle added', {}, 200)
  } catch (error) {
    console.error('[ADD_PUZZLE_TO_SET_ERROR]', error)
    return errorResponse('Internal Error', 500)
  }
}
