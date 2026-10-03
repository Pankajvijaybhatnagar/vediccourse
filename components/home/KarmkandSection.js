'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ScrollText, Package, ListChecks, PlayCircle, Check, ChevronRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Reveal from '@/components/Reveal';
import styles from './karmkandSection.module.css';

const p = (en, hi) => ({ en, hi });

const STEPS = [
  {
    Icon: ScrollText,
    title: p('Choose a pooja', 'पूजा चुनें'),
    text: p('Start with the simple daily pooja, or pick Ganesh, Lakshmi, Rudrabhishek, Havan and more.', 'सरल दैनिक पूजा से आरंभ करें, या गणेश, लक्ष्मी, रुद्राभिषेक, हवन आदि में से चुनें।'),
    href: '/karmkand/pooja-paddhati',
  },
  {
    Icon: ListChecks,
    title: p('Gather the samagri', 'सामग्री एकत्र करें'),
    text: p('Each pooja has a tick-off samagri checklist you can print, with quantities for every item.', 'हर पूजा की सामग्री सूची मात्रा सहित मिलती है — टिक करें और छापकर भी रख सकते हैं।'),
    href: '/karmkand/pooja-paddhati/dainik-pooja#samagri',
  },
  {
    Icon: Package,
    title: p('Know why each item matters', 'हर सामग्री का महत्व जानें'),
    text: p('Tap any item to read its spiritual meaning, correct use and precautions.', 'किसी भी सामग्री पर टैप करके उसका आध्यात्मिक महत्व, सही प्रयोग और सावधानियाँ पढ़ें।'),
    href: '/karmkand/pooja-samagri',
  },
  {
    Icon: PlayCircle,
    title: p('Perform with Pooja Mode', 'पूजा मोड से पूजा करें'),
    text: p('Pooja Mode shows one step at a time in large text with the mantra — just follow along.', 'पूजा मोड हर चरण को मंत्र सहित बड़े अक्षरों में एक-एक करके दिखाता है — बस साथ-साथ चलें।'),
    href: '/karmkand/pooja-paddhati/ganesh-poojan#vidhi',
  },
];

/**
 * Home-page Karmkand explainer.
 * @param poojas        pooja cards from GET /poojas (with stepCount)
 * @param preview       full Ganesh Poojan from GET /poojas/ganesh-poojan, cycled to show how Pooja Mode feels (optional)
 * @param samagriCount  total samagri items
 */
