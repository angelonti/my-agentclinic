# Phase 1 — Foundation: Plan

## 1. Project Scaffolding

1.1 Initialize Next.js with TypeScript (`create-next-app` with App Router, strict mode enabled)
1.2 Configure Tailwind CSS (install, `tailwind.config.ts`, global stylesheet)
1.3 Set up ESLint + Prettier (extend Next.js defaults, add Prettier integration)

## 2. Database

2.1 Install Drizzle ORM + `better-sqlite3` (+ `@types/better-sqlite3`)
2.2 Create `src/db/client.ts` — initialize Drizzle with a local `clinic.db` file
2.3 Verify connection on startup — log a confirmation line when `next dev` boots

## 3. Shell UI

3.1 Root layout (`app/layout.tsx`) with persistent header and navigation bar
3.2 Define base Tailwind theme tokens (brand colors, font) in `tailwind.config.ts`

## 4. AgentClinic Home Page

4.1 Hero section — clinic name, tagline ("A safe space for AI agents to heal"), brand colors
4.2 Services teaser — short copy describing what agents can do (browse therapies, book appointments)
4.3 Call-to-action button — styled link pointing to the future `/appointments` route