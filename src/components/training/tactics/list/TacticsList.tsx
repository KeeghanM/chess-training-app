'use client'

import Link from 'next/link'
import { useTacticsQueries } from '@hooks/use-tactics-queries'
import { env } from '~/env'
import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import TacticsSetCreator from '@components/training/tactics/create/TacticsSetCreator'
import SetListItem from './SetListItem'

export default function TacticsList(props: { hasUnlimitedSets: boolean }) {
  const { hasUnlimitedSets } = props
  const { tacticsSetsQuery } = useTacticsQueries()

  return (
    <div className="space-y-2 md:space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-2 lg:flex-6">
        <TacticsSetCreator
          setCount={tacticsSetsQuery.data?.length ?? 0}
          maxSets={env.NEXT_PUBLIC_MAX_SETS}
          hasUnlimitedSets={hasUnlimitedSets}
        />
        <Link href="/training/tactics/curated-sets">
          <Button>Browse Curated Sets</Button>
        </Link>
        <Link
          className="hover:underline text-white"
          href="/training/tactics/list/archived"
        >
          View archived sets
        </Link>
      </div>
      {tacticsSetsQuery.data?.length === 0 && (
        <p className="text-center p-6 bg-card/10 text-white rounded-lg">
          You don't have any sets yet. Create one above!
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tacticsSetsQuery.isLoading ? (
          <>
            <div className="flex flex-col h-24 gap-0 border border-gray-300   shadow-md  bg-[rgba(0,0,0,0.03)]  hover:shadow-lg transition-shadow duration-300 opacity-50">
              <p className="w-fit m-auto flex gap-1">
                Loading... <Spinner />
              </p>
            </div>
            <div className="flex flex-col h-24 gap-0 border border-gray-300   shadow-md  bg-[rgba(0,0,0,0.03)]  hover:shadow-lg transition-shadow duration-300  opacity-50">
              {' '}
              <p className="w-fit m-auto flex gap-1">
                Loading... <Spinner />
              </p>
            </div>
          </>
        ) : (
          tacticsSetsQuery.data
            ?.sort((a, b) => {
              // add non-trained sets to the top, sorted by created date
              // then sort, in descending order, by the last trained date
              if (a.lastTrained === null) return -1
              if (b.lastTrained === null) return 1
              if (a.lastTrained === b.lastTrained)
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                )
              return (
                new Date(b.lastTrained).getTime() -
                new Date(a.lastTrained).getTime()
              )
            })
            .map((set) => <SetListItem key={set.id} set={set} />)
        )}
      </div>
    </div>
  )
}
