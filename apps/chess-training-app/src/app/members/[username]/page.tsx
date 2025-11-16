import Link from 'next/link'
import { redirect } from 'next/navigation'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import XpDisplay from '@components/dashboard/XpDisplay'
import CalculateXpRank from '@utils/CalculateXpRank'
import { prisma } from '~/server/db'
import Backdrop from '~/components/_elements/backdrop'

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
      <div className="relative">
        <Backdrop />
        <Container>
          <div className="p-4 bg-card-light/20 rounded-lg text-black">
            <div className="bg-card rounded-lg p-4 space-y-6">
              <Heading as={'h1'}>{account.username}</Heading>
              {account.public ? (
                <>
                  {account.fullName && (
                    <p className="italic text-sm">({account.fullName})</p>
                  )}
                  <div className="w-fit mx-auto bg-card-light rounded-xl shadow">
                    <XpDisplay
                      color="black"
                      data={CalculateXpRank(account.experience)}
                    />
                  </div>
                  {(account.description ||
                    account.highestOTBRating ||
                    account.highestOnlineRating ||
                    account.puzzleRating) && (
                    <div className="bg-card-light rounded-xl shadow space-y-2 p-4">
                      {account.description && <p>{account.description}</p>}
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
                  )}
                </>
              ) : (
                <p className="text-gray-600">
                  This user has chosen to keep their profile private.
                </p>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
