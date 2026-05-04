import { db } from '@/db/client';
import { ready } from '@/db/setup';
import { ailments } from './schema';
import { eq } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';

export type Ailment = InferSelectModel<typeof ailments>;

export async function listAilments(): Promise<Ailment[]> {
  await ready;
  return db.select().from(ailments);
}

export async function getAilment(id: number): Promise<Ailment | undefined> {
  await ready;
  const rows = await db.select().from(ailments).where(eq(ailments.id, id));
  return rows[0];
}
