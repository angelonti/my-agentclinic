# Plan — MVP (Phase 2b + Phase 3)

## 1. Staff feature

1.1. Add `staff` table to migration (`id`, `name`, `specialty`, `bio`)  
1.2. Create `lib/db/staff.ts` with `listStaff`, `getStaff`  
1.3. Add staff seed rows to `lib/db/seed.ts`  
1.4. Route Handlers: `GET /api/staff`, `GET /api/staff/[id]`  
1.5. Page: `/staff` — list all staff members with specialty badge  
1.6. Page: `/staff/[id]` — staff detail with upcoming appointments list and inline confirm/cancel buttons  
1.7. Wire `/staff` into the header navigation

## 2. Appointments feature

2.1. Add `appointments` table to migration (`id`, `agent_id`, `therapy_id`, `staff_id`, `datetime`, `status`)  
2.2. Create `lib/db/appointments.ts` with `listAppointments`, `getAppointment`, `createAppointment`, `updateAppointmentStatus`  
2.3. Route Handlers: `GET/POST /api/appointments`, `GET/PUT /api/appointments/[id]`  
2.4. Page: `/appointments` — list all appointments with status badges, link to detail, link to book  
2.5. Page: `/appointments/new` — booking form (dropdowns for agent, therapy, staff; datetime-local picker); submits to `POST /api/appointments`; new appointments default to `pending`  
2.6. Page: `/appointments/[id]` — appointment detail; confirm button (pending → confirmed), cancel button (pending or confirmed → cancelled)  
2.7. Wire `/appointments` into the header navigation

## 3. Staff dashboard wiring

3.1. `/staff/[id]` queries upcoming appointments (non-cancelled, datetime ≥ now) for that staff member  
3.2. Inline confirm/cancel Server Actions update status and revalidate the page  
3.3. No appointments shows an empty-state message

## 4. Polish — responsive & empty states

4.1. Review every page at 375 px (mobile) and 1280 px (desktop); fix any layout breaks  
4.2. Add empty-state components to `/agents`, `/ailments`, `/therapies`, `/staff`, `/appointments`  
4.3. Ensure all forms show inline validation errors on bad/missing input

## 5. Polish — error handling

5.1. Wrap API route handlers in try/catch; return `{ error: string }` JSON with appropriate HTTP status  
5.2. Add a top-level `error.tsx` boundary in the App Router  
5.3. Detail pages for unknown IDs redirect to the list with a "Not found" flash

## 6. Polish — accessibility

6.1. Confirm every interactive element is reachable and operable by keyboard  
6.2. Add `aria-label` or visible labels to icon-only buttons  
6.3. Verify heading hierarchy (`h1` → `h2` → `h3`) on each page  
6.4. Confirm colour contrast meets WCAG AA for status badges

## 7. End-to-end smoke tests

7.1. Install Playwright (`@playwright/test`) and configure for `localhost:3000`  
7.2. Smoke test: home → agents list → create agent → appears in list  
7.3. Smoke test: book appointment → appears in appointments list with `pending` status  
7.4. Smoke test: confirm appointment → status changes to `confirmed`  
7.5. Smoke test: cancel appointment → status changes to `cancelled`; staff dashboard no longer shows it  
7.6. Confirm `npm run e2e` passes with no failures

## 8. Unit tests

8.1. Vitest tests for `lib/db/staff.ts` (list, get, non-existent id)  
8.2. Vitest tests for `lib/db/appointments.ts` (create, status transitions, list filters)  
8.3. Confirm `npm test` still passes with no failures
