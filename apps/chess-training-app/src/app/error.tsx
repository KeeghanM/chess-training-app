'use client'

import { useEffect } from 'react'

import posthog from 'posthog-js'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (error) {
      posthog.captureException(error, {
        context: 'app/error.tsx',
        digest: error.digest,
      })
    }
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
      <p className="text-gray-400 mb-6 max-w-md">{error.message}</p>
      <button
        onClick={() => reset()}
        className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
      >
        Try again
      </button>
    </div>
  )
}
