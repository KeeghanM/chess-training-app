import { XpUpdateSchema } from '@schemas/account'
import { updateStreak } from '~/app/api/_business-logic/user/update-streak'

import { prisma } from '@server/db'

import type { availableTypes } from '@components/general/XpTracker'

import { apiWrapper } from '@utils/api-wrapper'
import { Unauthorized } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export const PUT = apiWrapper(async (request, { user }) => {
  const { xp, type } = await validateBody(request, XpUpdateSchema)

  const calculateXp = (type: availableTypes) => {
    switch (type) {
      case 'line':
        return 15
      case 'tactic':
        return 5
      default:
        return 5
    }
  }

  const xpToAdd = calculateXp(type)

  if (xpToAdd !== xp) throw new Unauthorized('Invalid XP')

  await updateStreak(user.id)

  await prisma.userProfile.update({
    where: {
      id: user.id,
    },
    data: {
      experience: {
        increment: xpToAdd,
      },
    },
  })

  const dateString = new Date().toISOString().split('T')[0]!

  const dayTrained = await prisma.dayTrained.findFirst({
    where: {
      userId: user.id,
      date: dateString,
    },
  })

  if (!dayTrained) {
    await prisma.dayTrained.create({
      data: {
        date: dateString,
        userId: user.id,
        experience: xpToAdd,
      },
    })
  } else {
    await prisma.dayTrained.update({
      where: {
        id: dayTrained.id,
      },
      data: {
        experience: {
          increment: xpToAdd,
        },
      },
    })
  }

  return successResponse('XP added', { xp: xpToAdd })
})
