import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'clinic.db');

export const client = createClient({ url: `file:${dbPath}` });
export const db = drizzle(client);

console.log('[db] connected to clinic.db');