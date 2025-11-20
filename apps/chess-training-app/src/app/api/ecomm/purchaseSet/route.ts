import { TacticsSetStatus } from '@prisma/client'
import { PurchaseSchema } from '@schemas/ecomm'
import { env } from '~/env'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, InternalError, NotFound } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

import { addCuratedSetToUser } from '../../_business-logic/ecomm/add-curated-set-to-user'
import {
  createCheckoutSession,
  getProductDetails,
} from '../../_business-logic/ecomm/create-checkout-session'

export const POST = apiWrapper(async (request, { user, isPremium }) => {
  const { productId } = await validateBody(request, PurchaseSchema)

  // Check if the user already owns the set
  const existingSet = await prisma.tacticsSet.findFirst({
    where: {
      userId: user.id,
      curatedSetId: productId,
    },
  })

  if (existingSet) {
    if (existingSet.status === TacticsSetStatus.ARCHIVED) {
      // Check if it was archived, in which case we can just unarchive it
      await prisma.tacticsSet.update({
        where: {
          id: existingSet.id,
        },
        data: {
          status: TacticsSetStatus.ACTIVE,
        },
      })
    }

    return successResponse('User already owns this set', {
      url: '/training/tactics/list',
    } as Record<string, unknown>)
  }

  // Check if the user has space
  const ownedSets = await prisma.tacticsSet.count({
    where: {
      userId: user.id,
      status: TacticsSetStatus.ACTIVE,
    },
  })

  if (!isPremium && ownedSets >= env.NEXT_PUBLIC_MAX_SETS)
    throw new BadRequest('User has max sets')

  // Now get the product details
  const { price, name } = await getProductDetails('curatedSet', productId)
  if (price === undefined || !name) throw new NotFound('Product not found')

  // If the product is free, add it
  if (price === 0) {
    await addCuratedSetToUser(productId, user.id)
    return successResponse('Set Purchased', {
      url: '/training/tactics/list',
    } as Record<string, unknown>)
  }

  // If the product is paid, create a checkout session
  const checkoutSession = await createCheckoutSession(
    [{ productType: 'curatedSet', productId }],
    '/training/tactics/list',
    user,
  )

  if (!checkoutSession) throw new InternalError('Session creation failed')

  return successResponse('Checkout Session Created', {
    url: checkoutSession,
  } as Record<string, unknown>)
})
