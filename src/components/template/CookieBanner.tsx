'use client'

import { useEffect, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { usePostHog } from 'posthog-js/react'
import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import trackEventOnClient from '@utils/trackEventOnClient'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [readMore, setReadMore] = useState(false)
  const posthog = usePostHog()
  const [parent] = useAutoAnimate()

  useEffect(() => {
    if (
      !(posthog.has_opted_in_capturing() || posthog.has_opted_out_capturing())
    ) {
      setShowBanner(true)
    }
  }, [])

  if (!showBanner) {
    return null
  }

  const acceptCookies = async () => {
    setShowBanner(false)
    trackEventOnClient('cookie_opt_in', {})
    posthog.opt_in_capturing()
  }

  const declineCookies = async () => {
    setShowBanner(false)
    trackEventOnClient('cookie_opt_out', {})
    posthog.opt_out_capturing()
  }

  return (
    <>
      <div className="fixed inset-0 z-[5000] grid place-items-center">
        <div
          onClick={acceptCookies}
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] "
        ></div>
        <div className="z-[9999] flex max-h-[90vh] w-[850px] max-w-[90vw] flex-col items-center gap-4 bg-slate-800 p-4 text-sm text-white shadow-md md:p-6 lg:px-24">
          <Heading as="h3">
            We're all about the 🍪cookies🍪, but only the good kind! 🎉
          </Heading>
          <div
            className="flex flex-col items-center gap-2 overflow-y-scroll"
            ref={parent}
          >
            <p>
              Here at ChessTraining.app, our cookie use is all about making your
              experience better, not about ads. We use cookies solely for
              understanding how you engage with our site - think of it as our
              way of learning the moves you make so we can improve our game (and
              yours!).
            </p>
            {!readMore && (
              <p
                className="cursor-pointer text-sm text-orange-500 underline"
                onClick={() => setReadMore(true)}
              >
                Read More
              </p>
            )}
            {readMore && (
              <>
                <p>
                  Our trusty sidekick in this endeavor is PostHog, a product
                  analytics platform. It helps us track events like
                  'course_started' and 'course_created', ensuring we're always
                  on top of our training game. And don't worry, there's no
                  Google Analytics or hidden ad trackers here.
                </p>
                <p>
                  Your privacy is our priority, and we're committed to being
                  transparent and responsible with your data. So, let's enjoy a
                  cookie-filled (data-wise!) journey to chess mastery, with no
                  unexpected ads!
                </p>
                <p
                  className="cursor-pointer text-sm text-orange-500 underline"
                  onClick={() => setReadMore(false)}
                >
                  Hide
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <Button variant="success" onClick={acceptCookies}>
              Accept cookies
            </Button>
            <Button variant="danger" onClick={declineCookies}>
              Decline cookies
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
