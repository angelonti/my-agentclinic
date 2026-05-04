import { NextResponse } from 'next/server';
import { getAgent, updateAgent, deleteAgent } from '@/lib/db/agents';

export const dynamic = 'force-dynamic';

function parseId(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const id = parseInt(raw, 10);
  return id > 0 ? id : null;
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  const agent = await getAgent(id);
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(agent);
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
  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const modelType = typeof b.modelType === 'string' ? b.modelType.trim() : '';
  const originSystem = typeof b.originSystem === 'string' ? b.originSystem.trim() : '';
  if (!name || !modelType || !originSystem) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const agent = await updateAgent(id, { name, modelType, originSystem });
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(agent);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  await deleteAgent(id);
  return new NextResponse(null, { status: 204 });
}
