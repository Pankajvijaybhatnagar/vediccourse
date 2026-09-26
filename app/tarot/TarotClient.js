'use client';

import { useState } from 'react';
import { drawCards, SPREAD_POSITIONS } from '@/lib/tarot';
import { useLang } from '@/lib/i18n';
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

export default function TarotClient() {
  const { t } = useLang();
  const [question, setQuestion] = useState('');
  const [cards, setCards] = useState(null);
  const [flipped, setFlipped] = useState([false, false, false]);
  const [shuffling, setShuffling] = useState(false);

  const draw = () => {
    setShuffling(true);
    setCards(null);
    setFlipped([false, false, false]);
    setTimeout(() => {
      setCards(drawCards(3));
      setShuffling(false);
    }, 1200);
  };

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
            <button className="btn btn-primary btn-lg" onClick={draw} disabled={shuffling}>
              {shuffling ? t({ en: 'Shuffling the deck…', hi: 'पत्ते फेंटे जा रहे हैं…' }) : `✦ ${t({ en: 'Shuffle & Draw', hi: 'पत्ते फेंटें और चुनें' })}`}
            </button>
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
                  <span className={styles.position}>{t(SPREAD_POSITIONS[i].label)}</span>
                  <button
                    className={`${styles.tarotCard} ${flipped[i] ? styles.flipped : ''}`}
                    onClick={() => flip(i)}
                    aria-label={flipped[i] ? t(card.name) : t({ en: `Reveal ${SPREAD_POSITIONS[i].label.en} card`, hi: `${SPREAD_POSITIONS[i].label.hi} का कार्ड पलटें` })}
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
                  <small className={styles.hint}>{t(SPREAD_POSITIONS[i].hint)}</small>
                </div>
              ))}
            </div>

            <div className={styles.meanings}>
              {cards.map((card, i) =>
                flipped[i] ? (
                  <article key={card.numeral} className={`card ${styles.meaning} fade-up`}>
                    <span className={styles.position}>{t(SPREAD_POSITIONS[i].label)}</span>
                    <h3>
                      {t(card.name)}
                      {card.isReversed && <small className={styles.revTag}>{t({ en: 'Reversed', hi: 'उलटा' })}</small>}
                    </h3>
                    <p>{t(card.isReversed ? card.reversed : card.upright)}</p>
                  </article>
                ) : null
              )}
            </div>

            {allFlipped && (
              <div className={`${styles.again} fade-up`}>
                <button className="btn btn-ghost btn-lg" onClick={draw}>
                  ↻ {t({ en: 'Draw Again', hi: 'फिर से चुनें' })}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
