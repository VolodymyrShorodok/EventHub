# Build from the repository root:
# docker build -f backend/Dockerfile .
FROM node:20-bookworm-slim AS builder

WORKDIR /app
RUN apt-get update \
    && apt-get install --no-install-recommends --yes openssl \
    && rm -rf /var/lib/apt/lists/*

# The lock file belongs to the npm workspace root, so install dependencies there.
COPY package.json package-lock.json ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN npm ci

COPY backend ./backend
RUN ./node_modules/.bin/prisma generate --schema=backend/prisma/schema.prisma
RUN npm run build --workspace=backend

FROM node:20-bookworm-slim AS production

WORKDIR /app
ENV NODE_ENV=production
RUN apt-get update \
    && apt-get install --no-install-recommends --yes openssl \
    && rm -rf /var/lib/apt/lists/*

# Install only the runtime dependencies from the locked workspace.
COPY package.json package-lock.json ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN npm ci --omit=dev --workspace=backend

# Create the runtime user before copying application files so no recursive
# ownership change is needed for the large node_modules directory.
RUN addgroup --system app && adduser --system --ingroup app app

COPY --chown=app:app --from=builder /app/backend/dist ./backend/dist
COPY --chown=app:app --from=builder /app/backend/prisma ./backend/prisma
RUN ./node_modules/.bin/prisma generate --schema=backend/prisma/schema.prisma

USER app
EXPOSE 3000

CMD ["node", "backend/dist/main.js"]
