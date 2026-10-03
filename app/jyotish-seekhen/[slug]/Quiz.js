'use client';

import { useState } from 'react';
import { Check, X, RotateCcw, Trophy, Send } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { hindiNum } from '@/lib/jyotish/num';
import styles from './lesson.module.css';

const LETTERS = ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज'];

/**
 * प्रश्नोत्तरी: उत्तर चुनें, फिर सर्वर पर जाँच (POST /jyotish/lessons/:slug/quiz)।
 * सही उत्तर और व्याख्या केवल जमा करने के बाद सर्वर से आते हैं।
 */
export default function Quiz({ slug, questions }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const [result, setResult] = useState(null); // grading response
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [round, setRound] = useState(0);

  const answered = answers.filter((a) => a !== null).length;
  const allAnswered = answered === questions.length;

  const choose = (qi, oi) => {
    if (result) return;
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)));
  };

  const submit = async () => {
    setBusy(true);
    setError('');
    try {
      const { data } = await api(`/jyotish/lessons/${encodeURIComponent(slug)}/quiz`, { method: 'POST', body: { answers } });
      setResult(data);
    } catch (err) {
      setError(err.status ? err.message : 'सर्वर से संपर्क नहीं हो सका। कृपया पुनः प्रयास करें।');
    } finally {
      setBusy(false);
    }
  };

  const retry = () => {
    setAnswers(questions.map(() => null));
    setResult(null);
    setError('');
    setRound((r) => r + 1);
  };

  const score = result?.score ?? 0;
  const total = result?.total ?? questions.length;
  const verdict =
    score === total
      ? 'उत्कृष्ट! आपने सभी प्रश्नों के सही उत्तर दिए।'
      : result?.passed
        ? 'बहुत अच्छा! थोड़ा और दोहराने से आप पूर्ण निपुण हो जाएँगे।'
        : 'कोई बात नहीं — पाठ एक बार फिर पढ़ें और पुनः प्रयास करें।';

  return (
    <div className={styles.quiz} key={round}>
      {questions.map((q, qi) => {
        const picked = answers[qi];
        const graded = result?.results?.[qi];
        const correctIdx = graded?.correctAnswer;
        return (
          <fieldset key={`${qi}-${q.q}`} className={styles.question}>
            <legend className={styles.qText}>
              <span className={styles.qNum}>प्रश्न {hindiNum(qi + 1)}</span>
              {q.q}
            </legend>
            <div className={styles.options} role="radiogroup" aria-label={`प्रश्न ${hindiNum(qi + 1)} के विकल्प`}>
              {q.options.map((opt, oi) => {
                const isCorrect = graded && oi === correctIdx;
                const state = !graded
                  ? picked === oi
                    ? styles.selected
                    : ''
                  : isCorrect
                    ? styles.correct
                    : oi === picked
                      ? styles.wrong
                      : styles.dim;
                return (
                  <button
                    key={`${oi}-${opt}`}
                    type="button"
                    role="radio"
                    className={`${styles.option} ${state}`}
                    onClick={() => choose(qi, oi)}
                    disabled={Boolean(result) || busy}
                    aria-checked={picked === oi}
                  >
                    <span className={styles.optLetter}>{LETTERS[oi]}</span>
                    <span className={styles.optText}>{opt}</span>
                    {graded && isCorrect && <Check size={18} aria-hidden="true" />}
                    {graded && !isCorrect && oi === picked && <X size={18} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            {graded && (
              <p className={`${styles.explain} ${graded.correct ? styles.explainOk : styles.explainBad}`} role="status">
                <strong>
                  {graded.correct
                    ? 'सही उत्तर!'
                    : picked === null
                      ? `उत्तर नहीं दिया। सही उत्तर: ${LETTERS[correctIdx]}) ${q.options[correctIdx]}`
                      : `सही उत्तर: ${LETTERS[correctIdx]}) ${q.options[correctIdx]}`}
                </strong>{' '}
                {graded.explain}
              </p>
            )}
          </fieldset>
        );
      })}

      <div className={styles.scoreBar} aria-live="polite">
        {result ? (
          <>
            <span className={styles.scoreIcon}>
              <Trophy size={22} aria-hidden="true" />
            </span>
            <div className={styles.scoreText}>
              <strong>
                आपका परिणाम: {hindiNum(score)} / {hindiNum(total)}
              </strong>
              <span>
                {verdict}
                {user && result.progress && ` (सर्वश्रेष्ठ: ${hindiNum(result.progress.bestScore)}/${hindiNum(total)})`}
              </span>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={retry}>
              <RotateCcw size={15} aria-hidden="true" /> पुनः प्रयास
            </button>
          </>
        ) : (
          <>
            <span className={styles.scoreHint}>
              {hindiNum(answered)} / {hindiNum(questions.length)} प्रश्नों के उत्तर चुने गए
              {!allAnswered && ' — सभी प्रश्नों के उत्तर चुनें'}
            </span>
            <button type="button" className="btn btn-primary btn-sm" onClick={submit} disabled={!allAnswered || busy}>
              <Send size={15} aria-hidden="true" /> {busy ? 'जाँच हो रही है…' : 'उत्तर जाँचें'}
            </button>
          </>
        )}
      </div>
      {error && (
        <p className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
