'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, MessageCircleQuestion, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Reveal from '@/components/Reveal';
import { METHODS } from '@/lib/prashna/categories';
import { GRID, GRID_SIZE } from '@/lib/prashna/ramShalaka';
import useQuestion from '@/lib/prashna/useQuestion';
import styles from './prashnaSection.module.css';

const EXAMPLES = [
  { en: 'Will I get the job?', hi: 'क्या नौकरी मिलेगी?' },
  { en: 'When will I marry?', hi: 'विवाह कब होगा?' },
  { en: 'Where is my lost item?', hi: 'खोई वस्तु कहाँ है?' },
  { en: 'Will I pass the exam?', hi: 'क्या परीक्षा में सफल होऊँगा?' },
];

export default function PrashnaSection() {
  const { t } = useLang();
  const router = useRouter();
  const q = useQuestion();

  const submit = (e) => {
    e.preventDefault();
    router.push('/prashna');
  };

  return (
    <section className={styles.section} aria-labelledby="prashna-home-title">
      <div className={styles.top}>
        <Reveal className={styles.intro}>
          <span className={styles.badge}>
            <Sparkles size={15} /> {t({ en: 'New · Prashna Shastra', hi: 'नया · प्रश्न शास्त्र' })}
          </span>
          <h2 id="prashna-home-title">
            {t({ en: 'Prashna Kundali — ', hi: 'प्रश्न कुंडली — ' })}
            <span>{t({ en: 'ask what is in your heart', hi: 'मन का प्रश्न पूछें' })}</span>
          </h2>
          <p className={styles.lead}>
            {t({
              en: 'No birth details needed. Get your answer from a chaupai of the Ramcharitmanas, the lines of your palm, the chart of this very moment, or simply the name of a fruit or vegetable.',
              hi: 'जन्म विवरण की आवश्यकता नहीं। उत्तर पाएँ श्रीरामचरितमानस की चौपाई से, अपनी हस्त रेखा से, इसी क्षण की कुंडली से, या बस किसी फल-सब्ज़ी के नाम से।',
            })}
          </p>

          <form className={styles.ask} onSubmit={submit}>
            <label htmlFor="home-prashna" className="sr-only">
              {t({ en: 'Your question', hi: 'आपका प्रश्न' })}
            </label>
            <MessageCircleQuestion size={20} className={styles.askIcon} aria-hidden="true" />
            <input
              id="home-prashna"
              value={q.text}
              maxLength={300}
              onChange={(e) => q.setText(e.target.value)}
              placeholder={t({ en: 'Type your question…', hi: 'अपना प्रश्न लिखें…' })}
            />
            <button type="submit" className="btn btn-primary">
              {t({ en: 'Ask', hi: 'पूछें' })} <ArrowRight size={16} />
            </button>
          </form>
          <div className={styles.examples}>
            {EXAMPLES.map((ex) => (
              <button key={ex.en} type="button" onClick={() => q.setText(t(ex))}>
                {t(ex)}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className={styles.visual}>
          <div className={styles.yantra}>
            <p className={styles.yantraTitle}>॥ श्रीराम शलाका प्रश्नावली ॥</p>
            <div className={styles.grid}>
              {GRID.map((l, i) => (
                <Link
                  key={i}
                  href={`/prashna/ram-shalaka?cell=${i}`}
                  className={styles.cell}
                  style={{ '--d': `${((i % GRID_SIZE) + Math.floor(i / GRID_SIZE)) * 40}ms` }}
                  aria-label={`${t({ en: 'Letter', hi: 'अक्षर' })} ${i + 1}: ${l}`}
                  tabIndex={i === 0 ? 0 : -1}
                >
                  {l}
                </Link>
              ))}
            </div>
            <p className={styles.yantraHint}>
              {t({ en: 'Remember Shri Ram and touch any letter', hi: 'श्रीराम का स्मरण कर किसी भी अक्षर को स्पर्श करें' })}
            </p>
          </div>
        </Reveal>
      </div>

      <div className={styles.methods}>
        {METHODS.map((m, i) => (
          <Reveal key={m.slug} delay={i * 60}>
            <Link href={`/prashna/${m.slug}`} className={styles.method}>
              <span className={styles.methodIcon} aria-hidden="true">{m.icon}</span>
              <strong>{t(m.title)}</strong>
              <small>{t(m.short)}</small>
              <ArrowRight size={16} className={styles.methodArrow} />
            </Link>
          </Reveal>
        ))}
      </div>
      <div className={styles.foot}>
        <Link href="/prashna" className="btn btn-dark">
          {t({ en: 'See all types of Prashna', hi: 'प्रश्न के सभी प्रकार देखें' })} <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
