import { redirect } from 'next/navigation'
import Container from '@components/_elements/container'
import AccountForm from '@components/dashboard/AccountForm'
import SubscriptionManager from '@components/dashboard/SubscriptionManager'
import { getUserServer } from '@utils/getUserServer'

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
