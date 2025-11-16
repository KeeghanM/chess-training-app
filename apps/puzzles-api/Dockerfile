FROM node:22-alpine AS deps
WORKDIR /app

# Copy root package.json and yarn.lock for workspace setup
COPY package.json yarn.lock ./
COPY apps/puzzles-api/package.json ./apps/puzzles-api/

RUN yarn install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/puzzles-api/node_modules ./apps/puzzles-api/node_modules

# Copy all source files
COPY . .

# Build the application
RUN yarn workspace puzzles-api build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files for production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/puzzles-api/dist ./apps/puzzles-api/dist
COPY --from=builder /app/apps/puzzles-api/package.json ./apps/puzzles-api/package.json
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

WORKDIR /app/apps/puzzles-api

EXPOSE 4000

CMD ["node", "dist/index.js"]