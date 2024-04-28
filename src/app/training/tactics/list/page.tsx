import { redirect } from 'next/navigation'

import { getUserServer } from '~/app/_util/getUserServer'
import PageHeader from '~/app/components/_layouts/pageHeader'
import TacticsList from '~/app/components/training/tactics/list/TacticsList'


export default async function TacticsListPage() {
  const { user, isPremium } = await getUserServer()
  if (!user) redirect('/auth/signin')

  return (
    <>
      <PageHeader
        subTitle="Your puzzle sets"
        title="Tactics Trainer"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <div className="dark:bg-slate-800">
        <TacticsList hasUnlimitedSets={isPremium} />
      </div>
    </>
  )
}
