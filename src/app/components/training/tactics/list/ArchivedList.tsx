'use client'

import { useTacticsQueries } from '@hooks/use-tactics-queries'
import { Puzzle } from 'lucide-react'
import { env } from '~/env'

import Button from '~/app/components/_elements/button'
import Spinner from '~/app/components/general/Spinner'
import TimeSince from '~/app/components/general/TimeSince'

export default function ArchivedSetList({
  hasUnlimitedSets,
}: {
  hasUnlimitedSets: boolean
}) {
  const maxSets = env.NEXT_PUBLIC_MAX_SETS

  const { archivedTacticsQuery, restoreTactic } = useTacticsQueries()

  if (archivedTacticsQuery.isPending)
    return (
      <div className="relative w-full h-16 flex items-center justify-center">
        <div className="absolute inset-0 bg-card/10 text-white"></div>
        <p className="flex items-center gap-4">
          Loading... <Spinner />
        </p>
      </div>
    )

  if (!archivedTacticsQuery.data || archivedTacticsQuery.data.sets.length === 0)
    return (
      <p className="text-center p-6 bg-card/10 text-white rounded-lg">
        You don't have any archived sets.
      </p>
    )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {archivedTacticsQuery.data.sets.map((set, index) => (
        <div
          key={index}
          className="bg-card rounded-xl flex justify-between p-4 items-center"
        >
          <div className="space-y-2">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Puzzle />
              {set.name}
            </h3>
            <p>
              Last trained{' '}
              {set.lastTrained ? (
                <TimeSince text="ago" date={new Date(set.lastTrained)} />
              ) : (
                'never'
              )}
            </p>
          </div>
          <div className="">
            <Button
              disabled={
                (archivedTacticsQuery.data.activeCount >= maxSets &&
                  !hasUnlimitedSets) ||
                restoreTactic.isPending
              }
              variant="primary"
              onClick={async () =>
                await restoreTactic.mutate({ setId: set.id })
              }
            >
              {restoreTactic.isPending ? (
                <>
                  Restoring... <Spinner />
                </>
              ) : (
                'Restore'
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
