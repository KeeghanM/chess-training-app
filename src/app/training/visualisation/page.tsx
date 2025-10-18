import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import CtaRow from '@components/_layouts/ctaRow'
import Hero from '@components/_layouts/hero'
import ImageRowFull from '@components/_layouts/imageRowFull'

export const metadata = {
  title:
    'Visualisation Training - Advance Your Chess Strategy at ChessTraining.app',
  description:
    "Refine your foresight with ChessTraining.app's Visualisation training. Tailored for players seeking to enhance their ability to foresee multiple moves ahead, this tool is crucial for long-term planning in chess. Challenge yourself with complex board scenarios and improve your decision-making skills. Perfect for those looking to deepen their tactical understanding and elevate their game to the next level.",
}
export default async function VisualisationPage() {
  return (
    <>
      <Hero
        title="Visualisation Training"
        cta={{
          text: 'Start Visualizing',
          link: '/training/visualisation/train',
        }}
      >
        <Heading className="text-primary" as="h2">
          Enhance your chess foresight with ChessTraining.app's Visualisation
          Trainer.
        </Heading>
      </Hero>
      <ImageRowFull
        heading="Why Visualisation Training Matters"
        image={{
          src: '/images/woman_frustrated_2.png',
          alt: 'A female chess player pulling her hair in frustration',
        }}
        imageSide="left"
      >
        <p>
          Do you struggle to see past two or three moves? Find long calculations
          difficult? Our Visualisation Trainer is designed for you.
        </p>
        <p>
          With our trainer, you're presented with a board position and a
          sequence of moves. Your task is to visualize these moves in your mind,
          and find the correct final move.
        </p>
        <p>
          The tool was designed with both beginners and advanced players in
          mind, with completely customisable settings. You can choose the number
          of moves to visualize and the difficulty of the puzzles, to really set
          the level of challenge you want.
        </p>
      </ImageRowFull>
      <ImageRowFull
        heading="How to Use the Visualisation Trainer"
        image={{
          src: '/images/man_chess_2.png',
          alt: 'A user engaging with the Visualisation Trainer interface',
        }}
        imageSide="right"
      >
        <p>
          You'll be presented with a position and a list of moves. Visualize the
          given moves in your head, and try to find the correct move in that
          position.
        </p>
        <p>
          When you think you've found the correct move, enter it on the board.
          If you're correct, great! Move on to the next one. If not, you can
          keep trying or skip to the next puzzle. You can also use the "Show
          Solution" button to reveal the correct answer.
        </p>
        <p>
          Just like all our other trainers, gain experience points for each
          correct answer and work your way up through{' '}
          <StyledLink href="/about/ranks-and-badges">the ranks</StyledLink>.
        </p>
      </ImageRowFull>
      <CtaRow
        title="Ready to Sharpen Your Visualization Skills?"
        cta={{
          text: 'Start Visualizing',
          link: '/training/visualisation/list',
        }}
      >
        <p>
          Improve your ability to foresee complex scenarios and tactics. Begin
          your training today.
        </p>
      </CtaRow>
    </>
  )
}
