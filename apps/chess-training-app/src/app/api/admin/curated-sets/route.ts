import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { successResponse } from '@utils/server-responses'

export const POST = apiWrapper(
  async (request) => {
    const { name, slug } = (await request.json()) as {
      name: string
      slug: string
    }
    if (!name || !slug) throw new BadRequest('Missing required fields')

    // Check slug is valid
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(slug)) throw new BadRequest('Invalid slug')

    // Check if name is available
    const existingSet = await prisma.curatedSet.findFirst({
      where: {
        slug: slug,
      },
    })

    if (existingSet) throw new BadRequest('Set name is not available')

    const set = await prisma.curatedSet.create({
      data: {
        name: name,
        slug: slug,
        size: 0,
      },
    })

    return successResponse('Set created', { set })
  },
  { needsAdmin: true },
)

export const PATCH = apiWrapper(
  async (request) => {
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
      throw new BadRequest('Missing required fields')

    // Check slug is valid
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(slug)) throw new BadRequest('Invalid slug')

    // Check if name is available
    const existingSet = await prisma.curatedSet.findFirst({
      where: {
        slug: slug,
      },
    })

    if (existingSet && existingSet.id != id)
      throw new BadRequest('Set name is not available')

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

    return successResponse('Set updated', { set })
  },
  { needsAdmin: true },
)

export const DELETE = apiWrapper(
  async (request) => {
    const { id } = (await request.json()) as {
      id: string
    }
    if (!id) throw new BadRequest('Missing required fields')

    await prisma.curatedSet.delete({
      where: {
        id: id,
      },
    })

    return successResponse('Set deleted', {})
  },
  { needsAdmin: true },
)
