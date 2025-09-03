'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

import Button from '~/app/components/_elements/button'
import Spinner from '~/app/components/general/Spinner'
import TimeSince from '~/app/components/general/TimeSince'
import type { PrismaTacticsSet } from '~/app/components/training/tactics/create/TacticsSetCreator'

import toHHMMSS from '~/app/_util/toHHMMSS'
import trackEventOnClient from '~/app/_util/trackEventOnClient'

import SetListEdit from './SetListEdit'
import SetListStats from './SetListStats'

export default function SetListItem({ set }: { set: PrismaTacticsSet }) {
  const { user } = useKindeBrowserClient()
  const currentRound = set.rounds
    ? set.rounds[set.rounds.length - 1]
    : undefined
  const completedCount =
    (currentRound?.correct ?? 0) + (currentRound?.incorrect ?? 0)
  const router = useRouter()
  const [opening, setOpening] = useState(false)

  const trainSet = async () => {
    setOpening(true)
    trackEventOnClient('tactics_set_opened', {})
    router.push(`/training/tactics/${set.id}`)
  }

  useEffect(() => {
    setOpening(false)
  }, [])

  return (
    <div
      className="flex flex-col gap-0 border border-gray-300 dark:text-white dark:border-slate-600 shadow-md dark:shadow-slate-900 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] hover:shadow-lg transition-shadow duration-300"
      key={set.id}
    >
      <div className="px-2 py-1 border-b border-gray-300 dark:border-slate-600 font-bold text-orange-500">
        <p onClick={trainSet} className="cursor-pointer">
          <span className="text-lg">{set.name}</span>
          <span className="px-2 text-xs italic text-gray-600 dark:text-gray-400">
            Last trained{' '}
            {set.lastTrained ? (
              <TimeSince text="ago" date={new Date(set.lastTrained)} />
            ) : (
              'never'
            )}
          </span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 p-2">
        <div className="flex flex-wrap gap-2 justify-center">
          <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
            <p className="font-bold py-1 px-2 border-b border-gray-300 dark:border-slate-600">
              Round
            </p>
            <p>{set.rounds ? set.rounds.length : 1}/8</p>
          </div>
          <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
            <p className="font-bold py-1 px-2 border-b border-gray-300 dark:border-slate-600">
              Completed
            </p>
            <p>
              {completedCount}/{set.size}
            </p>
          </div>
          <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
            <p className="font-bold py-1 px-2 border-b border-gray-300 dark:border-slate-600">
              Accuracy
            </p>
            <p>
              {currentRound
                ? currentRound.correct + currentRound.incorrect > 0
                  ? Math.round(
                      (currentRound.correct /
                        (currentRound.correct + currentRound.incorrect)) *
                        100,
                    )
                  : 0
                : 0}
              %
            </p>
          </div>
          <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
            <p className="font-bold py-1 px-2 border-b border-gray-300 dark:border-slate-600">
              Time Spent
            </p>
            <p>{toHHMMSS(currentRound?.timeSpent ?? 0)}</p>
          </div>
          {set.rating && (
            <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
              <p className="font-bold py-1 px-2 border-b border-gray-300 dark:border-slate-600">
                Rating
              </p>
              <p>{set.rating}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:justify-center">
          <Button
            disabled={
              (set.rounds?.length >= 8 && completedCount >= set.size) || opening
            }
            onClick={trainSet}
            variant="primary"
          >
            {opening ? (
              <>
                Opening... <Spinner />
              </>
            ) : (
              'Train'
            )}
          </Button>
          <SetListEdit set={set} user={user} />
          <SetListStats set={set} />
        </div>
      </div>
    </div>
  )
}
