import { AccountSchema } from '@schemas/account'
import { addBadgeToUser } from '~/app/api/_business-logic/user/add-badge-to-user'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export const PUT = apiWrapper(async (request, { user }) => {
  const {
    username,
    fullname,
    description,
    highestOnlineRating,
    highestOTBRating,
    puzzleRating,
    difficulty,
    publicProfile,
  } = await validateBody(request, AccountSchema)

  // Additional business logic validation (that Zod might miss or is too complex)
  // Note: Zod handles most of the length/regex checks now.
  // We keep the username uniqueness check below.

  const existingUsername = await prisma.userProfile.findUnique({
    where: {
      username,
    },
  })
  if (existingUsername && existingUsername.id !== user.id)
    throw new BadRequest('Username already exists')

  const profile = await prisma.userProfile.update({
    where: {
      id: user.id,
    },
    data: {
      username,
      ...(fullname && { fullName: fullname }),
      ...(description && { description }),
      ...(highestOnlineRating && { highestOnlineRating }),
      ...(highestOTBRating && { highestOTBRating }),
      ...(puzzleRating && { puzzleRating }),
      difficulty,
      public: publicProfile,
    },
  })

  if (highestOTBRating && highestOTBRating > 0)
    await addBadgeToUser(user.id, 'OTB Player')
  if (highestOnlineRating && highestOnlineRating > 0)
    await addBadgeToUser(user.id, 'Online Player')
  if (description && description.length > 0)
    await addBadgeToUser(user.id, 'Well Known')

  return successResponse('Profile Updated', { profile })
})
