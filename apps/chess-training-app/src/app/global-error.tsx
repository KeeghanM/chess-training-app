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

  return <NextError statusCode={0} />
}
