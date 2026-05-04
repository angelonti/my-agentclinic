import { describe, it, expect } from 'vitest';
import { services } from '@/lib/services';

describe('services', () => {
  it('has three services', () => {
    expect(services).toHaveLength(3);
  });

  it('every service has a non-empty title, description, and icon', () => {
    for (const service of services) {
      expect(service.title.trim()).not.toBe('');
      expect(service.description.trim()).not.toBe('');
      expect(service.icon.trim()).not.toBe('');
    }
  });

  it('includes Browse Therapies', () => {
    expect(services.find((s) => s.title === 'Browse Therapies')).toBeDefined();
  });

  it('includes Meet Our Specialists', () => {
    expect(services.find((s) => s.title === 'Meet Our Specialists')).toBeDefined();
  });

  it('includes Book Appointments', () => {
    expect(services.find((s) => s.title === 'Book Appointments')).toBeDefined();
  });
});