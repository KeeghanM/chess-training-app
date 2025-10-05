import { prisma } from '~/server/db'
import Container from '@components/_elements/container'
import StyledLink from '@components/_elements/styledLink'
import PageHeader from '@components/_layouts/pageHeader'
import TrophyTile from '@components/members/TrophyTile'
import CalculateXpRank from '@utils/CalculateXpRank'

export default async function MembersPage(props: {
  searchParams?: Promise<Record<string, string | string[]>>
}) {
  const searchParams = await props.searchParams
  const pageNumber = searchParams?.page
    ? parseInt(searchParams.page as string)
    : 1
  const resultsPerPage = 50
  const members = await prisma.userProfile.findMany({
    where: {
      lastTrained: {
        not: null,
      },
    },
    skip: (pageNumber - 1) * resultsPerPage,
    take: resultsPerPage,
    orderBy: {
      experience: 'desc',
    },
  })

  const topThree = pageNumber === 1 ? members.slice(0, 3) : []

  return (
    <>
      <PageHeader
        title="Members Leaderboard"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
        subTitle="How do you rank among the best?"
      />
      <Container>
        {topThree.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4">
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
        )}
        <table className="w-full my-6">
          <tr className="bg-slate-800 text-white">
            <th>Username</th>
            <th>Experience</th>
            <th>Rank</th>
          </tr>
          {members.map((member, index) => {
            const rank = CalculateXpRank(member.experience)
            return (
              <tr
                className={
                  'text-center ' + (index % 2 === 0 ? 'bg-gray-100' : '')
                }
                key={member.id}
              >
                <td>
                  {member.public ? (
                    <StyledLink href={`/members/${member.username}`}>
                      {member.username}
                    </StyledLink>
                  ) : (
                    member.username
                  )}
                </td>
                <td>{member.experience.toLocaleString('en-GB')}</td>
                <td>
                  <strong>{rank.rank.rank}:</strong> {rank.rank.name}
                </td>
              </tr>
            )
          })}
        </table>

        <div className="flex gap-2 items-center">
          {pageNumber > 1 && (
            <StyledLink href={`/members?page=${pageNumber - 1}`}>
              Previous Page
            </StyledLink>
          )}
          {members.length === resultsPerPage && (
            <StyledLink href={`/members?page=${pageNumber + 1}`}>
              Next Page
            </StyledLink>
          )}
        </div>
      </Container>
    </>
  )
}
