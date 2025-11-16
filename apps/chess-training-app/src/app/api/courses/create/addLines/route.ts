// Add new lines to a course
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

import type { CleanMove } from '@components/training/courses/create/parse/ParsePGNtoLineData'

import { errorResponse, successResponse } from '@utils/server-responsses'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { groupNames, lines, courseId } = (await request.json()) as {
    courseId: string
    groupNames: string[]
    lines: {
      groupName: string
      colour: string
      moves: CleanMove[]
    }[]
  }

  if (!groupNames || !lines || !courseId)
    return errorResponse('Missing required fields', 400)

  try {
    const course = await prisma.course.findFirst({
      where: { id: courseId, createdBy: user.id },
      include: { groups: true },
    })

    if (!course) return errorResponse('Course not found', 404)

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

    return successResponse('Lines added', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
