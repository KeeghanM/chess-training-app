import { TacticsSetStatus } from '@prisma/client'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { publishPgnToRedis } from '@utils/redis'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(async (req, { user }) => {
  const { name, pgn, rating } = (await req.json()) as {
    name: string
    pgn: string
    rating?: number
  }

  if (!name || !pgn) {
    throw new BadRequest('Missing name or PGN')
  }

  const regex = /[@?#%^\\*]/g
  if (name.length < 5 || name.length > 150 || regex.test(name)) {
    throw new BadRequest('Invalid name')
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

  return successResponse('Set Created', { set: newTacticsSet })
})
