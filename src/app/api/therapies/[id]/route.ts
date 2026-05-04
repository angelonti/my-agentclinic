import { NextResponse } from 'next/server';
import { getTherapy } from '@/lib/db/therapies';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const therapy = await getTherapy(parseInt(params.id));
  if (!therapy) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(therapy);
}