import { prisma } from '~/server/db'

import * as Sentry from '@sentry/nextjs'

export async function RemoveCourseFromUser(courseId: string, userId: string) {
  if (!courseId || !userId) return false

  try {
    await prisma.$transaction(async (prisma) => {
      const userCourse = await prisma.userCourse.findFirst({
        where: { courseId, userId },
      })

      if (!userCourse) throw new Error('User course not found')

      // delete user lines and fens then userCourse (cascade may handle some but be explicit)
      await prisma.userLine.deleteMany({
        where: { userCourseId: userCourse.id },
      })
      await prisma.userFen.deleteMany({
        where: { userCourseId: userCourse.id },
      })
      await prisma.userCourse.delete({ where: { id: userCourse.id } })
    })

    return true
  } catch (e) {
    Sentry.captureException(e)
    return false
  } finally {
    await prisma.$disconnect()
  }
}
