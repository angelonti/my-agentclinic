import { vi, beforeAll, afterEach, describe, it, expect } from 'vitest';

vi.mock('@/db/client', async () => {
  const { createClient } = await import('@libsql/client');
  const { drizzle } = await import('drizzle-orm/libsql');
  const client = createClient({ url: ':memory:' });
  const db = drizzle(client);
  return { db, client };
});

vi.mock('@/db/setup', () => ({ ready: Promise.resolve() }));

import { migrate } from '@/lib/db/migrate';
import { listTherapies, getTherapy } from '@/lib/db/therapies';
import { db } from '@/db/client';
import { therapies } from '@/lib/db/schema';
import { client } from '@/db/client';

beforeAll(async () => {
  await migrate();
});

afterEach(async () => {
  await client.execute('DELETE FROM therapies');
});

async function insertTherapy(overrides = {}) {
  return db
    .insert(therapies)
    .values({
      name: 'Test Therapy',
      description: 'A test therapy.',
      duration: 30,
      ...overrides,
    })
    .returning()
    .then((r) => r[0]);
}

describe('listTherapies', () => {
  it('returns empty array when no therapies exist', async () => {
    expect(await listTherapies()).toEqual([]);
  });

  it('returns all therapies', async () => {
    await insertTherapy({ name: 'Therapy A' });
    await insertTherapy({ name: 'Therapy B' });
    expect(await listTherapies()).toHaveLength(2);
  });
});

describe('getTherapy', () => {
  it('returns the therapy by id', async () => {
    const inserted = await insertTherapy({ name: 'Specific Therapy' });
    const found = await getTherapy(inserted.id);
    expect(found?.name).toBe('Specific Therapy');
  });

  it('returns undefined for non-existent id', async () => {
    expect(await getTherapy(99999)).toBeUndefined();
  });
});