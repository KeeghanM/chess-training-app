import posthog from 'posthog-js'

export default function trackEventOnClient(
  eventName: string,
  data: Record<string, string>,
) {
  if (process.env.NODE_ENV === 'development') return
  fetch('/api/logEvent', {
    method: 'POST',
    body: JSON.stringify({
      eventName,
      data,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => posthog.captureException(e))
}
