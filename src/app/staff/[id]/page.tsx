import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getStaff } from '@/lib/db/staff';
import { listUpcomingForStaff, updateAppointmentStatus } from '@/lib/db/appointments';

export const dynamic = 'force-dynamic';

const statusLabel = { pending: 'Pending', confirmed: 'Confirmed', cancelled: 'Cancelled' } as const;

export default async function StaffDashboardPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();
  const member = await getStaff(id);
  if (!member) notFound();
  const upcoming = await listUpcomingForStaff(id);

  async function confirmAppointment(apptId: number) {
    'use server';
    await updateAppointmentStatus(apptId, 'confirmed');
    redirect(`/staff/${id}`);
  }

  async function cancelAppointment(apptId: number) {
    'use server';
    await updateAppointmentStatus(apptId, 'cancelled');
    redirect(`/staff/${id}`);
  }

  return (
    <>
      <div className="spread">
        <div>
          <h1>{member.name}</h1>
          <p>
            <mark>{member.specialty}</mark>
          </p>
        </div>
        <Link href="/staff">← All Staff</Link>
      </div>

      <p>{member.bio}</p>

      <h2>Upcoming Appointments</h2>

      {upcoming.length === 0 ? (
        <p>No upcoming appointments for {member.name}.</p>
      ) : (
        <figure>
          <table>
            <thead>
              <tr>
                <th>Agent</th>
                <th>Therapy</th>
                <th>Date &amp; Time</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.agentName}</td>
                  <td>{appt.therapyName}</td>
                  <td>{appt.datetime.replace('T', ' ')}</td>
                  <td>
                    <mark>{statusLabel[appt.status]}</mark>
                  </td>
                  <td>
                    <div className="button-group">
                      {appt.status === 'pending' && (
                        <form action={confirmAppointment.bind(null, appt.id)} className="inline-form">
                          <button type="submit" className="contrast outline">
                            Confirm
                          </button>
                        </form>
                      )}
                      <form action={cancelAppointment.bind(null, appt.id)} className="inline-form">
                        <button type="submit" className="secondary outline">
                          Cancel
                        </button>
                      </form>
                    </div>
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
