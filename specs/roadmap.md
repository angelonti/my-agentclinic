# Roadmap

Phases are intentionally small and shippable. Each phase adds visible, working functionality.

## Phase 1 — Foundation

- Initialize Next.js project with TypeScript and Tailwind CSS
- Configure SQLite database connection
- Basic layout: header, navigation, placeholder home page

## Phase 2 — Agent Profiles

- Agent data model (name, model type, origin system)
- List and detail pages for agents
- Create / edit agent form

## Phase 3 — Ailments & Therapies

- Ailment data model (name, description, severity)
- Therapy data model (name, description, duration)
- UI to browse ailments and available therapies

## Phase 4 — Appointment Booking

- Appointment data model (agent, therapy, staff member, datetime, status)
- Booking flow: agent selects therapy and available slot
- Confirmation and cancellation

## Phase 5 — Staff Dashboard

- Staff member data model
- Dashboard view: upcoming appointments, agent list, quick actions
- Appointment status management (confirm, complete, cancel)

## Phase 6 — Polish & QA

- Responsive design review
- Error handling and empty states
- Accessibility pass
- End-to-end smoke tests