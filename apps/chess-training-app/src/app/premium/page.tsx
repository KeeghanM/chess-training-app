import { Check } from 'lucide-react'

import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import { MultiCol, MultiColItem } from '@components/_layouts/multiCol'
import { TextWall } from '@components/_layouts/textWall'
import GetPremiumButton from '@components/ecomm/GetPremiumButton'

export const metadata = {
  title: 'Upgrade to Premium - Unlimited Chess Training',
  description:
    'Unlock unlimited chess training at ChessTraining.app. Unlimited puzzles, courses, and features for less than the price of a coffee.',
}

export default async function PremiumPage() {
  return (
    <div className="relative">
      <Backdrop />
      <Container className="space-y-4" size="wide">
        <Heading as="h1" className="text-white">
          ChessTraining.app is free forever
        </Heading>
        <Heading className="text-primary" as="h2">
          Unlock unlimited potential for less than a coffee
        </Heading>
        <TextWall title="Our Mission">
          <p>
            We believe high-quality chess training should be accessible to
            everyone. All our core engines (NPL, Woodpecker, Visualisation) are
            free to use. Premium is for players who want to remove all limits
            and support the development of the platform.
          </p>
        </TextWall>
        <MultiCol>
          {/* Free Plan - Positive Framing */}
          <MultiColItem title="Free Plan">
            <ul className="divide-y divide-slate-300">
              <li className="py-2 flex items-center gap-2">
                <span className="text-green-500 font-bold">
                  <Check />
                </span>
                <span>
                  <strong>2 Active</strong> Tactics Sets
                </span>
              </li>
              <li className="py-2 flex items-center gap-2">
                <span className="text-green-500 font-bold">
                  <Check />
                </span>
                <span>
                  <strong>2 Active</strong> Opening Courses
                </span>
              </li>
              <li className="py-2 flex items-center gap-2">
                <span className="text-green-500 font-bold">
                  <Check />
                </span>
                <span>Full NPL Engine Access</span>
              </li>
              <li className="py-2 flex items-center gap-2">
                <span className="text-green-500 font-bold">
                  <Check />
                </span>
                <span>Visualisation & Endgame Trainers</span>
              </li>
            </ul>
          </MultiColItem>

          {/* Premium Plan - Value Driven */}
          <MultiColItem title="Premium (£2.99/mo)">
            <ul className="divide-y divide-slate-300 mb-6">
              <li className="py-2 flex items-center gap-2 font-semibold text-primary">
                <span className="text-green-500 text-xl">
                  <Check />
                </span>
                <span>Unlimited Tactics Sets</span>
              </li>
              <li className="py-2 flex items-center gap-2 font-semibold text-primary">
                <span className="text-green-500 text-xl">
                  <Check />
                </span>
                <span>Unlimited Opening Courses</span>
              </li>
              <li className="py-2 flex items-center gap-2">
                <span className="text-green-500 text-xl">
                  <Check />
                </span>
                <span>5% Store Discount</span>
              </li>
              <li className="py-2 flex items-center gap-2">
                <span className="text-green-500 text-xl">
                  <Check />
                </span>
                <span>Support Solo Development ❤️</span>
              </li>
            </ul>
            <div className="w-full">
              <GetPremiumButton />
            </div>
          </MultiColItem>
        </MultiCol>

        <div className="flex justify-center pt-8">
          <p className="text-white text-center opacity-80 max-w-xl">
            Our commitment to keeping the barrier to entry low means that
            ChessTraining.app Premium is available for just{' '}
            <strong>£2.99/month</strong>. Cancel anytime.
          </p>
        </div>
      </Container>
    </div>
  )
}
