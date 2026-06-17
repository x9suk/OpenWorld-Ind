# Contributing to OpenWorld India

Thank you for your interest in contributing! OpenWorld India is an open-source project that aims to build a comprehensive guide to India's heritage, culture, and destinations.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Data Contributions](#data-contributions)
- [Code Contributions](#code-contributions)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Style Guide](#style-guide)
- [Getting Help](#getting-help)

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md). Be respectful, inclusive, and constructive in all interactions.

## Ways to Contribute

### Data Contributions
- Add or update states, cities, monuments, foods, festivals, or historical events
- Submit photographs with proper attribution
- Report corrections or inaccuracies

### Code Contributions
- Fix bugs and improve performance
- Add new features and pages
- Improve accessibility and responsive design
- Write tests and improve tooling

### Other Contributions
- Improve documentation and README
- Translate content to Indian languages
- Report issues and suggest improvements
- Review pull requests

## Development Setup

### Prerequisites

- **Node.js** 20 or later
- **pnpm** 9.x (`npm install -g pnpm@9`)

### Clone and Install

```bash
git clone https://github.com/your-username/openworld-india.git
cd openworld-india
pnpm install
```

### Environment

Copy `.env.example` to `.env.local` in `apps/web/` and configure as needed:

```bash
cp .env.example apps/web/.env.local
```

### Start Development

```bash
pnpm dev
```

The web app runs at [http://localhost:3000](http://localhost:3000).

## Development Workflow

1. **Create a branch**: `git checkout -b feat/your-feature` or `fix/your-fix`
2. **Make changes** following the [Style Guide](#style-guide)
3. **Run checks** locally:
   ```bash
   pnpm typecheck   # TypeScript check
   pnpm lint        # ESLint
   pnpm build       # Full build
   ```
4. **Commit** with clear messages (see below)
5. **Push** and open a Pull Request

### Commit Messages

Use conventional commits format:

- `feat: add festival detail page`
- `fix: correct monument coordinates for Taj Mahal`
- `docs: update contribution guide`
- `refactor: extract map component`
- `data: add Chhattisgarh state data`

## Data Contributions

### Data Validation Rules

- **Sources required**: Always cite official or academic sources for factual data
- **camelCase**: Use camelCase for all field names
- **Slug format**: URL-friendly slugs (`lowercase-with-hyphens`)
- **Image attribution**: All images must include photographer credit and license info
- **No copyrighted content**: Use public domain, CC-licensed, or your own content
- **Census data**: Population numbers should reference latest official census data

### Data Schemas

See [docs/data-contribution.md](./docs/data-contribution.md) for complete schemas with examples for:
- States and Union Territories
- Cities
- Monuments
- Foods
- Festivals
- Historical Events
- Photos

## Code Contributions

### Code Style

- **TypeScript**: Strict mode enabled; avoid `any` types
- **React**: Functional components with hooks
- **Imports**: Use path aliases (`@/` maps to `src/`)
- **Tailwind**: Use Tailwind classes; avoid inline styles
- **Components**: Extract reusable UI to `@openworld/ui`
- **Types**: Define shared types in `@openworld/types`

### Project Structure

```
apps/web/src/
├── app/           # Next.js App Router pages
│   ├── states/    # State detail pages
│   ├── monuments/ # Monument detail pages
│   ├── cities/    # City detail pages
│   └── ...
├── components/    # App-specific components
├── lib/           # Utilities, API client
└── styles/        # Global styles
```

## Pull Request Guidelines

- Keep PRs focused on a single change or feature
- Write clear, descriptive titles and descriptions
- Reference related issues: `Fixes #123`
- Ensure all checks pass (typecheck, lint, build)
- Update documentation if needed
- Request review from maintainers

### PR Title Format

```
type(scope): brief description
```

Examples:
- `feat(states): add culture and economy sections`
- `fix(map): resolve cluster click handler`
- `docs(readme): update getting started`
- `data(monuments): add Konark Sun Temple`

## Style Guide

### TypeScript
- Use strict TypeScript; no `any` types
- Prefer interfaces over types for objects
- Use `type` for unions and utility types

### React
- Client components: `'use client'` directive at top
- Server components: metadata exports via layouts
- Use `useCallback` and `useMemo` for performance
- Prefer `useEffect` for data fetching with loading/error states

### CSS/Tailwind
- Use Tailwind utility classes
- Dark mode: `dark:` variant for all color styles
- Responsive: `sm:`, `md:`, `lg:` breakpoints

## Getting Help

- Open an issue for bugs or feature requests
- Use discussions for questions and ideas
- Review existing issues before opening new ones
