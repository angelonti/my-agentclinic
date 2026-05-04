export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Eagerly start DB setup so migration + seed finish before the first request.
    const { ready } = await import('./src/db/setup');
    await ready;
  }
}
