import Link from 'next/link'

import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import BigText from '@components/_layouts/bigText'
import CtaRow from '@components/_layouts/ctaRow'
import Hero from '@components/_layouts/hero'
import ImageRowFull from '@components/_layouts/imageRowFull'
import { TextWall } from '@components/_layouts/textWall'

export const metadata = {
  title:
    'Revolutionize your Chess Training with Natural Play Learning - ChessTraining.app',
  description:
    "Discover ChessTraining.app's Natural Play Learning, an innovative chess training method for faster learning and longer retention. Master chess openings like never before with our unique approach, combining the effectiveness of spaced repetition with real-game scenarios. Join us now and elevate your chess game",
}

export default async function NaturalPlayLearningPage() {
  return (
    <>
      <Hero title="Master Chess Openings with Natural Play Learning">
        <Heading className="text-primary" as="h2">
          Welcome to a Revolutionary Chess Training Experience
        </Heading>
      </Hero>
      <BigText size="small">
        At ChessTraining.app, we're redefining the way you learn chess openings.
        Our unique Natural Play Learning method is here to transform your
        understanding and mastery of chess openings.
      </BigText>
      <ImageRowFull
        image={{
          src: '/images/man_chess_computer_3.png',
          alt: 'A person sat at a computer studying and improving their chess',
        }}
        imageSide="right"
        heading="Courses Powered by Natural Play Learning"
      >
        <p>
          Our Course Trainer is specifically designed to help you learn chess
          openings. Faster. And better. With Natural Play Learning, you can
          master chess openings like never before. You can bring your own PGN
          files and transform them into interactive courses. Or you can explore
          the courses shared by other users. We will also regularly publish
          bespoke courses created by our in-house Masters and top players.
        </p>
        <Heading as="h3">Here's what you can expect:</Heading>
        <ul>
          <li>
            <strong>User-Centric:</strong> You can either create your own
            courses or explore those shared by other users. Our team of in-house
            Masters and top players also regularly publishes bespoke courses.
          </li>
          <li>
            <strong>Dynamic and Interactive:</strong> Each course is structured
            to help you learn and remember chess openings faster than ever
            before, with an emphasis on practical understanding and retention.
          </li>
          <li>
            <strong>Focusing on Real-Game Scenarios:</strong> The courses are
            not just about memorising moves but understanding them in the
            context of real-game scenarios.
          </li>
        </ul>
        <Link href="/courses">
          <Button variant="primary">Explore Courses</Button>
        </Link>
      </ImageRowFull>
      <BigText color="dark">
        Start improving your chess now -{' '}
        <Link
          className="cursor-pointer font-bold !text-orange-500 underline hover:no-underline"
          href="/auth/signin"
        >
          Sign Up
        </Link>{' '}
        for free!
      </BigText>
      <ImageRowFull
        image={{
          src: '/images/man_frustrated_3.png',
          alt: 'A man sat at a desk frustrated yet determined to improve his chess',
        }}
        imageSide="left"
        heading="What is Natural Play Learning?"
      >
        <p>
          Natural Play Learning is a groundbreaking technique developed
          exclusively by ChessTraining.app. This method revolutionizes
          traditional chess training by combining the effectiveness of Spaced
          Repetition with a creative twist.
        </p>
        <p>
          By ensuring you only "learn" a move once, and after that are shown it
          directly in context as you would when playing, we not only cut down on
          the time it takes to learn a move, but also ensure you retain it for
          longer.
        </p>
        <Heading as="h3">Here's how it works:</Heading>
        <ul>
          <li>
            <strong>Learning Through Playing:</strong> Instead of monotonously
            re-learning the same moves, you engage with them in a more natural,
            game-like environment. Once you master a move, it becomes a core
            part of your game play.
          </li>
          <li>
            <strong>Efficient and Engaging:</strong> As you play through your
            openings, if you encounter a familiar position, you skip the basic
            steps and directly engage with the new challenges. This approach not
            only makes learning more efficient but also deeply engaging.
          </li>
          <li>
            <strong>Tailored to All Levels:</strong> Whether you're a beginner
            or a seasoned Grandmaster, our Natural Play Learning method is
            designed to cater to every skill level.
          </li>
        </ul>
      </ImageRowFull>
      <TextWall title="Why choose Natural Play Learning?">
        <ul>
          <li>
            <strong>Faster Learning:</strong> Absorb and comprehend chess
            openings more quickly than traditional methods
          </li>
          <li>
            <strong>Longer Retention:</strong> Our method ensures that you
            remember moves for a longer period
          </li>
          <li>
            <strong>Efficient Training:</strong> Focus on learning new
            strategies and tactics, not just repeating what you already know
          </li>
          <li>
            <strong>Real-Game Feel:</strong> Experience the openings as they
            would naturally occur in real chess games
          </li>
        </ul>
      </TextWall>
      <CtaRow
        title="Ready to transform your chess game?"
        cta={{ text: 'Sign Up Now', link: '/auth/signin' }}
      >
        <p>Sign up now for free and start your journey to chess mastery.</p>
      </CtaRow>
    </>
  )
}
