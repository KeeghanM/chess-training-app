import Script from 'next/script'
import type { ReactNode } from 'react'
import Footer from '@components/template/footer/Footer'
import Header from '@components/template/header/Header'
import Providers from '@utils/Providers'
import { ConsentAndAnalytics } from '~/utils/ConsentAndAnalytics'
import './globals.css'
import './silktide-consent-manager.css'

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
    { name: 'charset', content: 'utf-8' },
    { name: 'msapplication-TileColor', content: '#9f00a7' },
    { name: 'theme-color', content: '#7e22ce' },
  ],
}

/**
 * Render the application's root HTML layout, including consent and analytics, third‑party scripts, global providers, header, footer, and page content.
 *
 * @param children - Page-specific React nodes to render as the main content of the layout
 * @returns The root JSX structure representing the HTML document with consent/analytics initialization, Stripe and Brevo scripts, Providers wrapper, Header, the provided `children`, and Footer
 */
export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning={true}>
        <ConsentAndAnalytics />
        <Script src="https://js.stripe.com/v3/" strategy="lazyOnload" />
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
        <body>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </>
  )
}