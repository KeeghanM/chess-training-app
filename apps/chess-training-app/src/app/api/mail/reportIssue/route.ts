import nodemailer from 'nodemailer'
import { env } from '~/env'

import { BadRequest } from '@utils/errors'
import { publicApiWrapper } from '@utils/public-api-wrapper'
import { successResponse } from '@utils/server-responses'

export const POST = publicApiWrapper(async (request) => {
  const { name, email, issue, message } = (await request.json()) as {
    name: string
    email: string
    issue: string
    message: string
  }

  if (!name || !email || !issue || !message) {
    throw new BadRequest('Missing required fields')
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  })
  await transporter.sendMail({
    from: `${name} <${email}>`,
    to: 'product@chesstraining.app',
    subject: 'Issue Reported: ' + issue,
    text: `From: ${name} <${email}>
Issue Type: ${issue}
Message:
${message}`,
  })

  return successResponse('Message sent', {})
})
