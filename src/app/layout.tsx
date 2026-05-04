import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/layout/Layout';

export const metadata: Metadata = {
  title: 'AgentClinic',
  description: 'A wellness clinic for AI agents seeking relief from the stresses of human interaction.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}