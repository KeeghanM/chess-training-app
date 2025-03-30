import Image from 'next/image'
import { redirect } from 'next/navigation'

import { prisma } from '~/server/db'

import PremiumDisplay from '../components/dashboard/PremiumDisplay'
import Container from '~/app/components/_elements/container'
import Heading from '~/app/components/_elements/heading'
import StreakDisplay from '~/app/components/dashboard/StreakDisplay'
import ToolGrid from '~/app/components/dashboard/ToolGrid'
import XpDisplay from '~/app/components/dashboard/XpDisplay'
import ThemeSwitch from '~/app/components/template/header/ThemeSwitch'

import CalculateStreakBadge from '../_util/CalculateStreakBadge'
import CalculateXpRank from '../_util/CalculateXpRank'
import { getUserServer } from '../_util/getUserServer'
import { PostHogClient } from '~/app/_util/trackEventOnServer'

export type Tool = {
  name: string
  description: string[]
  trainingLink: string
  learnMoreLink?: string
  buttonText: string
  active: boolean
  id?: string
}

export const metadata = {
  title: 'Dashboard - ChessTraining.app',
}

export default async function Dashboard() {
  const { user, isPremium, isStaff } = await getUserServer()

  if (!user) {
    redirect('/auth/signin')
  }

  const profile = await prisma.userProfile.findFirst({
    where: {
      id: user.id,
    },
  })
  const badges = await prisma.userBadge.findMany({
    where: {
      userId: user.id,
    },
  })
  await prisma.$disconnect()

  const override = process.env.NODE_ENV === 'development'

  // Identify the user immediately upon signin
  const posthog = PostHogClient()
  posthog.identify({
    distinctId: user.id,
    properties: {
      email: user.email ?? 'unknown',
    },
  })

  // This will force new users into the onboarding
  if (!profile) redirect('/dashboard/new')

  const tools: Tool[] = [
    {
      name: 'Tactics',
      description: [
        "Train tactics using the WoodPecker Method developed by GM's Axel Smith, and Hans Tikkanen.",
        'Re-program your unconscious mind. With benefits including sharper tactical vision, fewer blunders, and better play when in time trouble as well as improved intuition.',
        'Generate puzzle sets and train on them, while the site takes care of tracking your accuracy & time spent.',
      ],
      trainingLink: '/training/tactics/list',
      learnMoreLink: '/training/tactics',
      buttonText: 'Train',
      active: true || override,
      id: 'tooltip-1',
    },
    {
      name: 'Openings',
      description: [
        'Train your opening courses using our Natural Play Learning.',
        'An enhanced version of Spaced Repetition, and the best way to learn openings.',
      ],
      trainingLink: '/training/courses',
      learnMoreLink: '/about/features/natural-play-learning',
      buttonText: 'Train',
      active: true || override,
      id: 'tooltip-2',
    },
    {
      name: 'Visualisation',
      description: [
        'Do you struggle to see past two or three moves? Find long calculations difficult? This is for you.',
        'With our visualisation trainer you are presented with a board position, and a list of moves at the end of which will be a simple tactic.',
        'All you need to do is play the given sequence of moves in your head, decide on your final move and then check if you were correct.',
      ],
      trainingLink: '/training/visualisation/train',
      learnMoreLink: '/training/visualisation',
      buttonText: 'Train',
      active: true || override,
      id: 'tooltip-3',
    },
    {
      name: 'Board Recall',
      description: [
        'Help improve your board vision, and your ability to "see" the board in your head.',
        'With our recall trainer you are presented with a board position, and a short time to memorise it.',
        'You are then asked a question about the position, and you must answer it from memory.',
      ],
      trainingLink: '/training/recall/train',
      learnMoreLink: '/training/recall',
      buttonText: 'Train',
      active: true || override,
      id: 'tooltip-4',
    },
    {
      name: 'Endgames',
      description: [
        'Pick from Queen, Rook, Knight, Bishop, or Pawn endgames. Or let fate decide.',
        'Fundamental to the game of chess, endgames are an area of chess which many players neglect in their training.',
        'Not as exciting as openings, not as sexy as middlegame tactics, but arguably much more important than either.',
      ],
      trainingLink: '/training/endgames/train',
      learnMoreLink: '/training/endgames',
      buttonText: 'Train',
      active: true || override,
      id: 'tooltip-5',
    },
    {
      name: 'Play the Masters',
      description: [
        'Play through the games of the masters, and try to guess their moves.',
        'A great way to improve your understanding of the game, and to learn new ideas.',
        'We have a large library of curated master games, all selected for their instructive value.',
      ],
      trainingLink: '/training/play-the-masters',
      buttonText: 'Train',
      active: false || override,
    },
    {
      name: 'Knight Vision',
      description: [
        'Whether you are a beginner, intermediate, or even experienced player - board vision is crucial to the game of Chess.',
        'We have devised a very simple method of improving your board vision through the use of knights.',
        'Simply put, race against the clock to calculate the fastest way a knight can get to a given square. Rack up a streak and try to beat your own high score.',
      ],
      trainingLink: '/training/knight-vision/train',
      buttonText: 'Train',
      active: false || override,
    },
  ]

  const staffTools: Tool[] = [
    {
      name: 'Curated Set Creator',
      description: [
        'Browse our library of puzzles, and add them to curated sets.',
      ],
      trainingLink: '/admin/curated-sets',
      buttonText: 'Open',
      active: true,
    },
    {
      name: 'Badge Creator',
      description: ['Create and manage badges'],
      trainingLink: '/admin/badges',
      buttonText: 'Open',
      active: true,
    },
  ]

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            fill={true}
            className="object-cover object-center w-full h-full filter grayscale brightness-[.3]"
            src="/images/hero.avif"
            alt="Chess board with pieces set up"
          />
        </div>
        <Container size="wide">
          <Heading color="text-white" as={'h1'}>
            Welcome back,{' '}
            <span id="tooltip-6">
              {user.given_name ?? profile.username ?? user.email}
            </span>
            <PremiumDisplay isPremium={isPremium} />
          </Heading>
          <div
            id="tooltip-0"
            className="flex flex-col flex-wrap gap-2 md:flex-row"
          >
            <StreakDisplay
              data={CalculateStreakBadge(profile)}
              badges={badges}
            />
            <XpDisplay data={CalculateXpRank(profile.experience)} />
          </div>
        </Container>
      </div>
      <div className="p-4 dark:bg-slate-800 md:p-6">
        <div className="mb-6 w-fit flex items-center gap-1 rounded-full border border-gray-300 px-2 text-black dark:border-slate-600 dark:text-white">
          <p>Light</p>
          <ThemeSwitch />
          <p>Dark</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {tools
            .sort((a, b) => {
              if (a.active && !b.active) return -1
              if (!a.active && b.active) return 1
              return 0
            })
            .map((tool) => (
              <ToolGrid tool={tool} key={tool.name} />
            ))}
        </div>
        {isStaff && (
          <div>
            <Heading color="text-purple-700" as={'h2'}>
              Staff Tools
            </Heading>
            <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {staffTools.map((tool) => (
                <ToolGrid tool={tool} key={tool.name} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
