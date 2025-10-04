'use client'

import Link from 'next/link'

import { Tooltip, TooltipContent, TooltipTrigger } from '../_elements/tooltip'

export default function PremiumDisplay(props: { isPremium: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link
          className={
            'p-2 text-xs mx-2 w-fit text-white shadow ' +
            (props.isPremium ? ' bg-orange-500' : ' bg-gray-500')
          }
          href="/premium"
        >
          {props.isPremium ? 'Premium' : 'Free'}
        </Link>
      </TooltipTrigger>
      <TooltipContent>Learn More about Premium Membership</TooltipContent>
    </Tooltip>
  )
}
