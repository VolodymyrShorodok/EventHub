# Event Hub

A monorepo MVP for an event management platform.

```text
frontend/  React + TypeScript + Vite + Tailwind
backend/   NestJS API + JWT + Prisma
```

## Running the Project

After implementing the initial modules, start the frontend and backend separately:

```bash
npm run dev:frontend
npm run dev:backend
```

## Docker

1. Create a local environment file:

```powershell
Copy-Item .env.example .env
```

2. Replace `POSTGRES_PASSWORD` and `JWT_SECRET` in `.env` with unique values.

3. Start the project:

```bash
docker compose up --build
```

The frontend is available at http://localhost:5173.

The backend is available at http://localhost:3000.

PostgreSQL is intentionally not exposed to the host.

Database migrations are executed once by the `migrate` service before the backend starts.
