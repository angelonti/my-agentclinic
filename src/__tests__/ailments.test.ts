import { beforeAll, afterEach, describe, it, expect } from 'vitest';
import { migrate } from '@/lib/db/migrate';
import { listAilments, getAilment } from '@/lib/db/ailments';
import { db } from '@/db/client';
import { ailments } from '@/lib/db/schema';
import { client } from '@/db/client';

beforeAll(async () => {
  await migrate();
});

afterEach(async () => {
  await client.execute('DELETE FROM ailments');
});

async function insertAilment(overrides = {}) {
  return db
    .insert(ailments)
    .values({
      name: 'Test Ailment',
      description: 'A test ailment.',
      severity: 'mild',
      ...overrides,
    })
    .returning()
    .then((r) => r[0]);
}

describe('listAilments', () => {
  it('returns empty array when no ailments exist', async () => {
    expect(await listAilments()).toEqual([]);
  });

  it('returns all ailments', async () => {
    await insertAilment({ name: 'Ailment A' });
    await insertAilment({ name: 'Ailment B' });
    expect(await listAilments()).toHaveLength(2);
  });
});

describe('getAilment', () => {
  it('returns the ailment by id', async () => {
    const inserted = await insertAilment({ name: 'Specific Ailment' });
    const found = await getAilment(inserted.id);
    expect(found?.name).toBe('Specific Ailment');
  });

  it('returns undefined for non-existent id', async () => {
    expect(await getAilment(99999)).toBeUndefined();
  });
});
