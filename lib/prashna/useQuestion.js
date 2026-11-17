'use client';

import useStoredState from '../useStoredState';

/** The visitor's current question, shared across every Prashna method page (this device only). */
export default function useQuestion() {
  const [q, setQ, loaded] = useStoredState('vedicdhaam-prashna', { text: '', category: 'general' });
  return {
    text: q?.text || '',
    category: q?.category || 'general',
    loaded,
    setText: (text) => setQ((prev) => ({ ...prev, text })),
    setCategory: (category) => setQ((prev) => ({ ...prev, category })),
  };
}
