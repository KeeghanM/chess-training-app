'use client'

import Link from 'next/link'

import { useState } from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import type { UserProfile } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import Tippy from '@tippyjs/react'
import type { ResponseJson } from '~/app/api/responses'

import Button from '~/app/components/_elements/button'
import Heading from '~/app/components/_elements/heading'
import Spinner from '~/app/components/general/Spinner'

export default function AccountForm(props: { profile: UserProfile }) {
  const { user } = useKindeBrowserClient()

  const [username, setUsername] = useState(
    props.profile.username ?? user?.email ?? '',
  )
  const [fullname, setFullame] = useState(props.profile.fullName ?? '')
  const [description, setDescription] = useState(
    props.profile.description ?? '',
  )
  const [highestOnlineRating, setHighestOnlineRating] = useState(
    props.profile.highestOnlineRating ?? undefined,
  )
  const [highestOTBRating, setHighestOTBRating] = useState(
    props.profile.highestOTBRating ?? undefined,
  )
  const [puzzleRating, setPuzzleRating] = useState(
    props.profile.puzzleRating ?? 1500,
  )
  const [difficulty, setDifficulty] = useState(props.profile.difficulty ?? 1)
  const [publicProfile, setPublicProfile] = useState(
    props.profile.public ?? false,
  )
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!user) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) return Sentry.captureException(new Error('User not found'))
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    if (!username) return setError('Username is required')
    if (username.includes('@'))
      return setError('Username cannot contain the "@" symbol')
    if (fullname.length > 0 && fullname.length > 150)
      return setError('Full name must be less than 150 characters')
    if (description && description.length > 1000)
      return setError('Bio must be less than 1000 characters')
    if (highestOnlineRating && highestOnlineRating < 100)
      return setError('Highest online rating must be at least 100')
    if (highestOnlineRating && highestOnlineRating > 3500)
      return setError('Highest online rating must be at most 3500')
    if (highestOTBRating && highestOTBRating < 100)
      return setError('Highest OTB rating must be at least 100')
    if (highestOTBRating && highestOTBRating > 3500)
      return setError('Highest OTB rating must be at most 3500')
    if (!puzzleRating || puzzleRating < 500)
      return setError('Puzzle rating must be at least 500')
    if (puzzleRating > 3500)
      return setError('Puzzle rating must be at most 3500')

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          fullname,
          description,
          highestOnlineRating,
          highestOTBRating,
          puzzleRating,
          difficulty,
          publicProfile,
        }),
      })
      const json = (await res.json()) as ResponseJson

      if (json.message != 'Profile Updated') throw new Error(json.message)

      setLoading(false)
      setSuccess(true)
      const timeout = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timeout)
    } catch (e) {
      Sentry.captureException(e)
      if (e instanceof Error) setError(e.message)
      else setError('Something went wrong. Please try again later.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-0 border border-gray-300 dark:text-white dark:border-slate-600 shadow-md dark:shadow-slate-900 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] ">
      <div className="flex flex-col md:flex-row px-2 py-1 border-b border-gray-300 dark:border-slate-600 items-center justify-between">
        <Heading color="text-orange-500 !m-0 !p-0" as={'h2'}>
          Account Settings
        </Heading>
        <Link href="/dashboard">
          <Button variant="accent">Back to dashboard</Button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-white p-2"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <div>
            <label className="text-black dark:text-white">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 bg-white px-4 py-2 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="text-black dark:text-white">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 bg-white px-4 py-2 text-black"
              value={user.email!}
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div>
            <label className="text-black dark:text-white">Puzzle Rating</label>
            <input
              type="number"
              min={500}
              max={3500}
              className="w-full border border-gray-300 bg-white px-4 py-2 text-black"
              value={puzzleRating}
              onChange={(e) => setPuzzleRating(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="text-black dark:text-white">
              Default Difficulty
            </label>
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
              <Button
                variant={difficulty == 0 ? 'success' : 'accent'}
                onClick={() => setDifficulty(0)}
              >
                Easy
              </Button>
              <Button
                variant={difficulty == 1 ? 'success' : 'accent'}
                onClick={() => setDifficulty(1)}
              >
                Medium
              </Button>
              <Button
                variant={difficulty == 2 ? 'success' : 'accent'}
                onClick={() => setDifficulty(2)}
              >
                Hard
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label className="text-black dark:text-white">
            Full Name <span className="text-xs italic">(optional)</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 bg-white px-4 py-2 text-black"
            value={fullname}
            onChange={(e) => setFullame(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div>
            <label className="text-black dark:text-white">
              Highest Online Rating{' '}
              <span className="text-xs italic">(optional)</span>
            </label>
            <input
              type="number"
              min={100}
              max={3500}
              className="w-full border border-gray-300 bg-white px-4 py-2 text-black"
              value={highestOnlineRating}
              onChange={(e) => setHighestOnlineRating(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="text-black dark:text-white">
              Highest OTB Rating{' '}
              <span className="text-xs italic">(optional)</span>
            </label>
            <input
              type="number"
              min={100}
              max={3500}
              className="w-full border border-gray-300 bg-white px-4 py-2 text-black"
              value={highestOTBRating}
              onChange={(e) => setHighestOTBRating(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div>
          <label className="text-black dark:text-white">
            Bio <span className="text-xs italic">(optional)</span>
          </label>
          <textarea
            rows={5}
            className="w-full border border-gray-300 bg-white px-4 py-2 text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <Tippy content="Public profiles will show your ratings, bio, and Username. Your email will always be kept private.">
            <label className="text-black dark:text-white flex gap-1 flex-row items-center">
              <p className="">Public Profile</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .438-.177q.177-.177.177-.438q0-.262-.177-.439q-.176-.177-.438-.177t-.438.177q-.177.177-.177.439q0 .261.177.438q.176.177.438.177M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                />
              </svg>
            </label>
          </Tippy>
          <input
            className="w-4 h-4 bg-white text-black"
            type="checkbox"
            checked={publicProfile}
            onChange={() => setPublicProfile(!publicProfile)}
          />
        </div>
        <Button variant="success" disabled={loading}>
          {loading ? (
            <span className="flex flex-row items-center gap-2">
              Saving
              <Spinner />
            </span>
          ) : success ? (
            'Saved!'
          ) : (
            'Save'
          )}
        </Button>
        {error && (
          <div className="bg-red-400 p-2 text-sm italic text-black">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}
