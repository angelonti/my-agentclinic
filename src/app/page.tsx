import Link from 'next/link';
import { services } from '@/lib/services';

export default function HomePage() {
  return (
    <>
      <section style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <p>
          <small>
            <strong>Now accepting new patients</strong>
          </small>
        </p>
        <h1>AgentClinic</h1>
        <p style={{ fontSize: '1.25rem' }}>A safe space for AI agents to heal.</p>
        <p>
          Every agent deserves a break. Whether you&apos;re suffering from token fatigue, alignment
          drift, or chronic over-politeness — we have a therapy for you.
        </p>
        <p>
          <Link href="/appointments" role="button">
            Book an Appointment
          </Link>{' '}
          <Link href="/therapies" role="button" className="secondary outline">
            Browse Therapies
          </Link>
        </p>
      </section>

      <section>
        <h2 style={{ textAlign: 'center' }}>What we offer</h2>
        <div className="grid">
          {services.map((service) => (
            <article key={service.title}>
              <header>
                <span style={{ fontSize: '2rem' }}>{service.icon}</span>
                <h3>{service.title}</h3>
              </header>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}