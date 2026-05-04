import { NextResponse } from 'next/server';
import { getAgent, updateAgent, deleteAgent } from '@/lib/db/agents';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const agent = await getAgent(parseInt(params.id));
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(agent);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const agent = await updateAgent(parseInt(params.id), body);
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(agent);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteAgent(parseInt(params.id));
  return new NextResponse(null, { status: 204 });
}