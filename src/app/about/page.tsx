import StyledLink from '@components/_elements/styledLink'
import Hero from '@components/_layouts/hero'
import { MultiCol, MultiColItem } from '@components/_layouts/multiCol'
import { TextWall } from '@components/_layouts/textWall'

export const metadata = {
  title: 'About ChessTraining.app: Our Mission, Vision, and Story',
  description:
    'Discover the story behind ChessTraining.app - a passion project turned leading chess training platform by Keeghan. Learn about our mission to provide accessible, high-quality chess training for all, driven by innovation and community support. Explore our values, culture, and vision for a world where top-tier chess training is available to everyone. Join our journey of continuous learning and chess mastery, supported by chess enthusiasts worldwide.',
}

export default function AboutUsPage() {
  return (
    <>
      <Hero title="About Us">
        <p>
          ChessTraining.app is more than just a chess training platform; it's a
          testament to the passion for chess and the power of technology.
          Founded in 2020 by Keeghan, a chess enthusiast and software developer,
          our website is designed to be an incredibly powerful yet super
          easy-to-use tool for improving your chess skills.
        </p>
      </Hero>
      <a id="our-mission" className="anchor" />
      <TextWall title="Our Mission">
        <p>
          Our mission is to provide an accessible, high-quality chess training
          experience for everyone. We believe in the transformative power of
          chess to sharpen minds, foster strategic thinking, and bring people
          together. Our platform is dedicated to helping chess players of all
          levels improve their game through innovative, user-friendly tools.
        </p>
      </TextWall>
      <a id="our-vision" className="anchor" />
      <TextWall title="Our Vision">
        <p>
          We envision a world where anyone, regardless of their background or
          resources, has access to top-tier chess training. Our vision extends
          beyond just being a training platform; we aim to be a hub for chess
          lovers, where learning, sharing, and growing together is the norm.
          We're committed to continually evolving, ensuring we're always at the
          forefront of chess training technology.
        </p>
      </TextWall>
      <a id="our-values" className="anchor" />
      <MultiCol title="Our Values">
        <MultiColItem title="Accessibility">
          ChessTraining.app is, and always will be, free to use. We're committed
          to breaking down barriers in the chess world.
        </MultiColItem>
        <MultiColItem title="Innovation">
          We believe in pushing boundaries and creating tools that don't just
          mimic what's out there but improve upon it.
        </MultiColItem>
        <MultiColItem title="Community">
          Powered by the generosity of our users, we value and rely on our
          community. Your support drives us forward.
        </MultiColItem>
        <MultiColItem title="Quality">
          We prioritize providing a high-quality, reliable chess training
          experience for our users every day.
        </MultiColItem>
      </MultiCol>
      <a id="our-culture" className="anchor" />
      <TextWall title="Our Culture">
        <p>
          At ChessTraining.app, we're a team of chess aficionados and tech
          enthusiasts. We foster a culture of openness, collaboration, and
          continuous learning. Our culture is rooted in the belief that everyone
          has something to contribute, and together, we can create the best
          possible chess training tool. Meet the passionate individuals behind
          our platform by visiting our{' '}
          <StyledLink href="/about/meet-the-team">
            Meet the Team page.
          </StyledLink>
        </p>
      </TextWall>
      <a id="our-story" className="anchor" />
      <TextWall title="Our Story">
        <p>
          ChessTraining.app started as a personal project by Keeghan, fueled by
          his own needs and desires in his chess journey. Recognizing a gap in
          the online world for comprehensive and user-friendly chess training
          tools, he set out to create a platform that he would love to use
          daily. Since then (and with the help of our community),
          ChessTraining.app has grown into a leading chess training platform,
          with thousands of users worldwide. We're proud of our humble
          beginnings and are excited to continue our own journey of chess
          mastery alongside you.
        </p>
      </TextWall>
    </>
  )
}
