'use client';

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { useRouter } from 'next/navigation';

import { Button } from '@/app/components/_elements/button';

export function UserButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <Button variant="accent" onClick={() => router.push('/dashboard')}>
        Dashboard
      </Button>
      <LogoutLink>
        <Button variant="danger">Sign out</Button>
      </LogoutLink>
    </div>
  );
}
