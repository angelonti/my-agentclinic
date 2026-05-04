import Link from 'next/link';
import { redirect } from 'next/navigation';
import { listAgents } from '@/lib/db/agents';
import { listTherapies } from '@/lib/db/therapies';
import { listStaff } from '@/lib/db/staff';
import { createAppointment } from '@/lib/db/appointments';

export default async function NewAppointmentPage() {
  const [agents, therapies, staffMembers] = await Promise.all([listAgents(), listTherapies(), listStaff()]);

  async function createAppointmentAction(formData: FormData) {
    'use server';
    const agentId = parseInt(formData.get('agentId') as string, 10);
    const therapyId = parseInt(formData.get('therapyId') as string, 10);
    const staffId = parseInt(formData.get('staffId') as string, 10);
    const datetime = (formData.get('datetime') as string) ?? '';
    if (!agentId || !therapyId || !staffId || !datetime) return;
    const appt = await createAppointment({ agentId, therapyId, staffId, datetime });
    redirect(`/appointments/${appt.id}`);
  }

  return (
    <article className="card-centered">
      <header>
        <h1>Book Appointment</h1>
      </header>
      <form action={createAppointmentAction}>
        <label>
          Agent
          <select name="agentId" required defaultValue="">
            <option value="" disabled>
              Select an agent…
            </option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Therapy
          <select name="therapyId" required defaultValue="">
            <option value="" disabled>
              Select a therapy…
            </option>
            {therapies.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.duration} min)
              </option>
            ))}
          </select>
        </label>
        <label>
          Staff Member
          <select name="staffId" required defaultValue="">
            <option value="" disabled>
              Select a staff member…
            </option>
            {staffMembers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.specialty}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date &amp; Time
          <input type="datetime-local" name="datetime" required />
        </label>
        <div className="button-group">
          <button type="submit">Book Appointment</button>
          <Link href="/appointments" role="button" className="secondary outline">
            Cancel
          </Link>
        </div>
      </form>
    </article>
  );
}
