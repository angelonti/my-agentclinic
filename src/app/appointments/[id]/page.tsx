import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getAppointmentRich, updateAppointmentStatus } from '@/lib/db/appointments';

export const dynamic = 'force-dynamic';

const statusLabel = { pending: 'Pending', confirmed: 'Confirmed', cancelled: 'Cancelled' } as const;

export default async function AppointmentDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();
  const appt = await getAppointmentRich(id);
  if (!appt) notFound();

  async function confirmAction() {
    'use server';
    await updateAppointmentStatus(id, 'confirmed');
    redirect(`/appointments/${id}`);
  }

  async function cancelAction() {
    'use server';
    await updateAppointmentStatus(id, 'cancelled');
    redirect(`/appointments/${id}`);
  }

  return (
    <article className="card-centered">
      <header>
        <div className="spread">
          <h1>Appointment #{appt.id}</h1>
          <mark>{statusLabel[appt.status]}</mark>
        </div>
      </header>

      <dl>
        <dt>Agent</dt>
        <dd>{appt.agentName}</dd>
        <dt>Therapy</dt>
        <dd>{appt.therapyName}</dd>
        <dt>Staff Member</dt>
        <dd>{appt.staffName}</dd>
        <dt>Date &amp; Time</dt>
        <dd>{appt.datetime.replace('T', ' ')}</dd>
      </dl>

      <footer className="button-group">
        {appt.status === 'pending' && (
          <form action={confirmAction} className="inline-form">
            <button type="submit">Confirm</button>
          </form>
        )}
        {appt.status !== 'cancelled' && (
          <form action={cancelAction} className="inline-form">
            <button type="submit" className="contrast">
              Cancel
            </button>
          </form>
        )}
        <Link href="/appointments">← All Appointments</Link>
      </footer>
    </article>
  );
}
