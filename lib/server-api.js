// Server-side data access for Server Components (pages, layouts, generateMetadata).
// Uses Next's fetch cache with time-based revalidation (ISR), so pages stay fast while
// content edited in the backend shows up within `revalidate` seconds.

const BASE = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

export class ServerApiError extends Error {
  constructor(status, body, path) {
    super(body?.message || `API ${status} for ${path}`);
    this.status = status;
    this.code = body?.code;
  }
}

/**
 * GET a backend resource. Resolves to the envelope `{ data, meta }`, or `null` on 404
 * so callers can `notFound()`. Other failures throw (rendered by the nearest error.js).
 *
 * @param {string} path  e.g. '/poojas?limit=100'
 * @param {{ revalidate?: number|false, tags?: string[] }} [opts]  revalidate: seconds (default 300); false = cache until redeploy
 */
export async function apiGet(path, { revalidate = 300, tags } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate, ...(tags && { tags }) },
    });
  } catch (err) {
    throw new ServerApiError(503, { message: `Backend unreachable at ${BASE} (${err.message})` }, path);
  }
  if (res.status === 404) return null;
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new ServerApiError(res.status, body, path);
  return { data: body.data, meta: body.meta };
}

/** Fetches every page of a paginated list (for small collections such as lessons or poojas). */
export async function apiGetAll(path, opts) {
  const sep = path.includes('?') ? '&' : '?';
  const first = await apiGet(`${path}${sep}limit=100&page=1`, opts);
  if (!first) return [];
  const items = [...first.data];
  for (let page = 2; page <= (first.meta?.totalPages ?? 1); page++) {
    const next = await apiGet(`${path}${sep}limit=100&page=${page}`, opts);
    items.push(...(next?.data ?? []));
  }
  return items;
}
