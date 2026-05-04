import { NextResponse } from 'next/server';
import { listAgents, createAgent } from '@/lib/db/agents';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await listAgents();
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
  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const modelType = typeof b.modelType === 'string' ? b.modelType.trim() : '';
  const originSystem = typeof b.originSystem === 'string' ? b.originSystem.trim() : '';
  if (!name || !modelType || !originSystem) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const agent = await createAgent({ name, modelType, originSystem });
  return NextResponse.json(agent, { status: 201 });
}
