import { db } from '@/db/client';
import { ready } from '@/db/setup';
import { appointments, agents, therapies, staff } from './schema';
import { eq, and, gte, ne } from 'drizzle-orm';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export type Appointment = InferSelectModel<typeof appointments>;
export type NewAppointment = Omit<InferInsertModel<typeof appointments>, 'id' | 'status'>;
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export type RichAppointment = {
  id: number;
  datetime: string;
  status: AppointmentStatus;
  agentId: number;
  therapyId: number;
  staffId: number;
  agentName: string;
  therapyName: string;
  staffName: string;
};

const richSelect = {
  id: appointments.id,
  datetime: appointments.datetime,
  status: appointments.status,
  agentId: appointments.agentId,
  therapyId: appointments.therapyId,
  staffId: appointments.staffId,
  agentName: agents.name,
  therapyName: therapies.name,
  staffName: staff.name,
};

function toRich(r: {
  id: number;
  datetime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  agentId: number;
  therapyId: number;
  staffId: number;
  agentName: string | null;
  therapyName: string | null;
  staffName: string | null;
}): RichAppointment {
  return {
    ...r,
    agentName: r.agentName ?? 'Unknown',
    therapyName: r.therapyName ?? 'Unknown',
    staffName: r.staffName ?? 'Unknown',
  };
}

export async function listAppointments(): Promise<Appointment[]> {
  await ready;
  return db.select().from(appointments);
}

export async function listAppointmentsRich(): Promise<RichAppointment[]> {
  await ready;
  const rows = await db
    .select(richSelect)
    .from(appointments)
    .leftJoin(agents, eq(appointments.agentId, agents.id))
    .leftJoin(therapies, eq(appointments.therapyId, therapies.id))
    .leftJoin(staff, eq(appointments.staffId, staff.id));
  return rows.map(toRich);
}

export async function getAppointment(id: number): Promise<Appointment | undefined> {
  await ready;
  const rows = await db.select().from(appointments).where(eq(appointments.id, id));
  return rows[0];
}

export async function getAppointmentRich(id: number): Promise<RichAppointment | undefined> {
  await ready;
  const rows = await db
    .select(richSelect)
    .from(appointments)
    .leftJoin(agents, eq(appointments.agentId, agents.id))
    .leftJoin(therapies, eq(appointments.therapyId, therapies.id))
    .leftJoin(staff, eq(appointments.staffId, staff.id))
    .where(eq(appointments.id, id));
  return rows[0] ? toRich(rows[0]) : undefined;
}

export async function createAppointment(data: NewAppointment): Promise<Appointment> {
  await ready;
  const rows = await db.insert(appointments).values({ ...data, status: 'pending' }).returning();
  return rows[0];
}

export async function updateAppointmentStatus(
  id: number,
  status: AppointmentStatus,
): Promise<Appointment | undefined> {
  await ready;
  const existing = await getAppointment(id);
  if (!existing) return undefined;
  if (existing.status === 'cancelled') return existing;
  const rows = await db.update(appointments).set({ status }).where(eq(appointments.id, id)).returning();
  return rows[0];
}

export async function listUpcomingForStaff(staffId: number): Promise<RichAppointment[]> {
  await ready;
  const now = new Date().toISOString().slice(0, 16);
  const rows = await db
    .select(richSelect)
    .from(appointments)
    .leftJoin(agents, eq(appointments.agentId, agents.id))
    .leftJoin(therapies, eq(appointments.therapyId, therapies.id))
    .leftJoin(staff, eq(appointments.staffId, staff.id))
    .where(
      and(
        eq(appointments.staffId, staffId),
        ne(appointments.status, 'cancelled'),
        gte(appointments.datetime, now),
      ),
    );
  return rows.map(toRich);
}
