'use client'

import type { ReactNode } from 'react'

import { queryClient } from '@hooks/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider client={posthog}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </PostHogProvider>
    </QueryClientProvider>
  )
}
