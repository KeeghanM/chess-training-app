FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY apps/puzzles-api/package.json ./apps/puzzles-api/
RUN yarn install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn workspace puzzles-api build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/puzzles-api/dist ./apps/puzzles-api/dist
COPY --from=builder /app/apps/puzzles-api/package.json ./apps/puzzles-api/package.json

WORKDIR /app/apps/puzzles-api
CMD ["node", "dist/index.js"]