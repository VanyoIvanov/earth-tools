# Earth Tools

Earth Tools is a Next.js 16 App Router application for open ecological intelligence. This first release ships a parity-first UI for wildfire awareness with typed mock data adapters, API routes, and production-grade quality gates.

## Tech Stack

- Next.js 16 + React 19 + TypeScript (strict)
- Tailwind CSS v4 with semantic design tokens
- MapLibre GL for interactive wildfire map rendering
- Zod-validated domain contracts and repository adapters
- Vitest + Testing Library + Playwright + axe-core + Lighthouse CI

## Routes

- `/` - Home and tool directory
- `/wildfire` - Wildfire nowcast map and model sidebar
- `/methods` - Methods and transparency
- `/status` - Pipeline and service status
- `/api/wildfire` - Mock wildfire detections and forecasts
- `/api/status` - Mock system status and latest runs

## Development

```bash
pnpm install
pnpm dev
```

## Quality Gates

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm e2e
pnpm a11y
pnpm build
pnpm lhci
```

## Notes

- E2E and a11y tests use port `4173`.
- Playwright browser binaries can be installed with `pnpm e2e:install`.
- Lighthouse results are written to `.lighthouseci/`.
