'use client'

import type { ReactNode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

import { queryClient } from '@hooks/query-client'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider client={posthog}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </PostHogProvider>
    </QueryClientProvider>
  )
}
