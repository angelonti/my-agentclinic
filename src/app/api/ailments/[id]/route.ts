import { NextResponse } from 'next/server';
import { getAilment } from '@/lib/db/ailments';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const ailment = await getAilment(parseInt(params.id));
  if (!ailment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(ailment);
}