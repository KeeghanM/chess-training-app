import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import StyledLink from '@components/_elements/styledLink'
import PageHeader from '@components/_layouts/pageHeader'
import { createUserProfile, getUserServer } from '@utils/getUserServer'
import { trackEventOnServer } from '@utils/trackEventOnServer'

export default async function NewUserWelcome() {
  const { user, profile } = await getUserServer()
  if (!user) redirect('/auth/signin')
  if (!profile) {
    await createUserProfile(user)
    await trackEventOnServer('new_user_registered', {})
  }

  return (
    <>
      <PageHeader
        title={'Welcome to ChessTraining.app!'}
        subTitle="I hope you enjoy your time here."
      />
      <Container>
        <div className="flex flex-col gap-4">
          <Link href={'/dashboard'}>
            <Button variant="primary">Just take me to my dashboard</Button>
          </Link>
          <p>
            Hi! I'm Keeghan McGarry, the founder of{' '}
            <strong>ChessTraining.app</strong>. I'm a chess enthusiast and
            software engineer. I built this site to help people who, like me,
            want to improve their chess skills but have found other sites a
            little lacking.
          </p>
          <p>
            I aim for <strong>ChessTraining.app</strong> to be the single best
            place to train all elements of your chess. In theory, you'll be able
            to do everything except actually play chess (maybe one day?). I'm
            constantly working to improve the site and add new features. If you
            have any feedback, please don't hesitate to{' '}
            <StyledLink href={'/contact'}>contact me</StyledLink>.
          </p>
          <Image
            className="mx-auto"
            src="/images/keeghan.png"
            width={200}
            height={200}
            alt="Keeghan McGarry"
          />
          <p>
            I really hope you enjoy your time here.
            <br />
            <span className="italic">
              Keeghan McGarry - Founder & Lead Developer
            </span>
          </p>
          <Link href={'/dashboard'}>
            <Button variant="primary">Start Training!</Button>
          </Link>
        </div>
      </Container>
    </>
  )
}
