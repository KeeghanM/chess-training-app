import { headers } from 'next/headers'

import Stripe from 'stripe'
import { env } from '~/env'

import { prisma } from '@server/db'

import { BadRequest, InternalError } from '@utils/errors'
import { publicApiWrapper } from '@utils/public-api-wrapper'
import { successResponse } from '@utils/server-responses'

import { addCourseToUser } from '../../_business-logic/ecomm/add-course-to-user'
import { addCuratedSetToUser } from '../../_business-logic/ecomm/add-curated-set-to-user'
import subscribeUser from '../../_business-logic/ecomm/subscribe-user'

const stripe = new Stripe(env.STRIPE_SECRET_KEY)

export const POST = publicApiWrapper(async (request) => {
  const payload = await request.text()
  const webHookSecret = env.STRIPE_WEBHOOK_SECRET
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    throw new BadRequest('Invalid signature')
  }

  let event: Stripe.Event | undefined

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webHookSecret)
  } catch (err) {
    let message = 'Unknown Error'
    if (err instanceof Error) message = err.message
    throw new BadRequest(`Webhook Error: ${message}`)
  }

  // handle purchase events
  if (event.type === 'checkout.session.completed') {
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
    )

    const dbSession = await prisma.checkoutSession.findUnique({
      where: {
        sessionId: checkoutSession.id,
      },
      include: {
        items: true,
      },
    })

    if (!dbSession) throw new InternalError('Database Session not found')

    for (const item of dbSession.items) {
      let added = false
      if (item.productType === 'curatedSet')
        added = await addCuratedSetToUser(item.productId, dbSession.userId)

      if (item.productType === 'course')
        added = await addCourseToUser(item.productId, dbSession.userId)

      if (item.productType === 'subscription') {
        const stripeCustomerId = checkoutSession.customer as string | null
        if (!stripeCustomerId) throw new InternalError('No customer ID found')

        added = await subscribeUser(stripeCustomerId, dbSession.userId)
      }

      if (!added)
        throw new InternalError(`Failed to add ${item.productType} to user`)
    }

    await prisma.checkoutSession.update({
      where: {
        sessionId: checkoutSession.id,
      },
      data: {
        processed: true,
      },
    })
  }

  // handle subscription ending
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object
    await prisma.userProfile.update({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
      data: {
        hasPremium: false,
      },
    })
  }

  return successResponse('Session Completed', {})
})
