'use client';

import { Phone, HeartHandshake } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import styles from './tools.module.css';

// Indian helplines. Numbers should be re-verified periodically before publishing.
export const HELPLINES = [
  { name: { en: 'Tele-MANAS (Govt. of India)', hi: 'टेली-मानस (भारत सरकार)' }, number: '14416', alt: '1-800-891-4416', hours: { en: '24×7 · free · many languages', hi: '24×7 · निःशुल्क · अनेक भाषाएँ' } },
  { name: { en: 'Emergency', hi: 'आपातकालीन सेवा' }, number: '112', hours: { en: '24×7', hi: '24×7' } },
  { name: { en: 'iCall (TISS)', hi: 'आईकॉल (TISS)' }, number: '9152987821', hours: { en: 'Mon–Sat, 10 AM – 8 PM', hi: 'सोम–शनि, सुबह 10 – रात 8' } },
  { name: { en: 'Vandrevala Foundation', hi: 'वंद्रेवाला फ़ाउंडेशन' }, number: '9999666555', hours: { en: '24×7 · call or WhatsApp', hi: '24×7 · कॉल या व्हाट्सऐप' } },
];

export default function HelpBanner({ compact = false }) {
  const { t } = useLang();

  if (compact) {
    return (
      <aside className={styles.helpCompact} role="note">
        <HeartHandshake size={20} aria-hidden="true" />
        <p>
          {t({
            en: 'If you are in distress or having thoughts of harming yourself, please call ',
            hi: 'यदि आप बहुत परेशान हैं या स्वयं को हानि पहुँचाने के विचार आ रहे हैं, तो कृपया अभी ',
          })}
          <a href="tel:14416">
            <strong>Tele-MANAS 14416</strong>
          </a>
          {t({ en: ' (24×7, free) or emergency ', hi: ' (24×7, निःशुल्क) या आपातकालीन नंबर ' })}
          <a href="tel:112">
            <strong>112</strong>
          </a>
          {t({ en: '. You are not alone.', hi: ' पर कॉल करें। आप अकेले नहीं हैं।' })}
        </p>
      </aside>
    );
  }

  return (
    <aside className={styles.help} role="note" aria-labelledby="help-title">
      <div className={styles.helpHead}>
        <span className={styles.helpIcon} aria-hidden="true">
          <HeartHandshake size={26} />
        </span>
        <div>
          <h2 id="help-title">{t({ en: 'Need to talk to someone right now?', hi: 'अभी किसी से बात करनी है?' })}</h2>
          <p>
            {t({
              en: 'Reaching out is a sign of strength. These helplines are confidential and staffed by trained counsellors.',
              hi: 'सहायता माँगना साहस का प्रतीक है। ये हेल्पलाइन गोपनीय हैं और प्रशिक्षित परामर्शदाता आपसे बात करते हैं।',
            })}
          </p>
        </div>
      </div>
      <div className={styles.helpGrid}>
        {HELPLINES.map((h) => (
          <a key={h.number} href={`tel:${h.number}`} className={styles.helpLine}>
            <Phone size={18} aria-hidden="true" />
            <span>
              <small>{t(h.name)}</small>
              <strong>{h.number}</strong>
              <em>
                {t(h.hours)}
                {h.alt ? ` · ${h.alt}` : ''}
              </em>
            </span>
          </a>
        ))}
      </div>
      <p className={styles.helpNote}>
        {t({
          en: 'Astrology and self-help practices on VedicDhaam support reflection and wellbeing. They are not a substitute for a doctor, psychologist or psychiatrist.',
          hi: 'वैदिकधाम पर ज्योतिष और स्व-सहायता अभ्यास आत्मचिंतन और मानसिक कल्याण में सहायक हैं। ये डॉक्टर, मनोवैज्ञानिक या मनोचिकित्सक का विकल्प नहीं हैं।',
        })}
      </p>
    </aside>
  );
}
