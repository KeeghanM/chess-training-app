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

# Generate Prisma client
RUN yarn workspace chess-training-app prisma generate

# Build the application
RUN yarn workspace chess-training-app build

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