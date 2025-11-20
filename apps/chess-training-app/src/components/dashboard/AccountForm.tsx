'use client'

import Link from 'next/link'

import { useState } from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import type { UserProfile } from '@prisma/client'
import { AccountSchema } from '@schemas/account'
import { Info } from 'lucide-react'
import posthog from 'posthog-js'

import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import Spinner from '@components/general/Spinner'

import type { ResponseJson } from '@utils/server-responses'

import { Tooltip, TooltipContent, TooltipTrigger } from '../_elements/tooltip'

export default function AccountForm(props: { profile: UserProfile }) {
  const { user } = useKindeBrowserClient()

  const [username, setUsername] = useState(
    props.profile.username ?? user?.email ?? '',
  )
  const [fullname, setFullname] = useState(props.profile.fullName ?? '')
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) return posthog.captureException(new Error('User not found'))
    e.preventDefault()
    setError('')
    setSuccess(false)

    const formData = {
      username,
      fullname,
      description,
      highestOnlineRating: highestOnlineRating || 0,
      highestOTBRating: highestOTBRating || 0,
      puzzleRating,
      difficulty,
      publicProfile,
    }

    const result = AccountSchema.safeParse(formData)

    if (!result.success) {
      const firstError = result.error.issues[0]
      return setError(firstError?.message || 'Invalid form data')
    }

    setLoading(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
      })
      const json = (await res.json()) as ResponseJson

      if (json.message != 'Profile Updated') throw new Error(json.message)

      setLoading(false)
      setSuccess(true)
      const timeout = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timeout)
    } catch (e) {
      posthog.captureException(e)
      if (e instanceof Error) setError(e.message)
      else setError('Something went wrong. Please try again later.')
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="p-4 bg-card-light/20 rounded-lg text-black">
      <div className="bg-card rounded-lg p-4 space-y-6">
        <div className="flex flex-row px-2 py-1 items-center justify-between">
          <Heading as={'h2'}>Account Settings</Heading>
          <Link href="/dashboard">
            <Button>Back to dashboard</Button>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 p-2"
          data-testid="account-form"
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2"
                value={user.email!}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <div>
              <label htmlFor="puzzleRating">Puzzle Rating</label>
              <input
                id="puzzleRating"
                type="number"
                min={500}
                max={3500}
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2"
                value={puzzleRating}
                onChange={(e) => setPuzzleRating(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label>Default Difficulty</label>
              <div className="flex items-center gap-2 flex-row">
                <Button
                  variant={difficulty == 0 ? 'success' : undefined}
                  onClick={() => setDifficulty(0)}
                >
                  Easy
                </Button>
                <Button
                  variant={difficulty == 1 ? 'success' : undefined}
                  onClick={() => setDifficulty(1)}
                >
                  Medium
                </Button>
                <Button
                  variant={difficulty == 2 ? 'success' : undefined}
                  onClick={() => setDifficulty(2)}
                >
                  Hard
                </Button>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="fullname">
              Full Name <span className="text-xs italic">(optional)</span>
            </label>
            <input
              id="fullname"
              type="text"
              className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div>
              <label htmlFor="highestOnlineRating">
                Highest Online Rating{' '}
                <span className="text-xs italic">(optional)</span>
              </label>
              <input
                id="highestOnlineRating"
                type="number"
                min={100}
                max={3500}
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2"
                value={highestOnlineRating}
                onChange={(e) =>
                  setHighestOnlineRating(parseInt(e.target.value))
                }
              />
            </div>
            <div>
              <label htmlFor="highestOTBRating">
                Highest OTB Rating{' '}
                <span className="text-xs italic">(optional)</span>
              </label>
              <input
                id="highestOTBRating"
                type="number"
                min={100}
                max={3500}
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2"
                value={highestOTBRating}
                onChange={(e) => setHighestOTBRating(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description">
              Bio <span className="text-xs italic">(optional)</span>
            </label>
            <textarea
              id="description"
              rows={5}
              className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <label
              htmlFor="public-profile"
              className="flex gap-1 flex-row items-center"
            >
              <p className="">Public Profile</p>
            </label>
            <Tooltip>
              <TooltipTrigger asChild={true}>
                <Info />
              </TooltipTrigger>
              <TooltipContent>
                Public profiles will show your ratings, bio, and Username. Your
                email will always be kept private.
              </TooltipContent>
            </Tooltip>
            <input
              id="public-profile"
              className="w-4 h-4"
              type="checkbox"
              checked={publicProfile}
              onChange={() => setPublicProfile(!publicProfile)}
            />
          </div>
          <Button type="submit" variant="success" disabled={loading}>
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
            <div className="bg-red-400 p-2 text-sm italic">{error}</div>
          )}
        </form>
      </div>
    </div>
  )
}
