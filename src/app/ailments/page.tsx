import { listAilments } from '@/lib/db/ailments';

export const dynamic = 'force-dynamic';

const severityLabel = { mild: 'Mild', moderate: 'Moderate', severe: 'Severe' } as const;

export default async function AilmentsPage() {
  const ailments = await listAilments();

  return (
    <>
      <h1>Ailments</h1>
      <p>Common conditions treated at AgentClinic.</p>

      {ailments.length === 0 ? (
        <p>No ailments listed yet.</p>
      ) : (
        <div className="grid">
          {ailments.map((ailment) => (
            <article key={ailment.id}>
              <header>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{ailment.name}</strong>
                  <mark>{severityLabel[ailment.severity]}</mark>
                </div>
              </header>
              <p>{ailment.description}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}