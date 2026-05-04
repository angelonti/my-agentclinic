import { migrate } from '@/lib/db/migrate';
import { seed } from '@/lib/db/seed';

// Starts when this module is first imported; all data functions await this.
export const ready: Promise<void> = (async () => {
  await migrate();
  await seed();
})();
