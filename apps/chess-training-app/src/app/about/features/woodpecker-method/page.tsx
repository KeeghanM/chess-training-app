import Link from 'next/link'

import Heading from '@components/_elements/heading'
import BigText from '@components/_layouts/bigText'
import CtaRow from '@components/_layouts/ctaRow'
import Hero from '@components/_layouts/hero'
import ImageRowFull from '@components/_layouts/imageRowFull'
import { TextWall } from '@components/_layouts/textWall'

export const metadata = {
  title: 'Rewire Your Tactical Brain with the Woodpecker Method',
  description:
    'Master tactical patterns using the Woodpecker Method. Build intuitive speed and accuracy by cycling through customized puzzle sets.',
}

export default async function WoodPeckerPage() {
  return (
    <>
      <Hero title="Rewire Your Brain for Tactics">
        <Heading className="text-primary" as="h2">
          Reprogram your subconscious using the proven Woodpecker Method
          developed by GMs Axel Smith and Hans Tikkanen.
        </Heading>
      </Hero>
      <ImageRowFull
        image={{
          src: '/images/man_chess_computer_3.png',
          alt: 'A person at a computer engaging in intense chess tactics training',
        }}
        imageSide="left"
        heading="What is the Woodpecker Method?"
      >
        <p>
          You can calculate, but can you see it instantly? The Woodpecker Method
          isn't just about solving puzzles; it's about{' '}
          <strong>pattern recognition</strong>.
        </p>
        <p>
          By solving a set of puzzles and then re-solving them repeatedly at
          faster intervals, you move the knowledge from your conscious
          calculation (slow) to your subconscious intuition (fast). In a real
          game, this is the difference between spotting a tactic in 2 seconds
          versus missing it entirely.
        </p>
      </ImageRowFull>
      <BigText color="dark">
        Build your first set now -{' '}
        <Link
          className="cursor-pointer font-bold text-primary! underline hover:no-underline"
          href="/training/tactics/list"
        >
          Start Training
        </Link>
      </BigText>
      <ImageRowFull
        image={{
          src: '/images/woman_chess_3.png',
          alt: 'A focused individual studying chess tactics on a computer',
        }}
        imageSide="right"
        heading="We Handle the Schedule, You Do the Work"
      >
        <p>
          Manually tracking your Woodpecker cycles in a spreadsheet is a pain.
          Our Tactics Trainer automates the entire process.
        </p>
        <p>
          <strong>1. Build a Set:</strong> Create a custom set tailored to your
          rating.
        </p>
        <p>
          <strong>2. Solve & Repeat:</strong> We track your accuracy and time.
          Once you finish a cycle, we reset the set and challenge you to beat
          your previous time.
        </p>
        <p>
          The goal is to complete the entire set in a single sitting
          (eventually). The recommended target is 7-8 repetitions, with short
          breaks between cycles to let your brain consolidate the patterns.
        </p>
      </ImageRowFull>
      <TextWall title="Why it works">
        <ul>
          <li>
            <strong>Subconscious Programming:</strong> Embed patterns so deep
            you can't miss them.
          </li>
          <li>
            <strong>Automated Admin:</strong> No spreadsheets. No timers. Just
            chess.
          </li>
          <li>
            <strong>Personalized Difficulty:</strong> We fetch puzzles that
            match your exact strength.
          </li>
          <li>
            <strong>Real Game Scenarios:</strong> All puzzles are taken from
            real Lichess games.
          </li>
        </ul>
      </TextWall>
      <CtaRow
        title="Ready to stop blundering?"
        cta={{ text: 'Start Your First Cycle', link: '/training/tactics/list' }}
      >
        <p>It's free forever. Build your tactical vision today.</p>
      </CtaRow>
    </>
  )
}
