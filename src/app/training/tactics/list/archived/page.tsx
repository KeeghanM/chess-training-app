import { redirect } from 'next/navigation'

import Container from '~/app/components/_elements/container'
import PageHeader from '~/app/components/_layouts/pageHeader'
import ArchivedSetList from '~/app/components/training/tactics/list/ArhivedList'

import { getUserServer } from '~/app/_util/getUserServer'

export const metadata = {
  title: 'Your Archived Sets - ChessTraining.app',
}

export default async function ArchivedSetsPage() {
  const { user, isPremium } = await getUserServer()

  if (!user) redirect('/auth/signin')
  return (
    <>
      <PageHeader
        title="Your Archived Sets"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <div className="">
        <Container>
          <ArchivedSetList hasUnlimitedSets={isPremium} />
        </Container>
      </div>
    </>
  )
}
