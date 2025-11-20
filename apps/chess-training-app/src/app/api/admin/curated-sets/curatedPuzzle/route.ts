import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, NotFound } from '@utils/errors'
import getPuzzleById from '@utils/get-puzzle-by-id'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(
  async (request) => {
    const { setId, puzzleid } = (await request.json()) as {
      setId: string
      puzzleid: string
    }
    if (!setId || !puzzleid) throw new BadRequest('Missing required fields')

    const set = await prisma.curatedSet.findFirst({
      where: {
        id: setId,
      },
    })

    if (!set) throw new NotFound('Set not found')

    const existingPuzzle = await prisma.curatedSetPuzzle.findFirst({
      where: {
        puzzleid,
        setId,
      },
    })

    if (existingPuzzle) throw new BadRequest('Puzzle already in set')

    await prisma.curatedSetPuzzle.create({
      data: {
        puzzleid,
        setId,
      },
    })

    const updatedSet = await prisma.curatedSet.update({
      where: {
        id: setId,
      },
      data: {
        size: {
          increment: 1,
        },
      },
    })

    return successResponse('Puzzle added to set', { set: updatedSet })
  },
  { needsAdmin: true },
)
export const PATCH = apiWrapper(
  async (request) => {
    const { id, rating, comment, moves } = (await request.json()) as {
      id: number
      rating: number
      comment: string
      moves: string[]
    }
    if (!id) throw new BadRequest('Missing required fields')

    const curatedSetPuzzle = await prisma.curatedSetPuzzle.findFirstOrThrow({
      where: {
        id,
      },
    })
    const puzzleData = await getPuzzleById(curatedSetPuzzle.puzzleid)
    if (!puzzleData) throw new NotFound('Puzzle not found')

    const isCustom = curatedSetPuzzle.puzzleid.startsWith('cta_')
    const hasChange =
      rating != puzzleData.rating ||
      moves != puzzleData.moves ||
      comment != puzzleData.comment
    // If there's a change and the puzzle isn't custom already, create a new custom puzzle
    const newPuzzle =
      !isCustom && hasChange
        ? await prisma.customPuzzle.create({
            data: {
              id: 'cta_' + curatedSetPuzzle.puzzleid,
              fen: puzzleData.fen,
              rating,
              directStart: puzzleData.directStart ?? false,
              moves: moves.join(','),
            },
          })
        : null

    if (newPuzzle) {
      // Update the curated set puzzle to point to the new custom puzzle
      await prisma.curatedSetPuzzle.update({
        where: {
          id,
        },
        data: {
          puzzleid: newPuzzle.id,
        },
      })
    }

    // Now, update the puzzle itself with the new data
    await prisma.customPuzzle.update({
      where: {
        id: newPuzzle?.id ?? curatedSetPuzzle.puzzleid, // If we created a new puzzle, use that id, otherwise use the existing puzzle id
      },
      data: {
        rating,
        moves: moves.join(','),
        comment,
      },
    })

    return successResponse('Puzzle updated', {})
  },
  { needsAdmin: true },
)

export const DELETE = apiWrapper(
  async (request) => {
    const { id } = (await request.json()) as { id: number }
    if (!id) throw new BadRequest('Missing required fields')

    await prisma.curatedSetPuzzle.delete({
      where: {
        id,
      },
    })

    return successResponse('Puzzle deleted', {})
  },
  { needsAdmin: true },
)
