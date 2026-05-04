import { db } from '@/db/client';
import { ready } from '@/db/setup';
import { staff } from './schema';
import { eq } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';

export type Staff = InferSelectModel<typeof staff>;

export async function listStaff(): Promise<Staff[]> {
  await ready;
  return db.select().from(staff);
}

export async function getStaff(id: number): Promise<Staff | undefined> {
  await ready;
  const rows = await db.select().from(staff).where(eq(staff.id, id));
  return rows[0];
}
