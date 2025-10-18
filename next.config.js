// Next.js configuration
import { withSentryConfig } from '@sentry/nextjs'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  headers: async () => [
    {
      source: '/dashboard',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
    {
      source: '/training/:slug',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
  async redirects() {
    return [
      {
        source: '/members',
        destination: '/members/page/1',
        permanent: true,
      },
    ]
  },
}

const config = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'chesstraining',
  project: 'chesstrainingapp',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // // Hides source maps from generated client bundles
  hideSourceMaps: true,
  // // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: false,
  sourcemaps: {
    disable: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
})

export default config
