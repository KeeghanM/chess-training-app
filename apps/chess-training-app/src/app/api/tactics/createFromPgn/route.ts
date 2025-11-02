import { prisma } from '~/server/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { publishPgnToRedis } from '~/utils/redis'
import { errorResponse, successResponse } from '../../responses'

export async function POST(req: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  try {
    const { name, pgn, rating } = await req.json()

    if (!name || !pgn) {
      return errorResponse('Missing name or PGN', 400)
    }

    // Create a new TacticsSet with PENDING status
    const newTacticsSet = await prisma.tacticsSet.create({
      data: {
        name,
        userId: user.id,
        rating,
        size: 0, // Size will be updated by the worker
        status: 'PENDING',
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
    console.error('[CREATE_FROM_PGN_ERROR]', error)
    return errorResponse('Internal Error', 500)
  }
}
