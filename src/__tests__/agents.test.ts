import { beforeAll, afterEach, describe, it, expect } from 'vitest';
import { migrate } from '@/lib/db/migrate';
import { listAgents, getAgent, createAgent, updateAgent, deleteAgent } from '@/lib/db/agents';
import { client } from '@/db/client';

beforeAll(async () => {
  await migrate();
});

afterEach(async () => {
  await client.execute('DELETE FROM agents');
});

describe('listAgents', () => {
  it('returns empty array when no agents exist', async () => {
    expect(await listAgents()).toEqual([]);
  });

  it('returns all created agents', async () => {
    await createAgent({ name: 'A', modelType: 'LLM', originSystem: 'X' });
    await createAgent({ name: 'B', modelType: 'LLM', originSystem: 'X' });
    expect(await listAgents()).toHaveLength(2);
  });
});

describe('getAgent', () => {
  it('returns the agent by id', async () => {
    const created = await createAgent({ name: 'FindMe', modelType: 'LLM', originSystem: 'X' });
    const found = await getAgent(created.id);
    expect(found?.name).toBe('FindMe');
  });

  it('returns undefined for non-existent id', async () => {
    expect(await getAgent(99999)).toBeUndefined();
  });
});

describe('createAgent', () => {
  it('persists an agent and returns it with an id', async () => {
    const agent = await createAgent({ name: 'NewBot', modelType: 'LLM', originSystem: 'Test' });
    expect(agent.id).toBeGreaterThan(0);
    expect(agent.name).toBe('NewBot');
    expect(agent.modelType).toBe('LLM');
    expect(agent.originSystem).toBe('Test');
  });
});

describe('updateAgent', () => {
  it('updates a single field, leaving others unchanged', async () => {
    const agent = await createAgent({ name: 'Old', modelType: 'LLM', originSystem: 'X' });
    const updated = await updateAgent(agent.id, { name: 'New' });
    expect(updated?.name).toBe('New');
    expect(updated?.modelType).toBe('LLM');
    expect(updated?.originSystem).toBe('X');
  });

  it('updates multiple fields at once', async () => {
    const agent = await createAgent({ name: 'Old', modelType: 'LLM', originSystem: 'X' });
    const updated = await updateAgent(agent.id, { name: 'New', modelType: 'SLM' });
    expect(updated?.name).toBe('New');
    expect(updated?.modelType).toBe('SLM');
  });

  it('returns undefined for non-existent id', async () => {
    expect(await updateAgent(99999, { name: 'Ghost' })).toBeUndefined();
  });
});

describe('deleteAgent', () => {
  it('removes the agent', async () => {
    const agent = await createAgent({ name: 'ToDelete', modelType: 'LLM', originSystem: 'X' });
    await deleteAgent(agent.id);
    expect(await getAgent(agent.id)).toBeUndefined();
  });

  it('is a no-op for non-existent id', async () => {
    await expect(deleteAgent(99999)).resolves.toBeUndefined();
  });
});
