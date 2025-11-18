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

    const parsedRating = Number.isFinite(Number(puzzle.rating))
      ? Number(puzzle.rating)
      : 1500

    await prisma.customPuzzle.upsert({
      where: { id: puzzle.id },
      update: {}, // nothing to update on duplicate
      create: {
        id: puzzle.id,
        fen: puzzle.fen,
        rating: parsedRating,
        moves: puzzle.moves,
        directStart: puzzle.directStart === 'true',
      },
    })

    const alreadyLinked = await prisma.puzzle.findFirst({
      where: { setId, puzzleid: puzzle.id },
      select: { id: true },
    })

    const set = await prisma.tacticsSet.findUnique({
      where: { id: setId, userId },
      select: { status: true },
    })

    let nextStatus = set?.status ?? TacticsSetStatus.PENDING
    if (last_puzzle && nextStatus !== TacticsSetStatus.ACTIVE) {
      nextStatus = TacticsSetStatus.ACTIVE
    }

    if (alreadyLinked) {
      if (last_puzzle) {
        await prisma.tacticsSet.update({
          where: { id: setId, userId },
          data: { status: nextStatus },
        })
      }
      console.log(
        `[Puzzle ${puzzle.id}] already exists in set ${setId} — skipping insert`,
      )
      return successResponse('Puzzle already exists in this set', {}, 200)
    }

    await prisma.tacticsSet.update({
      where: { id: setId, userId },
      data: {
        puzzles: { create: { puzzleid: puzzle.id } },
        size: { increment: 1 },
        status: nextStatus,
      },
    })

    return successResponse('Puzzle linked successfully', {}, 200)
  } catch (error) {
    console.error('[ADD_PUZZLE_TO_SET_ERROR]', error)
    return errorResponse('Internal Error', 500)
  }
}
