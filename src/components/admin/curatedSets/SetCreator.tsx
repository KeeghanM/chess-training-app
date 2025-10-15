'use client'

import { useState } from 'react'
import type { CuratedSet } from '@prisma/client'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useMutation } from '@tanstack/react-query'
import type { ResponseJson } from '~/app/api/responses'
import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import Spinner from '@components/general/Spinner'
import GenerateSlug from '@utils/GenerateSlug'

export default function SetCreator(props: {
  onCreate: (set: CuratedSet) => void
}) {
  // Form
  const [name, setName] = useState('')

  // Status
  const [open, setOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: async () => {
      const slug = GenerateSlug(name)
      const resp = await fetch('/api/admin/curated-sets', {
        method: 'POST',
        body: JSON.stringify({ name, slug }),
      })
      const json = (await resp.json()) as ResponseJson
      if (json.message != 'Set created') throw new Error(json.message)

      const newSet = json.data!.set as CuratedSet
      props.onCreate(newSet)
      close()
    },
  })

  const close = () => {
    setOpen(false)
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Create Set
      </Button>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]"
          onClick={close}
        />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-md md:p-6 flex flex-col gap-4">
          <Heading as={'h2'}>Create new set</Heading>
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
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  Saving <Spinner />
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
          {mutation.isError && (
            <p className="text-red-500">{mutation.error.message}</p>
          )}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
