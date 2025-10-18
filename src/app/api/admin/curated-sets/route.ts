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

  const { name, slug } = (await request.json()) as {
    name: string
    slug: string
  }
  if (!name || !slug) return errorResponse('Missing required fields', 400)

  // Check slug is valid
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  if (!slugRegex.test(slug)) return errorResponse('Invalid slug', 400)

  // Check if name is available
  const existingSet = await prisma.curatedSet.findFirst({
    where: {
      slug: slug,
    },
  })

  if (existingSet) return errorResponse('Set name is not available', 400)

  try {
    const set = await prisma.curatedSet.create({
      data: {
        name: name,
        slug: slug,
        size: 0,
      },
    })

    return successResponse('Set created', { set }, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('An error occurred', 500)
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

  const {
    id,
    name,
    slug,
    description,
    shortDesc,
    minRating,
    maxRating,
    price,
    published,
    size,
  } = (await request.json()) as {
    id: string
    name: string
    slug: string
    description: string
    shortDesc: string
    size: number
    minRating: number
    maxRating: number
    price: number
    published: boolean
  }
  if (
    !id ||
    !name ||
    !slug ||
    !minRating ||
    !maxRating ||
    price == undefined ||
    published == undefined ||
    size == undefined
  )
    return errorResponse('Missing required fields', 400)

  // Check slug is valid
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  if (!slugRegex.test(slug)) return errorResponse('Invalid slug', 400)

  // Check if name is available
  const existingSet = await prisma.curatedSet.findFirst({
    where: {
      slug: slug,
    },
  })

  if (existingSet && existingSet.id != id)
    return errorResponse('Set name is not available', 400)

  try {
    const set = await prisma.curatedSet.update({
      where: {
        id,
      },
      data: {
        name: name,
        description: description,
        shortDesc,
        minRating,
        maxRating,
        price: price,
        published: published,
        slug: slug,
        size: size,
      },
    })

    return successResponse('Set updated', { set }, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('An error occurred', 500)
  }
}

export async function DELETE(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const permissions = await session.getPermissions()
  if (!permissions?.permissions.includes('staff-member'))
    return errorResponse('Unauthorized', 401)

  const { id } = (await request.json()) as {
    id: string
  }
  if (!id) return errorResponse('Missing required fields', 400)

  try {
    await prisma.curatedSet.delete({
      where: {
        id: id,
      },
    })

    return successResponse('Set deleted', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('An error occurred', 500)
  }
}
