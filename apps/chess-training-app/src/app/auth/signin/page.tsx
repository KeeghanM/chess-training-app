import { redirect } from 'next/navigation'

import { env } from '~/env'

import { getUserServer } from '@utils/get-user-server'

export default async function SignIn() {
  const { user } = await getUserServer()

  if (user) redirect('/dashboard')
  else
    redirect(
      `/api/auth/login?post_login_redirect_url=${env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    )
}
