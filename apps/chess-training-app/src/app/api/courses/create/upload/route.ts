import type { Course, Group as PrismaGroup } from '@prisma/client'
import { CreateCourseSchema } from '@schemas/courses'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, InternalError } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export const POST = apiWrapper(async (request, { user }) => {
  const { courseName, description, groupNames, lines, slug } =
    await validateBody(request, CreateCourseSchema)

  // Check if course name is available
  const existingCourse = await prisma.course.findFirst({
    where: {
      slug: slug,
    },
  })

  if (existingCourse) throw new BadRequest('Course name is not available')

  const { course, userCourse } = await prisma.$transaction(async (prisma) => {
    // Create a new global course and it's groups
    const course = (await prisma.course.create({
      include: {
        groups: true,
      },
      data: {
        courseName: courseName,
        courseDescription: description,
        createdBy: user.id,
        slug: slug,
        groups: {
          create: groupNames.map((group, index) => ({
            groupName: group.groupName,
            sortOrder: index,
          })),
        },
      },
    })) as Course & { groups: PrismaGroup[] }

    // Link the user to the course by creating their userCourse
    const userCourse = await prisma.userCourse.create({
      data: {
        course: {
          connect: {
            id: course.id,
          },
        },
        linesUnseen: lines.length,
        userId: user.id,
      },
    })

    return { course, userCourse }
  })

  if (!course || !userCourse)
    throw new InternalError('Course or userCourse not found')

  // TODO: Need to relook at a transaction here...
  // Create each new line and userLine
  await Promise.all(
    lines.map(async (line, index) => {
      const matchingGroup = course.groups.find(
        (group) => group.groupName === line.groupName,
      )
      if (!matchingGroup) throw new InternalError('Group not found')

      const transformedMoves = line.moves.map((move, index) => ({
        move: move.notation,
        moveNumber: Math.ceil((index + 1) / 2),
        colour: index % 2 === 0 ? true : false, // True for white, false for black
        arrows: move.arrows,
        comment: move.comment
          ? { create: { comment: move.comment.trim() } } // Create a comment in the comment table if there is one
          : undefined,
      }))

      const dbLine = await prisma.line.create({
        data: {
          colour: line.colour,
          groupId: matchingGroup.id,
          courseId: course.id,
          sortOrder: index,
          moves: {
            create: transformedMoves,
          },
        },
      })

      await prisma.userLine.create({
        data: {
          userId: user.id,
          userCourseId: userCourse.id,
          lineId: dbLine.id,
        },
      })
    }),
  )

  return successResponse('Course created', { slug })
})
