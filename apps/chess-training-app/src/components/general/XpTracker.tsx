'use client'

import { useEffect, useState } from 'react'

import posthog from 'posthog-js'

import { useProfileQueries } from '@hooks/use-profile-queries'

export type availableTypes = 'line' | 'tactic'

export default function XpTracker(props: {
  counter: number
  type: availableTypes
}) {
  const { updateXp } = useProfileQueries()
  const [show, setShow] = useState(false)
  const [xpToAdd, setXpToAdd] = useState(0)

  const calculateXp = (type: availableTypes) => {
    switch (type) {
      case 'line':
        return 15
      case 'tactic':
        return 5
      default:
        return 5
    }
  }

  useEffect(() => {
    if (props.counter === 0) return

    // Calculate the XP to add
    const xpToAdd = calculateXp(props.type)
    setXpToAdd(xpToAdd)

    // We hide and show it, just in case the user gets multiple XP
    // in a short period of time
    setShow(false)
    setShow(true)

    setTimeout(() => {
      setShow(false)
    }, 2500)

    updateXp.mutate(
      { xp: xpToAdd, type: props.type },
      {
        onError: (error) => {
          posthog.captureException(error)
        },
      },
    )
  }, [props.counter, props.type])

  return show ? (
    <div className="absolute inset-0 grid place-items-center pointer-events-none">
      <div className="w-fit bg-green-500 shadow-xl py-2 px-4 text-white z-50 animate-fade-up">
        +{xpToAdd} XP
      </div>
    </div>
  ) : null
}
