'use client'

import Link from 'next/link'

import { useTacticsQueries } from '@hooks/use-tactics-queries'
import { env } from '~/env'

import Button from '~/app/components/_elements/button'
import Container from '~/app/components/_elements/container'
import Spinner from '~/app/components/general/Spinner'
import TacticsSetCreator from '~/app/components/training/tactics//create/TacticsSetCreator'

import SetListItem from './SetListItem'

export default function TacticsList(props: { hasUnlimitedSets: boolean }) {
  const { hasUnlimitedSets } = props
  const { tacticsSetsQuery } = useTacticsQueries()

  return (
    <Container>
      <div className="flex items-center gap-2">
        <TacticsSetCreator
          setCount={tacticsSetsQuery.data?.length ?? 0}
          maxSets={env.NEXT_PUBLIC_MAX_SETS}
          hasUnlimitedSets={hasUnlimitedSets}
        />
        <>
          <Link href="/training/tactics/curated-sets">
            <Button variant="secondary">Browse Curated Sets</Button>
          </Link>
          <Link
            className="text-sm text-purple-700 hover:text-purple-600 underline md:ml-auto"
            href="/training/tactics/list/archived"
          >
            View archived sets
          </Link>
        </>
      </div>
      <div className="mt-4 flex flex-col gap-4">
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
        ) : tacticsSetsQuery.data?.length === 0 ? (
          <p className="text-center ">
            You don't have any sets yet. Create one above!
          </p>
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
    </Container>
  )
}
