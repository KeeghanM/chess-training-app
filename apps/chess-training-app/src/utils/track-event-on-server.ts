import { env } from '~/env'

import { getPostHogServer } from '@server/posthog-server'

import getDistinctId from './get-distinct-id'

export async function trackEventOnServer(
  event: string,
  data?: Record<string, string>,
  experimentName?: string,
) {
  const posthog = getPostHogServer()
  if (env.NODE_ENV !== 'production') {
    console.log(event, data)
    return
  }

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
