import { useState } from 'react'
import { useCourseQueries } from '@hooks/use-course-queries'
import * as Sentry from '@sentry/nextjs'
import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import Spinner from '@components/general/Spinner'
import TextEditor from '@components/general/TextEditor'
import trackEventOnClient from '@utils/trackEventOnClient'

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

  // React Query hooks
  const { checkCourseName, checkCanCreateCourse } = useCourseQueries()

  const create = async () => {
    setStatus('loading')
    setError(null)

    if (name.length < 5) {
      setError('Name must be at least 5 characters')
      setStatus('idle')
      return
    }

    try {
      // Check if name is available
      const isNameAvailable = await checkCourseName.mutateAsync(name)

      if (!isNameAvailable) {
        setError('Name is already taken')
        setStatus('idle')
        trackEventOnClient('create_course_duplicate_name', { name })
        return
      }

      // Check if user can create more courses
      const refetchResult = await checkCanCreateCourse.refetch()

      if (!refetchResult.data) {
        setError('You have reached the maximum number of courses')
        setStatus('idle')
        trackEventOnClient('create_course_max_reached', {})
        return
      }

      trackEventOnClient('create_course_details_submitted', { name })
      props.finished(name, description)
    } catch (error) {
      Sentry.captureException(error)
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
          <span className="text-xs text-black ">(if you want)</span>
        </Heading>
        <TextEditor value={description} onChange={setDescription} />
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="primary" onClick={create} className="ml-auto">
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
