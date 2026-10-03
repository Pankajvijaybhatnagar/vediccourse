'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { BookmarkPlus, Check } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { ErrorState } from '@/components/astro/States';
import styles from './tarot.module.css';

function CardBack() {
  return (
    <svg viewBox="0 0 140 220" className={styles.backArt} aria-hidden="true">
      <rect x="6" y="6" width="128" height="208" rx="10" fill="none" stroke="#ffc21a" strokeOpacity="0.7" />
      <rect x="14" y="14" width="112" height="192" rx="6" fill="none" stroke="#ffc21a" strokeOpacity="0.35" />
      <circle cx="70" cy="110" r="36" fill="none" stroke="#ffc21a" strokeOpacity="0.8" />
      <circle cx="70" cy="110" r="26" fill="none" stroke="#ffd75e" strokeOpacity="0.5" strokeDasharray="2 3" />
      <text x="70" y="122" textAnchor="middle" fontSize="32" fontWeight="800" fill="#ffc21a">ॐ</text>
      <path d="M70 34l3 7 7 3-7 3-3 7-3-7-7-3 7-3z M70 166l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#ffd75e" opacity="0.85" />
    </svg>
  );
}

const SHUFFLE_MS = 1200;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function TarotClient() {
  const { t } = useLang();
  const { user, openSignIn } = useAuth();
  const [question, setQuestion] = useState('');
  const [cards, setCards] = useState(null);
  const [flipped, setFlipped] = useState([false, false, false]);
  const [shuffling, setShuffling] = useState(false);
  const [error, setError] = useState(null);
  const [save, setSave] = useState({ state: 'idle', error: null }); // idle | saving | saved
  const spreadRef = useRef(null);
  spreadRef.current = { cards, question };

  // Cards are drawn by the API; the shuffle animation runs for at least SHUFFLE_MS either way.
  const draw = async () => {
    setShuffling(true);
    setCards(null);
    setError(null);
    setSave({ state: 'idle', error: null });
    setFlipped([false, false, false]);
    try {
      const [res] = await Promise.all([
        api('/tarot/draw', { method: 'POST', body: { count: 3, ...(question.trim() && { question: question.trim() }) } }),
        wait(SHUFFLE_MS),
      ]);
      setCards(res.data.cards);
    } catch (err) {
      setError(err);
    } finally {
      setShuffling(false);
    }
  };

  const saveReading = async () => {
    const { cards: spread, question: q } = spreadRef.current;
    if (!spread) return;
    setSave({ state: 'saving', error: null });
    try {
      await api('/tarot/readings', {
        method: 'POST',
        body: { ...(q.trim() && { question: q.trim() }), cards: spread.map((c) => ({ numeral: c.numeral, isReversed: Boolean(c.isReversed) })) },
      });
      setSave({ state: 'saved', error: null });
    } catch (err) {
      setSave({ state: 'idle', error: err });
    }
  };

  const onSave = () => (user ? saveReading() : openSignIn({ onSuccess: () => saveReading() }));

  const flip = (i) => setFlipped((f) => f.map((v, j) => (j === i ? true : v)));
  const allFlipped = cards && flipped.every(Boolean);

  return (
    <section className={styles.section}>
      <div className="container">
        {!cards && (
          <div className={`card card-glow ${styles.intro} mandala-bg`}>
            <div className={`${styles.deck} ${shuffling ? styles.shuffling : ''}`} aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.deckCard} style={{ '--i': i }}>
                  <CardBack />
                </div>
              ))}
            </div>
            <div className="field" style={{ width: '100%', maxWidth: 460 }}>
              <label htmlFor="tarot-q">{t({ en: 'Your question (optional)', hi: 'आपका प्रश्न (वैकल्पिक)' })}</label>
              <input
                id="tarot-q"
                className="input"
                placeholder={t({ en: 'What should I focus on this month?', hi: 'इस महीने मुझे किस पर ध्यान देना चाहिए?' })}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={shuffling}
              />
            </div>
            <button className="btn btn-primary btn-lg" onClick={draw} disabled={shuffling} aria-busy={shuffling}>
              {shuffling ? t({ en: 'Shuffling the deck…', hi: 'पत्ते फेंटे जा रहे हैं…' }) : `✦ ${t({ en: 'Shuffle & Draw', hi: 'पत्ते फेंटें और चुनें' })}`}
            </button>
            {error && <ErrorState error={error} onRetry={draw} compact />}
          </div>
        )}

        {cards && (
          <>
            {question && <p className={styles.question}>“{question}”</p>}
            <p className={styles.instruction}>
              {allFlipped ? t({ en: 'Your reading is revealed.', hi: 'आपकी रीडिंग सामने है।' }) : t({ en: 'Tap each card to reveal it.', hi: 'हर कार्ड को पलटने के लिए उस पर टैप करें।' })}
            </p>
            <div className={styles.spread}>
              {cards.map((card, i) => (
                <div key={card.numeral} className={styles.slot} style={{ animationDelay: `${i * 150}ms` }}>
                  <span className={styles.position}>{card.position ? t(card.position) : ''}</span>
                  <button
                    className={`${styles.tarotCard} ${flipped[i] ? styles.flipped : ''}`}
                    onClick={() => flip(i)}
                    aria-label={flipped[i] ? t(card.name) : t({ en: `Reveal ${card.position?.en ?? ''} card`, hi: `${card.position?.hi ?? ''} का कार्ड पलटें` })}
                    disabled={flipped[i]}
                  >
                    <div className={styles.inner}>
                      <div className={styles.back}>
                        <CardBack />
                      </div>
                      <div className={styles.front}>
                        <div className={card.isReversed ? styles.reversed : undefined}>
                          <span className={styles.numeral}>{card.numeral}</span>
                          <span className={`${styles.cardIcon} glyph`}>{card.icon}</span>
                          <span className={styles.cardName}>{card.name.en}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                  <small className={styles.hint}>{card.positionHint ? t(card.positionHint) : ''}</small>
                </div>
              ))}
            </div>

            <div className={styles.meanings}>
              {cards.map((card, i) =>
                flipped[i] ? (
                  <article key={card.numeral} className={`card ${styles.meaning} fade-up`}>
                    <span className={styles.position}>{card.position ? t(card.position) : ''}</span>
                    <h3>
                      {t(card.name)}
                      {card.isReversed && <small className={styles.revTag}>{t({ en: 'Reversed', hi: 'उलटा' })}</small>}
                    </h3>
                    <p>{t(card.meaning ?? (card.isReversed ? card.reversed : card.upright))}</p>
                  </article>
                ) : null
              )}
            </div>

            {allFlipped && (
              <div className={`${styles.again} fade-up`}>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {save.state === 'saved' ? (
                    <Link href="/account?tab=readings" className="btn btn-primary btn-lg">
                      <Check size={18} aria-hidden="true" /> {t({ en: 'Saved · View my readings', hi: 'सहेजा गया · मेरी रीडिंग देखें' })}
                    </Link>
                  ) : (
                    <button className="btn btn-primary btn-lg" onClick={onSave} disabled={save.state === 'saving'} aria-busy={save.state === 'saving'}>
                      <BookmarkPlus size={18} aria-hidden="true" />{' '}
                      {save.state === 'saving'
                        ? t({ en: 'Saving…', hi: 'सहेजा जा रहा है…' })
                        : user
                          ? t({ en: 'Save to my account', hi: 'मेरे खाते में सहेजें' })
                          : t({ en: 'Sign in to save', hi: 'सहेजने के लिए साइन इन करें' })}
                    </button>
                  )}
                  <button className="btn btn-ghost btn-lg" onClick={draw} disabled={shuffling}>
                    ↻ {t({ en: 'Draw Again', hi: 'फिर से चुनें' })}
                  </button>
                </div>
                {save.error && (
                  <div style={{ marginTop: 16 }}>
                    <ErrorState error={save.error} onRetry={onSave} compact />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
