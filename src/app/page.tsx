import Link from 'next/link'
import Script from 'next/script'

import Button from './components/_elements/button'
import Heading from './components/_elements/heading'
import StyledLink from './components/_elements/styledLink'
import BigText from './components/_layouts/bigText'
import CtaRow from './components/_layouts/ctaRow'
import Hero from './components/_layouts/hero'
import ImageRowFull from './components/_layouts/imageRowFull'
import { MultiCol, MultiColItem } from './components/_layouts/multiCol'

export const metadata = {
  title:
    'ChessTraining.app: Revolutionize Your Chess Game with Innovative Learning Methods',
  description:
    'Improve your chess skills using the Woodpecker Method and our innovative Natural Play Learning. With a variety of training tools including tactics, courses, and endgames training. Learn chess in an intuitive, efficient, and enjoyable way, backed by a community of chess enthusiasts and professionals. Designed for those looking to elevate their chess game through science-backed, personalized training.',
}

export default async function Home() {
  const reviews = [
    {
      name: 'Matthias',
      date: '2023-12-06',
      text: "I really think your site is great. It's a great pleasure to train with it.",
    },
    {
      name: 'Chris',
      date: '2023-05-07',
      text: 'An excelled way to use the Woodpecker method! Thank you.',
    },
    {
      name: 'W. D.',
      date: '2023-09-27',
      text: "Huge fan of the site ... I'm on my third time through [a tactics set]",
    },
    {
      name: 'Rob',
      date: '2022-02-16',
      text: 'Just tried a few tactics positions.. level is not too hard, but taxing enough to make you think',
    },
  ]

  return (
    <>
      <Script src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" />
      <Hero
        title="Elevate Your Training and Improve Your Chess Today!"
        cta={{
          text: 'Start Training',
          link: '/auth/signin',
        }}
        image={{
          src: '/images/hero.avif',
          alt: 'Chess board with pieces set up',
        }}
      >
        <Heading color="text-orange-500" as="h2">
          Discover the power of science backed chess training - Available for
          free forever!
        </Heading>
      </Hero>
      <ImageRowFull
        heading="The definitive destination for chess enthusiasts of all skill levels"
        imageSide="left"
        background="light"
        image={{
          src: '/images/chess_group_detailed.png',
          alt: 'Abstract art of a varied group of people learning chess',
        }}
      >
        <p>
          Our mission is simple yet ambitious: to improve your chess game
          through innovative, science-backed training methods.
          ChessTraining.app, your ultimate chess learning app, is designed to
          cater to players of all levels, from those taking their first steps on
          the chessboard to those seeking to refine their grandmaster-level
          tactics as a dedicated chess trainer.
        </p>
        <p>
          Our platform brings science and technology to the world of chess, with
          a variety of tools and features designed to help you improve your
          game. From our flagship Tactics Trainer based on the{' '}
          <StyledLink href="/about/features/woodpecker-method">
            Woodpecker Method
          </StyledLink>{' '}
          to our innovative{' '}
          <StyledLink href="/about/features/natural-play-learning">
            "Natural Play Learning"
          </StyledLink>{' '}
          courses, each tool is designed to target specific areas of your game.
        </p>
        <div>
          <Link href="/about/features">
            <Button variant="primary">See all features</Button>
          </Link>
        </div>
      </ImageRowFull>
      <ImageRowFull
        heading="Introducing Natural Play Learning"
        imageSide="right"
        background="light"
        image={{
          src: '/images/two_women_playing_chess.png',
          alt: 'Two women sat down studying chess surrounded by abstract art chess pieces',
        }}
      >
        <p>
          A groundbreaking approach exclusive to ChessTraining.app, Natural Play
          Learning revolutionizes the way you learn chess. Gone are the days of
          repetitive drills on positions you've already mastered. Our
          intelligent system adapts to your learning curve, focusing on new
          challenges and reinforcing concepts only as needed.
        </p>
        <p>
          This mirrors real-game scenarios, preparing you for diverse and
          unexpected plays. With Natural Play Learning, experience a more
          intuitive, efficient, and enjoyable path to chess mastery. Join us
          today and discover the ChessTraining.app difference.
        </p>
        <div>
          <Link href="/courses#natural-play-learning">
            <Button variant="primary">Learn More</Button>
          </Link>
        </div>
      </ImageRowFull>
      <BigText color="accent">
        From our "Tactics Trainer" to our "Natural Play Learning" courses, every
        tool is designed to target specific areas of your chess improvement
        journey.
      </BigText>
      <MultiCol
        title="Our Training Tools"
        background="light"
        cta={{
          text: 'See all features',
          link: '/about/features',
        }}
      >
        <MultiColItem title="Tactics Trainer">
          <p>
            Train tactics using the{' '}
            <StyledLink href="/about/features/woodpecker-method">
              WoodPecker Method
            </StyledLink>{' '}
            developed by GM's Axel Smith, and Hans Tikkanen.
          </p>
          <p>
            Re-program your unconscious mind. With benefits including sharper
            chess tactical vision, fewer blunders, and better play when in time
            trouble as well as improved chess intuition.
          </p>
          <p>
            Generate puzzle sets and train on them, while the site takes care of
            tracking your accuracy & time spent. You just focus on your chess
            training experience.
          </p>
          <Link href="/training/tactics">
            <Button variant="primary">Start Training</Button>
          </Link>
        </MultiColItem>
        <MultiColItem title="Course Trainer">
          <p>
            Built using spaced repetition, and implementing our{' '}
            <StyledLink href="/about/features/natural-play-learning">
              Natural Play Learning
            </StyledLink>{' '}
            method, our courses are a great way to learn.
          </p>
          <p>
            Train using a course you have created, or one that has been shared
            with you. You won't find a better way to learn chess.
          </p>
          <Link href="/courses">
            <Button variant="primary">Browse Courses</Button>
          </Link>
        </MultiColItem>
        <MultiColItem title="Visualisation Trainer">
          <p>
            Do you struggle to see past two or three moves? Find long
            calculations difficult? Our Visualisation Trainer is designed for
            you.
          </p>
          <p>
            With our trainer, you're presented with a chess position and a
            sequence of moves. Your task is to visualize these moves in your
            mind, and find the correct final move.
          </p>
          <p>
            The tool was designed with both beginners and advanced chess players
            in mind, with completely customisable settings. You can choose the
            number of moves to visualise and the difficulty of the puzzles, to
            really set the level of challenge you want.
          </p>
          <Link href="/training/visualisation">
            <Button variant="primary">Let's See</Button>
          </Link>
        </MultiColItem>
      </MultiCol>
      <CtaRow
        title="Ready to transform your chess game?"
        cta={{ text: 'Sign Up Now', link: '/auth/signin' }}
        background="dark"
      >
        <p>Sign up now for free and start your journey to chess mastery.</p>
      </CtaRow>
      <div className="item flex flex-col items-center pb-6 md:pb-12">
        <MultiCol title="What Our Members Say" background="light">
          {reviews
            .sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            .map((review) => (
              <MultiColItem key={review.name} title={review.name}>
                <p className="text-sm italic ">{review.date}</p>
                <p>{review.text}</p>
              </MultiColItem>
            ))}
        </MultiCol>
        <div
          className="trustpilot-widget"
          data-locale="en-GB"
          data-template-id="56278e9abfbbba0bdcd568bc"
          data-businessunit-id="6577973a318437a64285f90c"
          data-style-height="52px"
          data-style-width="100%"
        >
          <a
            href="https://uk.trustpilot.com/review/chesstraining.app"
            target="_blank"
            rel="noopener"
          >
            Trustpilot
          </a>
        </div>
        <Link target="_blank" href="https://www.buymeacoffee.com/keeghanm">
          <Button variant="primary">Support us with Coffee</Button>
        </Link>
      </div>
    </>
  )
}
