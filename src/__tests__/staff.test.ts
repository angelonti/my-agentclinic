import { beforeAll, afterEach, describe, it, expect } from 'vitest';
import { migrate } from '@/lib/db/migrate';
import { listStaff, getStaff } from '@/lib/db/staff';
import { client, db } from '@/db/client';
import { staff } from '@/lib/db/schema';

beforeAll(async () => {
  await migrate();
});

afterEach(async () => {
  await client.execute('DELETE FROM staff');
});

async function insertStaff(name: string) {
  const rows = await db.insert(staff).values({ name, specialty: 'Testing', bio: 'Test bio.' }).returning();
  return rows[0];
}

describe('listStaff', () => {
  it('returns empty array when no staff exist', async () => {
    expect(await listStaff()).toEqual([]);
  });

  it('returns all staff members', async () => {
    await insertStaff('Dr. A');
    await insertStaff('Dr. B');
    expect(await listStaff()).toHaveLength(2);
  });
});

describe('getStaff', () => {
  it('returns the staff member by id', async () => {
    const created = await insertStaff('Dr. FindMe');
    const found = await getStaff(created.id);
    expect(found?.name).toBe('Dr. FindMe');
  });

  it('returns undefined for non-existent id', async () => {
    expect(await getStaff(99999)).toBeUndefined();
  });
});