export default function KarmkandSection({ poojas = [], preview = null, samagriCount }) {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const previewSteps = (preview?.steps ?? []).filter((s) => s.mantra).slice(0, 4);
  const stepsCount = previewSteps.length;

  useEffect(() => {
    if (stepsCount < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % stepsCount), 4200);
    return () => clearInterval(id);
  }, [stepsCount]);

  const step = previewSteps[i % Math.max(1, stepsCount)];
  const totalSteps = poojas.reduce((sum, x) => sum + (x.stepCount ?? x.steps?.length ?? 0), 0);

  return (
    <section className={styles.section} aria-labelledby="karmkand-home-title">
      <div className={styles.top}>
        <Reveal className={styles.intro}>
          <span className={styles.badge}>
            <span aria-hidden="true">🪔</span> {t({ en: 'Karmkand · in pure Hindi', hi: 'कर्मकांड · शुद्ध हिंदी में' })}
          </span>
          <h2 id="karmkand-home-title">
            {t({ en: 'Learn to perform pooja', hi: 'घर पर स्वयं करें' })} <span>{t({ en: 'the right way, at home', hi: 'विधिपूर्वक पूजा' })}</span>
          </h2>
          <p className={styles.lead}>
            {t({
              en: 'Karmkand is the Vedic science of rituals — how to worship with the right order, the right samagri and the right mantras. VedicDhaam explains every step in simple, pure Hindi so anyone can perform pooja with devotion, without needing to guess.',
              hi: 'कर्मकांड वैदिक पूजा-विधान का विज्ञान है — सही क्रम, सही सामग्री और सही मंत्रों के साथ आराधना करने की पद्धति। वैदिकधाम हर चरण को सरल और शुद्ध हिंदी में समझाता है, ताकि कोई भी व्यक्ति श्रद्धा और विधि से पूजा कर सके।',
            })}
          </p>

          <div className={styles.divisions}>
            <Link href="/karmkand/pooja-paddhati" className={`${styles.division} ${styles.divA}`}>
              <span className={styles.divIcon} aria-hidden="true">
                📜
              </span>
              <span>
                <strong>{t({ en: 'Pooja Paddhati', hi: 'पूजा पद्धति' })}</strong>
                <small>
                  {poojas.length
                    ? t({
                        en: `${poojas.length} poojas · ${totalSteps} steps with mantras & meanings`,
                        hi: `${poojas.length} पूजाएँ · ${totalSteps} चरण, मंत्र एवं अर्थ सहित`,
                      })
                    : t({ en: 'Step-by-step vidhi with mantras & meanings', hi: 'चरणबद्ध विधि, मंत्र एवं अर्थ सहित' })}
                </small>
              </span>
              <ChevronRight size={18} className={styles.divArrow} />
            </Link>
            <Link href="/karmkand/pooja-samagri" className={`${styles.division} ${styles.divB}`}>
              <span className={styles.divIcon} aria-hidden="true">
                🏺
              </span>
              <span>
                <strong>{t({ en: 'Pooja Samagri', hi: 'पूजा सामग्री' })}</strong>
                <small>
                  {samagriCount
                    ? t({ en: `${samagriCount} items · meaning, use & precautions`, hi: `${samagriCount} सामग्रियाँ · महत्व, प्रयोग एवं सावधानी` })
                    : t({ en: 'Meaning, use & precautions of every item', hi: 'हर सामग्री का महत्व, प्रयोग एवं सावधानी' })}
                </small>
              </span>
              <ChevronRight size={18} className={styles.divArrow} />
            </Link>
          </div>

          <div className={styles.ctas}>
            <Link href="/karmkand" className="btn btn-primary btn-lg">
              {t({ en: 'Explore Karmkand', hi: 'कर्मकांड सीखें' })} <ArrowRight size={18} />
            </Link>
            <Link href="/karmkand/pooja-paddhati/dainik-pooja" className={`btn btn-ghost btn-lg ${styles.ghost}`}>
              🙏 {t({ en: 'Start with daily pooja', hi: 'दैनिक पूजा से आरंभ' })}
            </Link>
          </div>
        </Reveal>

        {/* Live preview of Pooja Mode */}
        {step && (
        <Reveal delay={150} className={styles.preview} aria-hidden="true">
          <div className={styles.device}>
            <div className={styles.deviceBar}>
              <span style={{ width: `${(((i % stepsCount) + 1) / stepsCount) * 100}%` }} />
            </div>
            <div className={styles.deviceHead}>
              <span>
                {preview.icon} {preview.name}
              </span>
              <small>{t({ en: 'Pooja Mode', hi: 'पूजा मोड' })}</small>
            </div>
            <div className={styles.stage} key={i}>
              <span className={styles.count}>
                {t({ en: 'Step', hi: 'चरण' })} {(i % stepsCount) + 1} / {stepsCount}
              </span>
              <h3>{step.title}</h3>
              <p className={styles.mantra}>{step.mantra.split('\n')[0]}</p>
            </div>
            <div className={styles.samagriMini}>
              <small>{t({ en: 'Samagri ready', hi: 'सामग्री तैयार' })}</small>
              <div>
                {(preview.samagri ?? []).slice(0, 6).map((item, n) => {
                  return (
                    <span key={item.item} className={n < 4 ? styles.ready : ''} title={item.name}>
                      {item.icon}
                      {n < 4 && (
                        <b>
                          <Check size={9} strokeWidth={4} />
                        </b>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className={styles.deviceNav}>
              <span>‹ {t({ en: 'Back', hi: 'पिछला' })}</span>
              <span className={styles.nextBtn}>
                {t({ en: 'Next step', hi: 'अगला चरण' })} ›
              </span>
            </div>
          </div>
          <div className={styles.shloka}>
            <p>पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।</p>
            <small>{t({ en: '— Offered with devotion, even a leaf is accepted (Gita 9.26)', hi: '— भक्ति से अर्पित एक पत्ता भी स्वीकार्य है (गीता ९.२६)' })}</small>
          </div>
        </Reveal>
        )}
      </div>

      <div className={styles.howHead}>
        <h3>{t({ en: 'How to use Karmkand — 4 simple steps', hi: 'कर्मकांड का उपयोग कैसे करें — 4 सरल चरण' })}</h3>
      </div>
      <ol className={styles.steps}>
        {STEPS.map(({ Icon, title, text, href }, n) => (
          <Reveal as="li" key={title.en} delay={n * 100}>
            <Link href={href} className={styles.step}>
              <span className={styles.stepNum}>{['१', '२', '३', '४'][n]}</span>
              <span className={styles.stepIcon}>
                <Icon size={22} />
              </span>
              <strong>{t(title)}</strong>
              <p>{t(text)}</p>
            </Link>
          </Reveal>
        ))}
      </ol>

      {poojas.length > 0 && (
      <div className={styles.poojas}>
        <span className={styles.poojasLabel}>{t({ en: 'Popular pooja vidhis:', hi: 'लोकप्रिय पूजा विधियाँ:' })}</span>
        <div className={styles.chips}>
          {poojas.map((x) => (
            <Link key={x.slug} href={`/karmkand/pooja-paddhati/${x.slug}`}>
              <span aria-hidden="true">{x.icon}</span> {x.name.split(' (')[0]}
            </Link>
          ))}
        </div>
      </div>
      )}
    </section>
  );
}
