'use client'

import { useCallback, useEffect, useState } from 'react'
import posthog from 'posthog-js'
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
      posthog.captureException(err)
      setError('Failed to cancel subscription')
    } finally {
      setActionLoading(false)
    }
  }

  if (!subscriptionStatus) {
    return null
  }

  return (
    <div className="p-4 bg-card-light/20 rounded-lg text-black">
      <div className="bg-card rounded-lg p-4 space-y-6">
        <Heading as={'h2'}>Subscription Management</Heading>
        {loading ? (
          <></>
        ) : error ? (
          <>
            <p className="text-red-600">{error}</p>
            <Button
              onClick={() => {
                window.location.reload()
              }}
            >
              Try Again
            </Button>
          </>
        ) : (
          <div className="space-y-4 p-2 bg-card-light shadow rounded-lg w-fit">
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
        )}
      </div>
    </div>
  )
}
