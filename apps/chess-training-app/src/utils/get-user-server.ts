import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import posthog from 'posthog-js'
import { v4 as uuidv4 } from 'uuid'
import { env } from '~/env'

import { prisma } from '@server/db'

import { killBillClient } from './kill-bill'

export type KindeUser = {
  id: string
  email: string | null
  given_name: string | null
  family_name: string | null
  picture: string | null
}

export async function getUserServer() {
  const { getUser, isAuthenticated, getPermissions } = getKindeServerSession()
  const user = (await getUser()) as KindeUser | null

  if (user) {
    const hasAuth = await isAuthenticated()
    const permissions = await getPermissions()
    const subscriptionStatus = await killBillClient.getSubscriptionStatus(
      user.id,
    )

    try {
      const profile = await prisma.userProfile.findFirst({
        where: {
          id: user.id,
        },
      })
      if (!profile) {
        throw new Error('User profile not found')
      }

      const badges = await prisma.userBadge.findMany({
        where: {
          userId: user.id,
        },
      })
      const isStaff = permissions?.permissions.includes('staff-member') ?? false
      const isPremium = subscriptionStatus.features.hasPremium

      return { user, hasAuth, profile, isStaff, isPremium, badges }
    } catch (e) {
      posthog.captureException(e)
    }
  }
  return {
    user,
    hasAuth: false,
    profile: null,
    isStaff: false,
    isPremium: false,
    badges: [],
  }
}

export async function createUserProfile(user: KindeUser) {
  try {
    const profile = await prisma.userProfile.findFirst({
      where: {
        id: user.id,
      },
    })
    if (profile) return // already exists

    const username = 'User' + uuidv4().slice(0, 8)
    const data = { id: user.id, username }

    // TODO: We need to have a retry mechanism here
    // for if the Username isn't unique (it's possible)
    await prisma.userProfile.create({
      data: data,
    })

    if (!user.email) return

    const email = user.email
    const firstName = user.given_name ?? ''
    const lastName = user.family_name ?? ''

    // create contact in Brevo
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        attributes: { FIRSTNAME: firstName, LASTNAME: lastName },
        listIds: [2],
        email,
        updateEnabled: true,
      }),
    })
  } catch (e) {
    posthog.captureException(e)
  }
}
