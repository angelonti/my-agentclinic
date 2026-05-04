import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getAgent, updateAgent } from '@/lib/db/agents';

export default async function EditAgentPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();
  const agent = await getAgent(id);
  if (!agent) notFound();

  async function updateAgentAction(formData: FormData) {
    'use server';
    const name = formData.get('name');
    const modelType = formData.get('modelType');
    const originSystem = formData.get('originSystem');
    if (typeof name !== 'string' || typeof modelType !== 'string' || typeof originSystem !== 'string') {
      return;
    }
    await updateAgent(id, { name: name.trim(), modelType: modelType.trim(), originSystem: originSystem.trim() });
    redirect(`/agents/${id}`);
  }

  return (
    <article className="card-centered">
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
        <div className="button-group">
          <button type="submit">Save Changes</button>
          <Link href={`/agents/${id}`} role="button" className="secondary outline">
            Cancel
          </Link>
        </div>
      </form>
    </article>
  );
}
