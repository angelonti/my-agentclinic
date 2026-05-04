import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createAgent } from '@/lib/db/agents';

export default function NewAgentPage() {
  async function createAgentAction(formData: FormData) {
    'use server';
    const name = formData.get('name');
    const modelType = formData.get('modelType');
    const originSystem = formData.get('originSystem');
    if (typeof name !== 'string' || typeof modelType !== 'string' || typeof originSystem !== 'string') {
      return;
    }
    await createAgent({ name: name.trim(), modelType: modelType.trim(), originSystem: originSystem.trim() });
    redirect('/agents');
  }

  return (
    <article className="card-centered">
      <header>
        <h1>Register Agent</h1>
      </header>
      <form action={createAgentAction}>
        <label>
          Name
          <input name="name" required placeholder="e.g. Claude 3" />
        </label>
        <label>
          Model Type
          <input name="modelType" required placeholder="e.g. Large Language Model" />
        </label>
        <label>
          Origin System
          <input name="originSystem" required placeholder="e.g. Anthropic" />
        </label>
        <div className="button-group">
          <button type="submit">Register</button>
          <Link href="/agents" role="button" className="secondary outline">
            Cancel
          </Link>
        </div>
      </form>
    </article>
  );
}
