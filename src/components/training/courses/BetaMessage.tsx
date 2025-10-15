'use client'

import { useEffect, useState } from 'react'
import Button from '../../_elements/button'
import Heading from '../../_elements/heading'
import StyledLink from '../../_elements/styledLink'

export default function BetaMessage() {
  const [show, setShow] = useState(false)

  const close = () => {
    // set a local storage item to prevent this from showing again
    localStorage.setItem('beta-message', 'true')
    setShow(false)
  }

  useEffect(() => {
    const betaMessage = localStorage.getItem('beta-message')
    if (!betaMessage) setShow(true)
  }, [])

  return (
    show && (
      <>
        <div
          className="fixed inset-0 bg-black opacity-30 z-[9999]"
          onClick={close}
        ></div>
        <div className="fixed inset-0 flex items-center justify-center z-[9999] px-2">
          <div className="bg-white max-w-screen-sm max-h-[80vh] p-2 md:p-4 flex flex-col gap-2 overflow-y-auto">
            <Heading as="h2">Welcome to the beta!</Heading>
            <p>
              This is a public beta, or trial, of the Course Trainer feature.
              While it should be fairly close to the final product, there may be
              bugs or other issues. If you find any, please{' '}
              <StyledLink href="/contact/report-an-issue">
                report them to us
              </StyledLink>
              .
            </p>
            <p>
              To get started, you will need a PGN that you want to train. Or,
              you can check out either our{' '}
              <StyledLink href="/courses/public-beta-petroff">
                Petroff
              </StyledLink>{' '}
              or{' '}
              <StyledLink href="/courses/public-beta-vienna">Vienna</StyledLink>{' '}
              tester courses. Again, these have only been made to demonstrate
              the feature, and are not complete courses - they feature only 5
              lines each.
            </p>
            <p>
              We highly recommend importing your own PGN file to really
              experience the feature. As for our own courses, we will be looking
              to launch our first set within the next two months.
            </p>
            <Button variant="primary" onClick={close}>
              Close
            </Button>
          </div>
        </div>
      </>
    )
  )
}
