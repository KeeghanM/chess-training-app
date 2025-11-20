import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

const posthog = getPostHogServer()

export default async function subscribeUser(
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
    posthog.captureException(e)
    return false
  }
}
