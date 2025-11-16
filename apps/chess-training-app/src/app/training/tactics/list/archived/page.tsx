import Link from 'next/link'
import { redirect } from 'next/navigation'
import Backdrop from '@components/_elements/backdrop'
import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import ArchivedSetList from '@components/training/tactics/list/ArchivedList'
import { getUserServer } from '@utils/getUserServer'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Your Archived Sets - ChessTraining.app',
}

export default async function ArchivedSetsPage() {
  const { user, isPremium } = await getUserServer()

  if (!user) redirect('/auth/signin')
  return (
    <div className="relative">
      <Backdrop />
      <Container size="extra-wide">
        <Heading as="h1" className="text-white">
          Tactics Trainer
        </Heading>
        <Heading as="h2" className="text-card-dark">
          Your archived sets
        </Heading>
        <Link href="/training/tactics/list">
          <Button>
            <ArrowLeft />
            Back to active Sets
          </Button>
        </Link>
        <ArchivedSetList hasUnlimitedSets={isPremium} />
      </Container>
    </div>
  )
}
