import { redirect } from 'next/navigation'
import { prisma } from '~/server/db'
import Container from '@components/_elements/container'
import PageHeader from '@components/_layouts/pageHeader'
import BadgeCreator from '@components/admin/BadgeCreator'
import ExistingBadges from '@components/admin/ExistingBadges'
import { getUserServer } from '@utils/getUserServer'

export default async function AdminBadgePage() {
  const { user, isStaff } = await getUserServer()
  if (!user) redirect('/auth/signin')
  if (!isStaff) redirect('/dashboard')

  const existingBadges = await prisma.badge.findMany().then((badges) => {
    return badges.sort((a, b) => a.sort - b.sort)
  })

  return (
    <>
      <PageHeader title="Admin: Badges" />
      <Container>
        <BadgeCreator />
        <ExistingBadges existingBadges={existingBadges} />
      </Container>
    </>
  )
}
