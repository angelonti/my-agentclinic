import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const agents = sqliteTable('agents', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  modelType: text('model_type').notNull(),
  originSystem: text('origin_system').notNull(),
});

export const ailments = sqliteTable('ailments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  severity: text('severity', { enum: ['mild', 'moderate', 'severe'] }).notNull(),
});

export const therapies = sqliteTable('therapies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  duration: integer('duration').notNull(),
});