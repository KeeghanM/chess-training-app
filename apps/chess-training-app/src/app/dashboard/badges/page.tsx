import { prisma } from '@server/db'

import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

import { getUserServer } from '@utils/get-user-server'

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
    <div className="relative">
      <Backdrop />
      <Container size="extra-wide">
        <Heading as="h1" className="text-white">
          Your Badges
        </Heading>
        <Heading as="h2" className="text-card-dark">
          You have {badges.length} out of {allBadges.length} possible badges
        </Heading>
        <p className="text-lg mb-6 text-white">
          Badges are awarded for completing certain tasks on the site. They are
          a fun way to track your progress and show off your achievements.
        </p>
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <Heading as={'h2'} className="text-white">
                {category}
              </Heading>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {allBadges
                  .filter((badge) => badge.category === category)
                  .sort((a, b) => a.sort - b.sort)
                  .map((badge) => {
                    const isEarned =
                      badges.filter((b) => b.badgeName === badge.name).length >
                      0
                    return (
                      <div
                        className={`flex flex-col items-center justify-start gap-2 p-4 rounded-lg shadow transition-all ${
                          isEarned
                            ? 'bg-card-light ring-4 ring-orange-500'
                            : 'bg-card opacity-60'
                        }`}
                        key={badge.name}
                      >
                        <p className="text-center font-bold">{badge.name}</p>
                        <p className="text-center text-xs">
                          {badge.description}
                        </p>
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
