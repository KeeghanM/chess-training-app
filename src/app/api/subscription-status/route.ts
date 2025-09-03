import * as Sentry from '@sentry/nextjs'

import { killBillClient } from '~/app/_util/KillBill'
import { getUserServer } from '~/app/_util/getUserServer'

import { errorResponse, successResponse } from '../responses'

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
    Sentry.captureException(error)
    return errorResponse('Internal server error', 500)
  }
}
