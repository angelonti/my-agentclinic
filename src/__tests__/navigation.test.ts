import { describe, it, expect } from 'vitest';
import { navLinks } from '@/lib/navigation';

describe('navLinks', () => {
  it('is not empty', () => {
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('includes a Home link pointing to /', () => {
    const home = navLinks.find((l) => l.href === '/');
    expect(home).toBeDefined();
    expect(home?.label).toBe('Home');
  });

  it('every link has a non-empty href and label', () => {
    for (const link of navLinks) {
      expect(link.href.trim()).not.toBe('');
      expect(link.label.trim()).not.toBe('');
    }
  });

  it('every href starts with /', () => {
    for (const link of navLinks) {
      expect(link.href).toMatch(/^\//);
    }
  });

  it('has no duplicate hrefs', () => {
    const hrefs = navLinks.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});