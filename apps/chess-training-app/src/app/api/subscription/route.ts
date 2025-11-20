import { SubscriptionActionSchema } from '@schemas/ecomm'
import { env } from '~/env'

import { getPostHogServer } from '@server/posthog-server'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, InternalError } from '@utils/errors'
import { killBillClient } from '@utils/kill-bill'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

const posthog = getPostHogServer()

export const POST = apiWrapper(async (request, { user }) => {
  const { action } = await validateBody(request, SubscriptionActionSchema)

  if (action === 'create_checkout') {
    // Check if user already has a subscription
    const subscriptionStatus = await killBillClient.getSubscriptionStatus(
      user.id,
    )

    if (subscriptionStatus.hasActiveSubscription) {
      throw new BadRequest('Account already subscribed')
    }

    const kbAccount = await killBillClient.findOrCreateAccount(
      user.id,
      user.given_name || 'User',
      user.email!,
    )

    if (!kbAccount || !kbAccount.accountId) {
      throw new InternalError('Failed to create KillBill account')
    }

    const successUrl = `${env.NEXT_PUBLIC_SITE_URL}/checkout/subscription-success?kbAccountId=${kbAccount.accountId}&sessionId={CHECKOUT_SESSION_ID}`

    const sessionId = await killBillClient.createSession(
      kbAccount.accountId,
      successUrl,
    )

    return successResponse('Checkout Session Created', {
      sessionId: sessionId,
      accountId: kbAccount.accountId,
    } as Record<string, unknown>)
  }

  throw new BadRequest('Invalid action')
})

export const DELETE = apiWrapper(async (_request, { user }) => {
  try {
    // This automatically also cancels the addons
    await killBillClient.cancelSubscriptionByType(user.id, 'premium-monthly')

    return successResponse('All subscriptions canceled successfully', {
      success: true,
    } as Record<string, unknown>)
  } catch (error) {
    posthog.captureException(error)
    throw new InternalError('Failed to cancel subscription. Please try again.')
  }
})
