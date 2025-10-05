import { prisma } from '~/server/db'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import PageHeader from '@components/_layouts/pageHeader'
import { getUserServer } from '@utils/getUserServer'

export default async function BadgesPage() {
  const { badges } = await getUserServer()
  const allBadges = await prisma.badge.findMany()

  allBadges.sort((a) => {
    if (badges.find((badge) => badge.badgeName === a.name)) return -1
    return 1
  })

  const categories = Array.from(
    new Set(allBadges.map((badge) => badge.category)),
  ) // sort by category: daily, tactics, misc, then the rest
    .sort((a, b) => {
      if (a === 'Daily Streaks') return -1
      if (b === 'Daily Streaks') return 1
      if (a === 'Tactics Streaks') return -1
      if (b === 'Tactics Streaks') return 1
      if (a === 'Miscellaneous') return -1
      if (b === 'Miscellaneous') return 1
      return 0
    })

  return (
    <>
      <PageHeader
        title="Your Badges"
        subTitle={`
          You have ${badges.length} out of ${allBadges.length} possible badges`}
        image={{
          src: '/images/hero.avif',
          alt: 'Chess board with pieces set up',
        }}
      />
      <Container>
        <p>
          Badges are awarded for completing certain tasks on the site. They are
          a fun way to track your progress and show off your achievements.
        </p>
        {categories.map((category) => (
          <div key={category}>
            <Heading as={'h2'}>{category}</Heading>
            <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4">
              {allBadges
                .filter((badge) => badge.category === category)
                .sort((a, b) => a.sort - b.sort)
                .map((badge) => (
                  <div
                    className={
                      'flex flex-col items-center justify-start gap-1 p-2 text-white' +
                      (badges.filter((b) => b.badgeName === badge.name).length >
                      0
                        ? ' border-4 border-orange-500 bg-purple-700'
                        : ' bg-gray-600')
                    }
                    key={badge.name}
                  >
                    <p className={'text-center font-bold text-white'}>
                      {badge.name}
                    </p>
                    <p className="text-center text-xs">{badge.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </Container>
    </>
  )
}
