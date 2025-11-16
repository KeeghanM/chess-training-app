'use client'

import { useRouter } from 'next/navigation'
import Button from '@components/_elements/button'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

export default function UserButtons() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <Button onClick={() => router.push('/dashboard')} variant="accent">
        Dashboard
      </Button>
      <LogoutLink>
        <Button variant="danger">Sign out</Button>
      </LogoutLink>
    </div>
  )
}
