import Link from 'next/link'
import Heading from '@components/_elements/heading'
import BigText from '@components/_layouts/bigText'
import CtaRow from '@components/_layouts/ctaRow'
import Hero from '@components/_layouts/hero'
import ImageRowFull from '@components/_layouts/imageRowFull'
import { TextWall } from '@components/_layouts/textWall'

export const metadata = {
  title:
    'Boost Your Chess Tactics with the Woodpecker Method - ChessTraining.app',
  description:
    'Master tactical chess play with the Woodpecker Method. Perfect for all skill levels, this method developed by GMs Axel Smith and Hans Tikkanen emphasizes solving and re-solving puzzles for speed and accuracy. Join ChessTraining.app to revolutionize your tactical skills.',
}

export default async function WoodPeckerPage() {
  return (
    <>
      <Hero
        title={'Chess Tactics Training with the Woodpecker Method'}
        image={{
          src: '/images/hero.avif',
          alt: 'Chess board focusing on tactical positions',
        }}
      >
        <Heading color="text-orange-500" as={'h2'}>
          Train chess puzzles using the WoodPecker Method developed by GM's Axel
          Smith, and Hans Tikkanen.
        </Heading>
      </Hero>
      <ImageRowFull
        image={{
          src: '/images/man_chess_computer_3.png',
          alt: 'A person at a computer engaging in intense chess tactics training',
        }}
        imageSide="left"
        heading="Discover the Woodpecker Method"
        background="light"
      >
        <p>
          The Woodpecker Method, developed by Grandmasters Axel Smith and Hans
          Tikkanen, is a game-changing approach to improving at chess tactics.
          It focuses on solving a large set of puzzles and then re-solving them
          faster and more accurately, embedding core tactical patterns into your
          subconscious.
        </p>
        <p>
          This method is tailored to your chess rating, providing a personalized
          training experience that automates tracking and admin, allowing you to
          focus solely on puzzle-solving.
        </p>
      </ImageRowFull>
      <BigText color="secondary">
        Enhance your tactical play now -{' '}
        <Link
          className="cursor-pointer font-bold !text-purple-500 underline hover:no-underline"
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
        heading="How to Train with the Woodpecker Method"
        background="light"
      >
        <p>
          Our Tactics Trainer lets you build and solve a customized set of
          150-500 puzzles, suited to your chess rating. We track your time and
          accuracy, helping you improve both as you progress through the
          puzzles.
        </p>
        <p>
          These sessions are designed to be intense yet rewarding, with each
          puzzle set aiming to challenge and improve your tactical abilities
          over time.
        </p>
        <p>
          The key to getting the most out of the Woodpecker Method is to ensure
          the puzzles are challenging enough to push you, but not so difficult
          that you can't solve them. Ideally each puzzle on your first run
          through should take between 1-2 minutes to solve. If you find yourself
          taking longer than this, you may want to consider reducing the
          difficulty of the puzzle set.
        </p>
        <p>
          Each time you complete a tactics set, you will naturally get faster as
          the patterns become embedded in your subconscious. The recommended
          amount is 8 repetitions, with a break of 3-4 days after you finish a
          set. This allows your brain to process the patterns and commit them to
          memory.
        </p>
      </ImageRowFull>
      <TextWall title="Why the Woodpecker Method?" background="dark">
        <ul>
          <li>
            <strong>Effective Learning:</strong> Absorb and retain tactical
            patterns more effectively.
          </li>
          <li>
            <strong>Personalized Training:</strong> Puzzles tailored to your
            skill level.
          </li>
          <li>
            <strong>Progress Tracking:</strong> Monitor your improvement over
            time.
          </li>
          <li>
            <strong>Real-Game Scenarios:</strong> Train with puzzles derived
            from actual game situations.
          </li>
        </ul>
      </TextWall>
      <CtaRow
        title="Are You Ready to Revolutionize Your Chess Tactics?"
        cta={{ text: 'Begin Your Journey', link: '/training/tactics/list' }}
        background="light"
      >
        <p>Start now for free and take your tactical skills to new heights.</p>
      </CtaRow>
    </>
  )
}
