'use client'

import Link from 'next/link'

import { useState } from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import * as Sentry from '@sentry/nextjs'
import type { ResponseJson } from '~/app/api/responses'
import { env } from '~/env'

import Button from '../_elements/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../_elements/tooltip'
import Spinner from '../general/Spinner'

export default function GetCuratedSet(props: {
  setId: string
  price: number
  slug: string
  userSetId?: string
  showPrice: boolean
}) {
  const { setId, price, slug, userSetId, showPrice } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useKindeBrowserClient()

  const handleBuy = async () => {
    if (!user) {
      window.location.href = `/api/auth/login?post_login_redirect_url=${env.NEXT_PUBLIC_SITE_URL}/training/tactics/curated-sets/${slug}`
      return
    }
    setLoading(true)
    try {
      const resp = await fetch('/api/ecomm/purchaseSet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: setId,
        }),
      })
      const json = (await resp.json()) as ResponseJson
      if (json?.data?.url == undefined) throw new Error(json?.message)

      window.location.href = json.data.url as string
    } catch (e) {
      Sentry.captureException(e)
      setError('Something went wrong, please try again later')
      setLoading(false)
    }
  }

  return error ? (
    <p className="text-red-500">{error}</p>
  ) : (
    <div>
      {userSetId ? (
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <Link href={`/training/tactics/list/${userSetId}`}>
              <Button variant="accent">Train Now</Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>You already own this Tactics Set!</TooltipContent>
        </Tooltip>
      ) : (
        <Button disabled={loading} variant="accent" onClick={handleBuy}>
          {loading ? (
            <>
              Processing... <Spinner />
            </>
          ) : price > 0 ? (
            showPrice ? (
              `Buy for £${price / 100}`
            ) : (
              `Buy Now`
            )
          ) : (
            'Get for Free'
          )}
        </Button>
      )}
    </div>
  )
}
