import { NextResponse } from 'next/server';
import { listTherapies } from '@/lib/db/therapies';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await listTherapies();
  return NextResponse.json(data);
}