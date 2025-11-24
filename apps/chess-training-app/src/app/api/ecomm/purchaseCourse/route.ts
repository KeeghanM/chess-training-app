import { PurchaseSchema } from '@schemas/ecomm'
import { env } from '~/env'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, InternalError, NotFound } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

import { addCourseToUser } from '../../_business-logic/ecomm/add-course-to-user'
import {
  createCheckoutSession,
  getProductDetails,
} from '../../_business-logic/ecomm/create-checkout-session'

export const POST = apiWrapper(async (request, { user, isPremium }) => {
  const { productId } = await validateBody(request, PurchaseSchema)

  // Check if the user already owns the course
  const existingCourse = await prisma.userCourse.findFirst({
    where: {
      userId: user.id,
      courseId: productId,
    },
  })

  if (existingCourse) {
    if (!existingCourse.active) {
      // Check if it was archived, in which case we can just unarchive it
      await prisma.userCourse.update({
        where: {
          id: existingCourse.id,
        },
        data: {
          active: true,
        },
      })
    }

    return successResponse('User already owns this course', {
      url: '/training/courses',
    } as Record<string, unknown>)
  }

  // Check if the user has space
  const ownedCourses = await prisma.userCourse.count({
    where: {
      userId: user.id,
      active: true,
    },
  })

  if (!isPremium && ownedCourses >= env.NEXT_PUBLIC_MAX_COURSES)
    throw new BadRequest('User has max courses')

  // Now get the product details
  const { price, name } = await getProductDetails('course', productId)
  if (price === undefined || !name) throw new NotFound('Product not found')

  // If the product is free, add it
  if (price === 0) {
    await addCourseToUser(productId, user.id)
    return successResponse('Course Purchased', {
      url: '/training/courses',
    } as Record<string, unknown>)
  }

  // If the product is paid, create a checkout session
  const checkoutSession = await createCheckoutSession(
    [{ productType: 'course', productId }],
    '/training/courses',
    user,
  )

  if (!checkoutSession) throw new InternalError('Session creation failed')

  return successResponse('Checkout Session Created', {
    url: checkoutSession,
  } as Record<string, unknown>)
})
