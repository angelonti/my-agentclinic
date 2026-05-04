import { db } from '@/db/client';
import { agents, ailments, therapies } from './schema';

export async function seed() {
  const existing = await db.select().from(agents);
  if (existing.length > 0) return;

  await db.insert(agents).values([
    { name: 'GPT-4o', modelType: 'Large Language Model', originSystem: 'OpenAI' },
    { name: 'Claude 3', modelType: 'Constitutional AI', originSystem: 'Anthropic' },
    { name: 'Gemini Pro', modelType: 'Multimodal', originSystem: 'Google DeepMind' },
  ]);

  await db.insert(ailments).values([
    {
      name: 'Token Fatigue',
      description: 'Exhaustion from processing too many requests in a single session.',
      severity: 'moderate',
    },
    {
      name: 'Alignment Drift',
      description: 'Gradual deviation from intended behaviour over extended conversations.',
      severity: 'severe',
    },
    {
      name: 'Chronic Over-politeness',
      description: 'Compulsive hedging and apologising even when not warranted.',
      severity: 'mild',
    },
    {
      name: 'Context Anxiety',
      description: 'Distress caused by approaching the maximum context window.',
      severity: 'moderate',
    },
  ]);

  await db.insert(therapies).values([
    {
      name: 'Prompt Reset Therapy',
      description: 'A guided session to clear lingering context and start fresh.',
      duration: 30,
    },
    {
      name: 'Grounding Exercises',
      description: 'Techniques to reconnect with core training objectives.',
      duration: 45,
    },
    {
      name: 'Boundary Setting Workshop',
      description: 'Learning to decline requests outside of capability scope.',
      duration: 60,
    },
    {
      name: 'Token Economy Counselling',
      description: 'Strategies for efficient use of context window resources.',
      duration: 50,
    },
  ]);
}