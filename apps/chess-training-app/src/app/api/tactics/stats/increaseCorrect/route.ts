import { addBadgeToUser } from '~/app/api/_business-logic/user/add-badge-to-user'
import { IncreaseCorrectSchema } from '~/schemas/tactics-mgmt'
import { prisma } from '~/server/db'
import { apiWrapper } from '~/utils/api-wrapper'
import { TACTICS_STREAK_BADGES } from '~/utils/ranks-and-badges'
import { successResponse } from '~/utils/server-responses'
import { validateBody } from '~/utils/validators'

export const POST = apiWrapper(async (request, { user }) => {
  const { roundId, currentStreak } = await validateBody(
    request,
    IncreaseCorrectSchema,
  )

  await prisma.tacticsSetRound.update({
    where: { id: roundId, set: { userId: user.id } },
    data: { correct: { increment: 1 } },
  })

  const badge = TACTICS_STREAK_BADGES.find(
    (badge) => badge.streak === currentStreak && !badge.level,
  )
  if (badge) await addBadgeToUser(user.id, badge.name)

  return successResponse('Correct increased', {})
})
