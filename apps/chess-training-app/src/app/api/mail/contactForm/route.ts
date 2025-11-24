import nodemailer from 'nodemailer'
import { env } from '~/env'

import { BadRequest } from '@utils/errors'
import { publicApiWrapper } from '@utils/public-api-wrapper'
import { successResponse } from '@utils/server-responses'

export const POST = publicApiWrapper(async (request) => {
  const { name, email, subject, message } = (await request.json()) as {
    name: string
    email: string
    subject: string
    message: string
  }

  if (!name || !email || !subject || !message) {
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
    to: env.SMTP_USER,
    subject: subject,
    text: `From: ${name} <${email}>
Message:
${message}`,
  })

  return successResponse('Message sent', {})
})
