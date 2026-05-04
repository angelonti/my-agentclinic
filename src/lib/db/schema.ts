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

export const staff = sqliteTable('staff', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  specialty: text('specialty').notNull(),
  bio: text('bio').notNull(),
});

export const appointments = sqliteTable('appointments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  agentId: integer('agent_id').notNull(),
  therapyId: integer('therapy_id').notNull(),
  staffId: integer('staff_id').notNull(),
  datetime: text('datetime').notNull(),
  status: text('status', { enum: ['pending', 'confirmed', 'cancelled'] }).notNull().default('pending'),
});