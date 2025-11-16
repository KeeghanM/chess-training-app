import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

import { withAdminAuth } from '@utils/admin-auth'
import { errorResponse, successResponse } from '@utils/server-responsses'

const posthog = getPostHogServer()

export const POST = withAdminAuth(async (request) => {
  const { name, description, category } = (await request.json()) as {
    name: string
    description: string
    category: string
  }
  if (!name || !description || !category)
    return errorResponse('Missing required fields', 400)

  const existingBadge = await prisma.badge.findFirst({
    where: {
      name,
    },
  })

  if (existingBadge) return errorResponse('Badge name is not available', 400)

  try {
    const badge = await prisma.badge.create({
      data: {
        name,
        description,
        category,
      },
    })
    return successResponse('Badge created', { badge }, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('Internal server error', 500)
  }
})

export const PATCH = withAdminAuth(async (request) => {
  const { name, sort } = (await request.json()) as {
    name: string
    sort: number
  }

  const existingBadge = await prisma.badge.findFirst({
    where: {
      name,
    },
  })

  if (!existingBadge) return errorResponse('Badge not found', 400)

  try {
    const badge = await prisma.badge.update({
      where: {
        name,
      },
      data: {
        sort,
      },
    })
    return successResponse('Badge updated', { badge }, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('Internal server error', 500)
  }
})
