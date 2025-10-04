'use client'

import Link from 'next/link'

import { useTacticsQueries } from '@hooks/use-tactics-queries'
import { env } from '~/env'

import Button from '~/app/components/_elements/button'
import Spinner from '~/app/components/general/Spinner'

export default function ArchivedSetList({
  hasUnlimitedSets,
}: {
  hasUnlimitedSets: boolean
}) {
  const maxSets = env.NEXT_PUBLIC_MAX_SETS

  const { archivedTacticsQuery, restoreTactic } = useTacticsQueries()

  return (
    <>
      <div className="w-full">
        <Link
          className="text-sm text-purple-700 hover:text-purple-600 underline md:ml-auto"
          href="/training/tactics/list"
        >
          View active Sets
        </Link>
      </div>
      {archivedTacticsQuery.isPending && (
        <div className="relative  w-full h-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-30"></div>
          <p className="flex items-center gap-4">
            Loading... <Spinner />
          </p>
        </div>
      )}{' '}
      {archivedTacticsQuery.data && (
        <div
          className={
            'flex flex-col gap-4 ' +
            (archivedTacticsQuery.data.sets.length == 0 ? ' bg-gray-100 ' : '')
          }
        >
          {archivedTacticsQuery.data.sets.length > 0 ? (
            archivedTacticsQuery.data.sets.map((set, index) => (
              <div
                key={index}
                className="flex relative flex-col items-center gap-4 bg-gray-100 p-2 md:px-6    md:flex-row md:justify-between"
              >
                <p>{set.name}</p>

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
            ))
          ) : (
            <div className="p-2">
              <p className="text-gray-500  ">
                You don't have any archived Sets.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
