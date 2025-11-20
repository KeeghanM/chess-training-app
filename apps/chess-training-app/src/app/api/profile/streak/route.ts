import { updateStreak } from '~/app/api/_business-logic/user/update-streak'

import { apiWrapper } from '@utils/api-wrapper'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(async (_request, { user }) => {
  await updateStreak(user.id)
  return successResponse('Streak updated', {})
})
