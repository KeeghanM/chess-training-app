'use client'

import Link from 'next/link'

import { useState } from 'react'

import * as Sentry from '@sentry/nextjs'
import 'tippy.js/dist/tippy.css'
import { env } from '~/env'

import { useTacticsQueries } from '@hooks/use-tactics-queries'
import Button from '~/app/components/_elements/button'
import Spinner from '~/app/components/general/Spinner'

export default function ArchivedSetList(props: { hasUnlimitedSets: boolean }) {
  const [restoring, setRestoring] = useState(false)
  const { hasUnlimitedSets } = props
  const maxSets = env.NEXT_PUBLIC_MAX_SETS
  
  const { archivedTacticsQuery, restoreTactic } = useTacticsQueries()
  
  const sets = archivedTacticsQuery.data?.sets || []
  const activeCount = archivedTacticsQuery.data?.activeCount || 0
  const loading = archivedTacticsQuery.isLoading

  const restoreSet = async (setId: string) => {
    setRestoring(true)
    try {
      await restoreTactic.mutateAsync({ setId })
    } catch (e) {
      Sentry.captureException(e)
    }
    setRestoring(false)
  }

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
      {loading ? (
        <div className="relative dark:text-white w-full h-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-30"></div>
          <p className="flex items-center gap-4">
            Loading... <Spinner />
          </p>
        </div>
      ) : (
        <div
          className={
            'flex flex-col gap-4 ' +
            (sets.length == 0 ? ' bg-gray-100 dark:bg-slate-900' : '')
          }
        >
          {sets.length > 0 ? (
            sets.map((set, index) => (
              <div
                key={index}
                className="flex relative flex-col items-center gap-4 bg-gray-100 p-2 md:px-6  dark:bg-slate-900 dark:text-white md:flex-row md:justify-between"
              >
                <p>{set.name}</p>

                <Button
                  disabled={
                    (activeCount >= maxSets && !hasUnlimitedSets) || restoring
                  }
                  variant="primary"
                  onClick={() => restoreSet(set.id)}
                >
                  {restoring ? (
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
              <p className="text-gray-500  dark:text-white">
                You don't have any archived Sets.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
