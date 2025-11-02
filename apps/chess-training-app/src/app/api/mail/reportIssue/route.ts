import { getPostHogServer } from '~/server/posthog-server'
import nodemailer from 'nodemailer'
import { errorResponse, successResponse } from '~/app/api/responses'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  try {
    const { name, email, issue, message } = (await request.json()) as {
      name: string
      email: string
      issue: string
      message: string
    }

    if (!name || !email || !issue || !message) {
      return errorResponse('Missing required fields', 400)
    }

    const transporter = nodemailer.createTransport({
      // @ts-expect-error : types are wrong, host is required
      host: process.env.SMTP_HOST!,
      port: process.env.SMTP_PORT!,
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
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

    return successResponse('Message sent', {}, 200)
  } catch (e) {
    posthog.captureException(e)
    if (e instanceof Error) return errorResponse(e.message, 500)
    else return errorResponse('Unknown error', 500)
  }
}
