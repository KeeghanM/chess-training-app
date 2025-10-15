import Heading from '@components/_elements/heading'
import CtaRow from '@components/_layouts/ctaRow'
import Hero from '@components/_layouts/hero'
import ImageRowFull from '@components/_layouts/imageRowFull'

export const metadata = {
  title: 'Recall Trainer - Learn Chess Online with ChessTraining.app',
  description:
    "Improve your chess skills with ChessTraining.app's Recall Trainer. Designed for busy adults, our trainer helps you learn chess efficiently and effectively. Build your memory and visualize chess positions. Enhance your chess skill development with structured training routines. Start learning chess online today!",
}

export default async function Recall() {
  return (
    <>
      <Hero
        title="Recall Trainer - Learn Chess Online"
        cta={{
          text: 'Start Recalling',
          link: '/training/recall/train',
        }}
      >
        <Heading className="text-primary" as="h2">
          Enhance Your Chess Memory and Position Visualization
        </Heading>
      </Hero>
      <ImageRowFull
        heading="Why Recall Training Matters"
        image={{
          src: '/images/woman_kneeling_at_chess.png',
          alt: 'A woman studying chess positions',
        }}
        imageSide="left"
      >
        <p>
          Chess is all about recognizing patterns and positions. The ability to
          recall critical details about a position can be a game-changer. Our
          Recall Trainer helps you build this essential skill, ensuring that you
          can visualize chess positions with ease.
        </p>
        <p>
          You can customize the difficulty level by adjusting the viewing time,
          the number of pieces on the board, and the number of pieces you need
          to recall. It's flexible training designed to meet your specific
          needs.
        </p>
      </ImageRowFull>
      <ImageRowFull
        heading="How to Use the Recall Trainer"
        image={{
          src: '/images/chunking.png',
          alt: 'A chessboard with pieces highlighted in the Carlsbad Structure.',
        }}
        imageSide="right"
      >
        <p>
          Our Recall Trainer is the perfect tool to improve your memory and
          visualization skills in chess. Designed for busy adults like you, it
          offers efficient and effective training tailored to your chess rating.
        </p>
        <p>
          With this trainer, you'll be presented with chess positions for a
          brief moment, or longer - you decide. Your task is to recall specific
          details about the position. It forces you to break up the board into
          smaller, more easily recognizable positions, improving your memory and
          chess vision.
        </p>
        <p>
          Our trainer simplifies the process and automates tracking, so you can
          focus solely on enhancing your chess memory and visualization. Whether
          you have a few minutes or an hour, our Recall Trainer fits your
          schedule.
        </p>
      </ImageRowFull>

      <CtaRow
        title="Ready to Boost Your Chess Memory?"
        cta={{
          text: 'Start Recalling',
          link: '/training/recall/train',
        }}
      >
        <p>
          Improve your memory and visualization skills to enhance your chess
          game. Begin your recall training journey today.
        </p>
      </CtaRow>
    </>
  )
}
