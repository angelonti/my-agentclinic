import { NextResponse } from 'next/server';
import { listStaff } from '@/lib/db/staff';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await listStaff();
  return NextResponse.json(data);
}
