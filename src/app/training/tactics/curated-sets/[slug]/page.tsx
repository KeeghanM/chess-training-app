import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '~/server/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import GetCuratedSet from '@components/ecomm/GetCuratedSet'

export default async function CuratedSetPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const { slug } = params
  const session = getKindeServerSession()
  const user = await session.getUser()

  const { set, userSetId } = await (async () => {
    try {
      const set = await prisma.curatedSet.findUnique({
        where: {
          slug,
          published: true,
        },
      })

      if (!set) throw new Error('Set not found')

      const userSet = await prisma.tacticsSet.findFirst({
        where: {
          curatedSetId: set.id,
          userId: user?.id,
          active: true,
        },
      })

      return { set, userSetId: userSet?.id ?? undefined }
    } catch (e) {
      Sentry.captureException(e)
      return { set: undefined, userSetId: undefined }
    }
  })()

  if (!set) {
    redirect('/404')
  }

  return (
    <>
      <div className="w-full flex items-center justify-center py-2 bg-gray-200">
        <p className="text-xs text-gray-600">
          <Link className="text-purple-700 hover:underline" href="/">
            Home
          </Link>
          <Link
            className="text-purple-700 hover:underline cursor-pointer"
            href="/training/tactics"
          >
            /Tactics
          </Link>
          <Link
            className="text-purple-700 hover:underline cursor-pointer"
            href="/training/tactics/curated-sets"
          >
            /Curated Sets
          </Link>
          /{set.name}
        </p>
      </div>
      <Container>
        <div className="flex flex-col gap-2">
          <div className="p-4 bg-gray-100">
            <Heading as="h1">{set.name}</Heading>
            <p className="text-sm">
              Chess puzzles designed to be used with our{' '}
              <StyledLink href="/training/tactics">Tactics Trainer</StyledLink>.
            </p>
            <ul>
              <li>
                <strong>Intended Rating Range:</strong> {set.minRating} -{' '}
                {set.maxRating}
              </li>
              <li>
                <strong>Number of Puzzles:</strong> {set.size}
              </li>
            </ul>
          </div>
          <GetCuratedSet
            setId={set.id}
            price={set.price}
            slug={set.slug}
            userSetId={userSetId}
            showPrice={true}
          />
          {set.description && (
            <article
              className="p-4 bg-gray-100"
              dangerouslySetInnerHTML={{ __html: set.description }}
            />
          )}
          {set.description && (
            <div className="p-4 bg-gray-100">
              <Heading as="h2">Ready to go?</Heading>
              <p>Ready to take your game to the next level?</p>
              <GetCuratedSet
                setId={set.id}
                price={set.price}
                slug={set.slug}
                userSetId={userSetId}
                showPrice={true}
              />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
