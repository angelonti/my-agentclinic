import { NextResponse } from 'next/server';
import { getAppointmentRich, updateAppointmentStatus } from '@/lib/db/appointments';
import type { AppointmentStatus } from '@/lib/db/appointments';

export const dynamic = 'force-dynamic';

function parseId(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const id = parseInt(raw, 10);
  return id > 0 ? id : null;
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  const appointment = await getAppointmentRich(id);
  if (!appointment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(appointment);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  const validStatuses: AppointmentStatus[] = ['pending', 'confirmed', 'cancelled'];
  if (!validStatuses.includes(b.status as AppointmentStatus)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const appointment = await updateAppointmentStatus(id, b.status as AppointmentStatus);
  if (!appointment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(appointment);
}
