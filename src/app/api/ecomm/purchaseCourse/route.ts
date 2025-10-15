import { prisma } from '~/server/db'
import * as Sentry from '@sentry/nextjs'
import { env } from '~/env'
import { getUserServer } from '@utils/getUserServer'
import { errorResponse, successResponse } from '../../responses'
import { AddCourseToUser } from '../functions/AddCourseToUser'
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

      return successResponse(
        'User already owns this course',
        { url: '/training/courses' },
        200,
      )
    }

    // Check if the user has space
    const ownedCourses = await prisma.userCourse.count({
      where: {
        userId: user.id,
        active: true,
      },
    })

    if (!isPremium && ownedCourses >= env.NEXT_PUBLIC_MAX_COURSES)
      return errorResponse('User has max courses', 400)

    // Now get the product details
    const { price, name } = await getProductDetails('course', productId)
    if (price === undefined || !name)
      return errorResponse('Product not found', 404)

    // If the product is free, add it
    if (price === 0) {
      await AddCourseToUser(productId, user.id)
      return successResponse(
        'Course Purchased',
        { url: '/training/courses' },
        200,
      )
    }

    // If the product is paid, create a checkout session
    const checkoutSession = await CreateCheckoutSession(
      [{ productType: 'course', productId }],
      '/training/courses',
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
