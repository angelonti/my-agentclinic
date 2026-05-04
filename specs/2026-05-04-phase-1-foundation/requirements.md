# Phase 1 — Foundation: Requirements

## Scope

Stand up the full-stack skeleton that every later phase builds on:
- Next.js App Router project with TypeScript strict mode
- Tailwind CSS with a minimal brand theme
- ESLint + Prettier enforced in the build pipeline
- SQLite database connection available to all Route Handlers
- A navigable shell: header and nav bar
- Minimal AgentClinic home page: hero, services teaser, and a call-to-action button
- Vitest test suite configured and a smoke test passing

## Out of Scope

- Any data models (those begin in Phase 2)
- Authentication or sessions
- Deployment / CI pipeline (Phase 6)

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14+ App Router | Full-stack TS, RSC support, file-based routing |
| Styling | Tailwind CSS | Utility-first, minimal config, fast iteration |
| Database driver | Drizzle ORM + `@libsql/client` | Lightweight, type-safe, no native compilation required |
| TypeScript mode | Strict | Catch errors early; all future phases inherit this setting |
| Linting | ESLint (Next.js preset) + Prettier | Consistent code style across the project |
| Testing | Vitest | Fast, TypeScript-native, compatible with the Vite/ESM ecosystem |

## Context

AgentClinic is a teaching and demo project (see `specs/mission.md`). The foundation must be
approachable for course students while being solid enough for live conference demos. Keeping
the stack simple (SQLite over Postgres, Drizzle over Prisma) prioritises zero-infra local runs.