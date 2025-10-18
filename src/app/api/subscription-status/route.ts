import { getPostHogServer } from '~/server/posthog-server'
import { killBillClient } from '@utils/KillBill'
import { getUserServer } from '@utils/getUserServer'
import { errorResponse, successResponse } from '../responses'

const posthog = getPostHogServer()

export async function GET() {
  try {
    const { user } = await getUserServer()
    if (!user) {
      return errorResponse('Unauthorized', 401)
    }

    const subscriptionStatus = await killBillClient.getSubscriptionStatus(
      user.id,
    )

    return successResponse(
      'Subscription status retrieved',
      { data: subscriptionStatus },
      200,
    )
  } catch (error) {
    console.error('Subscription status API error:', error)
    posthog.captureException(error)
    return errorResponse('Internal server error', 500)
  }
}
