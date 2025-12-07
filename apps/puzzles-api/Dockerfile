FROM node:22-alpine AS deps
WORKDIR /app

# Copy root package.json and yarn.lock for workspace setup
COPY package.json yarn.lock* ./
COPY apps/puzzles-api/package.json ./apps/puzzles-api/

# Install all deps including dev
ENV NODE_ENV="development"
RUN yarn install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Build the application
RUN yarn workspace puzzles-api build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV="production"

# Create system user group and user (for secure execution)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 apiuser

# Copy only production dependencies
COPY --from=builder --chown=apiuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=apiuser:nodejs /app/apps/puzzles-api/dist ./dist

# Switch to non-root user
USER apiuser

EXPOSE 4000

# Use array syntax for CMD to avoid shell overhead
CMD ["node", "dist/index.js"]