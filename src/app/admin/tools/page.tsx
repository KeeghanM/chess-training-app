import { redirect } from 'next/navigation'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import Container from '~/app/components/_elements/container'
import PageHeader from '~/app/components/_layouts/pageHeader'
import UserAdminTool from '~/app/components/admin/tools/UserAdminTool'

export default async function AdminToolsPage() {
  const { getUser, getPermissions } = getKindeServerSession()
  const user = await getUser()
  if (!user) redirect('/auth/signin')
  const permissions = await getPermissions()
  if (!permissions?.permissions.includes('staff-member')) redirect('/dashboard')

  return (
    <>
      <PageHeader
        title="Admin: Tools"
        image={{ src: '/images/hero.avif', alt: 'Admin tools' }}
      />
      <Container>
        {/* @ts-expect-error Server component importing client component */}
        <UserAdminTool />
      </Container>
    </>
  )
}
