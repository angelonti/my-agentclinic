import Link from 'next/link';
import { navLinks } from '@/lib/navigation';

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <strong>
              <Link href="/">AgentClinic</Link>
            </strong>
          </li>
        </ul>
        <ul>
          {navLinks
            .filter((l) => l.href !== '/')
            .map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}