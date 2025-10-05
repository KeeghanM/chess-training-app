import Link from 'next/link'
import BigText from '@components/_layouts/bigText'
import CtaRow from '@components/_layouts/ctaRow'
import Hero from '@components/_layouts/hero'

export const metadata = {
  title: 'Explore Chess Training Tools & Features at ChessTraining.app',
  description:
    "Dive into the world of chess training with ChessTraining.app's range of unique tools. From our pioneering Natural Play Learning to the engaging Tactics Trainer, and our comprehensive Course Trainer, we offer tailored solutions to enhance your chess skills. Whether you're a beginner or a seasoned player, our features like Knight Vision and Endgame Trainer are designed to elevate your game. Start your journey towards chess mastery today with ChessTraining.app!",
}

export default async function FeaturesPage() {
  const features = [
    {
      name: 'Natural Play Learning',
      description: [
        "A groundbreaking approach exclusive to ChessTraining.app. This method revolutionizes the way you learn chess. Gone are the days of repetitive drills on positions you've already mastered. Our intelligent system adapts to your learning curve, focusing on new challenges and reinforcing concepts only as needed.",
        "This mirrors real-game scenarios, allowing you to play through your openings from the beginning, but if you've already seen a position you won't have to spend time reading or click through the moves again. Instead, you Naturally Play the moves you know and learn the ones you don't.",
      ],
      anchor: 'natural-play-learning',
      link: '/about/features/natural-play-learning',
    },
    {
      name: 'Course Trainer',
      description: [
        'Our Course Trainer is the best way to learn and remember your chess openings. Using a combination of Spaced Repetition and Natural Play Learning, our Course Trainer will help you master your openings in no time.',
        'Courses can be created by you, or shared with you by other users. We also regularly publish our own courses, created by our team of in-house Masters as well as many other top players.',
      ],
      anchor: 'course-trainer',
      link: '/courses',
    },
    {
      name: 'Tactics Trainer',
      description: [
        "Using the WoodPecker Method developed by GM's Axel Smith and Hans Tikkanen, re-program your unconscious mind. With benefits including sharper tactical vision, fewer blunders, and better play when in time trouble as well as improved intuition.",
        "Combine the ability to automatically generate puzzle sets based on themes, or covering the whole remit of chess Tactics, with the site taking care of tracking all your accuracy & time spent. You'll quickly see your rating rise.",
      ],
      anchor: 'tactics-trainer',
      link: '/training/tactics',
    },

    {
      name: 'Endgame Trainer',
      description: [
        'Our Endgame Trainer is the best way to improve your endgame skills. Which, while it may not be as exciting as openings, or as sexy as middlegame tactics, is arguably much more important than either.',
        'Pick from Queen, Rook, Knight, Bishop, or Pawn endgames. Or let fate decide and train them all!',
      ],
      anchor: 'endgame-trainer',
      link: '/training/endgames',
    },
    {
      name: 'Visualisation Training',
      description: [
        'Do you struggle to see past two or three moves? Find long calculations difficult? This is for you.',
        'With our visualisation trainer you are presented with a board position, and a list of moves at the end of which will be a simple tactic.',
        'All you need to do is play the given sequence of moves in your head, decide on your final move and then check if you were correct.',
      ],
      anchor: 'visualisation-training',
      link: '/training/visualisation',
    },
    {
      name: 'Board Recall Training',
      description: [
        'Help improve your board vision, and your ability to "see" the board in your head.',
        'With our recall trainer you are presented with a board position, and a short time to memorise it.',
        'You are then asked a question about the position, and you must answer it from memory.',
      ],
      anchor: 'recall-training',
      link: '/training/recall',
    },
    {
      name: 'Play the Masters',
      description: [
        'Play through the games of the masters, and try to guess their moves.',
        'A great way to improve your understanding of the game, and to learn new ideas.',
        'We have a large library of curated master games, all selected for their instructive value.',
      ],
      anchor: 'play-the-masters',
      link: '/training/play-the-masters',
    },
    {
      name: 'Knight Vision',
      description: [
        'Whether you are a beginner, intermediate, or even experienced player - board vision is crucial to the game of Chess. We have devised a very simple method of improving your board vision through the use of knights in a fun and fast paced way',
        "Race against the clock to find the knight's path. The more you play, the better your board vision will become.",
      ],
      anchor: 'knight-vision',
      link: '/training/knight-vision',
    },
  ]

  return (
    <>
      <Hero
        title="Features & Training Tools"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden Chess pieces on a chess board',
        }}
      >
        <ol className="text-orange-500 p-2 bg-[rgba(0,0,0,0.3)]">
          {features.map((feature, index) => (
            <li
              key={'li' + index.toString()}
              className="cursor-pointer hover:underline"
            >
              <Link href={'#' + feature.anchor}>
                {index + 1}. {feature.name}
              </Link>
            </li>
          ))}
        </ol>
      </Hero>
      {features.map((feature, index) => (
        <>
          <a id={feature.anchor} className="anchor" />
          <CtaRow
            title={feature.name}
            background={index % 2 == 0 ? 'dark' : 'light'}
            key={'feature-' + index.toString()}
            cta={{
              text: 'Learn More',
              link: feature.link,
            }}
          >
            {feature.description.map((paragraph, index) => (
              <p className="flex-1" key={'desc-' + index.toString()}>
                {paragraph}
              </p>
            ))}
          </CtaRow>
        </>
      ))}
      <BigText color="secondary">
        <p>Ready to transform you chess game?</p>
        <p>
          <Link
            className="cursor-pointer font-bold !text-purple-500 underline hover:no-underline"
            href="/auth/signin"
          >
            Sign up now
          </Link>{' '}
          for free and start your journey to chess mastery.
        </p>
      </BigText>
    </>
  )
}
