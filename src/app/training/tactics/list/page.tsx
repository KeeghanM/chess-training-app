import { redirect } from 'next/navigation'

import PageHeader from '~/app/components/_layouts/pageHeader'
import TacticsList from '~/app/components/training/tactics/list/TacticsList'

import { getUserServer } from '~/app/_util/getUserServer'

export default async function TacticsListPage() {
  const { user, isPremium } = await getUserServer()
  if (!user) redirect('/auth/signin')

  return (
    <>
      <PageHeader
        title="Tactics Trainer"
        subTitle="Your puzzle sets"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <div className="">
        <TacticsList hasUnlimitedSets={isPremium} />
      </div>
    </>
  )
}
