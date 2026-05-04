import { db } from '@/db/client';
import { ready } from '@/db/setup';
import { agents } from './schema';
import { eq } from 'drizzle-orm';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export type Agent = InferSelectModel<typeof agents>;
export type NewAgent = Omit<InferInsertModel<typeof agents>, 'id'>;

export async function listAgents(): Promise<Agent[]> {
  await ready;
  return db.select().from(agents);
}

export async function getAgent(id: number): Promise<Agent | undefined> {
  await ready;
  const rows = await db.select().from(agents).where(eq(agents.id, id));
  return rows[0];
}

export async function createAgent(data: NewAgent): Promise<Agent> {
  await ready;
  const rows = await db.insert(agents).values(data).returning();
  return rows[0];
}

export async function updateAgent(id: number, data: Partial<NewAgent>): Promise<Agent | undefined> {
  await ready;
  const rows = await db.update(agents).set(data).where(eq(agents.id, id)).returning();
  return rows[0];
}

export async function deleteAgent(id: number): Promise<void> {
  await ready;
  await db.delete(agents).where(eq(agents.id, id));
}
