import Link from 'next/link'
import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import CtaRow from '@components/_layouts/ctaRow'
import Hero from '@components/_layouts/hero'
import ImageRowFull from '@components/_layouts/imageRowFull'

export const metadata = {
  title:
    'Chess Tactics Training with the WoodPecker Method at ChessTraining.app',
  description:
    "Transform your tactical play in chess with ChessTraining.app's Tactics Trainer, utilizing the renowned WoodPecker Method developed by GMs Axel Smith and Hans Tikkanen. This unique approach involves solving and re-solving challenging puzzles to enhance speed and accuracy, embedding core tactical patterns into your subconscious. Tailored to your chess rating, our Tactics Trainer automates tracking and admin, allowing you to focus solely on puzzle-solving. Experience a significant improvement in your game with sessions designed for all skill levels. Start your journey to tactical mastery today!",
}

export default async function Tactics() {
  return (
    <>
      <Hero
        title="Chess Tactics Training"
        cta={{
          text: 'Start Training',
          link: '/training/tactics/list',
        }}
      >
        <Heading className="text-primary" as="h2">
          Train Your Chess Tactics to Master Level
        </Heading>
      </Hero>
      <ImageRowFull
        heading="How to use the Tactics Trainer"
        image={{
          src: '/images/woman_studying_2.png',
          alt: 'A woman studying chess while sat at a desk',
        }}
        imageSide="right"
      >
        <p>
          In our Chess Tactics Trainer we have implemented the{' '}
          <StyledLink href="/about/features/woodpecker-method">
            Woodpecker Method
          </StyledLink>
          . This allows you to automaticcaly build a set of between 20-500 chess
          puzzles. Each one tailored to your chess rating, and based on the
          chess tactics and themes that you want to focus on.
        </p>
        <p>
          We will automatically track your time and accuracy across the chess
          puzzles. This means all the admin work required in the WoodPecker
          method is taken care of for you - you just focus on solving chess
          puzzles. Remember, these puzzles should be difficult for you to solve!
          For best results, break your practice into 30-60 minute sessions once
          a day. Your first time through a puzzle set should take 1-2 weeks.
        </p>
      </ImageRowFull>
      <ImageRowFull
        heading="What is the Woodpecker Method"
        image={{
          src: '/images/man_chess_computer.png',
          alt: 'A man sat at a computer studying and improving his chess',
        }}
        imageSide="left"
      >
        <a id="about" />
        <p>
          The Woodpecker Method is based on solving a large set of puzzles; then
          solving the same puzzles again and again, only faster.
        </p>
        <p>
          The puzzles should be difficult but not impossible, in the 2-5 minute
          range to solve. Not 30 seconds. By repeating the set over and over,
          you will get faster and more accurate.
        </p>
        <p>
          However this isn't simple memorisation! Rather, you internalise and
          bake into your subconscious the core ideas and patterns.
        </p>
        <Link href="/about/features/woodpecker-method">
          <Button variant="primary">
            Learn More about the Woodpecker Method
          </Button>
        </Link>
      </ImageRowFull>

      <CtaRow
        title="Ready to take your game to the next level?"
        cta={{
          text: 'Start Training',
          link: '/training/tactics/list',
        }}
      >
        <p>Create up to three puzzles sets for free. No costs. Forever.</p>
      </CtaRow>
    </>
  )
}
