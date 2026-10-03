'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import useStoredState from '@/lib/useStoredState';

const importedKey = (localKey, userId) => `${localKey}-imported-${userId}`;

/**
 * Private wellbeing journal (mood / gratitude / thought).
 *  - Guest: entries live in localStorage under `localKey` (the tool's existing shape).
 *  - Signed in: entries live in the account via /manobal/journal, so they follow the user across devices.
 *  - After sign-in, local entries can be imported once — only when the user presses the button.
 *
 * @param {'mood'|'gratitude'|'thought'} type
 * @param {string} localKey      localStorage key used by the tool
 * @param {*} initialLocal       default local value
 * @param {(local: any) => Array<{date: string, data: object}>} toEntries  converts local data to API entries (for import)
 */
export default function useJournal(type, localKey, initialLocal, toEntries) {
  const { user, ready: authReady, openSignIn } = useAuth();
  const userId = user?.id;
  const [local, setLocal, localLoaded] = useStoredState(localKey, initialLocal);
  const [entries, setEntries] = useState(null); // API entries [{ id, date, data, ... }] newest first
  const [error, setError] = useState('');
  const [importState, setImportState] = useState('idle'); // idle | importing | done | dismissed
  const [importedFlag, setImportedFlag] = useState(false);

  const synced = Boolean(userId);

  const reload = useCallback(async () => {
    const { data } = await api(`/manobal/journal?type=${type}&limit=100&sort=-date,-createdAt`);
    setEntries(data);
    return data;
  }, [type]);

  useEffect(() => {
    if (!authReady || !userId) {
      setEntries(null);
      return;
    }
    let cancelled = false;
    try {
      setImportedFlag(localStorage.getItem(importedKey(localKey, userId)) === '1');
    } catch {}
    api(`/manobal/journal?type=${type}&limit=100&sort=-date,-createdAt`)
      .then((res) => !cancelled && (setEntries(res.data), setError('')))
      .catch(() => !cancelled && (setEntries([]), setError('load')));
    return () => {
      cancelled = true;
    };
  }, [authReady, userId, type, localKey]);

  /** Create (or, for one-per-day types, upsert) an entry. Returns the saved entry. */
  const save = useCallback(
    async (date, data) => {
      try {
        const { data: saved } = await api('/manobal/journal', { method: 'POST', body: { type, date, data } });
        setEntries((prev) => {
          const list = (prev ?? []).filter((e) => e.id !== saved.id);
          return [saved, ...list].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
        });
        setError('');
        return saved;
      } catch (err) {
        setError('save');
        throw err;
      }
    },
    [type]
  );

  const remove = useCallback(async (id) => {
    const snapshot = entries;
    setEntries((prev) => (prev ?? []).filter((e) => e.id !== id));
    try {
      await api(`/manobal/journal/${id}`, { method: 'DELETE' });
    } catch {
      setEntries(snapshot);
      setError('save');
    }
  }, [entries]);

  const pending = synced && localLoaded && !importedFlag && importState !== 'done' && importState !== 'dismissed' ? toEntries(local) : [];

  const markImported = () => {
    try {
      localStorage.setItem(importedKey(localKey, userId), '1');
    } catch {}
    setImportedFlag(true);
  };

  const importLocal = useCallback(async () => {
    setImportState('importing');
    const items = toEntries(local);
    // Oldest first, so one-per-day types end with the latest local value.
    for (const item of [...items].sort((a, b) => (a.date > b.date ? 1 : -1))) {
      try {
        await api('/manobal/journal', { method: 'POST', body: { type, ...item } });
      } catch {}
    }
    markImported();
    setImportState('done');
    await reload().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local, toEntries, type, reload]);

  // "Not now" hides the prompt for this visit only; it comes back next time.
  const dismissImport = () => setImportState('dismissed');

  return {
    synced,
    ready: authReady && (synced ? entries !== null : localLoaded),
    local,
    setLocal,
    entries: entries ?? [],
    save,
    remove,
    error,
    openSignIn,
    importCount: pending.length,
    importing: importState === 'importing',
    importLocal,
    dismissImport,
  };
}
