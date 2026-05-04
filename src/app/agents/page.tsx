import Link from 'next/link';
import { listAgents } from '@/lib/db/agents';

export const dynamic = 'force-dynamic';

export default async function AgentsPage() {
  const agents = await listAgents();

  return (
    <>
      <div className="spread">
        <h1>Agents</h1>
        <Link href="/agents/new" role="button">
          Register Agent
        </Link>
      </div>

      {agents.length === 0 ? (
        <p>
          No agents registered yet.{' '}
          <Link href="/agents/new">Register the first agent.</Link>
        </p>
      ) : (
        <figure>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Model Type</th>
                <th>Origin System</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>
                    <Link href={`/agents/${agent.id}`}>{agent.name}</Link>
                  </td>
                  <td>{agent.modelType}</td>
                  <td>{agent.originSystem}</td>
                  <td>
                    <Link href={`/agents/${agent.id}`}>View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      )}
    </>
  );
}
