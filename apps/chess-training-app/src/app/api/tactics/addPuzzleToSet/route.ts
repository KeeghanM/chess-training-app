import { TacticsSetStatus } from '@prisma/client'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(async (req, { user }) => {
  const { puzzle, setId, last_puzzle } = await req.json()

  if (!puzzle || !setId) {
    throw new BadRequest('Missing puzzle or setId')
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
    where: { id: setId, userId: user.id },
    select: { status: true },
  })

  let nextStatus = set?.status ?? TacticsSetStatus.PENDING
  if (last_puzzle && nextStatus !== TacticsSetStatus.ACTIVE) {
    nextStatus = TacticsSetStatus.ACTIVE
  }

  if (alreadyLinked) {
    if (last_puzzle) {
      await prisma.tacticsSet.update({
        where: { id: setId, userId: user.id },
        data: { status: nextStatus },
      })
    }
    console.log(
      `[Puzzle ${puzzle.id}] already exists in set ${setId} — skipping insert`,
    )
    return successResponse('Puzzle already exists in this set', {})
  }

  await prisma.tacticsSet.update({
    where: { id: setId, userId: user.id },
    data: {
      puzzles: { create: { puzzleid: puzzle.id } },
      size: { increment: 1 },
      status: nextStatus,
    },
  })

  return successResponse('Puzzle linked successfully', {})
})
