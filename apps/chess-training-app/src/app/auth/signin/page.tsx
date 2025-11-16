import { redirect } from 'next/navigation'
import { getUserServer } from '@utils/getUserServer'
import { env } from '~/env'

export default async function SignIn() {
  const { user } = await getUserServer()

  if (user) redirect('/dashboard')
  else
    redirect(
      `/api/auth/login?post_login_redirect_url=${env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    )
}
