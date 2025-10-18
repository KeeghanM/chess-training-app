import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'
import type { TrainingPuzzle } from '@components/training/tactics/TacticsTrainer'
import getPuzzleById from '@utils/GetPuzzleById'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const permissions = await session.getPermissions()
  if (!permissions?.permissions.includes('staff-member'))
    return errorResponse('Unauthorized', 401)

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
}
