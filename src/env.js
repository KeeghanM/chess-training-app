import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .url()
      .refine(
        (str) => !str.includes('YOUR_MYSQL_URL_HERE'),
        'You forgot to change the default URL',
      ),
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
    SMTP_PORT: z.string(),
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
    PUZZLE_API: z.url(),
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

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // SERVER
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
    KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
    KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
    KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
    KINDE_SITE_URL: process.env.KINDE_SITE_URL,
    KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
    KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
    KINDE_AUDIENCE: process.env.KINDE_AUDIENCE,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    KILLBILL_URL: process.env.KILLBILL_URL,
    KILLBILL_USERNAME: process.env.KILLBILL_USERNAME,
    KILLBILL_PASSWORD: process.env.KILLBILL_PASSWORD,
    KILLBILL_API_KEY: process.env.KILLBILL_API_KEY,
    KILLBILL_API_SECRET: process.env.KILLBILL_API_SECRET,
    PUZZLE_API: process.env.PUZZLE_API,
    // CLIENT
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    NEXT_PUBLIC_MAX_COURSES: process.env.NEXT_PUBLIC_MAX_COURSES,
    NEXT_PUBLIC_MAX_SETS: process.env.NEXT_PUBLIC_MAX_SETS,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
