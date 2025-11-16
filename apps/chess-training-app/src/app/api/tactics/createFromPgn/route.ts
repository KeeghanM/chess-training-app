import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { TacticsSetStatus } from '@prisma/client'

import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

import { publishPgnToRedis } from '@utils/redis'

import {
  errorResponse,
  successResponse,
} from '../../../../utils/server-responsses'

const posthog = getPostHogServer()

export async function POST(req: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  try {
    const { name, pgn, rating } = (await req.json()) as {
      name: string
      pgn: string
      rating?: number
    }

    if (!name || !pgn) {
      return errorResponse('Missing name or PGN', 400)
    }

    const regex = /[@?#%^\*]/g
    if (name.length < 5 || name.length > 150 || regex.test(name)) {
      return errorResponse('Invalid name', 400)
    }

    // Create a new TacticsSet with PENDING status
    const newTacticsSet = await prisma.tacticsSet.create({
      data: {
        name,
        userId: user.id,
        rating,
        size: 0, // Size will be updated by the worker
        status: TacticsSetStatus.PENDING,
      },
    })

    // Publish PGN to Redis for processing by the worker
    await publishPgnToRedis({
      pgn,
      userId: user.id,
      setId: newTacticsSet.id,
    })

    return successResponse('Set Created', { set: newTacticsSet }, 200)
  } catch (error) {
    posthog.captureException(error)
    return errorResponse('Internal Error', 500)
  }
}
