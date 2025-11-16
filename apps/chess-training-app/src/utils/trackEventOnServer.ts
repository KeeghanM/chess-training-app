import { PostHog } from 'posthog-node'
import { env } from '~/env'

import getDistinctId from './getDistinctId'

export function PostHogClient() {
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  })
  return posthogClient
}

export async function trackEventOnServer(
  event: string,
  data?: Record<string, string>,
  experimentName?: string,
) {
  const posthog = PostHogClient()
  if (env.NODE_ENV === 'production') {
    const captureData: {
      distinctId: string
      event: string
      properties?: Record<string, string>
      '$feature/experiment-feature-flag-key'?: string | boolean
    } = {
      distinctId: await getDistinctId(),
      event,
      properties: data,
    }

    if (experimentName) {
      const experimentFlagValue = await posthog.getFeatureFlag(
        experimentName,
        captureData.distinctId,
      )
      captureData['$feature/experiment-feature-flag-key'] = experimentFlagValue
    }

    posthog.capture(captureData)
  }
}
