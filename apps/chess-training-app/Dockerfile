FROM node:22-alpine AS deps
WORKDIR /app

# Copy root package.json and yarn.lock for workspace setup
COPY package.json yarn.lock ./
COPY apps/chess-training-app/package.json ./apps/chess-training-app/

RUN yarn install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/chess-training-app/node_modules ./apps/chess-training-app/node_modules

# Copy all source files
COPY . .

# Generate Prisma client
RUN yarn workspace chess-training-app prisma generate

# Build the application
RUN yarn workspace chess-training-app build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files for production
COPY --from=builder /app/apps/chess-training-app/.next ./apps/chess-training-app/.next
COPY --from=builder /app/apps/chess-training-app/public ./apps/chess-training-app/public
COPY --from=builder /app/apps/chess-training-app/package.json ./apps/chess-training-app/package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

# Copy Prisma client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

WORKDIR /app/apps/chess-training-app

EXPOSE 3000

CMD ["yarn", "start"]