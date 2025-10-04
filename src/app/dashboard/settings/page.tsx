import { redirect } from 'next/navigation'

import Container from '~/app/components/_elements/container'
import AccountForm from '~/app/components/dashboard/AccountForm'
import SubscriptionManager from '~/app/components/dashboard/SubscriptionManager'

import { getUserServer } from '~/app/_util/getUserServer'

export default async function AccountSettingsPage() {
  const { user, profile } = await getUserServer()
  if (!user) redirect('/auth/signin')
  if (!profile) redirect('/dashboard/new')

  return (
    <div className="">
      <Container>
        <div className="space-y-8">
          <AccountForm profile={profile} />
          <SubscriptionManager />
        </div>
      </Container>
    </div>
  )
}
