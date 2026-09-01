# Event Hub

Монорепозиторій MVP платформи заходів.

```text
frontend/  React + TypeScript + Vite + Tailwind
backend/   NestJS API + JWT + Prisma
```

## Запуск після реалізації стартових модулів

```bash
npm run dev:frontend
npm run dev:backend
```

## Docker

1. Create a local environment file: `Copy-Item .env.example .env`.
2. Replace `POSTGRES_PASSWORD` and `JWT_SECRET` in `.env` with unique values.
3. Start the project: `docker compose up --build`.

The frontend is available at http://localhost:5173 and the backend at
http://localhost:3000. PostgreSQL is intentionally not published to the host.
Database migrations run once in the `migrate` service before the backend starts.
