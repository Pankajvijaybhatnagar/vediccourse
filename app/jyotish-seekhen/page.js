import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { LESSONS, LESSON_CARDS, TOTAL_MINUTES, hindiNum } from '@/lib/jyotish/lessons';
import CourseMap from './CourseMap';
import styles from './jyotish.module.css';

export const metadata = {
  title: 'ज्योतिष सीखें — मूल से गहराई तक, शुद्ध हिंदी में',
  description:
    'वैदिक ज्योतिष का निःशुल्क पाठ्यक्रम: नवग्रह, राशियाँ, भाव, नक्षत्र, कुंडली पढ़ना, पंचांग, दशा, योग, दोष और उपाय — सरल हिंदी में, प्रश्नोत्तरी सहित।',
};

const STEPS = [
  { icon: '📖', title: 'पाठ पढ़ें', text: 'हर पाठ को छोटे-छोटे खंडों में बाँटा गया है — सरल भाषा, सारणियाँ और "याद रखें" सूत्रों के साथ।' },
  { icon: '🧠', title: 'प्रश्नोत्तरी हल करें', text: 'पाठ के अंत में दिए प्रश्न हल करें। हर उत्तर के साथ उसकी व्याख्या भी मिलेगी।' },
  { icon: '🪔', title: 'अभ्यास करें', text: 'अपनी मुफ़्त कुंडली बनाकर सीखे हुए नियम उस पर लागू करें — यही सच्चा अभ्यास है।' },
];

export default function JyotishSeekhenPage() {
  const quizCount = LESSONS.reduce((n, l) => n + l.quiz.length, 0);

  return (
    <>
      <PageHeader
        eyebrow="निःशुल्क पाठ्यक्रम"
        title="ज्योतिष"
        highlight="सीखें"
        crumb="ज्योतिष सीखें"
        lead="वैदिक ज्योतिष को मूल से सीखिए — नवग्रह और राशियों से आरंभ कर कुंडली, दशा, योग और उपायों तक। शुद्ध, सरल हिंदी में, चरण-दर-चरण।"
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.stats}>
            {[
              [hindiNum(LESSONS.length), 'विस्तृत पाठ'],
              [`${hindiNum(Math.round(TOTAL_MINUTES / 60))}+ घंटे`, 'अध्ययन सामग्री'],
              [hindiNum(quizCount), 'अभ्यास प्रश्न'],
              ['१००%', 'निःशुल्क'],
            ].map(([value, label]) => (
              <div key={label} className={styles.stat}>
                <strong className="gold-text">{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <Reveal className={styles.stepsWrap}>
            <h2 className={styles.blockTitle}>
              <span className={styles.om} aria-hidden="true">
                ॐ
              </span>
              कैसे सीखें?
            </h2>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => (
                <li key={s.title} className={`${styles.step} mandala-bg`}>
                  <span className={styles.stepNum}>{hindiNum(i + 1)}</span>
                  <span className={styles.stepIcon} aria-hidden="true">
                    {s.icon}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <CourseMap lessons={LESSON_CARDS} />

          <Reveal className={styles.next}>
            <div>
              <span className={styles.nextEyebrow}>आगे क्या?</span>
              <h2>सीखे हुए ज्ञान को अपनी कुंडली पर परखें</h2>
              <p>अपनी जन्म कुंडली बनाइए और देखिए कि आपका लग्न, राशि, नक्षत्र और महादशा क्या है। आज का पंचांग देखकर तिथि-नक्षत्र पहचानने का अभ्यास करें।</p>
            </div>
            <div className={styles.nextBtns}>
              <Link href="/birth-chart" className="btn btn-primary btn-lg">
                मुफ़्त कुंडली बनाएँ
              </Link>
              <Link href="/panchang" className={`btn btn-lg ${styles.ghostLight}`}>
                आज का पंचांग
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
