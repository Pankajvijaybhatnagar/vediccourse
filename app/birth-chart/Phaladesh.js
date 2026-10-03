'use client';

import { useMemo, useState } from 'react';
import { localizeSign } from '@/lib/zodiac';
import { GRAHAS } from '@/lib/kundli';
import { analyse, DIGNITY_LABEL } from '@/lib/phaladesh';
import { HOUSE_TOPICS } from '@/lib/phaladesh/houses';
import { GRAHA_UPAY, DOSHA_UPAY, GENERAL_UPAY } from '@/lib/phaladesh/remedies';
import { useLang } from '@/lib/i18n';
import styles from './phaladesh.module.css';

const ICON = { sun: '☉', moon: '☽', mars: '♂', mercury: '☿', jupiter: '♃', venus: '♀', saturn: '♄', rahu: '☊', ketu: '☋' };

function Tag({ type }) {
  const { t } = useLang();
  return <span className={`${styles.tag} ${styles['tag_' + type]}`}>{t(DIGNITY_LABEL[type])}</span>;
}

function UpayCard({ item }) {
  const { t, lang } = useLang();
  const u = GRAHA_UPAY[item.key];
  const name = t(GRAHAS.find((g) => g.key === item.key).name);
  return (
    <article className={styles.upay}>
      <header>
        <span className={`glyph ${styles.upayIcon}`}>{ICON[item.key]}</span>
        <div>
          <h4>{t({ en: `${name} remedies`, hi: `${name} के उपाय` })}</h4>
          <div className={styles.why}>
            {item.why.map((w) => (
              <span key={w.en}>{t(w)}</span>
            ))}
          </div>
        </div>
      </header>
      <div className={styles.mantra}>
        <small>{t({ en: 'Beej mantra', hi: 'बीज मंत्र' })}</small>
        <p lang="sa">{u.mantra}</p>
        <span>
          {t({
            en: `Chant ${u.japa.toLocaleString('en-IN')} times in total (e.g. 108 daily), starting on a ${u.day.en}.`,
            hi: `कुल ${u.japa.toLocaleString('hi-IN')} जाप करें (जैसे प्रतिदिन 108), ${u.day.hi} से आरंभ करें।`,
          })}
        </span>
      </div>
      <dl className={styles.facts}>
        <div>
          <dt>{t({ en: 'Day', hi: 'दिन' })}</dt>
          <dd>{t(u.day)}</dd>
        </div>
        <div>
          <dt>{t({ en: 'Worship', hi: 'उपासना' })}</dt>
          <dd>{t(u.deity)}</dd>
        </div>
        <div>
          <dt>{t({ en: 'Colour', hi: 'रंग' })}</dt>
          <dd>{t(u.color)}</dd>
        </div>
        <div>
          <dt>{t({ en: 'Daan (charity)', hi: 'दान' })}</dt>
          <dd>{t(u.daan)}</dd>
        </div>
      </dl>
      <ul className={styles.actions}>
        {u.actions.map((a) => (
          <li key={a.en}>{t(a)}</li>
        ))}
      </ul>
      <p className={styles.gem}>
        💎 <b>{t({ en: 'Gemstone:', hi: 'रत्न:' })}</b> {t(u.gem)}
        {/expert|विशेषज्ञ/.test(t(u.gem)) ? '' : lang === 'hi' ? ' — रत्न केवल विशेषज्ञ से कुंडली दिखाकर ही धारण करें।' : ' — wear a gemstone only after an expert checks your full chart.'}
      </p>
    </article>
  );
}

