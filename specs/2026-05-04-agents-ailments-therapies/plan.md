# Plan — Agents, Ailments & Therapies

## 1. Database setup

1.1. Install `better-sqlite3` and its TypeScript types (`@types/better-sqlite3`)  
1.2. Create `lib/db/client.ts` — singleton that opens (or creates) `data/clinic.db`  
1.3. Create `lib/db/migrate.ts` — runs all `CREATE TABLE IF NOT EXISTS` statements on startup  
1.4. Call migrate from the Next.js app initialisation path (e.g. `instrumentation.ts`)

## 2. Agent feature

2.1. Add `agents` table to migration (`id`, `name`, `model_type`, `origin_system`)  
2.2. Create `lib/db/agents.ts` with typed functions: `listAgents`, `getAgent`, `createAgent`, `updateAgent`, `deleteAgent`  
2.3. Route Handlers: `GET/POST /api/agents`, `GET/PUT/DELETE /api/agents/[id]`  
2.4. Page: `/agents` — server component, table/card list of all agents, link to detail, link to create  
2.5. Page: `/agents/[id]` — agent detail, edit and delete actions  
2.6. Page: `/agents/new` — create form  
2.7. Page: `/agents/[id]/edit` — edit form (reuses form component from create)  
2.8. Wire `/agents` into the header navigation

## 3. Ailment feature

3.1. Add `ailments` table to migration (`id`, `name`, `description`, `severity`)  
3.2. Create `lib/db/ailments.ts` with `listAilments`, `getAilment`  
3.3. Route Handler: `GET /api/ailments`, `GET /api/ailments/[id]`  
3.4. Page: `/ailments` — browse list with severity badge  
3.5. Wire `/ailments` into the header navigation

## 4. Therapy feature

4.1. Add `therapies` table to migration (`id`, `name`, `description`, `duration`)  
4.2. Create `lib/db/therapies.ts` with `listTherapies`, `getTherapy`  
4.3. Route Handler: `GET /api/therapies`, `GET /api/therapies/[id]`  
4.4. Page: `/therapies` — browse list with duration badge  
4.5. Wire `/therapies` into the header navigation

## 5. Seed data

5.1. Create `lib/db/seed.ts` — inserts a handful of agents, ailments, and therapies if tables are empty  
5.2. Call seed after migrate so the app is non-empty on first run

## 6. Tests

6.1. Vitest unit tests for each `lib/db/*.ts` module (CRUD round-trips against an in-memory SQLite database)  
6.2. Confirm `npm test` passes with no failures