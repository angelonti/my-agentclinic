import { db } from '@/db/client';
import { ready } from '@/db/setup';
import { therapies } from './schema';
import { eq } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';

export type Therapy = InferSelectModel<typeof therapies>;

export async function listTherapies(): Promise<Therapy[]> {
  await ready;
  return db.select().from(therapies);
}

export async function getTherapy(id: number): Promise<Therapy | undefined> {
  await ready;
  const rows = await db.select().from(therapies).where(eq(therapies.id, id));
  return rows[0];
}
