'use client'

import { useCallback, useEffect, useState } from 'react'
import * as Sentry from '@sentry/react'
import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import GetPremiumButton from '@components/ecomm/GetPremiumButton'
import Spinner from '@components/general/Spinner'
import type { SubscriptionStatus } from '@utils/KillBill'

interface ApiResponse {
  success: boolean
  message?: string
  data?: SubscriptionStatus
}

export default function SubscriptionManager() {
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscriptionStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/subscription-status')
      const result = await response.json()

      if (response.ok) {
        setSubscriptionStatus(result.data.data)
      } else {
        setError(result.message || 'Failed to load subscription status')
      }
    } catch (err) {
      console.error('Error fetching subscription status:', err)
      setError('Failed to load subscription status')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubscriptionStatus()
  }, [fetchSubscriptionStatus])

  const cancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) {
      return
    }

    setActionLoading(true)
    try {
      const response = await fetch('/api/subscription', {
        method: 'DELETE',
      })

      const result = (await response.json()) as ApiResponse

      if (response.ok) {
        await fetchSubscriptionStatus() // Refresh status
        window.location.reload()
      } else {
        throw new Error(result.message || 'Failed to cancel subscription')
      }
    } catch (err) {
      console.error('Error canceling subscription:', err)
      Sentry.captureException(err)
      setError('Failed to cancel subscription')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-0 border border-gray-300   shadow-md  bg-[rgba(0,0,0,0.03)] ">
        <div className="flex flex-col md:flex-row px-2 py-1 border-b border-gray-300  items-center justify-between">
          <Heading className="text-orange-500 !m-0 !p-0" as={'h2'}>
            Subscription Management
          </Heading>
        </div>

        <div className="p-2">
          <p>Loading subscription status...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col gap-0 border border-gray-300   shadow-md  bg-[rgba(0,0,0,0.03)]  space-y-4">
        <Heading as="h2">Subscription Management</Heading>
        <p className="text-red-600">{error}</p>
        <Button
          onClick={() => {
            window.location.reload()
          }}
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (!subscriptionStatus) {
    return null
  }

  return (
    <div className="flex flex-col gap-0 border border-gray-300   shadow-md  bg-[rgba(0,0,0,0.03)] ">
      <div className="flex flex-col md:flex-row px-2 py-1 border-b border-gray-300  items-center justify-between">
        <Heading className="text-orange-500 !m-0 !p-0" as={'h2'}>
          Subscription Management
        </Heading>
      </div>

      <div className="space-y-4 p-2">
        <div>
          <h3 className="font-semibold text-lg">Current Plan</h3>
          <p className="text-gray-600 ">
            {subscriptionStatus.baseTier === 'premium'
              ? 'Premium Plan'
              : 'Free Plan'}
          </p>
        </div>

        {subscriptionStatus.baseTier === 'free' && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 ">
              Upgrade to Premium for unlimited access to all features
            </p>
            <GetPremiumButton />
          </div>
        )}

        {subscriptionStatus.baseTier === 'premium' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">
                ✓ Premium Features Active
              </h4>
              <ul className="text-sm text-gray-600  space-y-1">
                <li>• Unlimited Tactics Sets</li>
                <li>• Unlimited Openings Courses</li>
                <li>• 5% Discount on all paid content</li>
                <li>• Access to everything else</li>
              </ul>
            </div>

            <Button
              onClick={cancelSubscription}
              disabled={actionLoading}
              variant="danger"
            >
              {actionLoading ? (
                <>
                  <Spinner /> Processing...
                </>
              ) : (
                'Cancel Subscription'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
