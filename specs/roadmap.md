# Roadmap

Phases are intentionally small and shippable. Each phase adds visible, working functionality.

## Phase 1 — Foundation ✓

- Initialize Next.js project with TypeScript and Tailwind CSS
- Configure SQLite database connection
- Mobile-first responsive shell: header, navigation, home page

## Phase 2 — Core Features

- Agent data model (name, model type, origin system); list, detail, create / edit pages
- Ailment data model (name, description, severity) and therapy data model (name, description, duration); UI to browse ailments and available therapies
- Appointment data model (agent, therapy, staff member, datetime, status); booking flow with confirmation and cancellation
- Staff member data model; dashboard view with upcoming appointments, agent list, quick actions, and appointment status management

## Phase 3 — Polish & QA

- Responsive design review
- Error handling and empty states
- Accessibility pass
- End-to-end smoke tests