import { prisma } from '~/server/db'
import * as Sentry from '@sentry/nextjs'
import Stripe from 'stripe'
import type { KindeUser } from '@utils/getUserServer'

type ProductType = 'curatedSet' | 'course' | 'subscription'

export async function CreateCheckoutSession(
  products: { productType: ProductType; productId: string }[],
  returnUrl: string,
  user: KindeUser,
) {
  try {
    const lineItems = await Promise.all(
      products.map(async (product) => {
        const { price, name } = await getProductDetails(
          product.productType,
          product.productId,
        )
        if (!price || !name) throw new Error('Product not found')

        const recurring = (
          product.productType === 'subscription'
            ? {
                interval: 'month',
                interval_count: 1,
              }
            : undefined
        ) as { interval: 'month'; interval_count: number } | undefined

        return {
          price_data: {
            currency: 'GBP',
            product_data: {
              name,
              metadata: {
                productId: product.productId,
                productType: product.productType,
              },
            },
            unit_amount: price,
            recurring,
          },
          quantity: 1,
        }
      }),
    )

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    const hasSubscription = products.some(
      (product) => product.productType === 'subscription',
    )

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      customer_email: user.email ?? undefined,
      line_items: lineItems,
      mode: hasSubscription ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${returnUrl ?? '/'}`,
      automatic_tax: { enabled: true },
    })

    if (!checkoutSession.url) throw new Error('Session creation failed')

    // Now that we have the session, before redirecting to Stripe, we need to save the session ID with the user in the database
    await prisma.checkoutSession.create({
      data: {
        sessionId: checkoutSession.id,
        userId: user.id,
        items: {
          createMany: {
            data: products.map((product) => ({
              productId: product.productId,
              productType: product.productType.toString(),
            })),
          },
        },
      },
    })

    return checkoutSession.url
  } catch (e) {
    Sentry.captureException(e)
    return undefined
  }
}

export async function getProductDetails(
  productType: ProductType,
  productId: string,
) {
  try {
    if (productType === 'curatedSet') {
      const set = await prisma.curatedSet.findFirst({
        where: {
          id: productId,
        },
      })
      if (!set) throw new Error('Set not found')
      return { price: set.price, name: set.name }
    } else if (productType === 'course') {
      const course = await prisma.course.findFirst({
        where: {
          id: productId,
        },
      })
      if (!course) throw new Error('Course not found')
      return { price: course.price, name: course.courseName }
    } else if (productType === 'subscription') {
      return { price: 299, name: 'Premium Subscription' }
    } else {
      throw new Error('Invalid product type')
    }
  } catch (e) {
    Sentry.captureException(e)
    return { price: undefined, name: undefined }
  }
}
