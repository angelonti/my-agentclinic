import { NextResponse } from 'next/server';
import { listAppointmentsRich, createAppointment } from '@/lib/db/appointments';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await listAppointmentsRich();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  const agentId = Number(b.agentId);
  const therapyId = Number(b.therapyId);
  const staffId = Number(b.staffId);
  const datetime = typeof b.datetime === 'string' ? b.datetime.trim() : '';
  if (!agentId || !therapyId || !staffId || !datetime || isNaN(agentId) || isNaN(therapyId) || isNaN(staffId)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const appointment = await createAppointment({ agentId, therapyId, staffId, datetime });
  return NextResponse.json(appointment, { status: 201 });
}
