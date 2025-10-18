import { prisma } from '~/server/db'

import * as Sentry from '@sentry/nextjs'

export async function RemoveCuratedSetFromUser(setId: string, userId: string) {
  if (!setId || !userId) return false

  try {
    await prisma.$transaction(async (prisma) => {
      // Find the user's tactics set linked to the curated set
      const userTacticsSet = await prisma.tacticsSet.findFirst({
        where: { curatedSetId: setId, userId },
        include: { puzzles: true },
      })

      if (!userTacticsSet) throw new Error('User tactics set not found')

      // Delete puzzles, rounds and the set itself (cascades configured)
      await prisma.tacticsSet.delete({ where: { id: userTacticsSet.id } })
    })

    return true
  } catch (e) {
    Sentry.captureException(e)
    return false
  }
}
