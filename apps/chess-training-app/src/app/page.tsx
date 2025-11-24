import Link from 'next/link'
import Script from 'next/script'

import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import BigText from '@components/_layouts/bigText'
import CtaRow from '@components/_layouts/ctaRow'
import Hero from '@components/_layouts/hero'
import ImageRowFull from '@components/_layouts/imageRowFull'
import { MultiCol, MultiColItem } from '@components/_layouts/multiCol'

export const metadata = {
  title:
    'ChessTraining.app: Revolutionize Your Chess Game with Innovative Learning Methods',
  description:
    'Improve your chess skills using the Woodpecker Method and our innovative Natural Play Learning. With a variety of training tools including tactics, courses, and endgames training. Learn chess in an intuitive, efficient, and enjoyable way, backed by a community of chess enthusiasts and professionals. Designed for those looking to elevate their chess game through science-backed, personalized training.',
}

/**
 * Render the Home page for ChessTraining.app.
 *
 * The page includes a hero banner, feature and training tool sections (Tactics, Course, Visualisation),
 * descriptive image rows, a prominent accent text, a call-to-action row, member testimonials, and external widgets/links.
 *
 * @returns The React element representing the complete Home page UI
 */
export default async function Home() {
  /**
   * Testimonials from users, sorted by date in the render.
   */
  const reviews = [
    {
      name: 'Anonymous',
      date: '2025-11-23',
      text: 'Love this app',
    },
    {
      name: 'Anonymous',
      date: '2025-09-30',
      text: 'Thank you so much for this amazing website!!',
    },
    {
      name: 'Coral',
      date: '2025-09-29',
      text: 'This site is incredible. Just what I have always wished existed.',
    },
    {
      name: 'Anonymous',
      date: '2025-09-28',
      text: 'i just wanna say that this site is top tier. [...] this woodpecker section is a life saver',
    },
    {
      name: 'Alice',
      date: '2025-07-02',
      text: 'just started using the woodpecker sets. been looking for a faff free way to train this method digitally, and so far this app is definitely the best way ive found!',
    },
    {
      name: 'Anonymous',
      date: '2025-03-27',
      text: 'Thank you for making this wonderful site! I cant emphasize how grateful I am for this site!',
    },
    {
      name: 'Thomas',
      date: '2024-02-26',
      text: 'Massive improvement on existing teaching resources. Innovative and well-reasoned training mechanisms, takes a step forward from existing platforms',
    },
    {
      name: 'Jack',
      date: '2024-02-26',
      text: 'My chess is stronger since Ive used this, now I am strong with endgames.',
    },
    {
      name: 'Ayush Gudipati',
      date: '2024-02-11',
      text: 'Great Free Tool to Improve your Chess game. An amazing website, with great customer support, lots of tools, and overall a great way to improve your chess game!',
    },
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
        title="Stop Forgetting Your Openings. Start Mastering Tactics."
        cta={{
          text: 'Start Training Now',
          link: '/auth/signin',
        }}
      >
        <Heading className="text-primary" as="h2">
          Discover the power of science-backed chess training.
          <br />
          <span className="text-white text-lg mt-2 block opacity-90">
            ⭐ Rated 5/5 by Chess Enthusiasts
          </span>
        </Heading>
      </Hero>

      <div className="bg-slate-50 py-8">
        <div className="container mx-auto px-4">
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
        </div>
      </div>

      <ImageRowFull
        heading="The definitive destination for chess improvement"
        imageSide="left"
        image={{
          src: '/images/chess_group_detailed.png',
          alt: 'Abstract art of a varied group of people learning chess',
        }}
      >
        <p>
          <strong>Memorization is not enough.</strong> Our mission is to give
          you tools that actually work. ChessTraining.app is designed to fix the
          biggest leaks in your game: forgetting your opening lines and missing
          tactical shots.
        </p>
        <p>
          Our platform brings unique technology to the world of chess. From our
          flagship Tactics Trainer based on the proven{' '}
          <StyledLink href="/about/features/woodpecker-method">
            Woodpecker Method
          </StyledLink>{' '}
          to our proprietary{' '}
          <StyledLink href="/about/features/natural-play-learning">
            NPL Engine
          </StyledLink>
          , every tool is designed to respect your time and maximize your
          results.
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
        image={{
          src: '/images/two_women_playing_chess.png',
          alt: 'Two women sat down studying chess surrounded by abstract art chess pieces',
        }}
      >
        <p>
          <strong>Train like you play.</strong> Other apps interrupt you on
          every move with comments, or disorient you by dropping you into a
          random position at move 15. That's not how real chess works.
        </p>
        <p>
          With <strong>Natural Play Learning (NPL)</strong>, you play every line
          from the start, building true muscle memory. We hide the comments and
          instructions once you've learned them, allowing you to flow through
          the opening naturally. We only interrupt the game if you make a
          mistake.
        </p>
        <div>
          <Link href="/courses#natural-play-learning">
            <Button variant="primary">See How It Works</Button>
          </Link>
        </div>
      </ImageRowFull>

      <BigText color="accent">
        From "Woodpecker" repetition to "Natural Play" logic, we don't just show
        you moves - we help you understand them.
      </BigText>
      <MultiCol
        title="Our Training Tools"
        cta={{
          text: 'Explore All Tools',
          link: '/about/features',
        }}
      >
        <MultiColItem title="Tactics Trainer">
          <p>
            Rewire your tactical brain using the{' '}
            <StyledLink href="/about/features/woodpecker-method">
              WoodPecker Method
            </StyledLink>
            .
          </p>
          <p>
            Generate custom puzzle sets based on your rating. The system handles
            the admin while you focus purely on pattern recognition.
          </p>
          <Link href="/training/tactics" className="mt-auto">
            <Button variant="primary">Start Training</Button>
          </Link>
        </MultiColItem>
        <MultiColItem title="Course Trainer">
          <p>
            Master your openings using our{' '}
            <StyledLink href="/about/features/natural-play-learning">
              Natural Play Learning
            </StyledLink>{' '}
            engine.
          </p>
          <p>
            Import your own PGNs or learn from community courses. We ensure you
            retain the lines without the boredom of rote memorization.
          </p>
          <Link href="/courses" className="mt-auto">
            <Button variant="primary">Browse Courses</Button>
          </Link>
        </MultiColItem>
        <MultiColItem title="Visualisation Trainer">
          <p>
            Struggle to calculate deep lines? Our Visualisation Trainer forces
            you to see the board in your mind.
          </p>
          <p>
            Read the moves, visualize the position, and find the tactic without
            moving the pieces. It's the fastest way to improve calculation.
          </p>
          <Link href="/training/visualisation" className="mt-auto">
            <Button variant="primary">Try It Now</Button>
          </Link>
        </MultiColItem>
      </MultiCol>
      <CtaRow
        title="Ready to transform your chess game?"
        cta={{ text: 'Sign Up Free', link: '/auth/signin' }}
      >
        <p>
          Join thousands of players improving their game with science-backed
          methods.
        </p>
      </CtaRow>
      <div className="item flex flex-col items-center pb-6 md:pb-12">
        <MultiCol title="What Our Members Say">
          {reviews
            .sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            .map((review, i) => (
              <MultiColItem key={`${review.name}-${i}`} title={review.name}>
                <p className="text-sm italic ">{review.date}</p>
                <p>"{review.text}"</p>
              </MultiColItem>
            ))}
        </MultiCol>
      </div>
    </>
  )
}
