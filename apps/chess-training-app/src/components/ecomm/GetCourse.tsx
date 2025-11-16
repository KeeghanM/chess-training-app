'use client'

import Link from 'next/link'

import { useState } from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { env } from '~/env'

import type { ResponseJson } from '@utils/server-responsses'

import Button from '../_elements/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../_elements/tooltip'
import Spinner from '../general/Spinner'

export default function GetCourse(props: {
  courseId: string
  price: number
  slug: string
  userCourseId?: string
  showPrice: boolean
}) {
  const { courseId, price, userCourseId, slug, showPrice } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useKindeBrowserClient()

  const handleBuy = async () => {
    if (!user) {
      window.location.href = `/api/auth/login?post_login_redirect_url=${env.NEXT_PUBLIC_SITE_URL}/courses/${slug}`
      return
    }
    setLoading(true)
    try {
      const resp = await fetch('/api/ecomm/purchaseCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: courseId,
        }),
      })
      const json = (await resp.json()) as ResponseJson
      if (json?.data?.url == undefined) throw new Error(json?.message)

      window.location.href = json.data.url as string
    } catch (e) {
      if (e instanceof Error) setError(e.message)
      else setError('Something went wrong, please try again later')
    } finally {
      setLoading(false)
    }
  }

  return userCourseId ? (
    <Tooltip>
      <TooltipTrigger asChild={true}>
        <Link href={`/training/courses/${userCourseId}`}>
          <Button variant="primary">Train Now</Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>You already own this course!</TooltipContent>
    </Tooltip>
  ) : (
    <>
      <Button disabled={loading} variant="primary" onClick={handleBuy}>
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
      {error && <p className="text-red-500">{error}</p>}
    </>
  )
}
