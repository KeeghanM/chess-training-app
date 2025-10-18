import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const permissions = await session.getPermissions()
  if (!permissions?.permissions.includes('staff-member'))
    return errorResponse('Unauthorized', 401)

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
}

export async function PATCH(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const permissions = await session.getPermissions()
  if (!permissions?.permissions.includes('staff-member'))
    return errorResponse('Unauthorized', 401)

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
}
