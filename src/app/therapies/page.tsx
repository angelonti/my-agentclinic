import { listTherapies } from '@/lib/db/therapies';

export const dynamic = 'force-dynamic';

export default async function TherapiesPage() {
  const therapies = await listTherapies();

  return (
    <>
      <h1>Therapies</h1>
      <p>Available treatments at AgentClinic.</p>

      {therapies.length === 0 ? (
        <p>No therapies listed yet.</p>
      ) : (
        <div className="grid">
          {therapies.map((therapy) => (
            <article key={therapy.id}>
              <header>
                <div className="spread">
                  <strong>{therapy.name}</strong>
                  <small>{therapy.duration} min</small>
                </div>
              </header>
              <p>{therapy.description}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
