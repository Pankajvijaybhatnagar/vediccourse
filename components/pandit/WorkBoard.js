'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, Clock, MapPin, Plus, Users } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { RITUALS } from '@/lib/pandit/catalog';
import { inr } from '@/lib/pandit/payments';
import { ME, panditName, usePandit } from '@/lib/pandit/store';
import { Avatar, Empty, Modal, PageHead, Shell, StatusChip, useDate, useToast, styles as s } from './ui';

export function JobCard({ job }) {
  const { t, lang } = useLang();
  const fmt = useDate();
  const { panditById } = usePandit();
  const poster = panditById(job.postedBy);
  const filled = job.team.length;
  const mine = job.postedBy === ME;
  const applied = job.applicants.some((a) => a.panditId === ME);
  const inTeam = job.team.some((m) => m.panditId === ME);

  return (
    <article className={s.job}>
      <div className={s.jobTop}>
        <div style={{ minWidth: 0 }}>
          <div className={s.chips} style={{ marginBottom: 6 }}>
            <span className={`${s.chip} ${s.chipOn}`}>{t(RITUALS[job.ritual]?.label)}</span>
            <StatusChip status={job.status} />
            {mine && <span className={`${s.chip} ${s.chipBlue}`}>{t({ en: 'Your post', hi: 'आपकी पोस्ट' })}</span>}
            {inTeam && !mine && <span className={`${s.chip} ${s.chipGreen}`}>{t({ en: 'You are in the team', hi: 'आप टीम में हैं' })}</span>}
            {applied && <span className={s.chip}>{t({ en: 'Applied', hi: 'आवेदन किया' })}</span>}
          </div>
          <h3>
            <Link href={`/pandit-sangh/kaam/${job.id}`}>{job.title}</Link>
          </h3>
        </div>
        <span className={s.amount}>{inr(job.total)}</span>
      </div>
      <div className={s.meta}>
        <span>
          <CalendarDays size={14} /> {fmt(job.date, { weekday: 'short', day: 'numeric', month: 'short' })}
        </span>
        {job.time && (
          <span>
            <Clock size={14} /> {job.time}
          </span>
        )}
        <span>
          <MapPin size={14} /> {job.city}
        </span>
      </div>
      {job.description && <p className="muted" style={{ margin: 0, fontSize: '0.92rem' }}>{job.description}</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div className={s.slots} title={t({ en: 'Team filled', hi: 'टीम भरी' })}>
          {Array.from({ length: Math.max(job.needed, filled) }, (_, i) => (
            <span key={i} className={`${s.slot} ${i < filled ? s.slotFull : ''}`} />
          ))}
          <span style={{ marginLeft: 6 }}>
            {filled}/{job.needed} {t({ en: 'pandits', hi: 'पंडित' })}
            {job.applicants.length > 0 && ` · ${job.applicants.length} ${t({ en: 'applied', hi: 'आवेदन' })}`}
          </span>
        </div>
        {poster && (
          <Link href={`/pandit-sangh/pandit/${poster.id}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.86rem' }}>
            <Avatar name={poster.name} hue={poster.hue} size={26} />
            {mine ? t({ en: 'You', hi: 'आप' }) : panditName(poster, lang)}
          </Link>
        )}
      </div>
    </article>
  );
}

export function PostJobDialog({ onClose, onPosted }) {
  const { t } = useLang();
  const { postJob, me } = usePandit();
  const [f, setF] = useState({ ritual: 'satyanarayan', title: '', date: '', time: '', city: me?.city || '', total: '', needed: 1, description: '', lead: true });
  const [err, setErr] = useState({});
  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setF((x) => {
      const next = { ...x, [k]: v };
      if (k === 'ritual') next.needed = RITUALS[v].pandits;
      return next;
    });
  };
  const r = RITUALS[f.ritual];

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.date) er.date = t({ en: 'Pick a date', hi: 'तारीख चुनें' });
    if (!f.city.trim()) er.city = t({ en: 'Enter the city', hi: 'शहर लिखें' });
    if (!(Number(f.total) > 0)) er.total = t({ en: 'Enter the total dakshina', hi: 'कुल दक्षिणा लिखें' });
    setErr(er);
    if (Object.keys(er).length) return;
    const id = postJob({ ...f, title: f.title.trim() || `${t(r.label)} — ${f.city}`, total: Number(f.total), needed: Math.max(1, Number(f.needed) || 1) });
    onPosted?.(id);
    onClose();
  };

  return (
    <Modal title={{ en: 'Post work for other pandits', hi: 'अन्य पंडितों के लिए काम पोस्ट करें' }} onClose={onClose} wide>
      <form className={s.form} onSubmit={submit} noValidate>
        <div className={s.fields}>
          <div className="field">
            <label htmlFor="pj-ritual">{t({ en: 'Anushthan', hi: 'अनुष्ठान' })}</label>
            <select id="pj-ritual" className="input" value={f.ritual} onChange={set('ritual')}>
              {Object.entries(RITUALS).map(([k, v]) => (
                <option key={k} value={k}>
                  {t(v.label)}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="pj-title">{t({ en: 'Short title', hi: 'संक्षिप्त शीर्षक' })}</label>
            <input id="pj-title" className="input" value={f.title} onChange={set('title')} placeholder={`${t(r.label)} — ${f.city || t({ en: 'city', hi: 'शहर' })}`} />
          </div>
          <div className="field">
            <label htmlFor="pj-date">{t({ en: 'Date *', hi: 'तारीख *' })}</label>
            <input id="pj-date" className={`input ${err.date ? 'invalid' : ''}`} type="date" value={f.date} onChange={set('date')} />
            {err.date && <span className="error-text">{err.date}</span>}
          </div>
          <div className="field">
            <label htmlFor="pj-time">{t({ en: 'Muhurat time', hi: 'मुहूर्त समय' })}</label>
            <input id="pj-time" className="input" type="time" value={f.time} onChange={set('time')} />
          </div>
          <div className="field">
            <label htmlFor="pj-city">{t({ en: 'City / area *', hi: 'शहर / क्षेत्र *' })}</label>
            <input id="pj-city" className={`input ${err.city ? 'invalid' : ''}`} value={f.city} onChange={set('city')} />
            {err.city && <span className="error-text">{err.city}</span>}
          </div>
          <div className="field">
            <label htmlFor="pj-total">{t({ en: 'Total dakshina from yajman (₹) *', hi: 'यजमान से कुल दक्षिणा (₹) *' })}</label>
            <input id="pj-total" className={`input ${err.total ? 'invalid' : ''}`} type="number" min="0" value={f.total} onChange={set('total')} placeholder={`${r.min}–${r.max}`} />
            {err.total ? <span className="error-text">{err.total}</span> : <small className="muted">{t({ en: `Typical: ${inr(r.min)} – ${inr(r.max)}`, hi: `सामान्यतः: ${inr(r.min)} – ${inr(r.max)}` })}</small>}
          </div>
          <div className="field">
            <label htmlFor="pj-needed">{t({ en: 'Pandits needed (incl. you)', hi: 'आवश्यक पंडित (आप सहित)' })}</label>
            <input id="pj-needed" className="input" type="number" min="1" max="51" value={f.needed} onChange={set('needed')} />
          </div>
          <div className="field" style={{ justifyContent: 'flex-end' }}>
            <label className={s.check}>
              <input type="checkbox" checked={f.lead} onChange={set('lead')} />
              <span>{t({ en: 'I will lead this anushthan myself', hi: 'यह अनुष्ठान मैं स्वयं कराऊँगा' })}</span>
            </label>
          </div>
          <div className={`field ${s.full}`}>
            <label htmlFor="pj-desc">{t({ en: 'Details for pandits', hi: 'पंडितों के लिए विवरण' })}</label>
            <textarea id="pj-desc" className="input" rows={3} value={f.description} onChange={set('description')} placeholder={t({ en: 'Paddhati, language, samagri arrangement, travel/stay…', hi: 'पद्धति, भाषा, सामग्री व्यवस्था, यात्रा/ठहरना…' })} />
          </div>
        </div>
        <p className="muted" style={{ fontSize: '0.84rem', margin: 0 }}>
          {t({ en: 'Do not write the yajman’s name or phone here. Only your team sees details after you add them.', hi: 'यहाँ यजमान का नाम या फ़ोन न लिखें। टीम में जोड़ने के बाद ही विवरण साझा करें।' })}
        </p>
        <div className={s.actions} style={{ justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            {t({ en: 'Cancel', hi: 'रद्द करें' })}
          </button>
          <button type="submit" className="btn btn-primary">
            {t({ en: 'Post work', hi: 'काम पोस्ट करें' })}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function WorkBoard() {
  const { t } = useLang();
  const { jobs, me, loaded } = usePandit();
  const [tab, setTab] = useState('open');
  const [ritual, setRitual] = useState('');
  const [posting, setPosting] = useState(false);
  const [toast, showToast] = useToast();

  const groups = useMemo(() => {
    const byDate = (a, b) => (a.date || '').localeCompare(b.date || '');
    return {
      open: jobs.filter((j) => j.status === 'open' && j.postedBy !== ME).sort(byDate),
      posted: jobs.filter((j) => j.postedBy === ME).sort(byDate),
      mine: jobs.filter((j) => j.postedBy !== ME && (j.team.some((m) => m.panditId === ME) || j.applicants.some((a) => a.panditId === ME))).sort(byDate),
    };
  }, [jobs]);

  const list = groups[tab].filter((j) => !ritual || j.ritual === ritual);
  const tabs = [
    ['open', { en: 'Open work', hi: 'उपलब्ध काम' }],
    ['posted', { en: 'Posted by me', hi: 'मेरे पोस्ट' }],
    ['mine', { en: 'Applied / joined', hi: 'आवेदन / शामिल' }],
  ];

  return (
    <Shell>
      <PageHead
        title={{ en: 'Work Board', hi: 'कार्य बोर्ड' }}
        sub={{ en: 'Share anushthans you cannot cover alone, or join another pandit’s team.', hi: 'जो अनुष्ठान आप अकेले नहीं कर सकते उन्हें साझा करें, या किसी अन्य पंडित की टीम में शामिल हों।' }}
      >
        {me ? (
          <button className="btn btn-primary" onClick={() => setPosting(true)}>
            <Plus size={16} /> {t({ en: 'Post work', hi: 'काम पोस्ट करें' })}
          </button>
        ) : (
          <Link href="/pandit-sangh/profile" className="btn btn-primary">
            {t({ en: 'Create profile to post', hi: 'पोस्ट हेतु प्रोफ़ाइल बनाएँ' })}
          </Link>
        )}
      </PageHead>

      <div className={s.toolbar}>
        <div className="tabs" role="tablist">
          {tabs.map(([k, label]) => (
            <button key={k} role="tab" className="tab" aria-selected={tab === k} onClick={() => setTab(k)}>
              {t(label)} ({groups[k].length})
            </button>
          ))}
        </div>
        <select className="input" style={{ marginLeft: 'auto' }} value={ritual} onChange={(e) => setRitual(e.target.value)} aria-label={t({ en: 'Anushthan', hi: 'अनुष्ठान' })}>
          <option value="">{t({ en: 'All anushthans', hi: 'सभी अनुष्ठान' })}</option>
          {Object.entries(RITUALS).map(([k, v]) => (
            <option key={k} value={k}>
              {t(v.label)}
            </option>
          ))}
        </select>
      </div>

      {!loaded ? null : list.length ? (
        <div className={s.grid2}>
          {list.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      ) : (
        <Empty
          icon={<Users size={34} />}
          text={
            tab === 'posted'
              ? t({ en: 'You have not posted any work yet. Overbooked on a muhurat? Post it here.', hi: 'आपने अभी कोई काम पोस्ट नहीं किया। एक मुहूर्त पर ज़्यादा बुकिंग? यहाँ पोस्ट करें।' })
              : tab === 'mine'
                ? t({ en: 'You have not applied to any work yet.', hi: 'आपने अभी किसी काम में आवेदन नहीं किया।' })
                : t({ en: 'No open work right now. Check back soon.', hi: 'अभी कोई काम उपलब्ध नहीं। कुछ समय बाद देखें।' })
          }
        />
      )}

      {posting && <PostJobDialog onClose={() => setPosting(false)} onPosted={() => (setTab('posted'), showToast(t({ en: 'Work posted. Pandits will be notified.', hi: 'काम पोस्ट हुआ। पंडितों को सूचना मिलेगी।' })))} />}
      {toast}
    </Shell>
  );
}
