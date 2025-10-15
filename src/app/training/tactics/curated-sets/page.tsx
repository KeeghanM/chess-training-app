import Link from 'next/link'
import { prisma } from '~/server/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import { TextWall } from '@components/_layouts/textWall'
import GetCuratedSet from '@components/ecomm/GetCuratedSet'
import Backdrop from '~/components/_elements/backdrop'

export const metadata = {
  title: 'Curated Chess Tactics Training Sets at ChessTraining.app',
  description:
    'All hand picked by our team of chess experts, our curated chess tactics training sets are designed to help you improve your tactical play in chess. Each set is tailored to your chess rating, and based on the chess tactics and themes that you want to focus on. We will automatically track your time and accuracy across the chess puzzles. This means all the admin work required in the WoodPecker method is taken care of for you - you just focus on solving chess puzzles. Remember, these puzzles should be difficult for you to solve! For best results, break your practice into 30-60 minute sessions once a day. Your first time through a puzzle set should take 1-2 weeks.',
}

export default async function CuratedSetsPage() {
  const session = getKindeServerSession()
  const user = await session.getUser()
  const sets = await prisma.curatedSet.findMany({
    where: { published: true },
  })

  const userCuratedSets = user
    ? await prisma.tacticsSet.findMany({
        where: {
          userId: user.id,
          active: true,
          NOT: {
            curatedSetId: null,
          },
        },
      })
    : []

  return (
    <div className="relative">
      <Backdrop />
      <Container>
        <Heading as="h1" className="text-white">
          Curated Chess Tactics Training Sets
        </Heading>
        <Heading as="h2" className="text-primary">
          Designed to supercharge your Chess Tactics
        </Heading>
      </Container>

      <TextWall title="What are Curated Sets?">
        <p>
          Designed to be used with our{' '}
          <StyledLink href="/training/tactics">Tactics Trainer</StyledLink>, our
          curated sets are designed to help you improve your tactical play in
          chess. Rather than randomly generated puzzles, these have been hand
          picked by our team of chess experts.
        </p>
      </TextWall>
      <Container className="space-y-4 bg-card-dark rounded-lg shadow">
        <Heading as="h2">All Available Curated Sets</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sets
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((set) => (
              <div key={set.id}>
                <div className="flex flex-col gap-0 bg-card rounded-lg shadow-lg overflow-hidden">
                  <div className="px-4 py-3 bg-card-light border-b border-gray-200 font-bold text-orange-500 flex items-center flex-wrap justify-between">
                    <Link href={`/training/tactics/curated-sets/${set.slug}`}>
                      {set.name}
                    </Link>
                    <p className="font-bold text-green-500">
                      {set.price > 0 ? <>£{set.price / 100}</> : 'FREE'}
                    </p>
                  </div>
                  {set.shortDesc && (
                    <div
                      className="p-2"
                      dangerouslySetInnerHTML={{ __html: set.shortDesc }}
                    />
                  )}
                  <p className="w-full text-center bg-purple-300 py-1 font-bold">
                    {set.size} puzzles
                  </p>
                  <div className="flex flex-col md:flex-row gap-2 p-2 items-center justify-center">
                    <GetCuratedSet
                      setId={set.id}
                      price={set.price}
                      slug={set.slug}
                      userSetId={
                        userCuratedSets.find((s) => s.curatedSetId === set.id)
                          ?.id
                      }
                      showPrice={false}
                    />
                    <Link href={`/training/tactics/curated-sets/${set.slug}`}>
                      <Button>Read More</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </div>
  )
}
