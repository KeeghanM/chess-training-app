import Link from 'next/link'

import Heading from '~/app/components/_elements/heading'

export default function Footer() {
  const sections: {
    title: string
    links: {
      icon?: React.ReactNode
      text: string
      url: string
    }[]
  }[] = [
    {
      title: 'ChessTraining.app',
      links: [
        {
          text: 'Natural Play Learning',
          url: '/about/features/natural-play-learning',
        },
        {
          text: 'Woodpecker Method',
          url: '/about/features/woodpecker-method',
        },
        {
          text: 'Chess Openings Trainer',
          url: '/courses',
        },
        {
          text: 'Chess Tactics Trainer',
          url: '/training/tactics',
        },
        {
          text: 'Chess Endgame Trainer',
          url: '/training/endgames',
        },
        {
          text: 'Chess Visualisation Trainer',
          url: '/training/visualisation',
        },
        {
          text: 'Board Recall Trainer',
          url: '/training/recall',
        },
        {
          text: 'All Features',
          url: '/about/features',
        },
        {
          text: 'Product Roadmap',
          url: '/product-roadmap',
        },
        {
          text: 'Ranks & Badges',
          url: '/about/ranks-and-badges',
        },
      ],
    },
    {
      title: 'The Company',
      links: [
        {
          text: 'Meet the team',
          url: '/about/meet-the-team',
        },
        {
          text: 'About Us',
          url: '/about',
        },
        {
          text: 'Our Mission',
          url: '/about#our-mission',
        },
        {
          text: 'Our Vision',
          url: '/about#our-vision',
        },
        {
          text: 'Our Values',
          url: '/about#our-values',
        },
        {
          text: 'Our Culture',
          url: '/about#our-culture',
        },
        {
          text: 'Our Story',
          url: '/about#our-story',
        },
      ],
    },
    {
      title: 'Support',
      links: [
        {
          text: 'Contact Us',
          url: '/contact',
        },
        {
          text: 'Report an issue',
          url: '/contact/report-an-issue',
        },
        {
          text: 'Twitter/X',
          url: 'https://twitter.com/ChessTrainApp',
        },
      ],
    },
  ]

  return (
    <footer className="flex flex-col gap-4 border-t border-slate-600 bg-slate-800 p-4 text-sm text-white md:px-12">
      <div className="flex flex-col justify-evenly gap-4 md:flex-row md:gap-6">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Heading as={'h3'}>{section.title}</Heading>
            {section.links.map((link, i) => (
              <Link
                key={i}
                href={link.url}
                className="flex items-center gap-2 hover:underline"
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center text-xs italic">
        <p>&copy; 2020-{new Date().getFullYear()} ChessTraining.app</p>
      </div>
    </footer>
  )
}
