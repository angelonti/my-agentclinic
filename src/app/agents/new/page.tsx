import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createAgent } from '@/lib/db/agents';

export default function NewAgentPage() {
  async function createAgentAction(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const modelType = formData.get('modelType') as string;
    const originSystem = formData.get('originSystem') as string;
    await createAgent({ name, modelType, originSystem });
    redirect('/agents');
  }

  return (
    <article style={{ maxWidth: '40rem', margin: '0 auto' }}>
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
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit">Register</button>
          <Link href="/agents" role="button" className="secondary outline">
            Cancel
          </Link>
        </div>
      </form>
    </article>
  );
}