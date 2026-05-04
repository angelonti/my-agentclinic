import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getAgent, deleteAgent } from '@/lib/db/agents';

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();
  const agent = await getAgent(id);
  if (!agent) notFound();

  async function deleteAgentAction() {
    'use server';
    await deleteAgent(id);
    redirect('/agents');
  }

  return (
    <article className="card-centered">
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

      <footer className="button-group">
        <Link href={`/agents/${agent.id}/edit`} role="button" className="secondary">
          Edit
        </Link>
        <form action={deleteAgentAction} className="inline-form">
          <button type="submit" className="contrast">
            Delete
          </button>
        </form>
        <Link href="/agents">← All Agents</Link>
      </footer>
    </article>
  );
}
