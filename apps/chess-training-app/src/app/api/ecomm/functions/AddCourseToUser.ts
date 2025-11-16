import { prisma } from '@server/db'
import { getPostHogServer } from '@server/posthog-server'

const posthog = getPostHogServer()

export async function AddCourseToUser(courseId: string, userId: string) {
  if (!userId) return false

  if (!courseId) return false

  try {
    await prisma.$transaction(async (prisma) => {
      const course = await prisma.course.findFirst({
        where: {
          id: courseId,
        },
        include: {
          lines: true,
        },
      })

      if (!course) throw new Error('Course not found')

      let userCourse = await prisma.userCourse.findFirst({
        where: {
          userId: userId,
          courseId: course.id,
        },
      })

      // Create a new userCourse if it doesn't exist (ie. user hasn't bought the course yet)
      // Otherwise, update the existing userCourse (ie. user has bought the course before, but it's archived)
      if (!userCourse) {
        userCourse = await prisma.userCourse.create({
          data: {
            userId: userId,
            courseId: course.id,
            linesUnseen: course.lines.length,
          },
        })
      } else {
        await prisma.userCourse.update({
          where: {
            id: userCourse.id,
          },
          data: {
            linesUnseen: course.lines.length,
            active: true,
          },
        })
      }

      if (!userCourse) throw new Error('User course not found')

      // Create each new line and userLine
      await Promise.all(
        course.lines.map(async (line) => {
          await prisma.userLine.create({
            data: {
              userId: userId,
              userCourseId: userCourse.id,
              lineId: line.id,
            },
          })
        }),
      )
    })

    return true
  } catch (e) {
    posthog.captureException(e)
    return false
  }
}
