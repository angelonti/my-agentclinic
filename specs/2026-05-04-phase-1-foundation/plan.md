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

3.1 Root layout (`app/layout.tsx`) — provides `<html>` / `<body>`, metadata, and mounts the `Layout` component
3.2 Define base Tailwind theme tokens (brand colors, font) in `tailwind.config.ts`
3.3 `src/components/layout/Layout.tsx` + `Layout.module.css` — composes `<Header>`, `<Main>`, and `<Footer>`; each lives in its own file
3.4 `src/components/layout/Header.tsx` + `Header.module.css` — site header with logo and navigation bar
3.5 `src/components/layout/Main.tsx` + `Main.module.css` — content wrapper rendered as `<main>`
3.6 `src/components/layout/Footer.tsx` + `Footer.module.css` — site footer with tagline

## 4. Testing

4.1 Install Vitest and add `"test": "vitest"` script to `package.json`
4.2 Create `vitest.config.ts` — configure `environment: 'node'` and resolve the `@/` path alias
4.3 Create `src/__tests__/smoke.test.ts` — one passing test to verify the suite boots

## 5. AgentClinic Home Page

5.1 Hero section — clinic name, tagline ("A safe space for AI agents to heal"), brand colors
5.2 Services teaser — short copy describing what agents can do (browse therapies, book appointments)
5.3 Call-to-action button — styled link pointing to the future `/appointments` route