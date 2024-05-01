import { useState } from 'react'

import * as Sentry from '@sentry/nextjs'
import type { ResponseJson } from '~/app/api/responses'

import Button from '~/app/components/_elements/button'
import Heading from '~/app/components/_elements/heading'
import Spinner from '~/app/components/general/Spinner'
import TextEditor from '~/app/components/general/TextEditor'

import trackEventOnClient from '~/app/_util/trackEventOnClient'

export default function DetailsForm(props: {
  finished: (name: string, description: string) => void
  courseName: string | undefined
  description: string | undefined
}) {
  const [name, setName] = useState<string>(props.courseName ?? '')
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')
  const [description, setDescription] = useState<string>(
    props.description ?? '',
  )
  const [error, setError] = useState<string | null>(null)

  const create = async () => {
    setStatus('loading')
    setError(null)

    if (name.length < 5) {
      setError('Name must be at least 5 characters')
      setStatus('idle')
      return
    }

    try {
      const res = await fetch('/api/courses/create/checkName', {
        method: 'POST',
        body: JSON.stringify({ name }),
      })
      const json = (await res.json()) as ResponseJson
      if (!json.data?.isAvailable) {
        setError('Name is already taken')
        setStatus('idle')
        trackEventOnClient('create_course_duplicate_name', {
          name,
        })
        return
      }

      const res2 = await fetch('/api/courses/user/canCreate')
      const json2 = (await res2.json()) as ResponseJson
      if (!json2.data?.canCreate) {
        setError('You have reached the maximum number of courses')
        setStatus('idle')
        trackEventOnClient('create_course_max_reached', {})
        return
      }

      trackEventOnClient('create_course_details_submitted', {
        name,
      })
      props.finished(name, description)
    } catch (e) {
      Sentry.captureException(e)
      setError('Oops! Something went wrong. Please try again later.')
      setStatus('idle')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Heading as="h3">Give your course a name</Heading>
        <input
          className="w-full border border-gray-300 px-4 py-2 bg-white text-black"
          type="text"
          placeholder="Ruy Lopez: For white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Heading as={'h3'}>
          and a helpful description{' '}
          <span className="text-xs text-black dark:text-gray-300">
            (if you want)
          </span>
        </Heading>
        <TextEditor value={description} onChange={setDescription} />
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="primary" onClick={create}>
          <span className="flex items-center gap-4">
            <span>{status == 'idle' ? 'Create Course' : 'Checking Name'}</span>
            {status == 'loading' && <Spinner />}
          </span>
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  )
}
