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

    const { action } = await request.json()

    if (action === 'create_checkout') {
      // Check if user already has a subscription
      const subscriptionStatus = await killBillClient.getSubscriptionStatus(
        user.id,
      )

      if (subscriptionStatus.hasActiveSubscription) {
        return errorResponse('Account already subscribed', 400)
      }

      const kbAccount = await killBillClient.findOrCreateAccount(
        user.id,
        user.given_name || 'User',
        user.email!,
      )

      console.log('KBAccount result:', kbAccount)

      if (!kbAccount || !kbAccount.accountId) {
        return errorResponse('Failed to create KillBill account', 500)
      }

      const baseUrl = new URL(request.url).origin
      const successUrl = `${baseUrl}/checkout/subscription-success?kbAccountId=${kbAccount.accountId}&sessionId={CHECKOUT_SESSION_ID}`

      const sessionId = await killBillClient.createSession(
        kbAccount.accountId,
        successUrl,
      )

      console.log('Session creation result:', sessionId)

      return successResponse(
        'Checkout Session Created',
        {
          sessionId: sessionId,
          accountId: kbAccount.accountId,
        },
        200,
      )
    }

    return errorResponse('Invalid action', 400)
  } catch (error) {
    console.error('Subscription API error:', error)
    Sentry.captureException(error)
    return errorResponse('Internal server error', 500)
  }
}

export async function DELETE() {
  try {
    const { user } = await getUserServer()
    if (!user) {
      return errorResponse('Unauthorized', 401)
    }

    // This automatically also cancels the addons
    await killBillClient.cancelSubscriptionByType(user.id, 'premium-monthly')

    return successResponse(
      'All subscriptions canceled successfully',
      { success: true },
      200,
    )
  } catch (error) {
    console.error('Subscription cancellation error:', error)
    Sentry.captureException(error)
    return errorResponse(
      'Failed to cancel subscription. Please try again.',
      500,
    )
  }
}
