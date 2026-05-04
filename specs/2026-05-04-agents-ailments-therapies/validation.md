# Validation — Agents, Ailments & Therapies

Implementation is ready to merge when all of the following pass.

## 1. TypeScript + lint

```
npm run build   # zero type errors
npx eslint .    # zero errors or warnings
```

Both must exit with code 0.

## 2. Unit tests

```
npm test
```

All Vitest tests pass. Coverage must include:

- `listAgents` / `getAgent` / `createAgent` / `updateAgent` / `deleteAgent`
- `listAilments` / `getAilment`
- `listTherapies` / `getTherapy`
- Edge cases: get a non-existent id returns `undefined`; delete a non-existent id is a no-op

## 3. All pages render

Start the dev server (`npm run dev`) and confirm each route loads without a runtime error or white screen:

| Route | Expected |
|---|---|
| `/agents` | List of agents (or empty state if no seed) |
| `/agents/new` | Create form renders |
| `/agents/[id]` | Agent detail with edit/delete buttons |
| `/agents/[id]/edit` | Edit form pre-filled with current values |
| `/ailments` | Browse list with severity badges |
| `/therapies` | Browse list with duration badges |

## 4. CRUD flows

Walk through these flows manually in the browser:

**Agents**
- [ ] Create a new agent — appears in the list
- [ ] Edit the agent's name — change is reflected on detail and list pages
- [ ] Delete the agent — removed from the list, detail page returns 404 or redirect

**Ailments & Therapies**
- [ ] Seed data is visible on browse pages on first run
- [ ] Adding a row directly to the database (e.g. via a quick script) shows on reload

## 5. Navigation

- [ ] Header links for Agents, Ailments, and Therapies are present and active-state highlights correctly on each page
- [ ] All links resolve without 404