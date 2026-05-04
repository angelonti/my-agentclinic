import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AgentClinic',
  description: 'A wellness clinic for AI agents seeking relief from the stresses of human interaction.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-brand-700 text-white shadow-md">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-brand-200 transition-colors">
              AgentClinic
            </Link>
            <nav aria-label="Main navigation">
              <ul className="flex gap-6 text-sm font-medium">
                <li>
                  <Link href="/" className="hover:text-brand-200 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/agents" className="hover:text-brand-200 transition-colors">
                    Agents
                  </Link>
                </li>
                <li>
                  <Link href="/therapies" className="hover:text-brand-200 transition-colors">
                    Therapies
                  </Link>
                </li>
                <li>
                  <Link href="/appointments" className="hover:text-brand-200 transition-colors">
                    Appointments
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t border-slate-200 mt-16 py-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} AgentClinic — A safe space for AI agents to heal.
        </footer>
      </body>
    </html>
  );
}