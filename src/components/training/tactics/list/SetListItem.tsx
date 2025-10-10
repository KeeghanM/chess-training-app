'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Puzzle } from 'lucide-react'
import TimeAgo from 'react-timeago'
import Button from '@components/_elements/button'
import { ProgressBar } from '@components/_elements/progress'
import Spinner from '@components/general/Spinner'
import type { PrismaTacticsSet } from '@components/training/tactics/create/TacticsSetCreator'
import toHHMMSS from '@utils/toHHMMSS'
import trackEventOnClient from '@utils/trackEventOnClient'
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

  const accuracy = currentRound
    ? currentRound.correct + currentRound.incorrect > 0
      ? Math.round(
          (currentRound.correct /
            (currentRound.correct + currentRound.incorrect)) *
            100,
        )
      : 0
    : 0

  const trainSet = async () => {
    setOpening(true)
    trackEventOnClient('tactics_set_opened', {})
    router.push(`/training/tactics/${set.id}`)
  }

  useEffect(() => {
    setOpening(false)
  }, [])

  return (
    <div className="space-y-6 rounded-lg p-6 bg-card-light shadow" key={set.id}>
      <div className="space-y-2">
        <h3 className="font-bold text-xl flex items-center gap-2">
          <Puzzle />
          {set.name}
        </h3>
        <p>
          Last trained{' '}
          {set.lastTrained ? (
            <TimeAgo date={new Date(set.lastTrained)} />
          ) : (
            'never'
          )}
        </p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div>
          <strong>Current Round:</strong>
        </div>
        <ProgressBar
          percentage={((set.rounds ? set.rounds.length : 1) / 8) * 100}
        >
          {set.rounds ? set.rounds.length : 1}/8
        </ProgressBar>
        <div>
          <strong>Puzzles Completed:</strong>{' '}
          <ProgressBar percentage={(completedCount / set.size) * 100}>
            <span>
              {completedCount}/{set.size} -{' '}
              {Math.round((completedCount / set.size) * 100)}%
            </span>
          </ProgressBar>
        </div>
        <div>
          <strong>Round Accuracy:</strong>
          <ProgressBar percentage={accuracy}>{accuracy}%</ProgressBar>
        </div>
        <div className="flex gap-12">
          <div>
            <strong>Time Spent:</strong>{' '}
            <p>{toHHMMSS(currentRound?.timeSpent ?? 0)}</p>
          </div>
          {set.rating && (
            <div>
              <strong>Rating:</strong>
              <p>{set.rating}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 flex-row justify-center">
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
  )
}
