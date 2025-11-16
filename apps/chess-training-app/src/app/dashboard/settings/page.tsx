import { redirect } from 'next/navigation'

import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import AccountForm from '@components/dashboard/AccountForm'
import SubscriptionManager from '@components/dashboard/SubscriptionManager'

import { getUserServer } from '@utils/getUserServer'

export default async function AccountSettingsPage() {
  const { user, profile } = await getUserServer()
  if (!user) redirect('/auth/signin')
  if (!profile) redirect('/dashboard/new')

  return (
    <div className="relative">
      <Backdrop />
      <Container className="space-y-4">
        <AccountForm profile={profile} />
        <SubscriptionManager />
      </Container>
    </div>
  )
}
