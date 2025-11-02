'use client'

import { useState } from 'react'
import Button from '~/components/_elements/button'

export default function Info() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-1  mb-4">
      {open ? (
        <div className="flex flex-col gap-4">
          <p>
            Here you can see which lines are due when. The order shown on this
            page is the order in which you'll be shown them in the course
            trainer.
          </p>
          <p>
            If you want to review a line or group of lines sooner than
            scheduled, you can mark them for review. This will reset their
            revision date to the earliest date in the schedule, meaning you'll
            see them first.
          </p>
          <p>
            If you want to review all lines, even ones with dates far in the
            future or ones you've not yet seen, you can click "Mark All Lines
            For Review", which will set all lines to be reviewed immediately.
          </p>
          <p>
            This is a particularly useful feature if you need to prep for a
            tournament, or if you're going on holiday and want to get some extra
            training in before you go.
          </p>
          <div>
            <Button
              variant="ghost"
              className="underline hover:underline-none mx-auto w-fit text-lg"
              onClick={() => setOpen(false)}
            >
              Read Less
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p>
            Here you can see which lines are due when. The order shown on this
            page is the order in which you'll be shown them in the course
            trainer.
          </p>
          <div>
            <Button
              variant="ghost"
              className="underline hover:underline-none mx-auto w-fit text-lg"
              onClick={() => setOpen(true)}
            >
              Read More
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
