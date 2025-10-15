import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import {
  MiscBadges,
  StreakBadges,
  TacticStreakBadges,
  XpRanks,
} from '@utils/RanksAndBadges'

export default async function RankAndBadgesPage() {
  const ranks = Array.from(new Set(XpRanks.map((rank) => rank.rank)))

  const BadgeElem = (name: string, description: string) => {
    return (
      <div key={name} className="bg-card rounded-lg shadow overflow-hidden">
        <p className="bg-card-light p-4 font-bold text-lg">
          {name}
        </p>
        <p className="p-4 text-sm">{description}</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <Backdrop />
      <Container size="extra-wide">
        <Heading as="h1" className="text-white">
          Ranks and Badges
        </Heading>
        <Heading as="h2" className="text-card-dark">
          How do they work?
        </Heading>
        <div className="space-y-4 mb-8 text-white">
          <p>
            Ranks are earned by gaining experience points (XP). You gain XP by
            training on the site. This can be from any of our trainers, whether
            thats the WoodPecker method based Tactics Trainer or learning lines
            using our Natural Play Learning.
          </p>
          <p>
            Badges are earned by completing certain tasks. These tasks can be
            anything from training a certain amount of days in a row, to
            completing a certain amount of puzzles correctly in a row.
          </p>
        </div>
        <a className="anchor" id="ranks" />
        <Heading as="h2" className="text-white">
          Ranks
        </Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {ranks.map((rank, index) => (
            <div key={index} className="bg-card rounded-lg shadow overflow-hidden">
              <p className="bg-card-light p-4 font-bold text-lg">
                {rank}
              </p>
              <div className="p-4 space-y-2">
                {XpRanks.filter((r) => r.rank === rank).map((r) => (
                  <p key={r.rank + r.name} className="text-sm">
                    <strong>{r.name}:</strong> {r.xp.toLocaleString()}xp
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <a className="anchor" id="badges" />
        <Heading as="h2" className="text-white">
          Badges
        </Heading>
        <div className="space-y-8">
          <div>
            <Heading as={'h3'} className="text-card-dark">
              Daily Streaks
            </Heading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {StreakBadges.map((b) => BadgeElem(b.name, b.description))}
            </div>
          </div>
          <div>
            <Heading as={'h3'} className="text-card-dark">
              Tactics Streaks
            </Heading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {TacticStreakBadges.map((b) => BadgeElem(b.name, b.description))}
            </div>
          </div>
          <div>
            <Heading as={'h3'} className="text-card-dark">
              Miscellaneous
            </Heading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MiscBadges.map((b) => BadgeElem(b.name, b.description))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
