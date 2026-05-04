import Link from 'next/link';
import { listStaff } from '@/lib/db/staff';

export const dynamic = 'force-dynamic';

export default async function StaffPage() {
  const members = await listStaff();

  return (
    <>
      <h1>Staff</h1>
      <p>Meet the AgentClinic team.</p>

      {members.length === 0 ? (
        <p>No staff members on record yet.</p>
      ) : (
        <div className="grid">
          {members.map((member) => (
            <article key={member.id}>
              <header>
                <div className="spread">
                  <strong>
                    <Link href={`/staff/${member.id}`}>{member.name}</Link>
                  </strong>
                  <mark>{member.specialty}</mark>
                </div>
              </header>
              <p>{member.bio}</p>
              <footer>
                <Link href={`/staff/${member.id}`}>View dashboard →</Link>
              </footer>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
