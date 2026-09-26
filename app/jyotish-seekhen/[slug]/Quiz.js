'use client';

import { useState } from 'react';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';
import { hindiNum } from '@/lib/jyotish/num';
import styles from './lesson.module.css';

const LETTERS = ['क', 'ख', 'ग', 'घ'];

export default function Quiz({ questions }) {
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const [round, setRound] = useState(0);

  const answered = answers.filter((a) => a !== null).length;
  const score = answers.reduce((n, a, i) => n + (a === questions[i].answer ? 1 : 0), 0);
  const finished = answered === questions.length;

  const choose = (qi, oi) => {
    if (answers[qi] !== null) return;
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)));
  };

  const retry = () => {
    setAnswers(questions.map(() => null));
    setRound((r) => r + 1);
  };

  const verdict =
    score === questions.length
      ? 'उत्कृष्ट! आपने सभी प्रश्नों के सही उत्तर दिए।'
      : score >= Math.ceil(questions.length * 0.6)
        ? 'बहुत अच्छा! थोड़ा और दोहराने से आप पूर्ण निपुण हो जाएँगे।'
        : 'कोई बात नहीं — पाठ एक बार फिर पढ़ें और पुनः प्रयास करें।';

  return (
    <div className={styles.quiz} key={round}>
      {questions.map((q, qi) => {
        const picked = answers[qi];
        const isAnswered = picked !== null;
        return (
          <fieldset key={q.q} className={styles.question}>
            <legend className={styles.qText}>
              <span className={styles.qNum}>प्रश्न {hindiNum(qi + 1)}</span>
              {q.q}
            </legend>
            <div className={styles.options}>
              {q.options.map((opt, oi) => {
                const isCorrect = oi === q.answer;
                const state = !isAnswered ? '' : isCorrect ? styles.correct : oi === picked ? styles.wrong : styles.dim;
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.option} ${state}`}
                    onClick={() => choose(qi, oi)}
                    disabled={isAnswered}
                    aria-pressed={picked === oi}
                  >
                    <span className={styles.optLetter}>{LETTERS[oi]}</span>
                    <span className={styles.optText}>{opt}</span>
                    {isAnswered && isCorrect && <Check size={18} aria-hidden="true" />}
                    {isAnswered && !isCorrect && oi === picked && <X size={18} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <p className={`${styles.explain} ${picked === q.answer ? styles.explainOk : styles.explainBad}`} role="status">
                <strong>{picked === q.answer ? 'सही उत्तर!' : `सही उत्तर: ${LETTERS[q.answer]}) ${q.options[q.answer]}`}</strong> {q.explain}
              </p>
            )}
          </fieldset>
        );
      })}

      <div className={styles.scoreBar} aria-live="polite">
        {finished ? (
          <>
            <span className={styles.scoreIcon}>
              <Trophy size={22} aria-hidden="true" />
            </span>
            <div className={styles.scoreText}>
              <strong>
                आपका परिणाम: {hindiNum(score)} / {hindiNum(questions.length)}
              </strong>
              <span>{verdict}</span>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={retry}>
              <RotateCcw size={15} aria-hidden="true" /> पुनः प्रयास
            </button>
          </>
        ) : (
          <span className={styles.scoreHint}>
            {hindiNum(answered)} / {hindiNum(questions.length)} प्रश्न हल किए — किसी विकल्प पर क्लिक करें
          </span>
        )}
      </div>
    </div>
  );
}
