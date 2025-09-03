import * as Sentry from '@sentry/nextjs'

import { killBillClient } from '~/app/_util/KillBill'
import { getUserServer } from '~/app/_util/getUserServer'

import { errorResponse, successResponse } from '../responses'

export async function POST(request: Request) {
  try {
    const { user } = await getUserServer()
    if (!user) {
      return errorResponse('Unauthorized', 401)
    }

    const { sessionId, kbAccountId } = await request.json()

    if (!sessionId || !kbAccountId) {
      return errorResponse('Missing required parameters', 400)
    }

    // Get the account from KillBill
    const account = await killBillClient.findAccountByExternalKey(user.id)
    if (!account || account.accountId !== kbAccountId) {
      return errorResponse('Account mismatch', 400)
    }

    // Check subscription status first
    const subscriptionStatus = await killBillClient.getSubscriptionStatus(
      user.id,
    )

    if (subscriptionStatus.hasActiveSubscription) {
      return successResponse(
        'Subscription already active',
        { message: 'Subscription already active' },
        200,
      )
    }

    // Complete the charge using KillBill
    const result = await killBillClient.charge(kbAccountId, sessionId)

    return successResponse(
      'Subscription activated successfully',
      {
        accountId: account.accountId,
        subscriptionId: result.subscription.subscriptionId,
        invoiceId: result.invoice?.invoiceId,
      },
      200,
    )
  } catch (error) {
    console.error('Subscription completion error:', error)
    Sentry.captureException(error)
    return errorResponse('Internal server error', 500)
  }
}
