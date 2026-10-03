'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';

/**
 * Client-side API read with loading / error / retry, cancelling stale requests.
 * Pass `null` as path to skip (e.g. while inputs are incomplete).
 *
 * @param {string|null} path
 * @param {{ method?: string, body?: any, keepPrevious?: boolean }} [opts]
 * @returns {{ data: any, meta: any, loading: boolean, error: import('@/lib/api').ApiError|null, retry: () => void }}
 */
export default function useApiQuery(path, { method = 'GET', body, keepPrevious = true } = {}) {
  const [state, setState] = useState({ data: null, meta: null, loading: Boolean(path), error: null });
  const [attempt, setAttempt] = useState(0);
  const bodyKey = body === undefined ? '' : JSON.stringify(body);
  const bodyRef = useRef(body);
  bodyRef.current = body;

  useEffect(() => {
    if (!path) {
      setState({ data: null, meta: null, loading: false, error: null });
      return;
    }
    const ctrl = new AbortController();
    setState((s) => ({ data: keepPrevious ? s.data : null, meta: keepPrevious ? s.meta : null, loading: true, error: null }));
    api(path, { method, body: bodyRef.current, signal: ctrl.signal })
      .then((res) => setState({ data: res.data, meta: res.meta ?? null, loading: false, error: null }))
      .catch((error) => {
        if (error?.name === 'AbortError') return;
        setState((s) => ({ ...s, loading: false, error }));
      });
    return () => ctrl.abort();
  }, [path, method, bodyKey, attempt, keepPrevious]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}

/** Today's date in the visitor's own timezone, as YYYY-MM-DD. */
export function localISODate(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
