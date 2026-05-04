import { client } from '@/db/client';

export async function migrate() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS agents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      model_type TEXT NOT NULL,
      origin_system TEXT NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS ailments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      severity TEXT NOT NULL CHECK(severity IN ('mild', 'moderate', 'severe'))
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS therapies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      duration INTEGER NOT NULL
    )
  `);
}