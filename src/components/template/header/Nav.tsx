'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { UserCircle } from 'lucide-react'
import CalculateXpRank from '@utils/CalculateXpRank'
import type { KindeUser } from '@utils/getUserServer'
import Button from '../../_elements/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../_elements/tooltip'

export default function Nav(props: {
  user: KindeUser | null
  experience: number
}) {
  const [userOpen, setUserOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSub, setOpenSub] = useState('')

  const { user, experience } = props
  const rank = CalculateXpRank(experience)

  const links = [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: '/about/features/woodpecker-method',
      name: 'Woodpecker Method',
    },
    {
      href: '/about/features/natural-play-learning',
      name: 'Courses',
    },
    {
      href: '/articles',
      name: 'Articles',
    },
    {
      name: 'Features',
      subLinks: [
        {
          name: 'Tactics Trainer',
          href: '/training/tactics',
        },
        {
          name: 'Openings Trainer',
          href: '/about/features/natural-play-learning',
        },
        {
          name: 'Endgame Trainer',
          href: '/training/endgames',
        },
        {
          name: 'Visualisation Trainer',
          href: '/training/visualisation',
        },
        {
          name: 'Recall Trainer',
          href: '/training/recall',
        },
        {
          name: 'Play the Masters',
          href: '/training/play-the-masters',
        },
      ],
    },
  ]

  return (
    <header className="bg-bg border-b-1 border-purple-700  text-white shadow-lg">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-1 px-1 py-2 lg:gap-4 lg:p-4">
        <Link href={user ? '/dashboard' : '/'}>
          <div className="flex items-center">
            <Image
              src="/chesstrainingapplogo.png"
              alt="ChessTraining.app"
              className="my-1 mx-2 h-auto"
              width={50}
              height={50}
            />
            <div>
              <h2 className="text-base flex flex-col gap-0 leading-none">
                <span className="font-bold">CHESS</span>
                <span className="font-bold">TRAINING.</span>
                <span className="font-thin">APP</span>
              </h2>
            </div>
          </div>
        </Link>
        <div className="relative flex items-center space-x-3 lg:order-2 lg:space-x-0">
          {user && (
            <>
              <Tooltip>
                <TooltipTrigger asChild={true}>
                  <button
                    type="button"
                    className="flex overflow-hidden rounded-full text-sm focus:ring-4 focus:ring-gray-600 lg:me-0 cursor-pointer"
                    onClick={() => setUserOpen(!userOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <UserCircle className="w-10 h-10" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Your Profile</TooltipContent>
              </Tooltip>
              {userOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-8 z-50 my-4 list-none divide-y divide-gray-600 bg-bg-light shadow-lg border-b-2 border-purple-700">
                    <div className="px-4 py-3">
                      <span className="block text-sm  text-white">
                        {user.given_name} {user.family_name ?? 'Welcome'}
                      </span>
                      <span className="block truncate text-sm  text-gray-400">
                        {user.email}
                      </span>
                      <span className="block truncate text-xs text-orange-500">
                        {experience.toLocaleString()} XP ({rank?.rank.rank}:{' '}
                        {rank?.rank.name})
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <Link
                          href="/dashboard"
                          onClick={() => setUserOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setUserOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <LogoutLink
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                          onClick={() => setUserOpen(false)}
                        >
                          Sign out
                        </LogoutLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </>
          )}

          <button
            type="button"
            className="inline-flex h-10 w-10 p-2 items-center justify-center text-sm text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-10 w-10"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div
            className="fixed inset-0 z-10 bg-[rgba(0,0,0,0.3)]"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
        <nav
          className={
            (menuOpen
              ? 'absolute left-0 right-0 top-[100px] z-50 mx-auto w-screen max-w-screen-sm px-2 shadow-lg lg:p-0'
              : 'hidden') +
            ' items-center justify-between lg:order-1 lg:ml-auto lg:flex lg:w-auto '
          }
        >
          {openSub != '' && (
            <div
              className="fixed inset-0 z-10 hidden lg:block"
              onClick={() => setOpenSub('')}
            ></div>
          )}
          <ul className="relative mt-4 flex flex-col divide-y divide-gray-600 border border-gray-100 bg-gray-50 p-4 font-medium rtl:space-x-reverse lg:mt-0 lg:flex-row lg:items-center lg:divide-none lg:border-0 lg:bg-transparent lg:p-0 rounded-xl">
            {links.map((link) =>
              link.subLinks ? (
                <div key={link.name} className="relative">
                  <button
                    onClick={() =>
                      setOpenSub(openSub === link.name ? '' : link.name)
                    }
                    className="flex w-full items-center justify-between px-4 py-2 text-gray-900 hover:bg-orange-100 lg:w-auto lg:border-0 lg:text-white lg:hover:bg-slate-600 cursor-pointer"
                  >
                    {link.name}{' '}
                    <svg
                      className="ms-2.5 h-2.5 w-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    className={
                      'z-50 w-full divide-y divide-gray-600 bg-gray-50 font-normal lg:w-44 lg:shadow ' +
                      (openSub === link.name
                        ? 'block lg:absolute lg:top-10'
                        : 'hidden')
                    }
                  >
                    <ul className="w-full divide-y divide-gray-300 py-2 text-sm text-gray-700">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className="block w-full px-4 py-2 hover:bg-orange-100"
                          onClick={() => {
                            setMenuOpen(false)
                            setOpenSub('')
                          }}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  className="block cursor-pointer px-4 py-2 text-gray-700 hover:bg-orange-100 lg:text-white lg:hover:bg-slate-600"
                  href={link.href}
                  onClick={() => {
                    setMenuOpen(false)
                    setOpenSub('')
                  }}
                >
                  {link.name}
                </Link>
              ),
            )}
            {!user ? (
              <Link
                onClick={() => {
                  setMenuOpen(false)
                  setOpenSub('')
                }}
                href="/auth/signin"
              >
                <Button className="lg:ml-2" variant="primary">
                  Login/Register
                </Button>
              </Link>
            ) : (
              <Link
                onClick={() => {
                  setMenuOpen(false)
                  setOpenSub('')
                }}
                href="/dashboard"
              >
                <Button
                  className="mt-4 lg:mt-0 w-full lg:w-fit lg:ml-2"
                  variant="primary"
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
