FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable

# Copy root package.json for workspace setup
COPY package.json ./
COPY apps/chess-training-app/package.json ./apps/chess-training-app/

# install all deps including dev
ENV NODE_ENV="development"
RUN yarn install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable

# Copy all the files over
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY apps/chess-training-app ./apps/chess-training-app

# Set the build variables
ENV NODE_ENV="production"
ENV SKIP_ENV_VALIDATION=1

# Client-side vars (Passed via --build-arg)
ARG NEXT_PUBLIC_MAX_COURSES
ENV NEXT_PUBLIC_MAX_COURSES=$NEXT_PUBLIC_MAX_COURSES
ARG NEXT_PUBLIC_MAX_SETS
ENV NEXT_PUBLIC_MAX_SETS=$NEXT_PUBLIC_MAX_SETS
ARG NEXT_PUBLIC_POSTHOG_HOST
ENV NEXT_PUBLIC_POSTHOG_HOST=$NEXT_PUBLIC_POSTHOG_HOST
ARG NEXT_PUBLIC_POSTHOG_KEY
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_STRIPE_PUBLIC_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLIC_KEY=$NEXT_PUBLIC_STRIPE_PUBLIC_KEY

# --- SERVER SIDE VARS ---
# these dummies satisfy Zod validation during build
# Note: DATABASE_URL is passed as a secret as it's actually consumed during build
ENV API_BASE_URL="http://localhost:3000"
ENV KINDE_CLIENT_ID="dummy"
ENV KINDE_CLIENT_SECRET="dummy"
ENV KINDE_ISSUER_URL="https://dummy.kinde.com"
ENV KINDE_SITE_URL="http://localhost:3000"
ENV KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
ENV KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000"
ENV KINDE_AUDIENCE="https://dummy.kinde.com/api"
ENV SMTP_HOST="dummy"
ENV SMTP_PORT="587"
ENV SMTP_USER="dummy"
ENV SMTP_PASS="dummy"
ENV BREVO_API_KEY="dummy"
ENV RAPIDAPI_KEY="dummy"
ENV STRIPE_SECRET_KEY="sk_test_dummy"
ENV STRIPE_WEBHOOK_SECRET="whsec_dummy"
ENV KILLBILL_URL="http://localhost:8080"
ENV KILLBILL_USERNAME="dummy"
ENV KILLBILL_PASSWORD="dummy"
ENV KILLBILL_API_KEY="dummy"
ENV KILLBILL_API_SECRET="dummy"
ENV PUZZLE_API_URL="http://localhost:4000"
ENV REDIS_HOST="localhost"
ENV REDIS_PORT="6379"

# --- BUILD COMMANDS ---
# We mount the secret to a temporary file, read it into an ENV var, and run the command
RUN --mount=type=secret,id=DATABASE_URL \
    export DATABASE_URL=$(cat /run/secrets/DATABASE_URL) && \
    yarn workspace chess-training-app prisma generate

# We do the same here because Next.js getStaticProps might need the DB
RUN --mount=type=secret,id=DATABASE_URL \
    export DATABASE_URL=$(cat /run/secrets/DATABASE_URL) && \
    yarn workspace chess-training-app build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV="production"
ENV NEXT_TELEMETRY_DISABLED=1
# Create system user group and user (for secure execution)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Copy necessary files from build stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/apps/chess-training-app/public ./public/
COPY --from=builder --chown=nextjs:nodejs /app/apps/chess-training-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/chess-training-app/.next/static ./.next/static/

# Switch to non-root user
USER nextjs
# Expose port
EXPOSE 3000
# Set port and hostname
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Start the application
CMD ["node", "server.js"]