import { NextResponse } from 'next/server';
import { listAilments } from '@/lib/db/ailments';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await listAilments();
  return NextResponse.json(data);
}