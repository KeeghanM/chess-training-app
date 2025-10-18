// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://275dbc75cb4545c76f5b115c0fa503c1@o4505267872071680.ingest.sentry.io/4506384559112192',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.01,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
