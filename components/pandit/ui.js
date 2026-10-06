'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BadgeCheck, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { usePandit } from '@/lib/pandit/store';
import s from './sangh.module.css';

export { s as styles };

/** Initials avatar tinted by hue. */
export function Avatar({ name = '', hue = 30, size = 48 }) {
  const letters = name
    .replace(/^(acharya|pt\.?|pandit|पं\.?|आचार्य)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <span className={s.avatar} style={{ '--h': hue, width: size, height: size, fontSize: size * 0.38 }} aria-hidden="true">
      {letters || 'ॐ'}
    </span>
  );
}

export const Verified = ({ size = 18 }) => {
  const { t } = useLang();
  return <BadgeCheck size={size} className={s.verified} aria-label={t({ en: 'Verified', hi: 'सत्यापित' })} />;
};

export function Stat({ icon: I, value, label }) {
  return (
    <div className={s.stat}>
      <span className={s.statIcon}>
        <I size={22} />
      </span>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

export function Empty({ icon = '🪔', text, children }) {
  return (
    <div className={s.empty}>
      <div className={s.emptyIcon} aria-hidden="true">
        {icon}
      </div>
      <p>{text}</p>
      {children}
    </div>
  );
}

export function PageHead({ title, sub, back, children }) {
  const { t } = useLang();
  return (
    <>
      {back && (
        <Link href={back.href} className={s.back}>
          <ArrowLeft size={16} /> {t(back.label)}
        </Link>
      )}
      <div className={s.pageHead}>
        <div>
          <h1>{t(title)}</h1>
          {sub && <p>{t(sub)}</p>}
        </div>
        {children && <div className={s.actions}>{children}</div>}
      </div>
    </>
  );
}

/** Multi-select as pill toggles over a { key: {en,hi} } map. */
export function ToggleChips({ options, value = [], onChange, label }) {
  const { t } = useLang();
  const toggle = (k) => onChange(value.includes(k) ? value.filter((x) => x !== k) : [...value, k]);
  return (
    <div className={s.toggleChips} role="group" aria-label={t(label)}>
      {Object.entries(options).map(([k, v]) => (
        <button type="button" key={k} className={s.toggleChip} aria-pressed={value.includes(k)} onClick={() => toggle(k)}>
          {t(v.label || v)}
        </button>
      ))}
    </div>
  );
}

export function Modal({ title, onClose, children, wide }) {
  const { t } = useLang();
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className={s.backdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={s.modal} role="dialog" aria-modal="true" aria-label={t(title)} style={wide ? { width: 'min(860px, 100%)' } : undefined}>
        <div className={s.modalHead}>
          <h2>{t(title)}</h2>
          <button type="button" className={s.iconBtn} onClick={onClose} aria-label={t({ en: 'Close', hi: 'बंद करें' })}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Short-lived confirmation message. */
export function useToast() {
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 2600);
    return () => clearTimeout(id);
  }, [msg]);
  const node = msg ? (
    <div className={s.toast} role="status">
      {msg}
    </div>
  ) : null;
  return [node, setMsg];
}

export function useDate() {
  const { lang } = useLang();
  return (d, opts = { day: 'numeric', month: 'short', year: 'numeric' }) => {
    if (!d) return '—';
    const date = d instanceof Date ? d : new Date(d);
    return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', opts);
  };
}

export function Shell({ children, narrow }) {
  return (
    <div className={`container ${s.shell}`} style={narrow ? { maxWidth: 960 } : undefined}>
      {children}
    </div>
  );
}

/** Shows children only once the pandit has a profile; otherwise points to onboarding. */
export function RequireProfile({ children }) {
  const { me, loaded } = usePandit();
  const { t } = useLang();
  if (!loaded) return <div className={s.empty} style={{ marginTop: 28 }}>{t({ en: 'Loading…', hi: 'लोड हो रहा है…' })}</div>;
  if (!me)
    return (
      <div style={{ marginTop: 28 }}>
        <Empty icon="🙏" text={t({ en: 'Create your pandit profile first. It takes two minutes.', hi: 'पहले अपनी पंडित प्रोफ़ाइल बनाएँ। केवल दो मिनट लगेंगे।' })}>
          <Link href="/pandit-sangh/profile" className="btn btn-primary">
            {t({ en: 'Create my profile', hi: 'मेरी प्रोफ़ाइल बनाएँ' })}
          </Link>
        </Empty>
      </div>
    );
  return children;
}

export const STATUS = {
  open: { label: { en: 'Open', hi: 'खुला' }, cls: s.chipGreen },
  staffed: { label: { en: 'Team ready', hi: 'टीम तैयार' }, cls: s.chipBlue },
  completed: { label: { en: 'Done · payment due', hi: 'संपन्न · भुगतान शेष' }, cls: s.chipOn },
  paid: { label: { en: 'Paid', hi: 'भुगतान हुआ' }, cls: s.chip },
  cancelled: { label: { en: 'Cancelled', hi: 'रद्द' }, cls: s.chipRed },
};

export function StatusChip({ status }) {
  const { t } = useLang();
  const st = STATUS[status] || STATUS.open;
  return <span className={`${s.chip} ${st.cls}`}>{t(st.label)}</span>;
}
