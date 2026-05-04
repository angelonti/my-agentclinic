import { NextResponse } from 'next/server';
import { listAgents, createAgent } from '@/lib/db/agents';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await listAgents();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, modelType, originSystem } = body;
  if (!name || !modelType || !originSystem) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const agent = await createAgent({ name, modelType, originSystem });
  return NextResponse.json(agent, { status: 201 });
}