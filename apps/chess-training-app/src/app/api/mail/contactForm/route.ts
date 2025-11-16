import nodemailer from 'nodemailer'
import { env } from '~/env'

import { getPostHogServer } from '@server/posthog-server'

import { errorResponse, successResponse } from '@utils/server-responsses'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = (await request.json()) as {
      name: string
      email: string
      subject: string
      message: string
    }

    if (!name || !email || !subject || !message) {
      return errorResponse('Missing required fields', 400)
    }

    const transporter = nodemailer.createTransport({
      // @ts-expect-error : types are wrong, host is required
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

    return successResponse('Message sent', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
