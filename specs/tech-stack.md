# Tech Stack

## Language

TypeScript throughout — client and server.

## Recommended Framework: Next.js

We use **Next.js** (App Router) as our full-stack framework.

**Why Next.js:**
- Single TypeScript project covering both UI and API routes
- Server-side rendering satisfies Steve's requirement for a fast, modern browser experience
- File-based routing and React Server Components keep the codebase approachable
- Large ecosystem with strong community support, meeting Mary's reliability requirement

## Frontend

- **React** (via Next.js) for component-based UI
- **Tailwind CSS** for utility-first styling

## Backend

- **Next.js API Routes** (or Route Handlers) for the server-side logic
- **TypeScript** strict mode enabled

## Database

- **SQLite** via a lightweight ORM (e.g. Drizzle or better-sqlite3)
- Simple to run locally; no external services required

## Tooling

- `tsc` / Next.js build pipeline
- ESLint + Prettier for code quality