'use client'

// Error boundaries must be Client Components
import NextError from 'next/error'
import { useEffect } from 'react'
import posthog from 'posthog-js'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    posthog.captureException(error)
  }, [error])

  return (
    // global-error must include html and body tags
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component */}
        <NextError statusCode={0} />
      </body>
    </html>
  )
}
