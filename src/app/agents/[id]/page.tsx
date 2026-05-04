import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getAgent, deleteAgent } from '@/lib/db/agents';

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const agent = await getAgent(id);
  if (!agent) notFound();

  async function deleteAgentAction() {
    'use server';
    await deleteAgent(id);
    redirect('/agents');
  }

  return (
    <article style={{ maxWidth: '40rem', margin: '0 auto' }}>
      <header>
        <h1>{agent.name}</h1>
        <p>
          <small>
            {agent.modelType} · {agent.originSystem}
          </small>
        </p>
      </header>

      <dl>
        <dt>Model Type</dt>
        <dd>{agent.modelType}</dd>
        <dt>Origin System</dt>
        <dd>{agent.originSystem}</dd>
      </dl>

      <footer style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link href={`/agents/${agent.id}/edit`} role="button" className="secondary">
          Edit
        </Link>
        <form action={deleteAgentAction} style={{ display: 'inline' }}>
          <button type="submit" className="contrast">
            Delete
          </button>
        </form>
        <Link href="/agents">← All Agents</Link>
      </footer>
    </article>
  );
}