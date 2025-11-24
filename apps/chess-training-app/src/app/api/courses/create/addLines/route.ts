// Add new lines to a course
import { z } from 'zod'

import { prisma } from '@server/db'

import type { CleanMove } from '@components/training/courses/create/parse/ParsePGNtoLineData'

import { apiWrapper } from '@utils/api-wrapper'
import { NotFound } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

const AddLinesSchema = z.object({
  courseId: z.string(),
  groupNames: z.array(z.string()),
  lines: z.array(
    z.object({
      groupName: z.string(),
      colour: z.string(),
      moves: z.array(z.any()), // CleanMove type - using any for simplicity
    }),
  ),
})

export const POST = apiWrapper(async (request, { user }) => {
  const { lines, courseId } = await validateBody(request, AddLinesSchema)

  const course = await prisma.course.findFirst({
    where: { id: courseId, createdBy: user.id },
    include: { groups: true },
  })

  if (!course) throw new NotFound('Course not found')

  // Create each new line if it doesn't already exist
  let newGroupCounter = 0
  const allGroups = [...course.groups]
  await Promise.all(
    lines.map(async (line, index) => {
      // Check if the group already exists, and if not create it
      let matchingGroup = allGroups.find(
        (group) => group.groupName === line.groupName,
      )
      if (!matchingGroup) {
        const newGroup = await prisma.group.create({
          data: {
            groupName: line.groupName,
            courseId: course.id,
            sortOrder: course.groups.length + newGroupCounter,
          },
        })
        matchingGroup = newGroup
        newGroupCounter++
        allGroups.push(newGroup)
      }

      // Now create the actual line & it's moves
      const transformedMoves = line.moves.map((move: CleanMove, index) => ({
        move: move.notation,
        moveNumber: Math.ceil((index + 1) / 2),
        colour: index % 2 === 0 ? true : false, // True for white, false for black
        ...(move.arrows && { arrows: move.arrows }),
        ...(move.comment && {
          comment: { create: { comment: move.comment.trim() } },
        }),
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

      // Now, we need to add this new line to ALL users who are enrolled in this course
      // TODO: Maybe turn this into a Cron Job that runs every 5 minutes or something checking for new lines to add to users
      const userCourses = await prisma.userCourse.findMany({
        where: { courseId: course.id },
      })

      await Promise.all(
        userCourses.map(async (userCourse) => {
          await prisma.userLine.create({
            data: {
              userId: userCourse.userId,
              userCourseId: userCourse.id,
              lineId: dbLine.id,
            },
          })
        }),
      )
    }),
  )

  return successResponse('Lines added', {})
})
