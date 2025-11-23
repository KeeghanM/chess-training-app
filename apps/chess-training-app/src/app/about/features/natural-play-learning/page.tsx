import Link from 'next/link'

import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import BigText from '@components/_layouts/bigText'
import CtaRow from '@components/_layouts/ctaRow'
import Hero from '@components/_layouts/hero'
import ImageRowFull from '@components/_layouts/imageRowFull'
import { TextWall } from '@components/_layouts/textWall'

export const metadata = {
  title: 'Natural Play Learning: The Context-Aware Chess Engine',
  description:
    "Discover ChessTraining.app's Natural Play Learning. A proprietary algorithm that adapts to your learning curve, allowing you to train openings like you play them.",
}

export default async function NaturalPlayLearningPage() {
  return (
    <>
      <Hero title="Learn Openings Like You Play Them">
        <Heading className="text-primary" as="h2">
          Real Game Simulation. Uninterrupted Flow. Powered by NPL.
        </Heading>
      </Hero>
      <BigText size="small">
        Standard opening trainers are annoying. They either force you to read
        the same comments a thousand times, or they drop you into a confusing
        mid-game position. <strong>Natural Play Learning (NPL)</strong> is
        different.
      </BigText>

      <div className="container mx-auto py-12 px-4 max-w-4xl text-center">
        <Heading as="h3" className="mb-6">
          The Problem with Other Apps
        </Heading>
        <p className="text-lg text-gray-700 mb-8">
          Most platforms fall into two traps. Either they force you to re-read
          "Welcome to the Course" comments on move 1 every single time, breaking
          your concentration. Or, they try to "save time" by dropping you
          straight into move 15, leaving you disoriented and lacking the context
          of how you got there.
        </p>
      </div>

      <ImageRowFull
        image={{
          src: '/images/man_frustrated_3.png',
          alt: 'A man sat at a desk frustrated yet determined to improve his chess',
        }}
        imageSide="left"
        heading="The Solution: Uninterrupted Flow"
      >
        <p>
          <strong>We treat training like a real game.</strong> You always start
          from Move 1. This allows you to build the muscle memory required to
          blitz out your opening moves over the board.
        </p>
        <p>
          The difference is in the <strong>Flow</strong>. Once you have seen a
          position's instructions once, we hide them. You simply play through
          the moves naturally. We don't interrupt you, we don't pop up comments,
          and we don't stop the game... unless you get it wrong.
        </p>
        <Heading as="h3">How it works:</Heading>
        <ul>
          <li>
            <strong>Learn Once, Then Play:</strong> Read the theory the first
            time. After that, it's just you and the board.
          </li>
          <li>
            <strong>Correction on Demand:</strong> If you forget a move, the NPL
            engine instantly pauses, brings back the lesson, and helps you
            relearn.
          </li>
          <li>
            <strong>Drill Confidence:</strong> By playing the full line every
            time without "training wheels," you gain the confidence that you
            actually know the opening, not just the last 3 moves.
          </li>
        </ul>
      </ImageRowFull>

      <ImageRowFull
        image={{
          src: '/images/man_chess_computer_3.png',
          alt: 'A person sat at a computer studying and improving their chess',
        }}
        imageSide="right"
        heading="Bring Your Own Repertoire"
      >
        <p>
          The Course Trainer isn't just for our content. It's a powerful engine
          for your own PGNs. Upload your repertoire from ChessBase or Lichess
          and let our NPL engine transform it into an interactive training plan.
        </p>
        <Heading as="h3">Key Features:</Heading>
        <ul>
          <li>
            <strong>Upload & Train:</strong> Transform static PGN files into
            dynamic, spaced-repetition courses.
          </li>
          <li>
            <strong>Community Library:</strong> Explore courses shared by other
            users or created by our in-house Masters.
          </li>
          <li>
            <strong>Focus on Understanding:</strong> Because you aren't
            mindlessly clicking "Next" on text boxes, your brain stays engaged
            for the moves that actually matter.
          </li>
        </ul>
        <Link href="/courses">
          <Button variant="primary">Explore Courses</Button>
        </Link>
      </ImageRowFull>

      <TextWall title="Why choose Natural Play Learning?">
        <ul>
          <li>
            <strong>Real-Game Feel:</strong> Experience the opening flow exactly
            as it happens over the board.
          </li>
          <li>
            <strong>Muscle Memory:</strong> Repetitive drilling of the *start*
            of the line ensures you never blank on move 4.
          </li>
          <li>
            <strong>Zero Distractions:</strong> No comments popping up to break
            your immersion unless you need them.
          </li>
          <li>
            <strong>Efficient Spaced Repetition:</strong> We schedule the lines
            you struggle with, so you drill what matters.
          </li>
        </ul>
      </TextWall>
      <CtaRow
        title="Ready to upgrade your opening prep?"
        cta={{ text: 'Start Training Free', link: '/auth/signin' }}
      >
        <p>
          Sign up now and experience the difference of an intelligent engine.
        </p>
      </CtaRow>
    </>
  )
}
