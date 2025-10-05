import Heading from '@components/_elements/heading'
import PageHeader from '@components/_layouts/pageHeader'
import { TextWall } from '@components/_layouts/textWall'
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
      <div key={name}>
        <p className="border border-black bg-purple-700 p-2 font-bold  text-white">
          {name}
        </p>
        <p className="border border-black p-2">{description}</p>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Ranks and Badges"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <TextWall title="How do they work?" background="light">
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
      </TextWall>
      <a className="anchor" id="ranks" />
      <TextWall title="Ranks" background="dark">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {ranks.map((rank, index) => (
            <div key={index}>
              <p className="border border-black bg-purple-700 p-2 font-bold  text-white">
                {rank}
              </p>
              {XpRanks.filter((r) => r.rank === rank).map((r) => (
                <p key={r.rank + r.name} className="border border-black p-2">
                  <strong>{r.name}:</strong> {r.xp.toLocaleString()}xp
                </p>
              ))}
            </div>
          ))}
        </div>
      </TextWall>
      <TextWall title="Badges" background="light">
        <div>
          <a className="anchor" id="badges" />
          <Heading as={'h3'}>Daily Streaks</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {StreakBadges.map((b) => BadgeElem(b.name, b.description))}
          </div>
          <Heading as={'h3'}>Tactics Streaks</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {TacticStreakBadges.map((b) => BadgeElem(b.name, b.description))}
          </div>
          <Heading as={'h3'}>Miscellaneous</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {MiscBadges.map((b) => BadgeElem(b.name, b.description))}
          </div>
        </div>
      </TextWall>
    </>
  )
}
