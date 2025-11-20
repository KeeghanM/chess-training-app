import { apiWrapper } from '@utils/api-wrapper'
import { killBillClient } from '@utils/kill-bill'
import { successResponse } from '@utils/server-responses'

export const GET = apiWrapper(async (_request, { user }) => {
  const subscriptionStatus = await killBillClient.getSubscriptionStatus(user.id)

  return successResponse('Subscription status retrieved', {
    data: subscriptionStatus,
  } as Record<string, unknown>)
})
