'use client';

import { Check, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import styles from './auth.module.css';

// Mirrors the backend's password rules (common/validators password).
export const PASSWORD_RULES = [
  { test: (p) => p.length >= 8, label: { en: 'At least 8 characters', hi: 'कम से कम 8 अक्षर' } },
  { test: (p) => /[a-z]/.test(p), label: { en: 'A lowercase letter', hi: 'एक छोटा अक्षर (a-z)' } },
  { test: (p) => /[A-Z]/.test(p), label: { en: 'An uppercase letter', hi: 'एक बड़ा अक्षर (A-Z)' } },
  { test: (p) => /\d/.test(p), label: { en: 'A number', hi: 'एक अंक' } },
  { test: (p) => /[^A-Za-z0-9]/.test(p), label: { en: 'A symbol (e.g. ! @ #)', hi: 'एक चिह्न (जैसे ! @ #)' } },
];

export const isStrongPassword = (p) => p.length <= 128 && PASSWORD_RULES.every((r) => r.test(p));

const LEVELS = [
  { en: 'Weak', hi: 'कमज़ोर' },
  { en: 'Fair', hi: 'ठीक' },
  { en: 'Good', hi: 'अच्छा' },
  { en: 'Strong', hi: 'मज़बूत' },
];

export default function PasswordStrength({ password, id }) {
  const { t } = useLang();
  const passed = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const level = password ? Math.min(3, Math.max(0, passed - 2 + (password.length >= 12 ? 1 : 0))) : -1;

  return (
    <div className={styles.strength} id={id} aria-live="polite">
      <div className={styles.meter} data-level={level}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i <= level ? styles.meterOn : ''} />
        ))}
      </div>
      {password && <p className={styles.meterLabel}>{t(LEVELS[Math.max(0, level)])}</p>}
      <ul className={styles.rules}>
        {PASSWORD_RULES.map((r) => {
          const ok = r.test(password);
          return (
            <li key={r.label.en} className={ok ? styles.ruleOk : ''}>
              {ok ? <Check size={13} aria-hidden="true" /> : <X size={13} aria-hidden="true" />}
              {t(r.label)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
