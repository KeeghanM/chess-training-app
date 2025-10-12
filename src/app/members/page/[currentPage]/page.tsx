import { cache } from 'react'
import { prisma } from '~/server/db'
import Container from '@components/_elements/container'
import TrophyTile from '@components/members/TrophyTile'
import Pagination from '~/components/_elements/Pagination'
import Backdrop from '~/components/_elements/backdrop'
import Heading from '~/components/_elements/heading'
import MemberSearch from '~/components/members/MembersSearch'
import MembersTable from '~/components/members/MembersTable'

export const revalidate = 3600 // invalidate every hour
const resultsPerPage = 25

// Cache this function so it only runs once during the build
const getTotalPages = cache(async () => {
  const totalMembers = await prisma.userProfile.count()
  const totalPages = Math.ceil(totalMembers / resultsPerPage)
  return { totalMembers, totalPages }
})

export async function generateStaticParams() {
  try {
    const { totalPages } = await getTotalPages()

    return Array.from({ length: totalPages }, (_, i) => ({
      currentPage: String(i + 1),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // Return at least page 1 as fallback
    return [{ currentPage: '1' }]
  }
}

export default async function MembersPage({
  params,
}: {
  params: Promise<{ currentPage: string }>
}) {
  const resolvedParams = await params
  const currentPage = Number(resolvedParams.currentPage)

  // This will use the cached result from generateStaticParams during build
  const { totalPages, totalMembers } = await getTotalPages()

  const topThree =
    currentPage === 1
      ? await prisma.userProfile.findMany({
          skip: 0,
          take: 3,
          orderBy: {
            experience: 'desc',
          },
        })
      : []

  const skip = (currentPage - 1) * resultsPerPage
  const members = await prisma.userProfile.findMany({
    skip,
    take: resultsPerPage,
    orderBy: {
      experience: 'desc',
    },
  })

  return (
    <div className="relative">
      <Backdrop />
      <Container size="extra-wide" className="flex flex-col gap-4">
        <Heading as="h1" className="text-white">
          Members Leaderboard
        </Heading>
        <Heading as="h2" className="text-card-dark">
          How do you rank among the best?
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
          {topThree.map((member, index) => (
            <TrophyTile
              key={member.id}
              username={member.username}
              xp={member.experience}
              placement={index + 1}
              published={member.public}
            />
          ))}
        </div>
        <MemberSearch />
        <div>
          <Pagination
            startCount={skip + 1}
            endCount={skip + resultsPerPage}
            totalCount={totalMembers}
            totalPages={totalPages}
            currentPage={currentPage}
            label="Members"
            path="/members/page"
          />
          <MembersTable members={members} />
          <Pagination
            startCount={skip + 1}
            endCount={skip + resultsPerPage}
            totalCount={totalMembers}
            totalPages={totalPages}
            currentPage={currentPage}
            label="Members"
            path="/members/page"
          />
        </div>
      </Container>
    </div>
  )
}
