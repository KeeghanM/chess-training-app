import { headers } from 'next/headers'
import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'
import Stripe from 'stripe'
import { errorResponse, successResponse } from '../../responses'
import { AddCourseToUser } from '../functions/AddCourseToUser'
import { AddCuratedSetToUser } from '../functions/AddCuratedSetToUser'
import SubscribeUser from '../functions/SubscribeUser'

const posthog = getPostHogServer()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    const payload = await request.text()
    const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET!
    const signature = (await headers()).get('stripe-signature')

    if (!signature) {
      posthog.captureException(new Error('No stripe signature provided'))
      return errorResponse('Invalid signature', 400)
    }

    let event: Stripe.Event | undefined

    try {
      event = stripe.webhooks.constructEvent(payload, signature, webHookSecret)
    } catch (err) {
      let message = 'Unknown Error'
      if (err instanceof Error) message = err.message
      posthog.captureException(err)
      return errorResponse(`Webhook Error: ${message}`, 400)
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

      if (!dbSession) throw new Error('Database Session not found')

      for (const item of dbSession.items) {
        let added = false
        if (item.productType === 'curatedSet')
          added = await AddCuratedSetToUser(item.productId, dbSession.userId)

        if (item.productType === 'course')
          added = await AddCourseToUser(item.productId, dbSession.userId)

        if (item.productType === 'subscription') {
          const stripeCustomerId = checkoutSession.customer as string | null
          if (!stripeCustomerId) throw new Error('No customer ID found')

          added = await SubscribeUser(stripeCustomerId, dbSession.userId)
        }

        if (!added)
          posthog.captureException(
            new Error(`Failed to add ${item.productType} to user`),
          )
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

    return successResponse('Session Completed', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
