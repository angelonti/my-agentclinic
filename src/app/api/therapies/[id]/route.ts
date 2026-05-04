import { NextResponse } from 'next/server';
import { getTherapy } from '@/lib/db/therapies';

export const dynamic = 'force-dynamic';

function parseId(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const id = parseInt(raw, 10);
  return id > 0 ? id : null;
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  const therapy = await getTherapy(id);
  if (!therapy) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(therapy);
}
