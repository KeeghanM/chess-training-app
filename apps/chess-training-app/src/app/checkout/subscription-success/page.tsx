'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'

type StatusType = 'loading' | 'success' | 'error'

function SubscriptionHandler() {
  const [status, setStatus] = useState<StatusType>('loading')
  const [message, setMessage] = useState('Processing your subscription...')
  const searchParams = useSearchParams()

  useEffect(() => {
    const completeSubscription = async () => {
      const sessionId = searchParams.get('sessionId')
      const kbAccountId = searchParams.get('kbAccountId')

      if (!sessionId || !kbAccountId) {
        console.error('Missing required parameters')
        updateStatus(
          'error',
          'Missing subscription parameters. Please contact support.',
        )
        return
      }

      try {
        const response = await fetch('/api/subscription-complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, kbAccountId }),
        })

        const result = await response.json()

        if (response.ok) {
          updateStatus(
            'success',
            'Your subscription has been activated successfully!',
          )
        } else {
          updateStatus(
            'error',
            result.message ||
              'Failed to activate subscription. Please contact support.',
          )
        }
      } catch (error) {
        console.error('Subscription completion error:', error)
        updateStatus(
          'error',
          'Failed to activate subscription. Please contact support.',
        )
      }
    }

    completeSubscription()
  }, [searchParams])

  function updateStatus(type: StatusType, msg: string) {
    setStatus(type)
    setMessage(msg)
  }

  return (
    <div className="space-y-4">
      {status === 'loading' && (
        <p className="text-gray-600 text-sm">{message}</p>
      )}

      {status === 'success' && (
        <>
          <p className="text-green-600 text-sm font-medium">{message}</p>
          <p className="text-gray-600 text-sm">
            You should receive a confirmation email shortly.
          </p>
        </>
      )}

      {status === 'error' && (
        <p className="text-red-600 text-sm font-medium">{message}</p>
      )}
    </div>
  )
}

export default function SubscriptionSuccessPage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl space-y-6 text-center py-8">
        <Heading as="h1">Subscription Status</Heading>

        <Suspense
          fallback={<p className="text-gray-600 text-sm">Loading...</p>}
        >
          <SubscriptionHandler />
        </Suspense>

        <div className="flex justify-center gap-4">
          <StyledLink href="/dashboard">Go to Dashboard</StyledLink>
          <StyledLink href="/premium">Premium Info</StyledLink>
        </div>
      </div>
    </Container>
  )
}
