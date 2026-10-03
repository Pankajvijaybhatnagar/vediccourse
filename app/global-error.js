'use client'; // Error boundaries must be Client Components

// Last-resort error UI when the root layout itself fails. Renders its own document,
// so it can't rely on globals.css or providers.
export default function GlobalError({ retry }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#fffdf8', color: '#2a1a0b' }}>
        <title>VedicDhaam: something went wrong</title>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 56, color: '#e88a00' }} aria-hidden="true">
              ॐ
            </div>
            <h1 style={{ margin: '12px 0' }}>Something went wrong · कुछ गड़बड़ हो गई</h1>
            <p style={{ color: '#6d5b45' }}>Please try again in a moment.</p>
            <button
              onClick={() => retry()}
              style={{ marginTop: 16, padding: '12px 28px', borderRadius: 999, border: 0, background: '#ffc21a', fontWeight: 700, cursor: 'pointer' }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
