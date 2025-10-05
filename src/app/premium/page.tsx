import Heading from '@components/_elements/heading'
import Hero from '@components/_layouts/hero'
import { MultiCol, MultiColItem } from '@components/_layouts/multiCol'
import { TextWall } from '@components/_layouts/textWall'
import GetPremiumButton from '@components/ecomm/GetPremiumButton'

export const metadata = {
  title: 'Go Premium and Unlock Unlimited Chess Training at ChessTraining.app',
  description:
    'Unlock unlimited chess training at ChessTraining.app with a premium account. Access all features, including unlimited chess puzzles, courses, and more. Start your premium account today!',
}

export default async function PremiumPage() {
  return (
    <>
      <Hero
        title="ChessTraining App is free forever"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      >
        <Heading color="text-orange-500" as="h2">
          But we do offer a Premium account for those who want more
        </Heading>
      </Hero>
      <TextWall title="Our commitment" background="light">
        <p>
          ChessTraining.app is committed to our mission of providing an
          accessible, high-quality chess training experience for everyone. We
          stand by our vision of making chess available to anyone, regardless of
          their background or resources. All our features are available for
          free, forever. However, Premium does unlock the following additional
          benefits.
        </p>
      </TextWall>
      <MultiCol background="dark">
        <MultiColItem title="Free">
          <ul className="divide-y divide-slate-300">
            <li className="py-1">
              <strong>Max Two</strong> Active Tactics Sets
            </li>
            <li className="py-1">
              <strong>Max Two</strong> Active Openings Courses
            </li>
            <li className="flex gap-1  items-center py-1">
              <span className="text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0s4-10.3.1-14.2m-4.3 11.3L12 13.4l-2.8 2.8l-1.4-1.4l2.8-2.8l-2.8-2.8l1.4-1.4l2.8 2.8l2.8-2.8l1.4 1.4l-2.8 2.8l2.8 2.8z"
                  />
                </svg>
              </span>
              No discount on store items
            </li>
            <li className="flex gap-1  items-center py-1">
              <span className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Unlimited access to everything else
            </li>
          </ul>
        </MultiColItem>
        <MultiColItem title="Premium">
          <ul className="divide-y divide-slate-300">
            <li className="flex gap-1  items-center py-1">
              <span className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Unlimited Tactics Sets
            </li>
            <li className="flex gap-1  items-center py-1">
              <span className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Unlimited Openings Courses
            </li>
            <li className="flex gap-1  items-center py-1">
              <span className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              5% Discount on all paid sets/course
            </li>
            <li className="flex gap-1  items-center py-1">
              <span className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Unlimited access to everything else
            </li>
          </ul>
          <GetPremiumButton />
        </MultiColItem>
      </MultiCol>
      <TextWall title="Just £2.99/month" background="light">
        <div className="flex flex-col gap-4">
          <p>
            Our commitment to keeping the barrier to entry low means that
            ChessTraining.app Premium is available for just £2.99/month.
          </p>
          <div>
            <GetPremiumButton />
          </div>
        </div>
      </TextWall>
    </>
  )
}
