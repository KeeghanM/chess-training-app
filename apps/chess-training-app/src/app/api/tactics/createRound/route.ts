import { CreateRoundSchema } from '@schemas/tactics'
import { addBadgeToUser } from '~/app/api/_business-logic/user/add-badge-to-user'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { TACTICS_STREAK_BADGES } from '@utils/ranks-and-badges'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export const POST = apiWrapper(async (request, { user }) => {
  const { setId, roundNumber, puzzleRating } = await validateBody(
    request,
    CreateRoundSchema,
  )

  let round
  if (roundNumber <= 8) {
    round = await prisma.tacticsSetRound.create({
      data: {
        setId,
        roundNumber,
      },
    })
  } else {
    if (puzzleRating) {
      const badge = TACTICS_STREAK_BADGES.find(
        (badge) => badge.level && puzzleRating >= badge.level,
      )
      if (badge) {
        await addBadgeToUser(user.id, badge.name)
      }
    }
  }

  return successResponse('Round created', { round })
})