export default function Phaladesh({ kundli }) {
  const { t, lang } = useLang();
  const a = useMemo(() => analyse(kundli), [kundli]);
  const [openAll, setOpenAll] = useState(false);
  const L = (sign) => localizeSign(sign, lang).name;
  const gName = (key) => t(GRAHAS.find((g) => g.key === key).name);
  const fmt = (d) => d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short', year: 'numeric' });
  const shownGrahas = openAll ? a.grahas : a.grahas.slice(0, 5);

  return (
    <div className={styles.wrap}>
      {/* ------------------------------------------------------------ Phaladesh */}
      <div className={styles.head}>
        <span className="eyebrow">{t({ en: 'Predictions', hi: 'भविष्यफल' })}</span>
        <h2>
          {t({ en: 'Your', hi: 'आपका' })} <span className="gold-text">{t({ en: 'Phaladesh', hi: 'फलादेश' })}</span>
        </h2>
        <p className="muted">{t({ en: 'Results of your Lagna, Moon sign, each planet, the running dasha, and the yogas and doshas in your chart.', hi: 'आपके लग्न, चंद्र राशि, प्रत्येक ग्रह, वर्तमान दशा तथा कुंडली के योग और दोषों का फल।' })}</p>
      </div>

      <div className={styles.two}>
        <section className={`card ${styles.block}`}>
          <h3>
            <span className={`glyph ${styles.bigGlyph}`}>{kundli.lagna.sign.glyph}</span> {t({ en: 'Lagna Phal', hi: 'लग्न फल' })} · {L(kundli.lagna.sign)}
          </h3>
          <p>{t(a.lagna.phal)}</p>
          <p className={styles.note}>{t(a.lagna.lordNote)}</p>
        </section>
        <section className={`card ${styles.block}`}>
          <h3>
            <span className={`glyph ${styles.bigGlyph}`}>{kundli.rashi.glyph}</span> {t({ en: 'Rashi Phal', hi: 'राशि फल' })} · {L(kundli.rashi)}
          </h3>
          <p>{t(a.rashi.phal)}</p>
          <p className={styles.note}>
            {t({ en: 'Nakshatra', hi: 'नक्षत्र' })}: {t(kundli.nakshatra.name)} ({t({ en: 'Pada', hi: 'चरण' })} {kundli.nakshatra.pada})
          </p>
        </section>
      </div>

      {a.dasha && (
        <section className={`card ${styles.block} ${styles.dasha}`}>
          <h3>⏳ {t({ en: 'Dasha Phal (current period)', hi: 'दशा फल (वर्तमान समय)' })}</h3>
          <div className={styles.dashaGrid}>
            {[
              [a.dasha.md, { en: 'Mahadasha', hi: 'महादशा' }],
              [a.dasha.ad, { en: 'Antardasha', hi: 'अंतर्दशा' }],
            ]
              .filter(([d]) => d)
              .map(([d, label]) => (
                <div key={label.en} className={styles.dashaItem}>
                  <div className={styles.dashaTop}>
                    <span className={`glyph ${styles.upayIcon}`}>{ICON[d.lord]}</span>
                    <div>
                      <strong>
                        {gName(d.lord)} {t(label)}
                      </strong>
                      <small>
                        {fmt(d.start)} – {fmt(d.end)}
                      </small>
                    </div>
                  </div>
                  <p>{t(d.phal)}</p>
                  <p className={styles.note}>{t(d.focus)}</p>
                </div>
              ))}
          </div>
        </section>
      )}

      <section className={`card ${styles.block}`}>
        <h3>🪐 {t({ en: 'Graha Phal (planet by planet)', hi: 'ग्रह फल (प्रत्येक ग्रह का)' })}</h3>
        <div className={styles.grahaList}>
          {shownGrahas.map((x) => (
            <article key={x.key} className={styles.graha}>
              <div className={styles.grahaHead}>
                <span className={`glyph ${styles.upayIcon}`}>{ICON[x.key]}</span>
                <div>
                  <strong>{t(x.name)}</strong>
                  <small>
                    {t({ en: `House ${x.house}`, hi: `${x.house}वाँ भाव` })} · {L(x.sign)}
                    {x.lordOf.length > 0 && ` · ${t({ en: `lord of ${x.lordOf.join(', ')}`, hi: `${x.lordOf.join(', ')} भाव के स्वामी` })}`}
                  </small>
                </div>
                <div className={styles.tags}>
                  {x.tags.map((tg) => (
                    <Tag key={tg} type={tg} />
                  ))}
                </div>
              </div>
              <p className={styles.topic}>{t(HOUSE_TOPICS[x.house - 1])}</p>
              <p>{t(x.phal)}</p>
              {x.notes.map((n) => (
                <p key={n.en} className={styles.note}>
                  {t(n)}
                </p>
              ))}
            </article>
          ))}
        </div>
        {a.grahas.length > 5 && (
          <button type="button" className={`btn btn-ghost btn-sm ${styles.more}`} onClick={() => setOpenAll((o) => !o)}>
            {openAll ? t({ en: 'Show less', hi: 'कम दिखाएँ' }) : t({ en: 'Show all 9 planets', hi: 'सभी 9 ग्रह देखें' })}
          </button>
        )}
      </section>

      <div className={styles.two}>
        <section className={`card ${styles.block}`}>
          <h3>✨ {t({ en: 'Yogas in your chart', hi: 'आपकी कुंडली के योग' })}</h3>
          {a.yogas.length ? (
            <ul className={styles.yogaList}>
              {a.yogas.map((y) => (
                <li key={y.name.en}>
                  <strong>{t(y.name)}</strong>
                  <span>{t(y.text)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">{t({ en: 'None of the major yogas we check (Gajakesari, Budhaditya, Chandra-Mangal, Panch Mahapurush) is formed. An expert can find other yogas in your full chart.', hi: 'हमारे द्वारा जाँचे गए प्रमुख योगों (गजकेसरी, बुधादित्य, चंद्र-मंगल, पंच महापुरुष) में से कोई नहीं बना। विशेषज्ञ पूरी कुंडली में अन्य योग देख सकते हैं।' })}</p>
          )}
        </section>
        <section className={`card ${styles.block}`}>
          <h3>⚠️ {t({ en: 'Doshas & Shani status', hi: 'दोष एवं शनि स्थिति' })}</h3>
          {a.doshas.length ? (
            <ul className={styles.doshaList}>
              {a.doshas.map((d) => (
                <li key={d.key} className={styles['level_' + d.level]}>
                  <strong>{t(d.name)}</strong>
                  <span>{t(d.text)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.clean}>✓ {t({ en: 'No Manglik, Kaal Sarp or Grahan dosha, and no Sade Sati or Dhaiya running now.', hi: 'मांगलिक, कालसर्प या ग्रहण दोष नहीं है, और अभी साढ़ेसाती या ढैया भी नहीं चल रही।' })}</p>
          )}
        </section>
      </div>

      {/* ------------------------------------------------------------ Upay */}
      <div className={styles.head}>
        <span className="eyebrow">{t({ en: 'Remedies', hi: 'उपाय' })}</span>
        <h2>
          {t({ en: 'Your', hi: 'आपके' })} <span className="gold-text">{t({ en: 'Upay', hi: 'उपाय' })}</span>
        </h2>
        <p className="muted">
          {t({
            en: 'Chosen from your chart: planets that are weak (debilitated, combust or in difficult houses), your running dasha lords, and any doshas.',
            hi: 'आपकी कुंडली से चुने गए: कमज़ोर ग्रह (नीच, अस्त या कठिन भावों में), वर्तमान दशा के स्वामी, और दोष।',
          })}
        </p>
      </div>

      <div className={styles.upayGrid}>
        {a.upay.map((item) => (
          <UpayCard key={item.key} item={item} />
        ))}
      </div>

      {a.doshas.length > 0 && (
        <section className={`card ${styles.block}`}>
          <h3>🛡️ {t({ en: 'Dosha nivaran (remedies for doshas)', hi: 'दोष निवारण के उपाय' })}</h3>
          <div className={styles.doshaUpay}>
            {a.doshas.map((d) => (
              <div key={d.key}>
                <strong>{t(d.name)}</strong>
                <ul className={styles.actions}>
                  {DOSHA_UPAY[d.key].map((x) => (
                    <li key={x.en}>{t(x)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className={styles.two}>
        <section className={`card ${styles.block}`}>
          <h3>🙏 {t({ en: 'Daily upay for everyone', hi: 'सबके लिए दैनिक उपाय' })}</h3>
          <ul className={styles.actions}>
            {GENERAL_UPAY.map((x) => (
              <li key={x.en}>{t(x)}</li>
            ))}
          </ul>
        </section>
        <section className={`card ${styles.block}`}>
          <h3>💎 {t({ en: 'Lucky gemstone (Lagna lord)', hi: 'भाग्य रत्न (लग्नेश का)' })}</h3>
          <p>
            {t({
              en: `Your lagna lord is ${gName(a.luckyGemLord)}. Strengthening it supports health, confidence and overall luck:`,
              hi: `आपके लग्नेश ${gName(a.luckyGemLord)} हैं। इन्हें बलवान करने से स्वास्थ्य, आत्मविश्वास और समग्र भाग्य को बल मिलता है:`,
            })}
          </p>
          <p className={styles.gem}>{t(GRAHA_UPAY[a.luckyGemLord].gem)}</p>
          <p className={styles.note}>{t({ en: 'Mantra, daan and good conduct are always safe. Gemstones act strongly — wear one only after an expert reviews your full chart.', hi: 'मंत्र, दान और सदाचार सदैव सुरक्षित हैं। रत्नों का प्रभाव तीव्र होता है — पूरी कुंडली विशेषज्ञ को दिखाकर ही रत्न धारण करें।' })}</p>
        </section>
      </div>

      <p className={styles.disclaimer}>
        {t({
          en: 'This Phaladesh is generated from classical rules applied to your chart. It is for guidance and reflection; it is not a substitute for medical, legal or financial advice. For a detailed reading, consult one of our experts.',
          hi: 'यह फलादेश आपकी कुंडली पर शास्त्रीय नियम लागू करके बनाया गया है। यह मार्गदर्शन और चिंतन के लिए है; चिकित्सा, कानूनी या वित्तीय सलाह का विकल्प नहीं है। विस्तृत विश्लेषण के लिए हमारे विशेषज्ञों से परामर्श लें।',
        })}
      </p>
    </div>
  );
}
