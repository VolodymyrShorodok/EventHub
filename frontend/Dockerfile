# Build from the repository root:
# docker build -f frontend/Dockerfile .
FROM node:20-alpine AS builder

WORKDIR /app

# The lock file belongs to the npm workspace root, so install dependencies there.
COPY package.json package-lock.json ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN npm ci

COPY frontend ./frontend

# Vite variables are embedded at build time. Docker Compose uses /api by default.
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build --workspace=frontend

FROM nginx:1.27-alpine

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
