'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SAMPLE_JOBS, SAMPLE_PANDITS, sampleForMe } from './seed';
import { roleWeight, splitPayment } from './payments';

/**
 * Pandit Sangh data store.
 * Everything is kept in this browser (localStorage) so the section works before the backend
 * endpoints exist. Each action below maps 1:1 to a future API call (noted in comments), so the
 * swap is local to this file. The current pandit's id is always "me".
 */
const KEY = 'vedicdhaam-pandit-sangh-v1';
export const ME = 'me';

const uid = (prefix) => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const now = () => new Date().toISOString();

const EMPTY = {
  me: null,
  pandits: SAMPLE_PANDITS,
  yajmans: [],
  jobs: SAMPLE_JOBS,
  connections: [],
  messages: [],
  ledger: [],
  endorsements: [],
  notices: [],
};

const PanditContext = createContext(null);

export function PanditStoreProvider({ children }) {
  const [state, setState] = useState(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...EMPTY, ...JSON.parse(raw) });
    } catch {}
    setLoaded(true);
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state, loaded]);

  const update = useCallback((fn) => setState((s) => fn(s)), []);
  const later = useCallback((ms, fn) => timers.current.push(setTimeout(fn, ms)), []);
  const notify = (s, text) => ({ ...s, notices: [{ id: uid('n'), text, at: now(), read: false }, ...s.notices].slice(0, 30) });

  /* ---------- profile (POST/PATCH /pandits/me) ---------- */
  const saveProfile = useCallback(
    (profile, { withSamples = false } = {}) =>
      update((s) => {
        const first = !s.me;
        let next = { ...s, me: { ...(s.me || {}), ...profile, id: ME, updatedAt: now(), createdAt: s.me?.createdAt || now() } };
        if (first && withSamples) {
          const smp = sampleForMe();
          next = {
            ...next,
            yajmans: [...smp.yajmans.map((y) => ({ ...y, ownerId: ME })), ...next.yajmans],
            connections: [...smp.connections, ...next.connections],
            messages: [...smp.messages, ...next.messages],
            jobs: [...smp.jobs, ...next.jobs],
            ledger: [...smp.ledger, ...next.ledger],
          };
        }
        return next;
      }),
    [update]
  );

  /* ---------- yajmans (CRUD /pandits/me/yajmans, POST /yajmans/import) ---------- */
  const saveYajman = useCallback(
    (y) => {
      const id = y.id || uid('y');
      update((s) => {
        const exists = s.yajmans.some((x) => x.id === id);
        const row = { history: [], remediesSent: [], family: [], ancestors: [], traditions: [], tags: [], ...y, id, ownerId: ME, updatedAt: now() };
        return { ...s, yajmans: exists ? s.yajmans.map((x) => (x.id === id ? { ...x, ...row } : x)) : [{ ...row, createdAt: now() }, ...s.yajmans] };
      });
      return id;
    },
    [update]
  );

  const deleteYajman = useCallback((id) => update((s) => ({ ...s, yajmans: s.yajmans.filter((y) => y.id !== id) })), [update]);

  const importYajmans = useCallback(
    (list) =>
      update((s) => {
        const known = new Set(s.yajmans.map((y) => `${y.name.toLowerCase()}|${y.phone}`));
        const fresh = list
          .filter((y) => !known.has(`${y.name.toLowerCase()}|${y.phone}`))
          .map((y) => ({ family: [], history: [], remediesSent: [], tags: [], ved: '', shakha: '', kulPurohit: '', ...y, id: uid('y'), ownerId: ME, createdAt: now() }));
        return notify({ ...s, yajmans: [...fresh, ...s.yajmans] }, { en: `${fresh.length} yajmans imported`, hi: `${fresh.length} यजमान जोड़े गए` });
      }),
    [update]
  );

  const addHistory = useCallback(
    (yajmanId, entry) =>
      update((s) => ({
        ...s,
        yajmans: s.yajmans.map((y) => (y.id === yajmanId ? { ...y, history: [{ id: uid('h'), ...entry }, ...(y.history || [])] } : y)),
      })),
    [update]
  );

  const logRemedySent = useCallback(
    (yajmanId, text, via) =>
      update((s) => ({
        ...s,
        yajmans: s.yajmans.map((y) => (y.id === yajmanId ? { ...y, remediesSent: [{ id: uid('r'), text, via, at: now() }, ...(y.remediesSent || [])] } : y)),
      })),
    [update]
  );

  const markTraditionDone = useCallback(
    (yajmanId, key, date) =>
      update((s) => ({
        ...s,
        yajmans: s.yajmans.map((y) => (y.id === yajmanId ? { ...y, traditions: y.traditions.map((t) => (t.key === key ? { ...t, lastDone: date } : t)) } : y)),
      })),
    [update]
  );

  /* ---------- network (POST /connections, PATCH /connections/:id) ---------- */
  const connect = useCallback(
    (panditId) => {
      const id = uid('c');
      update((s) => ({ ...s, connections: [{ id, from: ME, to: panditId, status: 'pending', at: now() }, ...s.connections] }));
      // Sample pandits accept after a moment so the flow can be tried end to end.
      later(2500, () =>
        update((s) => {
          const p = s.pandits.find((x) => x.id === panditId);
          return notify(
            { ...s, connections: s.connections.map((c) => (c.id === id ? { ...c, status: 'accepted' } : c)) },
            { en: `${p?.name} accepted your connection request`, hi: `${p?.nameHi || p?.name} ने आपका जुड़ने का अनुरोध स्वीकार किया` }
          );
        })
      );
    },
    [update, later]
  );

  const respondConnection = useCallback(
    (id, accept) =>
      update((s) => ({
        ...s,
        connections: accept ? s.connections.map((c) => (c.id === id ? { ...c, status: 'accepted' } : c)) : s.connections.filter((c) => c.id !== id),
      })),
    [update]
  );

  const removeConnection = useCallback((id) => update((s) => ({ ...s, connections: s.connections.filter((c) => c.id !== id) })), [update]);

  const endorse = useCallback(
    (panditId, skill) =>
      update((s) =>
        s.endorsements.some((e) => e.to === panditId && e.skill === skill && e.from === ME)
          ? { ...s, endorsements: s.endorsements.filter((e) => !(e.to === panditId && e.skill === skill && e.from === ME)) }
          : { ...s, endorsements: [...s.endorsements, { from: ME, to: panditId, skill }] }
      ),
    [update]
  );

  /* ---------- messages (POST /messages) ---------- */
  const sendMessage = useCallback(
    (to, text) => {
      update((s) => ({ ...s, messages: [...s.messages, { id: uid('m'), from: ME, to, text, at: now() }] }));
      const replied = state.messages.some((m) => m.from === to && m.auto);
      if (!replied) {
        later(1800, () =>
          update((s) => ({
            ...s,
            messages: [...s.messages, { id: uid('m'), from: to, to: ME, auto: true, text: 'प्रणाम जी 🙏 संदेश मिल गया, थोड़ी देर में उत्तर देता हूँ।', at: now() }],
          }))
        );
      }
    },
    [update, later, state.messages]
  );

  /* ---------- work board (POST /jobs, POST /jobs/:id/apply, PATCH /jobs/:id) ---------- */
  const postJob = useCallback(
    ({ lead, ...job }) => {
      const id = uid('j');
      update((s) => ({
        ...s,
        jobs: [{ ...job, id, postedBy: ME, status: 'open', applicants: [], team: lead ? [{ panditId: ME, role: 'acharya', weight: roleWeight('acharya') }] : [], createdAt: now() }, ...s.jobs],
      }));
      // Two sample pandits show interest so the hiring and split flow can be tried.
      later(3000, () =>
        update((s) => {
          const job = s.jobs.find((j) => j.id === id);
          if (!job || job.status !== 'open') return s;
          const picks = s.pandits.filter((p) => p.specialities.some((sp) => ['karmkand', 'havan', 'path', 'rudra'].includes(sp))).slice(0, 2);
          const applicants = picks.map((p) => ({ panditId: p.id, note: 'Available on this date. 🙏', at: now() }));
          return notify({ ...s, jobs: s.jobs.map((j) => (j.id === id ? { ...j, applicants } : j)) }, { en: `${applicants.length} pandits applied for “${job.title}”`, hi: `“${job.title}” के लिए ${applicants.length} पंडितों ने आवेदन किया` });
        })
      );
      return id;
    },
    [update, later]
  );

  const patchJob = (s, id, fn) => ({ ...s, jobs: s.jobs.map((j) => (j.id === id ? fn(j) : j)) });

  const applyJob = useCallback(
    (jobId, note) => {
      update((s) => patchJob(s, jobId, (j) => ({ ...j, applicants: [...j.applicants.filter((a) => a.panditId !== ME), { panditId: ME, note, at: now() }] })));
      // The sample poster accepts the application.
      later(3500, () =>
        update((s) => {
          const job = s.jobs.find((j) => j.id === jobId);
          if (!job || job.postedBy === ME || job.team.some((m) => m.panditId === ME) || !job.applicants.some((a) => a.panditId === ME)) return s;
          const poster = s.pandits.find((p) => p.id === job.postedBy);
          return notify(
            patchJob(s, jobId, (j) => ({ ...j, applicants: j.applicants.filter((a) => a.panditId !== ME), team: [...j.team, { panditId: ME, role: 'sahayak', weight: roleWeight('sahayak') }] })),
            { en: `${poster?.name} added you to “${job.title}”`, hi: `${poster?.nameHi || poster?.name} ने आपको “${job.title}” में जोड़ा` }
          );
        })
      );
    },
    [update, later]
  );

  const withdrawJob = useCallback((jobId) => update((s) => patchJob(s, jobId, (j) => ({ ...j, applicants: j.applicants.filter((a) => a.panditId !== ME) }))), [update]);

  const hire = useCallback(
    (jobId, panditId, role = 'sahayak') =>
      update((s) =>
        patchJob(s, jobId, (j) => ({
          ...j,
          applicants: j.applicants.filter((a) => a.panditId !== panditId),
          team: j.team.some((m) => m.panditId === panditId) ? j.team : [...j.team, { panditId, role, weight: roleWeight(role) }],
          needed: Math.max(j.needed, j.team.length + (j.team.some((m) => m.panditId === panditId) ? 0 : 1)),
        }))
      ),
    [update]
  );

  const declineApplicant = useCallback((jobId, panditId) => update((s) => patchJob(s, jobId, (j) => ({ ...j, applicants: j.applicants.filter((a) => a.panditId !== panditId) }))), [update]);

  const setTeam = useCallback((jobId, team) => update((s) => patchJob(s, jobId, (j) => ({ ...j, team }))), [update]);

  const setJobStatus = useCallback((jobId, status) => update((s) => patchJob(s, jobId, (j) => ({ ...j, status }))), [update]);

  /** Yajman's dakshina is received by the platform, commission kept, the rest paid out to the team. */
  const releasePayment = useCallback(
    (jobId) =>
      update((s) => {
        const job = s.jobs.find((j) => j.id === jobId);
        if (!job || job.status === 'paid' || !job.team.length) return s;
        const split = splitPayment(job.total, job.team);
        const at = now();
        const entries = [
          { id: uid('l'), jobId, panditId: 'platform', kind: 'commission', amount: split.commission, at },
          ...split.payouts.map((po) => ({ id: uid('l'), jobId, panditId: po.panditId, kind: 'payout', amount: po.amount, at })),
        ];
        return notify({ ...patchJob(s, jobId, (j) => ({ ...j, status: 'paid', paidAt: at })), ledger: [...entries, ...s.ledger] }, { en: `Payment released for “${job.title}”`, hi: `“${job.title}” का भुगतान वितरित हुआ` });
      }),
    [update]
  );

  const deleteJob = useCallback((jobId) => update((s) => ({ ...s, jobs: s.jobs.filter((j) => j.id !== jobId) })), [update]);

  /* ---------- misc ---------- */
  const markNoticesRead = useCallback(() => update((s) => ({ ...s, notices: s.notices.map((n) => ({ ...n, read: true })) })), [update]);
  const resetAll = useCallback(() => setState(EMPTY), []);

  const value = useMemo(() => {
    const panditById = (id) => (id === ME ? state.me : state.pandits.find((p) => p.id === id)) || null;
    const connectionWith = (id) => state.connections.find((c) => (c.from === ME && c.to === id) || (c.to === ME && c.from === id)) || null;
    return {
      ...state,
      loaded,
      myYajmans: state.yajmans.filter((y) => y.ownerId === ME),
      panditById,
      connectionWith,
      saveProfile,
      saveYajman,
      deleteYajman,
      importYajmans,
      addHistory,
      logRemedySent,
      markTraditionDone,
      connect,
      respondConnection,
      removeConnection,
      endorse,
      sendMessage,
      postJob,
      applyJob,
      withdrawJob,
      hire,
      declineApplicant,
      setTeam,
      setJobStatus,
      releasePayment,
      deleteJob,
      markNoticesRead,
      resetAll,
    };
  }, [state, loaded, saveProfile, saveYajman, deleteYajman, importYajmans, addHistory, logRemedySent, markTraditionDone, connect, respondConnection, removeConnection, endorse, sendMessage, postJob, applyJob, withdrawJob, hire, declineApplicant, setTeam, setJobStatus, releasePayment, deleteJob, markNoticesRead, resetAll]);

  return <PanditContext.Provider value={value}>{children}</PanditContext.Provider>;
}

export function usePandit() {
  const ctx = useContext(PanditContext);
  if (!ctx) throw new Error('usePandit must be used inside <PanditStoreProvider>');
  return ctx;
}

/** Display name in the active language. */
export const panditName = (p, lang) => (!p ? '' : lang === 'hi' && p.nameHi ? p.nameHi : p.name);
