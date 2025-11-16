import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

import getPuzzleById from '@utils/GetPuzzleById'
import { getUserServer } from '@utils/getUserServer'
import { errorResponse, successResponse } from '@utils/server-responsses'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  const { user, isStaff } = await getUserServer()
  if (!user) return errorResponse('Unauthorized', 401)
  if (!isStaff) return errorResponse('Unauthorized', 401)

  const { setId, puzzleid } = (await request.json()) as {
    setId: string
    puzzleid: string
  }
  if (!setId || !puzzleid) return errorResponse('Missing required fields', 400)

  try {
    const set = await prisma.curatedSet.findFirst({
      where: {
        id: setId,
      },
    })

    if (!set) return errorResponse('Set not found', 404)

    const existingPuzzle = await prisma.curatedSetPuzzle.findFirst({
      where: {
        puzzleid,
        setId,
      },
    })

    if (existingPuzzle) return errorResponse('Puzzle already in set', 400)

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

    return successResponse('Puzzle added to set', { set: updatedSet }, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}

export async function PATCH(request: Request) {
  const { user, isStaff } = await getUserServer()
  if (!user) return errorResponse('Unauthorized', 401)
  if (!isStaff) return errorResponse('Unauthorized', 401)

  const { id, rating, comment, moves } = (await request.json()) as {
    id: number
    rating: number
    comment: string
    moves: string[]
  }
  if (!id) return errorResponse('Missing required fields', 400)

  try {
    const curatedSetPuzzle = await prisma.curatedSetPuzzle.findFirstOrThrow({
      where: {
        id,
      },
    })
    const puzzleData = await getPuzzleById(curatedSetPuzzle.puzzleid)
    if (!puzzleData) return errorResponse('Puzzle not found', 404)

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

    return successResponse('Puzzle updated', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}

export async function DELETE(request: Request) {
  const { user, isStaff } = await getUserServer()
  if (!user) return errorResponse('Unauthorized', 401)
  if (!isStaff) return errorResponse('Unauthorized', 401)

  const { id } = (await request.json()) as { id: number }
  if (!id) return errorResponse('Missing required fields', 400)

  try {
    await prisma.curatedSetPuzzle.delete({
      where: {
        id,
      },
    })

    return successResponse('Puzzle deleted', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
