'use client';

// Loads a third-party SDK once per page (deduplicated by id). Resolves when the script has executed.
const pending = new Map();

export function loadScript(src, id, attrs = {}) {
  if (typeof window === 'undefined') return Promise.reject(new Error('loadScript is browser-only'));
  if (pending.has(id)) return pending.get(id);

  const promise = new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing?.dataset.loaded === 'true') return resolve();

    const script = existing || document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v));
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => {
      pending.delete(id);
      script.remove();
      reject(new Error(`Failed to load ${src}`));
    };
    if (!existing) document.head.appendChild(script);
  });

  pending.set(id, promise);
  return promise;
}

/** Random URL-safe nonce for social sign-in replay protection. */
export function makeNonce(bytes = 16) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}
