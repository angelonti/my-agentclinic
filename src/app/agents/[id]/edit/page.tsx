import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getAgent, updateAgent } from '@/lib/db/agents';

export default async function EditAgentPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const agent = await getAgent(id);
  if (!agent) notFound();

  async function updateAgentAction(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const modelType = formData.get('modelType') as string;
    const originSystem = formData.get('originSystem') as string;
    await updateAgent(id, { name, modelType, originSystem });
    redirect(`/agents/${id}`);
  }

  return (
    <article style={{ maxWidth: '40rem', margin: '0 auto' }}>
      <header>
        <h1>Edit Agent</h1>
      </header>
      <form action={updateAgentAction}>
        <label>
          Name
          <input name="name" required defaultValue={agent.name} />
        </label>
        <label>
          Model Type
          <input name="modelType" required defaultValue={agent.modelType} />
        </label>
        <label>
          Origin System
          <input name="originSystem" required defaultValue={agent.originSystem} />
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit">Save Changes</button>
          <Link href={`/agents/${id}`} role="button" className="secondary outline">
            Cancel
          </Link>
        </div>
      </form>
    </article>
  );
}