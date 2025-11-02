import { prisma } from '~/server/db'
import { getPostHogServer } from '~/server/posthog-server'

const posthog = getPostHogServer()

export async function AddCuratedSetToUser(setId: string, userId: string) {
  if (!setId || !userId) return false

  try {
    await prisma.$transaction(async (prisma) => {
      const curatedSet = await prisma.curatedSet.findUnique({
        where: {
          id: setId,
        },
        include: {
          puzzles: true,
        },
      })

      if (!curatedSet) throw new Error('Course not found')

      let userTacticsSet = await prisma.tacticsSet.findFirst({
        where: {
          curatedSetId: setId,
          userId: userId,
        },
      })

      if (!userTacticsSet) {
        const puzzles = curatedSet.puzzles.map((puzzle) => ({
          puzzleid: puzzle.puzzleid,
          sortOrder: puzzle.sortOrder,
        }))
        userTacticsSet = await prisma.tacticsSet.create({
          data: {
            name: curatedSet.name,
            userId: userId,
            curatedSetId: curatedSet.id,
            size: curatedSet.size,
            puzzles: {
              createMany: {
                data: puzzles,
              },
            },
            rounds: {
              create: {
                roundNumber: 1,
                timeSpent: 0,
                correct: 0,
                incorrect: 0,
              },
            },
          },
        })
      } else {
        await prisma.tacticsSet.update({
          where: {
            id: userTacticsSet.id,
          },
          data: {
            active: true,
          },
        })
      }

      await prisma.tacticsSetRound.create({
        data: {
          setId: userTacticsSet.id,
          roundNumber: 1,
          timeSpent: 0,
          correct: 0,
          incorrect: 0,
        },
      })

      if (!userTacticsSet) throw new Error('No userTacticsSet found')
    })

    return true
  } catch (e) {
    posthog.captureException(e)
    return false
  }
}
