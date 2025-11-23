import { CreateTacticsSetSchema } from '@schemas/tactics'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export const POST = apiWrapper(async (request, { user }) => {
  const { name, puzzleIds, rating } = await validateBody(
    request,
    CreateTacticsSetSchema,
  )

  const set = await prisma.tacticsSet.create({
    data: {
      userId: user.id,
      name,
      size: puzzleIds.length,
      rating,
      status: 'ACTIVE',
      puzzles: {
        create: puzzleIds.map((p, i) => ({
          puzzleid: p.puzzleid,
          sortOrder: i,
        })),
      },
      rounds: {
        create: {
          roundNumber: 1,
        },
      },
    },
  })

  return successResponse('Set created', {
    set: set as unknown as Record<string, unknown>,
  })
})
