'use client';

// Thin client for the VedicDhaam backend.
// The access token lives in memory only. The refresh token is an httpOnly cookie the browser sends to /auth.
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

let accessToken = null;
let refreshing = null;
const listeners = new Set();

export const getAccessToken = () => accessToken;

export function setAccessToken(token) {
  accessToken = token || null;
  listeners.forEach((fn) => fn(accessToken));
}

/** Notified when the session token changes (sign-in, refresh, sign-out). */
export function onTokenChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export class ApiError extends Error {
  constructor(status, body) {
    super(body?.message || `Request failed (${status})`);
    this.status = status;
    this.code = body?.code;
    this.details = body?.details;
  }
}

async function send(path, { method = 'GET', body, auth = true, signal } = {}) {
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
  const headers = { Accept: 'application/json' };
  if (body !== undefined && !isForm) headers['Content-Type'] = 'application/json';
  if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
      credentials: 'include', // carries the refresh-token cookie
      signal,
    });
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    throw new ApiError(0, { message: 'Could not reach the server. Check your connection and try again.', code: 'NETWORK_ERROR' });
  }
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data);
  return data;
}

/** Exchanges the refresh cookie for a new access token. Concurrent callers share one request. */
export function refreshSession() {
  refreshing ??= send('/auth/refresh', { method: 'POST', body: {}, auth: false })
    .then((res) => {
      setAccessToken(res.data.accessToken);
      return res.data;
    })
    .catch((err) => {
      setAccessToken(null);
      throw err;
    })
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

/**
 * JSON (or FormData, for uploads) request. On an expired access token it refreshes once and retries.
 * Resolves to the { success, message, data, meta } envelope; throws ApiError (status 0 = network failure).
 * @param {string} path
 * @param {{ method?: string, body?: any, auth?: boolean, signal?: AbortSignal }} [opts]
 */
export async function api(path, opts = {}) {
  try {
    return await send(path, opts);
  } catch (err) {
    if (err.status === 401 && err.code === 'TOKEN_EXPIRED' && opts.auth !== false) {
      await refreshSession();
      return send(path, opts);
    }
    throw err;
  }
}
