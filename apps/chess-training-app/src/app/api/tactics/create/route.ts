import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { TacticsSetStatus } from '@prisma/client'

import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

import { errorResponse, successResponse } from '@utils/server-responsses'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { name, puzzleIds, rating } = (await request.json()) as {
    name: string
    puzzleIds: { puzzleid: string }[]
    rating: number
  }

  if (!name || !puzzleIds || rating == undefined) {
    return errorResponse('Missing required fields', 400)
  }

  const regex = /[@?#%^\*]/g
  if (name.length < 5 || name.length > 150 || regex.test(name)) {
    return errorResponse('Invalid name', 400)
  }

  if (puzzleIds.length < 20 || puzzleIds.length > 500) {
    return errorResponse('Invalid size of puzzle set', 400)
  }

  try {
    const set = await prisma.tacticsSet.create({
      data: {
        userId: user.id,
        name: name,
        size: puzzleIds.length,
        rating: rating,
        status: TacticsSetStatus.ACTIVE,
        puzzles: {
          createMany: {
            data: puzzleIds,
          },
        },
        rounds: {
          create: {
            roundNumber: 1,
            timeSpent: 0,
            correct: 0,
            incorrect: 0,
          },
        },
      },
    })

    return successResponse('Set Created', { set }, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
