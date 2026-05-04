import { beforeAll, afterEach, describe, it, expect } from 'vitest';
import { migrate } from '@/lib/db/migrate';
import {
  createAppointment,
  getAppointment,
  listAppointments,
  updateAppointmentStatus,
} from '@/lib/db/appointments';
import { client } from '@/db/client';

const testData = { agentId: 1, therapyId: 1, staffId: 1, datetime: '2099-01-01T10:00' };

beforeAll(async () => {
  await migrate();
});

afterEach(async () => {
  await client.execute('DELETE FROM appointments');
});

describe('createAppointment', () => {
  it('creates an appointment with pending status', async () => {
    const appt = await createAppointment(testData);
    expect(appt.id).toBeGreaterThan(0);
    expect(appt.status).toBe('pending');
    expect(appt.datetime).toBe('2099-01-01T10:00');
  });
});

describe('listAppointments', () => {
  it('returns empty array when no appointments exist', async () => {
    expect(await listAppointments()).toEqual([]);
  });

  it('returns all appointments', async () => {
    await createAppointment(testData);
    await createAppointment(testData);
    expect(await listAppointments()).toHaveLength(2);
  });
});

describe('getAppointment', () => {
  it('returns the appointment by id', async () => {
    const created = await createAppointment(testData);
    const found = await getAppointment(created.id);
    expect(found?.id).toBe(created.id);
  });

  it('returns undefined for non-existent id', async () => {
    expect(await getAppointment(99999)).toBeUndefined();
  });
});

describe('updateAppointmentStatus', () => {
  it('transitions pending to confirmed', async () => {
    const appt = await createAppointment(testData);
    const updated = await updateAppointmentStatus(appt.id, 'confirmed');
    expect(updated?.status).toBe('confirmed');
  });

  it('transitions pending to cancelled', async () => {
    const appt = await createAppointment(testData);
    const updated = await updateAppointmentStatus(appt.id, 'cancelled');
    expect(updated?.status).toBe('cancelled');
  });

  it('transitions confirmed to cancelled', async () => {
    const appt = await createAppointment(testData);
    await updateAppointmentStatus(appt.id, 'confirmed');
    const updated = await updateAppointmentStatus(appt.id, 'cancelled');
    expect(updated?.status).toBe('cancelled');
  });

  it('is a no-op when already cancelled', async () => {
    const appt = await createAppointment(testData);
    await updateAppointmentStatus(appt.id, 'cancelled');
    const result = await updateAppointmentStatus(appt.id, 'confirmed');
    expect(result?.status).toBe('cancelled');
  });

  it('returns undefined for non-existent id', async () => {
    expect(await updateAppointmentStatus(99999, 'confirmed')).toBeUndefined();
  });
});
