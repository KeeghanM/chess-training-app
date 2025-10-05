import { prisma } from '~/server/db'
import * as Sentry from '@sentry/nextjs'
import { env } from '~/env'
import { getUserServer } from '@utils/getUserServer'
import { errorResponse, successResponse } from '../../responses'
import { AddCuratedSetToUser } from '../functions/AddCuratedSetToUser'
import {
  CreateCheckoutSession,
  getProductDetails,
} from '../functions/CreateCheckoutSession'

export async function POST(request: Request) {
  try {
    const { user, isPremium } = await getUserServer()
    if (!user) return errorResponse('Unauthorized', 401)

    const { productId } = (await request.json()) as {
      productId: string
    }

    if (!productId) return errorResponse('Missing productId', 400)

    // Check if the user already owns the set
    const existingSet = await prisma.tacticsSet.findFirst({
      where: {
        userId: user.id,
        curatedSetId: productId,
      },
    })

    if (existingSet) {
      if (!existingSet.active) {
        // Check if it was archived, in which case we can just unarchive it
        await prisma.tacticsSet.update({
          where: {
            id: existingSet.id,
          },
          data: {
            active: true,
          },
        })
      }

      return successResponse(
        'User already owns this set',
        { url: '/training/tactics/list' },
        200,
      )
    }

    // Check if the user has space
    const ownedSets = await prisma.tacticsSet.count({
      where: {
        userId: user.id,
        active: true,
      },
    })

    if (!isPremium && ownedSets >= env.NEXT_PUBLIC_MAX_SETS)
      return errorResponse('User has max sets', 400)

    // Now get the product details
    const { price, name } = await getProductDetails('curatedSet', productId)
    if (price === undefined || !name)
      return errorResponse('Product not found', 404)

    // If the product is free, add it
    if (price === 0) {
      await AddCuratedSetToUser(productId, user.id)
      return successResponse(
        'Set Purchased',
        { url: '/training/tactics/list' },
        200,
      )
    }

    // If the product is paid, create a checkout session
    const checkoutSession = await CreateCheckoutSession(
      [{ productType: 'curatedSet', productId }],
      '/training/tactics/list',
      user,
    )

    if (!checkoutSession) return errorResponse('Session creation failed', 500)

    return successResponse(
      'Checkout Session Created',
      { url: checkoutSession },
      200,
    )
  } catch (e) {
    Sentry.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Something went wrong', 500)
  }
}
