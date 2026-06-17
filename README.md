<div align="center">
  <img src="apps/web/public/brand/logo.svg" alt="OpenWorld India" width="320" />
  <br />
  <br />
  <p><strong>Explore India Through Maps, Stories, Culture, and History</strong></p>
  <br />
  <p>
    <a href="https://openworld-india.dev"><img src="https://img.shields.io/badge/Website-openworld--india.dev-blue?style=flat-square" alt="Website" /></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" /></a>
    <a href="https://github.com/openworld-india/openworld-india/issues"><img src="https://img.shields.io/github/issues/openworld-india/openworld-india?style=flat-square" alt="GitHub Issues" /></a>
    <a href="https://github.com/openworld-india/openworld-india/pulls"><img src="https://img.shields.io/github/issues-pr/openworld-india/openworld-india?style=flat-square" alt="GitHub Pull Requests" /></a>
    <br />
    <img src="https://img.shields.io/badge/Next.js-14-000?style=flat-square&logo=next.js" alt="Next.js 14" />
    <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript" alt="TypeScript 5.5" />
    <img src="https://img.shields.io/badge/pnpm-9-F69220?style=flat-square&logo=pnpm" alt="pnpm 9" />
    <img src="https://img.shields.io/badge/Turborepo-2-EF4444?style=flat-square&logo=turborepo" alt="Turborepo 2" />
  </p>
</div>

---

**OpenWorld India** is an open-source interactive guide to India's heritage, culture, and destinations. Built with Next.js, it features maps, detailed pages for states/cities/monuments, and community-contributed content. All data is freely available under CC-BY-SA.

## Quick Demo

```bash
git clone https://github.com/openworld-india/openworld-india.git
cd openworld-india
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — the app loads with live data from the built-in mock API.

## Screenshots

| Interactive Map | State Profile |
|---|---|
| <img src="apps/web/public/images/screenshots/explorer.png" alt="Explorer Map" width="400" /> | <img src="apps/web/public/images/screenshots/state-detail.png" alt="State Detail" width="400" /> |

| Monument Page | City Guide |
|---|---|
| <img src="apps/web/public/images/screenshots/monument-detail.png" alt="Monument Detail" width="400" /> | <img src="apps/web/public/images/screenshots/home.png" alt="Home Page" width="400" /> |

---

## Features

- **Interactive Map** — Explore India with Leaflet-based maps, marker clustering, and GeoJSON state polygons
- **State Profiles** — Detailed pages with culture, economy, attractions, and galleries for all 28 states and 8 UTs
- **Monument Details** — History, architecture, visitor info, and location maps for heritage sites
- **City Guides** — Population, famous places, local foods, nearby destinations, and travel info
- **Time Travel** — Slider to explore historical periods across India
- **Dark Theme** — Full dark mode support with polished UI
- **Responsive** — Optimized for desktop and mobile
- **Community-Contributed** — Open data model with contribution forms and correction reporting

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.5 (strict) |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion 11 |
| Maps | Leaflet + react-leaflet |
| State Mgmt | React hooks + context |
| Package Mgr | pnpm 9 |
| Monorepo | Turborepo 2 |
| Linting | ESLint 8 + Next.js config |
| Formatting | Prettier 3 |

## Monorepo Structure

```
openworld-india/
├── apps/
│   ├── web/          # Next.js frontend (port 3000)
│   ├── api/          # API server
│   └── admin/        # Admin dashboard
├── packages/
│   ├── ui/           # Shared React components (Navbar, Footer, Cards, etc.)
│   ├── shared/       # Shared utilities and helpers
│   └── types/        # TypeScript type definitions
├── .github/          # GitHub templates and workflows
└── docs/             # Documentation
```

## Getting Started

### Prerequisites

- **Node.js** 20 or later
- **pnpm** 9.x (`npm install -g pnpm@9`)

### Install & Run

```bash
git clone https://github.com/openworld-india/openworld-india.git
cd openworld-india
pnpm install
pnpm dev
```

The web app runs at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm typecheck` | Run TypeScript type checking across all packages |
| `pnpm lint` | Run ESLint on the web app |
| `pnpm seed` | Seed the database with initial data |
| `pnpm format` | Format code with Prettier |

## Contribution Guide

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### Good First Issues

Looking for a place to start? Check out issues labeled [`good-first-issue`](https://github.com/openworld-india/openworld-india/labels/good-first-issue). These are beginner-friendly tasks that help you get familiar with the codebase.

### Quick Start for Contributors

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature`
3. Make changes and run `pnpm typecheck && pnpm lint && pnpm build`
4. Push and open a Pull Request

### Data Contributions

OpenWorld India welcomes data contributions! You can add or update:

- **States and Union Territories** — demographics, culture, economy, tourism
- **Cities** — population, attractions, local foods, travel info
- **Monuments** — history, architecture, visitor details, coordinates
- **Foods** — regional cuisine descriptions and cultural significance
- **Festivals** — dates, locations, traditions
- **Historical Events** — timeline entries with significance
- **Photos** — images with proper attribution

**Data validation rules:**
- Always provide sources for factual data
- Use `camelCase` for field names
- Use `slug` format for URL-friendly identifiers
- Images must include attribution
- Avoid copyrighted content; use public domain or CC-licensed material
- Population numbers should reference latest census data

See [docs/data-contribution.md](./docs/data-contribution.md) for detailed schemas and examples.

## Roadmap

| Version | Focus |
|---|---|
| v1.0 | Interactive map with state polygons, marker clustering, monument popups |
| v1.1 | Time Travel slider, state image gallery, loading skeletons, mobile optimization |
| v1.2 | Detail pages for states/monuments/cities, contribution system, documentation, SEO |
| v1.3 | GitHub launch readiness, CI/CD, templates, contributor docs |
| v1.4 | Branding assets, metadata polish, landing page polish, deployment prep |
| v1.5 | Search & discovery, advanced filtering |
| v2.0 | User accounts, favorites, trip planning |

See [docs/roadmap.md](./docs/roadmap.md) for the full roadmap.

## License

[MIT](./LICENSE) | Copyright (c) 2024 OpenWorld India

---

<div align="center">
  <sub>Built with ❤️ by contributors across India and the world.</sub>
</div>
