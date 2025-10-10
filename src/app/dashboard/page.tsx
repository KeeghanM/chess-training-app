import { redirect } from 'next/navigation'
import { prisma } from '~/server/db'
import { IconName } from 'lucide-react/dynamic'
import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import BadgeDisplay from '@components/dashboard/BadgeDisplay'
import PremiumDisplay from '@components/dashboard/PremiumDisplay'
import StreakDisplay from '@components/dashboard/StreakDisplay'
import ToolCard from '@components/dashboard/ToolCard'
import XpDisplay from '@components/dashboard/XpDisplay'
import CalculateStreakBadge from '@utils/CalculateStreakBadge'
import CalculateXpRank from '@utils/CalculateXpRank'
import { getUserServer } from '@utils/getUserServer'
import { PostHogClient } from '@utils/trackEventOnServer'

export type Tool = {
  name: string
  description: string[]
  trainingLink: string
  learnMoreLink?: string
  buttonText: string
  active: boolean
  id?: string
  icon?: IconName
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

  const override = false // process.env.NODE_ENV === 'development'

  // Identify the user immediately upon signin
  const posthog = PostHogClient()
  posthog.identify({
    distinctId: user.id,
    properties: {
      email: user.email ?? 'unknown',
    },
  })

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
      icon: 'puzzle',
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
      icon: 'book',
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
      icon: 'eye',
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
      icon: 'brain',
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
      icon: 'target',
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
    <div className="relative">
      <Backdrop />
      <Container size="extra-wide" className="flex flex-col gap-6">
        <div className="flex gap-4 items-center mx-auto ">
          <StreakDisplay data={CalculateStreakBadge(profile)} />
          <PremiumDisplay isPremium={isPremium} />
        </div>
        <Heading className="text-white" as="h1">
          Welcome back, {user.given_name ?? profile.username ?? user.email}
        </Heading>
        <div className="grid grid-cols-2 gap-2  md:gap-6">
          <XpDisplay data={CalculateXpRank(profile.experience)} />
          <BadgeDisplay userBadgeCount={badges.length} />
        </div>
      </Container>
      <Container size="extra-wide">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {tools
            .sort((a, b) => {
              if (a.active && !b.active) return -1
              if (!a.active && b.active) return 1
              return 0
            })
            .map((tool) => (
              <ToolCard tool={tool} key={tool.name} />
            ))}
        </div>
        {isStaff && (
          <div>
            <Heading className="text-white" as={'h2'}>
              Staff Tools
            </Heading>
            <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {staffTools.map((tool) => (
                <ToolCard tool={tool} key={tool.name} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
