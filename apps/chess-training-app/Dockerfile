FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

# Production image
FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Ensure Next binaries are in PATH
ENV PATH="/app/node_modules/.bin:$PATH"

EXPOSE 3000
CMD ["yarn", "start"]
