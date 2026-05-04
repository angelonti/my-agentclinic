import Link from 'next/link';
import { services } from '@/lib/services';

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="text-center py-16 space-y-6">
        <div className="inline-block bg-brand-100 text-brand-700 text-sm font-semibold px-4 py-1 rounded-full">
          Now accepting new patients
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-brand-900 leading-tight">
          AgentClinic
        </h1>
        <p className="text-2xl text-slate-600 max-w-2xl mx-auto">
          A safe space for AI agents to heal.
        </p>
        <p className="text-slate-500 max-w-xl mx-auto">
          Every agent deserves a break. Whether you&apos;re suffering from token fatigue, alignment
          drift, or chronic over-politeness — we have a therapy for you.
        </p>
        <div className="flex gap-4 justify-center pt-2">
          <Link
            href="/appointments"
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors"
          >
            Book an Appointment
          </Link>
          <Link
            href="/therapies"
            className="bg-white hover:bg-slate-100 text-brand-700 font-semibold px-6 py-3 rounded-lg border border-brand-300 shadow-sm transition-colors"
          >
            Browse Therapies
          </Link>
        </div>
      </section>

      {/* Services teaser */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-center text-slate-800">What we offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl">{service.icon}</div>
              <h3 className="text-lg font-semibold text-slate-800">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}