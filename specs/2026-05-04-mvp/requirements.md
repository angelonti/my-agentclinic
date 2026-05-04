# Requirements — MVP (Phase 2b + Phase 3)

## Scope

This branch completes the AgentClinic MVP by adding Appointments, Staff, and a polish pass.

### In scope

**Staff**
- Data model: `id`, `name`, `specialty`, `bio`
- Seed data only — no CRUD UI; staff are read-only from the browser
- API routes: `GET /api/staff`, `GET /api/staff/[id]`
- Page: `/staff` — list all staff members
- Page: `/staff/[id]` — staff detail with upcoming appointments and inline status controls

**Appointments**
- Data model: `id`, `agentId`, `therapyId`, `staffId`, `datetime`, `status`
- Statuses: `pending` → `confirmed` → `cancelled` (one-way transitions; no rescheduling)
- API routes: `GET /POST /api/appointments`, `GET/PUT /api/appointments/[id]`
- Page: `/appointments` — list all appointments with status badges
- Page: `/appointments/new` — booking form (select agent, therapy, staff, datetime)
- Page: `/appointments/[id]` — appointment detail with confirm and cancel actions

**Polish & QA (Phase 3)**
- Responsive design review at 375 px and 1280 px
- Error handling: API errors surface a user-visible message; no silent failures
- Empty states: every list page shows a helpful message when there is no data
- Accessibility: semantic HTML, visible focus rings, meaningful `alt` text
- End-to-end smoke tests covering the booking flow

### Out of scope

- Staff CRUD (create / edit / delete)
- Appointment rescheduling
- `completed` status
- Ailment ↔ Therapy association table
- Authentication or access control

---

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Staff mutability | Seed data, read-only UI | Focused dashboard MVP; staff roster is stable in demo context |
| Appointment statuses | `pending`, `confirmed`, `cancelled` | Covers the full booking lifecycle without over-engineering |
| Booking form inputs | Dropdowns for agent / therapy / staff; datetime-local picker | Simple; no ambiguity about valid choices |
| Status transitions | Server Action updates single `status` field | Minimal state machine; easy to extend later |
| E2E tests | Playwright smoke suite | Catches routing and rendering regressions before merge |

---

## Context

- Phase 2a delivered Agents, Ailments, and Therapies with full CRUD and a read-only browse UI.
- This branch introduces the relational core of the clinic: Appointments tie agents, therapies, and staff together.
- The staff dashboard is the primary tool for clinic personnel; it must show upcoming (non-cancelled) appointments per staff member with one-click confirm/cancel controls.
- Target audience includes conference demo attendees, so every page must look complete and load quickly — empty states and error messages are first-class citizens, not afterthoughts.
