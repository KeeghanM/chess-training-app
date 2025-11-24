import { z } from 'zod'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { NotFound, Unauthorized } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

const UpdateCourseSchema = z.object({
  courseId: z.string(),
  courseName: z.string(),
  courseDescription: z.string(),
  shortDescription: z.string(),
  lines: z.array(
    z.object({
      id: z.number(),
      sortOrder: z.number(),
      trainable: z.boolean(),
    }),
  ),
  linesToDelete: z.array(z.number()),
  groups: z.array(
    z.object({
      id: z.string(),
      groupName: z.string(),
      sortOrder: z.number(),
    }),
  ),
})

export const PATCH = apiWrapper(async (request, { user }) => {
  const {
    courseId,
    courseName,
    courseDescription,
    shortDescription,
    lines,
    groups,
    linesToDelete,
  } = await validateBody(request, UpdateCourseSchema)

  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
    },
  })

  if (!course) throw new NotFound('Course not found')
  if (course.createdBy !== user.id) throw new Unauthorized('Unauthorized')

  await prisma.$transaction(async (prisma) => {
    await Promise.all(
      groups.map(async (group) => {
        await prisma.group.update({
          where: {
            id: group.id,
          },
          data: {
            groupName: group.groupName,
            sortOrder: group.sortOrder,
          },
        })
      }),
    )

    await Promise.all(
      lines.map(async (line) => {
        await prisma.line.update({
          where: {
            id: line.id,
          },
          data: {
            sortOrder: line.sortOrder,
            trainable: line.trainable,
          },
        })
      }),
    )

    await prisma.line.deleteMany({
      where: {
        id: {
          in: linesToDelete,
        },
      },
    })

    await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        courseName: courseName,
        courseDescription: courseDescription,
        shortDescription: shortDescription,
      },
    })
  })

  return successResponse('Course updated', {})
})
