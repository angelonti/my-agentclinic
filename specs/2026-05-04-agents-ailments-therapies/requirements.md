# Requirements — Agents, Ailments & Therapies

## Scope

This branch covers the first half of Phase 2: the three core data models and their UI.

### In scope

**Agents**
- Data model: `id`, `name`, `modelType`, `originSystem`
- Pages: list all agents, agent detail, create agent, edit agent
- Delete action from detail page

**Ailments**
- Data model: `id`, `name`, `description`, `severity`
- Page: browse all ailments (read-only in this phase)

**Therapies**
- Data model: `id`, `name`, `description`, `duration`
- Page: browse all therapies (read-only in this phase)

### Out of scope (later phases)

- Appointments and booking flow
- Staff member model and dashboard
- Linking ailments to therapies (association table)
- Authentication or access control

---

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Database driver | `@libsql/client` + Drizzle ORM | Already present in the project; async API compatible with App Router; type-safe queries |
| Schema migrations | Hand-written SQL via `client.execute()` at startup | No migration tooling overhead for a small, dev-only database |
| Data access | Thin module per model (`lib/db/agents.ts`, etc.) exporting typed functions | Keeps queries colocated with their model; easy to unit-test with Vitest mocks |
| Routing | Next.js App Router with Server Components for reads, Server Actions for mutations | Fast page loads; no client JS required for forms |
| Styling | PicoCSS | Semantic HTML-first styling; minimal class noise; built-in responsive layout |

---

## Context

- Phase 1 delivered the responsive shell (header, nav, home page) with no real data. Note: Phase 1 used Tailwind CSS; this phase migrates styling to PicoCSS.
- This phase introduces the database and the first user-visible data flows.
- The schema and `lib/db` conventions established here will be reused by appointments and staff in the next branch.
- Target audience includes conference demo attendees, so pages must look polished and load quickly even with an empty database.