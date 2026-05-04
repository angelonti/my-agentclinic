# Validation — MVP (Phase 2b + Phase 3)

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

- `listStaff` / `getStaff` — non-existent id returns `undefined`
- `createAppointment` — returns new appointment with `pending` status
- `updateAppointmentStatus` — pending → confirmed, pending → cancelled, confirmed → cancelled
- `updateAppointmentStatus` — no-op (or error) when transitioning from `cancelled`
- `listAppointments` with no rows returns empty array

## 3. All pages render

Start the dev server (`npm run dev`) and confirm each route loads without a runtime error or white screen:

| Route | Expected |
|---|---|
| `/staff` | List of staff members with specialty badges |
| `/staff/[id]` | Staff detail with upcoming appointments or empty state |
| `/appointments` | List of appointments with status badges, or empty state |
| `/appointments/new` | Booking form with dropdowns and datetime picker |
| `/appointments/[id]` | Appointment detail with confirm/cancel buttons |

## 4. Booking flow

Walk through this flow manually in the browser:

- [ ] Visit `/appointments/new`; select an agent, therapy, staff member, and a future datetime; submit
- [ ] New appointment appears in `/appointments` with `pending` status badge
- [ ] Visit the appointment detail page; click **Confirm** → status changes to `confirmed`; confirm button is gone
- [ ] Click **Cancel** on a confirmed appointment → status changes to `cancelled`; appointment no longer appears in the staff dashboard upcoming list

## 5. Staff dashboard

- [ ] `/staff` lists all seeded staff members
- [ ] `/staff/[id]` shows only upcoming (non-cancelled, future datetime) appointments for that staff member
- [ ] Inline **Confirm** and **Cancel** buttons update status without a full page reload (or with a fast server revalidation)
- [ ] When no upcoming appointments exist, an empty-state message is shown

## 6. Responsive design

- [ ] Every page renders correctly at 375 px width (no overflow, no clipped text)
- [ ] Every page renders correctly at 1280 px width (reasonable max-width, content centred)
- [ ] The booking form is usable on a mobile viewport

## 7. Empty states & error handling

- [ ] All list pages (`/agents`, `/ailments`, `/therapies`, `/staff`, `/appointments`) show a meaningful message when the list is empty
- [ ] Navigating to `/appointments/[unknown-id]` redirects or shows a "Not found" message — no crash
- [ ] A simulated API error (e.g. bad payload to `POST /api/appointments`) returns a JSON error with a non-200 status

## 8. Accessibility

- [ ] All interactive elements (buttons, links, form controls) are reachable by Tab key
- [ ] Status badges have sufficient colour contrast (WCAG AA)
- [ ] Each page has a single `<h1>` and a logical heading hierarchy below it
- [ ] No unlabelled icon-only buttons

## 9. End-to-end smoke tests

```
npm run e2e
```

All Playwright tests pass:

- Home → agents list → create agent → agent appears in list
- Book appointment → appears in list as `pending`
- Confirm appointment → status shows `confirmed`
- Cancel appointment → status shows `cancelled`; absent from staff dashboard

## 10. Navigation

- [ ] Header links for Staff and Appointments are present and active-state highlights correctly
- [ ] All links across the app resolve without 404
