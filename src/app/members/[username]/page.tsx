import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '~/server/db'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import XpDisplay from '@components/dashboard/XpDisplay'
import CalculateXpRank from '@utils/CalculateXpRank'

export default async function MemberPage(props: {
  params: Promise<{ username: string }>
}) {
  const params = await props.params
  const { username } = params

  const account = await prisma.userProfile.findUnique({
    where: {
      username,
    },
  })

  if (!account) {
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
            className="text-purple-700 hover:underline"
            href="/members/page/1"
          >
            /Members
          </Link>
          /{username}
        </p>
      </div>
      <Container>
        {account.public ? (
          <div className="bg-gray-100 p-2 flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-col md:flex-row">
              <Heading as={'h1'}>{account.username}</Heading>
              {account.fullName && (
                <p className="italic text-sm">({account.fullName})</p>
              )}
            </div>
            <div className="w-fit">
              <XpDisplay data={CalculateXpRank(account.experience)} />
            </div>
            {account.description && (
              <p className="bg-purple-700 text-white p-2">
                {account.description}
              </p>
            )}
            {account.highestOTBRating && (
              <p>
                <span className="font-bold">OTB Rating:</span>{' '}
                {account.highestOTBRating}
              </p>
            )}
            {account.highestOnlineRating && (
              <p>
                <span className="font-bold">Online Rating:</span>{' '}
                {account.highestOnlineRating}
              </p>
            )}
            {account.puzzleRating && (
              <p>
                <span className="font-bold">Puzzle Rating:</span>{' '}
                {account.puzzleRating}
              </p>
            )}
          </div>
        ) : (
          <div className="bg-gray-100 p-2">
            <Heading as={'h1'}>{account.username}</Heading>
            <p className="text-gray-600">
              This user has chosen to keep their profile private.
            </p>
          </div>
        )}
      </Container>
    </>
  )
}
