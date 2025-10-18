// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://275dbc75cb4545c76f5b115c0fa503c1@o4505267872071680.ingest.sentry.io/4506384559112192',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.01,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
