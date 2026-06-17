# OpenWorld India

Explore India Through Maps, Stories, Culture, and History.

## Architecture

- `apps/web` — Next.js frontend (port 3000)
- `apps/api` — Express API server (port 4000)
- `apps/admin` — Admin dashboard (port 4001)
- `packages/types` — Shared TypeScript types
- `packages/shared` — Shared utilities and constants
- `packages/ui` — Shared React components

## Quick Start

```bash
# Install dependencies
pnpm install

# Seed the database
pnpm seed

# Start development
pnpm dev
```

## Services

| Service | Port | URL |
|---------|------|-----|
| Web App | 3000 | http://localhost:3000 |
| API | 4000 | http://localhost:4000 |
| Admin | 4001 | http://localhost:4001 |

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Leaflet
- **Backend**: Express.js, better-sqlite3
- **Build**: pnpm workspaces, Turborepo
- **Deployment**: Docker

## Docker

```bash
docker-compose -f docker/docker-compose.yml up --build
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## License

MIT
