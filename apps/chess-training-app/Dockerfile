FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY apps/chess-training-app/package.json ./apps/chess-training-app/
COPY apps/puzzles-api/package.json ./apps/puzzles-api/

RUN yarn install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn workspace chess-training-app prisma generate
RUN yarn workspace chess-training-app build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/chess-training-app/.next ./apps/chess-training-app/.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/chess-training-app/package.json ./apps/chess-training-app/package.json
COPY --from=builder /app/apps/chess-training-app/public ./apps/chess-training-app/public
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

WORKDIR /app/apps/chess-training-app
CMD ["yarn", "start"]