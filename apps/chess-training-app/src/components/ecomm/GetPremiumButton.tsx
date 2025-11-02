'use client'

import { useState } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import posthog from 'posthog-js'
import type { ResponseJson } from '~/app/api/responses'
import Button from '../_elements/button'
import Spinner from '../general/Spinner'

// Extend the Window interface to include Stripe
declare global {
  interface Window {
    Stripe: (publishableKey: string) => {
      redirectToCheckout: (options: {
        sessionId: string
      }) => Promise<{ error?: Error }>
    }
  }
}

// Get the Stripe publishable key from environment variables
const PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY

export default function GetPremiumButton() {
  const { user } = useKindeBrowserClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getPremium = async () => {
    setLoading(true)

    try {
      if (!user) {
        window.location.href = '/auth/signin'
        return
      }

      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_checkout',
        }),
      })

      const result = (await response.json()) as ResponseJson

      if (!response.ok || !result?.data?.sessionId) {
        console.error('Checkout creation failed:', {
          responseOk: response.ok,
          status: response.status,
          result,
          hasSessionId: !!result?.data?.sessionId,
        })
        throw new Error(result?.message || 'Failed to create checkout session')
      }

      // The subscription endpoint gives us a Stripe SessionID
      // Which we now need to manually redirect the user to
      if (!window.Stripe) {
        console.error('Stripe.js not loaded')
        throw new Error(
          'Stripe.js library is not loaded. Please ensure Stripe.js is included and loaded before attempting checkout.',
        )
      }
      if (!PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        console.error('Stripe publishable key missing')
        throw new Error(
          'Stripe publishable key is missing. Please set the NEXT_PUBLIC_STRIPE_PUBLIC_KEY environment variable.',
        )
      }

      const stripe = window.Stripe(PUBLIC_STRIPE_PUBLISHABLE_KEY)

      await stripe.redirectToCheckout({
        sessionId: result.data.sessionId as string,
      })
    } catch (e) {
      console.error('Checkout process error:', e)
      posthog.captureException(e)
      setLoading(false)
      setError(true)
    }
  }

  return error ? (
    <p className="text-red-500">Oops, something went wrong!</p>
  ) : (
    <Button onClick={getPremium} variant="primary" disabled={loading}>
      {loading ? (
        <>
          Loading... <Spinner />
        </>
      ) : user ? (
        'Get Premium'
      ) : (
        'Sign in to get Premium'
      )}
    </Button>
  )
}
