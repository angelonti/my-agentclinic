'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <article className="card-centered">
      <header>
        <h1>Something went wrong</h1>
      </header>
      <p>{error.message || 'An unexpected error occurred.'}</p>
      <footer className="button-group">
        <button onClick={reset}>Try again</button>
      </footer>
    </article>
  );
}
