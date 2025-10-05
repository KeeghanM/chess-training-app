import CtaRow from '@components/_layouts/ctaRow'
import PageHeader from '@components/_layouts/pageHeader'

export const metadata = {
  title: 'Knight Vision: Enhance Your Chess Board Vision - ChessTraining.app',
  description:
    "Develop unparalleled board vision with ChessTraining.app's Knight Vision feature. Designed for players at all levels, our innovative tool helps improve your spatial understanding and tactical foresight in chess. Engage in a dynamic, fun, and fast-paced training method to elevate your game. Whether you're a beginner or an experienced player, Knight Vision is your key to mastering the chessboard.",
}

export default function KnightVision() {
  return (
    <>
      <PageHeader
        title="Knight Vision"
        subTitle="Coming soon!"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <CtaRow
        title="Curious?"
        background="light"
        cta={{
          text: 'View our roadmap',
          link: '/product-roadmap',
        }}
      >
        <div className="flex flex-col gap-2">
          <p>
            We're working hard to bring you this feature as soon as possible. If
            you want to know more about our upcoming features, check out our
            roadmap.
          </p>
          <p className="italic">
            P.s You can also see all our other upcoming feature releases.
          </p>
        </div>
      </CtaRow>
    </>
  )
}
