import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import type { Course, Group as PrismaGroup } from '@prisma/client'

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

  const { courseName, description, groupNames, lines, slug } =
    (await request.json()) as {
      courseName: string
      slug: string
      description: string
      groupNames: {
        groupName: string
      }[]
      lines: {
        groupName: string
        colour: string
        moves: CleanMove[]
      }[]
    }

  if (!courseName || !groupNames || !lines || !slug)
    return errorResponse('Missing required fields', 400)

  // Check slug is valid
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  if (!slugRegex.test(slug)) return errorResponse('Invalid slug', 400)

  // Check if course name is available
  const existingCourse = await prisma.course.findFirst({
    where: {
      slug: slug,
    },
  })

  if (existingCourse) return errorResponse('Course name is not available', 400)

  try {
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
      throw new Error('Course or userCourse not found')

    // TODO: Need to relook at a transaction here...
    // Create each new line and userLine
    await Promise.all(
      lines.map(async (line, index) => {
        const matchingGroup = course.groups.find(
          (group) => group.groupName === line.groupName,
        )
        if (!matchingGroup) throw new Error('Group not found')

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

    return successResponse('Course created', { slug }, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
