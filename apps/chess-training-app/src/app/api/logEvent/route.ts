import { BadRequest } from '@utils/errors'
import { publicApiWrapper } from '@utils/public-api-wrapper'
import { successResponse } from '@utils/server-responses'
import { trackEventOnServer } from '@utils/track-event-on-server'

export const POST = publicApiWrapper(async (request) => {
  const { eventName, data } = (await request.json()) as {
    eventName: string
    data: Record<string, string>
  }

  if (!eventName) throw new BadRequest('Missing event name')
  if (!data) throw new BadRequest('Missing data')

  await trackEventOnServer(eventName, data)
  return successResponse('Logged', {})
})
