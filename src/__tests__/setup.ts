import { vi } from 'vitest';

// Each test file runs in its own worker with its own module registry,
// so this factory is called once per file, giving each an isolated in-memory DB.
vi.mock('@/db/client', async () => {
  const { createClient } = await import('@libsql/client');
  const { drizzle } = await import('drizzle-orm/libsql');
  const client = createClient({ url: ':memory:' });
  const db = drizzle(client);
  return { db, client };
});

vi.mock('@/db/setup', () => ({ ready: Promise.resolve() }));
