import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(
  async (request) => {
    const { name, description, category } = (await request.json()) as {
      name: string
      description: string
      category: string
    }
    if (!name || !description || !category)
      throw new BadRequest('Missing required fields')

    const existingBadge = await prisma.badge.findFirst({
      where: {
        name,
      },
    })

    if (existingBadge) throw new BadRequest('Badge name is not available')

    const badge = await prisma.badge.create({
      data: {
        name,
        description,
        category,
      },
    })
    return successResponse('Badge created', { badge })
  },
  { needsAdmin: true },
)

export const PATCH = apiWrapper(
  async (request) => {
    const { name, sort } = (await request.json()) as {
      name: string
      sort: number
    }

    const existingBadge = await prisma.badge.findFirst({
      where: {
        name,
      },
    })

    if (!existingBadge) throw new BadRequest('Badge not found')

    const badge = await prisma.badge.update({
      where: {
        name,
      },
      data: {
        sort,
      },
    })
    return successResponse('Badge updated', { badge })
  },
  { needsAdmin: true },
)
