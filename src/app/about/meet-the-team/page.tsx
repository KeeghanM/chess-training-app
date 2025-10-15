import Heading from '@components/_elements/heading'
import { MultiCol, MultiColItem } from '@components/_layouts/multiCol'
import PageHeader from '@components/_layouts/pageHeader'

export const metadata = {
  title: 'Meet Our Team - The Minds Behind ChessTraining.app',
}

export default function MeetTheTeam() {
  const teamMembers: {
    name: string
    title: string
    image: string
    bio: string
    links: {
      text: string
      url: string
    }[]
  }[] = [
    {
      name: 'Keeghan McGarry',
      title: 'Founder & Lead Developer',
      image: '/images/Keeghan.png',
      bio: "Keeghan is a passionate chess player and software developer, with a background in computer science and business management. A mostly self-taught chess player, prior to meeting Roger, he's currently working towards his National Master title.",
      links: [
        {
          text: 'Twitter',
          url: 'https://twitter.com/keeghan',
        },
        {
          text: 'GitHub',
          url: 'https://www.github.com/keeghanm',
        },
        {
          text: 'LinkedIn',
          url: 'https://www.linkedin.com/in/keeghanm',
        },
        {
          text: 'LiChess',
          url: 'https://www.lichess.org/@/TastyTastyCookies',
        },
      ],
    },
    {
      name: 'NM Roger Williamson',
      title: 'Head of Chess',
      image: '/images/team/roger.png',
      bio: "Roger is a National Master from the United Kingdom. He's a passionate chess player and coach, with a background in education. Roger has been playing chess for over 30 years and coaching for more than 20.",
      links: [
        {
          text: 'Twitter',
          url: 'https://twitter.com/rogerchess',
        },
        {
          text: 'LiChess',
          url: 'https://www.lichess.org/@/ZombieBlitz',
        },
      ],
    },
  ]

  return (
    <>
      <PageHeader title="We've grown since Keeghan first built the site in 2020..." />
      <MultiCol title="Meet the Team">
        {teamMembers.map((member, index) => (
          <MultiColItem key={index} title={member.name}>
            <Heading as="h4" color="text-[rgba(0,0,0,0.5)]">
              {member.title}
            </Heading>
            <p>{member.bio}</p>
          </MultiColItem>
        ))}
      </MultiCol>
    </>
  )
}
