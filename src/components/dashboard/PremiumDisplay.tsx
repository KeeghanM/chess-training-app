'use client'

import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '../_elements/tooltip'

export default function PremiumDisplay({ isPremium }: { isPremium: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild={true}>
        <Link
          className={
            'p-2 text-xs mx-2 w-fit text-white shadow rounded-lg ' +
            (isPremium ? ' bg-primary' : ' bg-bg')
          }
          href={isPremium ? '/dashboard/settings' : '/premium'}
        >
          {isPremium ? 'Premium' : 'Free'}
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        {isPremium
          ? 'Manage your Premium'
          : 'Learn More about Premium Membership'}
      </TooltipContent>
    </Tooltip>
  )
}
