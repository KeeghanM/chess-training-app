import { prisma } from '~/server/db'
import * as Sentry from '@sentry/nextjs'

export async function AddBadgeToUser(userId: string, name: string) {
  if (!name || !userId) return

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { id: userId },
    })
    if (!profile) throw new Error('Profile not found')

    // Check if the user already has the badge
    const existingBadge = await prisma.userBadge.findFirst({
      where: {
        badgeName: name,
        userId: userId,
      },
    })
    if (existingBadge) return

    // Add the badge
    await prisma.userBadge.create({
      data: {
        badgeName: name,
        userId: userId,
      },
    })
    return
  } catch (e) {
    Sentry.captureException(e)
  }
}

export async function RemoveBadgeFromUser(userId: string, name: string) {
  if (!name || !userId) return

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { id: userId },
    })
    if (!profile) throw new Error('Profile not found')

    // Check if the user already has the badge
    const existingBadge = await prisma.userBadge.findFirst({
      where: {
        badgeName: name,
        userId: userId,
      },
    })
    if (!existingBadge) return

    // Remove the badge
    await prisma.userBadge.delete({
      where: {
        id: existingBadge.id,
      },
    })
    return
  } catch (e) {
    Sentry.captureException(e)
  }
}
