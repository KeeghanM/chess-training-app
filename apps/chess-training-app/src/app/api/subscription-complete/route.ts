import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { killBillClient } from '@utils/kill-bill'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(async (request, { user }) => {
  const { sessionId, kbAccountId } = await request.json()

  if (!sessionId || !kbAccountId) {
    throw new BadRequest('Missing required parameters')
  }

  // Get the account from KillBill
  const account = await killBillClient.findAccountByExternalKey(user.id)
  if (!account || account.accountId !== kbAccountId) {
    throw new BadRequest('Account mismatch')
  }

  // Check subscription status first
  const subscriptionStatus = await killBillClient.getSubscriptionStatus(user.id)

  if (subscriptionStatus.hasActiveSubscription) {
    return successResponse('Subscription already active', {
      message: 'Subscription already active',
    } as Record<string, unknown>)
  }

  // Complete the charge using KillBill
  const result = await killBillClient.charge(kbAccountId, sessionId)

  return successResponse('Subscription activated successfully', {
    accountId: account.accountId,
    subscriptionId: result.subscription.subscriptionId,
    invoiceId: result.invoice?.invoiceId,
  } as Record<string, unknown>)
})
