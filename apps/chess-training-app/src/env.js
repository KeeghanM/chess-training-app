import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.url(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    API_BASE_URL: z.url(),
    KINDE_CLIENT_ID: z.string(),
    KINDE_CLIENT_SECRET: z.string(),
    KINDE_ISSUER_URL: z.url(),
    KINDE_SITE_URL: z.url(),
    KINDE_POST_LOGOUT_REDIRECT_URL: z.url(),
    KINDE_POST_LOGIN_REDIRECT_URL: z.url(),
    KINDE_AUDIENCE: z.url(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string(),
    BREVO_API_KEY: z.string(),
    RAPIDAPI_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    KILLBILL_URL: z.url(),
    KILLBILL_USERNAME: z.string(),
    KILLBILL_PASSWORD: z.string(),
    KILLBILL_API_KEY: z.string(),
    KILLBILL_API_SECRET: z.string(),
    PUZZLE_API_URL: z.url(),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number().default(6379),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string(),
    NEXT_PUBLIC_SITE_URL: z.url(),
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
    NEXT_PUBLIC_MAX_COURSES: z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => val > 0, { message: 'Must be greater than 0' })
      .default(2),
    NEXT_PUBLIC_MAX_SETS: z
      .string()
      .transform((val) => parseInt(val))
      .refine((val) => val > 0, { message: 'Must be greater than 0' })
      .default(2),
  },

  experimental__runtimeEnv: {
    // CLIENT ONLY Because of 'experimental'
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    NEXT_PUBLIC_MAX_COURSES: process.env.NEXT_PUBLIC_MAX_COURSES,
    NEXT_PUBLIC_MAX_SETS: process.env.NEXT_PUBLIC_MAX_SETS,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
