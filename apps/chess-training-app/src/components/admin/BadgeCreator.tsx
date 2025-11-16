'use client'

import { useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import posthog from 'posthog-js'

import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'

import {
  MiscBadges,
  StreakBadges,
  TacticStreakBadges,
} from '@utils/RanksAndBadges'
import type { ResponseJson } from '@utils/server-responsses'

export default function BadgeCreator() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')

  const queryClient = useQueryClient()

  const createBadgeMutation = useMutation({
    mutationFn: async ({
      name,
      description,
      category,
    }: {
      name: string
      description: string
      category: string
    }) => {
      const res = await fetch('/api/admin/badges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, category }),
      })
      const json = (await res.json()) as ResponseJson

      return json
    },
    onError: (error) => {
      posthog.captureException(error)
      setError('Failed to create badge')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] })
      window.location.reload()
    },
  })

  const loadCodeBadgesMutation = useMutation({
    mutationFn: async () => {
      const cleanBadges = [
        ...MiscBadges.map((badge) => ({ ...badge, category: 'Miscellaneous' })),
        ...StreakBadges.map((badge) => ({
          ...badge,
          category: 'Daily Streaks',
        })),
        ...TacticStreakBadges.map((badge) => ({
          ...badge,
          category: 'Tactics Streaks',
        })),
      ]

      await Promise.all(
        cleanBadges.map((badge) => createBadgeMutation.mutateAsync(badge)),
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] })
      window.location.reload()
    },
    onError: (error) => {
      posthog.captureException(error)
      setError('Failed to load code badges')
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    if (!name || !description || !category) {
      return setError('All fields are required')
    }

    createBadgeMutation.mutate({ name, description, category })
  }

  return (
    <div>
      <Heading as={'h2'}>Create a new badge</Heading>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Category</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
            type="text"
            id="category"
            name="category"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <Button variant="primary" disabled={createBadgeMutation.isPending}>
          {createBadgeMutation.isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4 flex flex-col gap-2">
        <Button
          onClick={() => setOpen(!open)}
          variant="danger"
          disabled={loadCodeBadgesMutation.isPending}
        >
          Load Code Badges
        </Button>
        {open && (
          <>
            <p className="text-red-500">
              This will load in all badges that are stored in arrays in code. DO
              NOT USE UNLESS YOU KNOW WHAT YOURE DOING.
            </p>
            <Button
              variant="warning"
              onClick={() => loadCodeBadgesMutation.mutate()}
              disabled={loadCodeBadgesMutation.isPending}
            >
              {loadCodeBadgesMutation.isPending
                ? 'Creating...'
                : 'Create Code Badges'}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
