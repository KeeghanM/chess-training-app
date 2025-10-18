// Next.js configuration
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

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

export default bundleAnalyzer(nextConfig)
