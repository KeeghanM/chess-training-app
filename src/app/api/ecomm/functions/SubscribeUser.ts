import { prisma } from '~/server/db'
import * as Sentry from '@sentry/nextjs'

export default async function SubscribeUser(
  stripeCustomerId: string,
  userId: string,
) {
  if (!stripeCustomerId) return false
  if (!userId) return false

  try {
    await prisma.userProfile.update({
      where: {
        id: userId,
      },
      data: {
        stripeCustomerId: stripeCustomerId,
        hasPremium: true,
      },
    })

    return true
  } catch (e) {
    Sentry.captureException(e)
    return false
  }
}
