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
    properties?: Record<string, string> | undefined
    '$feature/experiment-feature-flag-key'?: string | boolean | undefined
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
    if (experimentFlagValue !== undefined) {
      captureData['$feature/experiment-feature-flag-key'] =
        experimentFlagValue as string | boolean
    }
  }

  // Build the final capture object with proper typing
  posthog.capture({
    distinctId: captureData.distinctId,
    event: captureData.event,
    ...(captureData.properties && { properties: captureData.properties }),
    ...(captureData['$feature/experiment-feature-flag-key'] !== undefined && {
      '$feature/experiment-feature-flag-key':
        captureData['$feature/experiment-feature-flag-key'],
    }),
  })
}
