'use client'

import { useContext, useState } from 'react'
import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import TextEditor from '@components/general/TextEditor'
import { useMutation } from '@tanstack/react-query'
import GenerateSlug from '@utils/GenerateSlug'
import posthog from 'posthog-js'
import type { ResponseJson } from '~/app/api/responses'
import { CuratedSetBrowserContext } from './CuratedSetsBrowser'

export default function SetEditor() {
  const { selectedSet } = useContext(CuratedSetBrowserContext)

  // Form
  const [name, setName] = useState(selectedSet?.name ?? '')
  const [description, setDescription] = useState(selectedSet?.description ?? '')
  const [shortDescription, setShortDescription] = useState(
    selectedSet?.shortDesc ?? '',
  )
  const [minRating, setMinRating] = useState(selectedSet?.minRating ?? 500)
  const [maxRating, setMaxRating] = useState(selectedSet?.maxRating ?? 2500)
  const [price, setPrice] = useState(selectedSet?.price ?? 0)
  const [published, setPublished] = useState(selectedSet?.published ?? false)

  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedSet) throw new Error('No set selected')
      const resp = await fetch(`/api/admin/curated-sets`, {
        method: 'PATCH',
        body: JSON.stringify({
          id: selectedSet.id,
          name,
          slug: GenerateSlug(name),
          size: selectedSet.size,
          description,
          shortDesc: shortDescription,
          minRating,
          maxRating,
          price,
          published,
        }),
      })
      const json = (await resp.json()) as ResponseJson
      if (json.message != 'Set updated') throw new Error(json.message)
      return json
    },
    onError: (error) => {
      posthog.captureException(error)
    },
  })

  return (
    <div className="flex flex-1 flex-col gap-2 border lg:border-4 border-purple-700 p-2 bg-purple-700 bg-opacity-20 max-h-[70vh] text-black ">
      <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
        <div className="">
          <label htmlFor="name">Name</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="shortDescription">Short Description</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
            id="shortDescription"
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="description">Description</label>
          <TextEditor value={description} onChange={setDescription} />
        </div>
        <div className="flex flex-row gap-4">
          <div className="">
            <label htmlFor="rating">Min Rating</label>
            <input
              className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
              id="minRating"
              type="number"
              value={minRating}
              onChange={(e) => setMinRating(parseInt(e.target.value))}
            />
          </div>
          <div className="">
            <label htmlFor="rating">Max Rating</label>
            <input
              className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
              id="minRating"
              type="number"
              value={maxRating}
              onChange={(e) => setMaxRating(parseInt(e.target.value))}
            />
          </div>
          <div className="">
            <label htmlFor="price">Price (in pence)</label>
            <input
              className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <label htmlFor="published">Published</label>
          <input
            className="border border-gray-300 px-4 py-2 bg-gray-100 text-black"
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </div>
      </div>
      <Button
        variant="primary"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || selectedSet === undefined}
      >
        {mutation.isPending ? (
          <>
            Saving <Spinner />
          </>
        ) : (
          'Save'
        )}
      </Button>
      {mutation.isError && (
        <p className="text-red-500">{mutation.error.message}</p>
      )}
    </div>
  )
}
