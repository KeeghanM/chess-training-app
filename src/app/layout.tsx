import Script from 'next/script'

import { Suspense } from 'react'
import type { ReactNode } from 'react'

import CookieBanner from './components/template/CookieBanner'
import Footer from './components/template/footer/Footer'
import Header from './components/template/header/Header'

import { PostHogPageview } from './_util/PostHog'
import Providers from './_util/Providers'

import './globals.css'

export const metadata = {
  title: 'ChessTraining.app - The best way to improve your chess',
  description:
    'Use our powerful training tools, backed by science and Grand Master training methods, to shape up your chess and bring in the wins!',
  links: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#9f00a7' },
    { name: 'theme-color', content: '#7e22ce' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Script id="brevo-conversations">
        {`(function(d, w, c) {
        w.BrevoConversationsID = '656f5685f955fb046f086532';
        w[c] = w[c] || function() {
          (w[c].q = w[c].q || []).push(arguments);
        };
        var s = d.createElement('script');
        s.async = true;
        s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
        if (d.head) d.head.appendChild(s);
      })(document, window, 'BrevoConversations');`}
      </Script>
      <html lang="en" suppressHydrationWarning={true}>
        <Suspense>
          <PostHogPageview />
        </Suspense>
        <body>
          <Providers>
            <Header />
            {children}
            <Footer />
            <CookieBanner />
          </Providers>
        </body>
      </html>
    </>
  )
}
