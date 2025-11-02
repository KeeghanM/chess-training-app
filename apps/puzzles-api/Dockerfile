FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist

ENV PATH="/app/node_modules/.bin:$PATH"

EXPOSE 4000
CMD ["node", "dist/index.js"]
