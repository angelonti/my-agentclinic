# Phase 1 — Foundation: Validation

Phase 1 is complete and ready to merge when all of the following pass.

## 1. Type Check

```
npx tsc --noEmit
```
Zero errors. TypeScript strict mode must be enabled in `tsconfig.json`.

## 2. Lint

```
npx next lint
```
Zero errors or warnings that block the build.

## 3. Dev Server Boots

```
npx next dev
```
- Server starts without errors
- Terminal prints a SQLite connection confirmation line (e.g. `[db] connected to clinic.db`)

## 4. Home Page Renders

Open `http://localhost:3000` in a browser:
- Page loads without a runtime error overlay
- Header and navigation bar are visible
- Hero section displays the clinic name and tagline
- Services teaser copy is present
- A call-to-action button is visible (link need not resolve to a real page yet)

## 5. Navigation Links Present

The nav bar contains at minimum a "Home" link that resolves to `/` without a 404.

## 6. Responsive Layout

Resize the browser across common breakpoints:
- **375 px (mobile)** — header logo and nav stack vertically; hero text is readable; CTA buttons stack vertically; services display as a single column
- **768 px (tablet)** — header logo and nav sit side by side; services display in a three-column grid
- **1280 px (desktop)** — layout is centred within the max-width container with comfortable padding; no horizontal scrollbar

## 7. Tests Pass

```
npm test
```
All tests exit green with zero failures.

## Definition of Done

All seven checks above pass. No check may be skipped.