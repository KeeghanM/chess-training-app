import { Heading } from '@/app/components/_elements/heading';
import { CtaRow } from '@/app/components/_layouts/cta-row';
import { Hero } from '@/app/components/_layouts/hero';
import { ImageRowFull } from '@/app/components/_layouts/image-row-full';

export const metadata = {
  title: 'Recall Trainer - Learn Chess Online with ChessTraining.app',
  description:
    "Improve your chess skills with ChessTraining.app's Recall Trainer. Designed for busy adults, our trainer helps you learn chess efficiently and effectively. Build your memory and visualize chess positions. Enhance your chess skill development with structured training routines. Start learning chess online today!",
};

export function Recall() {
  return (
    <>
      <Hero
        title="Recall Trainer - Learn Chess Online"
        cta={{
          text: 'Start Recalling',
          link: '/training/recall/train',
        }}
        image={{
          src: '/images/hero.avif',
          alt: 'Chess pieces set up on a chessboard',
        }}
      >
        <Heading as="h2" color="text-orange-500">
          Enhance Your Chess Memory and Position Visualization
        </Heading>
      </Hero>
      <ImageRowFull
        background="light"
        heading="Why Recall Training Matters"
        imageSide="left"
        image={{
          src: '/images/woman_kneeling_at_chess.png',
          alt: 'A woman studying chess positions',
        }}
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
          to recall. It&apos;s flexible training designed to meet your specific
          needs.
        </p>
      </ImageRowFull>
      <ImageRowFull
        background="light"
        heading="How to Use the Recall Trainer"
        imageSide="right"
        image={{
          src: '/images/chunking.png',
          alt: 'A chessboard with pieces highlighted in the Carlsbad Structure.',
        }}
      >
        <p>
          Our Recall Trainer is the perfect tool to improve your memory and
          visualization skills in chess. Designed for busy adults like you, it
          offers efficient and effective training tailored to your chess rating.
        </p>
        <p>
          With this trainer, you&apos;ll be presented with chess positions for a
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
        background="dark"
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
  );
}
