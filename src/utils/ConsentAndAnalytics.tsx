'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'
import posthog from 'posthog-js'

/**
 * Integrates a Silktide consent banner and PostHog analytics, loading the consent manager script and configuring tracking and cookie preferences.
 *
 * Initializes PostHog (with automatic pageview capture disabled and opt-out by default), configures the cookie banner (including required "necessary" and optional "analytics" cookie types with accept/reject handlers that toggle PostHog capturing), and captures a manual pageview whenever the route or query string changes.
 *
 * @returns The Script element that loads the Silktide consent manager and runs the analytics/cookie configuration when loaded.
 */
export function ConsentAndAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const configure = () => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    })
    posthog.opt_out_capturing()

    // @ts-expect-error - This is a 3rd party script loaded in
    silktideCookieBannerManager.updateCookieBannerConfig({
      background: {
        showBackground: true,
      },
      cookieIcon: {
        position: 'bottomLeft',
      },
      cookieTypes: [
        {
          id: 'necessary',
          name: 'Necessary',
          description:
            '<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>',
          required: true,
          onAccept: function () {},
        },
        {
          id: 'analytics',
          name: 'Analytics',
          description:
            '<p>Our trusty sidekick in this endeavour is PostHog, a product<span style="font-size: 1rem; letter-spacing: 0.02rem;">&nbsp;analytics platform. It helps us track events like&nbsp;</span><span style="font-size: 1rem; letter-spacing: 0.02rem;">\'course_started\' and \'course_created\', ensuring we\'re always&nbsp;</span><span style="font-size: 1rem; letter-spacing: 0.02rem;">on top of our training game. And don\'t worry, there\'s no&nbsp;</span><span style="font-size: 1rem; letter-spacing: 0.02rem;">Google Analytics or hidden ad trackers here.</span></p>',
          required: false,
          onAccept: function () {
            posthog.opt_in_capturing()
            try {
              const url = window.location.href
              posthog.capture('$pageview', { $current_url: url })
            } catch {}
          },
          onReject: function () {
            posthog.opt_out_capturing()
          },
        },
      ],
      text: {
        banner: {
          description:
            '<p>Here at ChessTraining.app, our cookie use is all about making your&nbsp;<span style="font-size: 1rem; letter-spacing: 0.02rem;">experience better, not about ads. We use cookies solely for</span><span style="font-size: 1rem; letter-spacing: 0.02rem;">&nbsp;understanding how you engage with our site - think of it as our&nbsp;</span><span style="font-size: 1rem; letter-spacing: 0.02rem;">way of learning the moves you make so we can improve our game (and&nbsp;</span><span style="font-size: 1rem; letter-spacing: 0.02rem;">yours!).</span></p>',
          acceptAllButtonText: 'Accept all',
          acceptAllButtonAccessibleLabel: 'Accept all cookies',
          rejectNonEssentialButtonText: 'Reject non-essential',
          rejectNonEssentialButtonAccessibleLabel: 'Reject non-essential',
          preferencesButtonText: 'Preferences',
          preferencesButtonAccessibleLabel: 'Toggle preferences',
        },
        preferences: {
          title: 'Customize your cookie preferences',
          description:
            '<p>Your privacy is our priority, and we\'re committed to being&nbsp;<span style="font-size: 1rem; letter-spacing: 0.02rem;">transparent and responsible with your data. So, let\'s enjoy a&nbsp;</span><span style="font-size: 1rem; letter-spacing: 0.02rem;">cookie-filled (data-wise!) journey to chess mastery, with no</span><span style="font-size: 1rem; letter-spacing: 0.02rem;">&nbsp;unexpected ads!</span></p>',
          creditLinkText: 'Get this banner for free',
          creditLinkAccessibleLabel: 'Get this banner for free',
        },
      },
    })
  }

  useEffect(() => {
    if (!pathname || !posthog?.has_opted_in_capturing()) return

    let url = window.origin + pathname
    if (searchParams) {
      url = url + `?${searchParams.toString()}`
    }
    posthog.capture('$pageview', {
      $current_url: url,
    })
  }, [pathname, searchParams])

  return (
    <Script src="/scripts/silktide-consent-manager.js" onLoad={configure} />
  )
}