# StudioOS

> Monorepo SaaS platform for interior design studio management — project pipelines, client portals, scheduling, file management, and AI-assisted workflows.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript) ![Supabase](https://img.shields.io/badge/Supabase-postgres-green?logo=supabase)

## What it does

Full-stack studio operating system for interior design teams. Manages the complete project lifecycle from client intake to delivery — with task boards, scheduling, file assets, team roles, and an AI layer for automating repetitive workflow steps.

## Features

- **Project & client management** — pipeline views, milestones, deliverables
- **Task tracking** — drag-and-drop boards, assignments, deadlines
- **File & asset management** — design deliverables, versioning
- **Team collaboration** — role-based access (RBAC)
- **Data visualisation** — D3 + Recharts dashboards, Three.js 3D views
- **AI workflows** — Google Generative AI integration via `@google/genai`
- **Observability** — OpenTelemetry + Sentry error tracking
- **Scheduled jobs** — node-cron for recurring tasks
- **Email** — Nodemailer transactional email
- **Auth** — Clerk (multi-tenant, organisations, RBAC)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript 5.9 |
| Monorepo | Turborepo / Bun workspaces |
| Database | PostgreSQL via Supabase |
| ORM | Drizzle ORM |
| Auth | Clerk |
| AI | Google Generative AI (`@google/genai`) |
| Data Viz | D3 v7 + Recharts + Three.js |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| Animation | Framer Motion |
| State | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Playwright + Testing Library |
| Observability | OpenTelemetry SDK + Sentry |
| Runtime | Bun >=1.0 / Node >=20 |

## Monorepo Structure

```
apps/
└── web/              # Main Next.js application
    ├── app/
    │   ├── (dashboard)/ # Authenticated dashboard routes
    │   └── api/         # API route handlers
    ├── components/     # UI component library
    ├── hooks/          # Custom React hooks
    ├── lib/            # Utilities and clients
    ├── __tests__/      # Vitest unit tests
    └── e2e/            # Playwright E2E tests
packages/
└── core-domain/      # Shared domain logic (workspace:*)
```

## Getting Started

```bash
# Install (requires Bun >= 1.0)
bun install

# Environment
cp apps/web/.env.example apps/web/.env.local

# Dev
bun dev

# Test
bun test
bun test:e2e

# Build
bun build
```

## Testing

```bash
bun run test              # Vitest unit + integration
bun run test:coverage     # Coverage report
bun run test:e2e          # Playwright E2E
bun run type-check        # TypeScript check
```

---

Built by [Cerison Automation](https://github.com/CerisonAutomation)
