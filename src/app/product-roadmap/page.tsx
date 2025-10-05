import StyledLink from '@components/_elements/styledLink'
import BigText from '@components/_layouts/bigText'
import { TextWall } from '@components/_layouts/textWall'

export const metadata = {
  title: 'Explore Our Open Product Roadmap at ChessTraining.app',
  description:
    "Join us on our journey of transparent and open development at ChessTraining.app. Our Product Roadmap is a reflection of our commitment to honesty and customer engagement. Here, you can view upcoming features, current projects, and past updates. We encourage your participation - vote on features, offer feedback, and share your ideas. If you have suggestions not yet listed, we're just a click away. Discover our roadmap and help shape the future of chess training",
}

export default async function ProductRoadmap() {
  return (
    <>
      <TextWall
        background="dark"
        title="Our commitment to open development"
        titleType="h1"
      >
        <div className="flex flex-1 flex-col gap-2">
          <p>
            We think that transparency is an incredibly valuable thing, both in
            life and in business. To that end, we want to make sure that our
            Product Roadmap is as open and honest as it can be.
          </p>
          <p>
            Not only that, but as a customer your voice is most important. While
            we may think we know what is best, or what you want - ultimately,
            you know that.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p>
            To work towards this goal of open and transparent development, we
            have published our Product Roadmap for all to see.
          </p>
          <p>
            This includes ideas/features currently under consideration, things
            we're currently working on, as well as all previously released
            features.
          </p>
          <p>
            We have also enabled you to vote on features, and leave comments
            with your own ideas and feedback.
          </p>
        </div>
      </TextWall>
      <iframe
        src="https://starter.productboard.com/chesstraining-starter/1-chesstraining-app"
        width="100%"
        height="60vh"
        className="mx-auto h-[70vh]"
      ></iframe>
      <BigText color="accent">
        If there is anything not on here you'd like to see{' '}
        <StyledLink href="/contact">get in touch</StyledLink>
      </BigText>
    </>
  )
}
