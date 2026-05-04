import Link from 'next/link';
import { listAppointmentsRich } from '@/lib/db/appointments';

export const dynamic = 'force-dynamic';

const statusLabel = { pending: 'Pending', confirmed: 'Confirmed', cancelled: 'Cancelled' } as const;

export default async function AppointmentsPage() {
  const appointments = await listAppointmentsRich();

  return (
    <>
      <div className="spread">
        <h1>Appointments</h1>
        <Link href="/appointments/new" role="button">
          Book Appointment
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p>
          No appointments booked yet.{' '}
          <Link href="/appointments/new">Book the first appointment.</Link>
        </p>
      ) : (
        <figure>
          <table>
            <thead>
              <tr>
                <th>Agent</th>
                <th>Therapy</th>
                <th>Staff</th>
                <th>Date &amp; Time</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.agentName}</td>
                  <td>{appt.therapyName}</td>
                  <td>{appt.staffName}</td>
                  <td>{appt.datetime.replace('T', ' ')}</td>
                  <td>
                    <mark>{statusLabel[appt.status]}</mark>
                  </td>
                  <td>
                    <Link href={`/appointments/${appt.id}`}>View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      )}
    </>
  );
}
