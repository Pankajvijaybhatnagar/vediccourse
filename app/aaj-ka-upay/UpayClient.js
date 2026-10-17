'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Ban, CalendarDays, Check, ChevronLeft, ChevronRight, Clock, Copy, Flame, Flower2, Gift, Info, MapPin, Moon, Palette, Printer,
  Share2, Sparkles, Star, Sun, TriangleAlert,
} from 'lucide-react';
import { getDailyUpay, dayHighlights, NAVDURGA } from '@/lib/upay';
import { upcoming } from '@/lib/hinduCalendar';
import { fmtMinutes, CITIES } from '@/lib/panchang';
import { ELEMENTS } from '@/lib/zodiac';
import { useLang } from '@/lib/i18n';
import useCity from '@/lib/useCity';
import styles from './upay.module.css';

const toIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function MantraBox({ text, label }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <div className={styles.mantra}>
      {label && <small>{t(label)}</small>}
      <p>{text}</p>
      <button type="button" onClick={copy} aria-label={t({ en: 'Copy mantra', hi: 'मंत्र कॉपी करें' })}>
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
    </div>
  );
}

function Steps({ items }) {
  const { t } = useLang();
  return (
    <ol className={styles.steps}>
      {items.map((s, i) => (
        <li key={i}>
          <span>{i + 1}</span>
          <p>{t(s)}</p>
        </li>
      ))}
    </ol>
  );
}

function UpayCard({ icon: Ico, eyebrow, title, sub, item, accent }) {
  const { t } = useLang();
  const upay = Array.isArray(item.upay) ? item.upay : [item.upay];
  return (
    <article className={styles.card} style={accent ? { '--accent': accent } : undefined}>
      <header className={styles.cardHead}>
        <span className={styles.cardIcon}>
          <Ico size={20} />
        </span>
        <div>
          <small>{t(eyebrow)}</small>
          <h3>{t(title)}</h3>
          {sub && <em>{sub}</em>}
        </div>
      </header>
      {item.about && <p className={styles.about}>{t(item.about)}</p>}
      {item.nature && <p className={styles.about}>{t(item.nature)}</p>}
      {item.mantra && <MantraBox text={item.mantra} />}
      <Steps items={upay} />
      {item.note && (
        <p className={styles.note}>
          <Info size={15} /> {t(item.note)}
        </p>
      )}
      {(item.daan || item.avoid) && (
        <dl className={styles.meta}>
          {item.daan && (
            <div>
              <dt>
                <Gift size={14} /> {t({ en: 'Daan', hi: 'दान' })}
              </dt>
              <dd>{t(item.daan)}</dd>
            </div>
          )}
          {item.avoid && (
            <div className={styles.avoid}>
              <dt>
                <Ban size={14} /> {t({ en: 'Avoid', hi: 'वर्जित' })}
              </dt>
              <dd>{t(item.avoid)}</dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}

function NavratriBlock({ n, rules, date, onPick }) {
  const { t, lang } = useLang();
  const d = n.devi;
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN';
  return (
    <section className={styles.navratri} style={{ '--devi': d.color.hex }} id="navratri">
      <div className={styles.navHero}>
        <div className={styles.dayRing} aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" className={styles.ringBg} />
            <circle cx="60" cy="60" r="52" className={styles.ringFg} style={{ strokeDashoffset: 327 - (327 * n.day) / 9 }} />
          </svg>
          <span>
            <strong>{n.day}</strong>
            <small>/ 9</small>
          </span>
        </div>
        <div className={styles.navText}>
          <span className={styles.navKind}>
            {t(n.name)} · {t({ en: `Day ${n.day}`, hi: `${n.day}वाँ दिन` })}
          </span>
          <h2>{t(d.name)}</h2>
          <p>{t(d.form)}</p>
          <div className={styles.navChips}>
            <span>
              <i style={{ background: d.color.hex }} />
              <Palette size={14} /> {t({ en: 'Colour', hi: 'शुभ रंग' })}: <b>{t(d.color.name)}</b>
            </span>
            <span>
              🍯 {t({ en: 'Bhog', hi: 'भोग' })}: <b>{t(d.bhog)}</b>
            </span>
            <span>
              <Flower2 size={14} /> {t({ en: 'Flower', hi: 'पुष्प' })}: <b>{t(d.flower)}</b>
            </span>
            <span>
              <Moon size={14} /> {t({ en: 'Planet', hi: 'ग्रह' })}: <b>{t(d.planet)}</b>
            </span>
          </div>
        </div>
      </div>

      {d.special && (
        <p className={styles.special}>
          <Sparkles size={16} /> {t(d.special)}
        </p>
      )}

      <div className={styles.navGrid}>
        <div>
          <MantraBox label={{ en: 'Beej mantra · chant 108 times', hi: 'बीज मंत्र · 108 बार जाप करें' }} text={d.beej} />
          <MantraBox label={{ en: 'Dhyana mantra', hi: 'ध्यान मंत्र' }} text={d.dhyana} />
          <MantraBox label={{ en: 'Stuti for every day', hi: 'प्रतिदिन की स्तुति' }} text={rules.common} />
          <p className={styles.benefit}>
            <Star size={16} /> <b>{t({ en: 'Blessing', hi: 'फल' })}:</b> {t(d.benefit)}
          </p>
        </div>
        <div>
          <h3 className={styles.subHead}>
            <Flame size={18} /> {t({ en: `Upay for ${d.name.en}`, hi: `${d.name.hi} के उपाय` })}
          </h3>
          <Steps items={d.upay} />
          <p className={styles.avoidLine}>
            <Ban size={15} /> {t(d.avoid)}
          </p>
        </div>
      </div>

      {n.mahavidya && (
        <div className={styles.mahavidya}>
          <h3>
            {t({ en: 'Gupt Navratri Mahavidya of the day', hi: 'आज की गुप्त नवरात्रि महाविद्या' })}: {t(n.mahavidya.name)}
          </h3>
          <MantraBox text={n.mahavidya.beej} />
          <p>
            {t(n.mahavidya.gift)}.{' '}
            {t({ en: 'Mahavidya sadhana should be done under the guidance of a guru.', hi: 'महाविद्या साधना गुरु के मार्गदर्शन में ही करें।' })}
          </p>
        </div>
      )}

      {n.span.length > 1 && (
        <div className={styles.tracker}>
          <h3 className={styles.subHead}>
            <CalendarDays size={18} /> {t({ en: 'Navratri at a glance', hi: 'नवरात्रि एक दृष्टि में' })}
          </h3>
          <ol>
            {n.span.map((s, i) => {
              const repeat = i > 0 && n.span[i - 1].day === s.day;
              const label = s.day === 10 ? { en: 'Vijayadashami', hi: 'विजयादशमी' } : NAVDURGA[s.day - 1].name;
              return (
                <li key={s.date} className={`${s.date === date ? styles.now : ''} ${s.date < date ? styles.done : ''}`}>
                  <button type="button" onClick={() => onPick(s.date)}>
                    <span className={styles.trDay}>{s.day === 10 ? '🏹' : s.day}</span>
                    <strong>{t(label)}</strong>
                    <small>
                      {new Date(`${s.date}T12:00`).toLocaleDateString(locale, { day: 'numeric', month: 'short', weekday: 'short' })}
                      {repeat && ` · ${t({ en: 'tithi continues', hi: 'तिथि वृद्धि' })}`}
                    </small>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className={styles.rules}>
        <div>
          <h4>✔ {t({ en: 'Do during Navratri', hi: 'नवरात्रि में करें' })}</h4>
          <ul>
            {rules.do.map((r, i) => (
              <li key={i}>{t(r)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>✘ {t({ en: 'Avoid during Navratri', hi: 'नवरात्रि में न करें' })}</h4>
          <ul>
            {rules.dont.map((r, i) => (
              <li key={i}>{t(r)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function UpayClient() {
  const { t, lang } = useLang();
  const { cityId, city, setCityId } = useCity();
  const [date, setDate] = useState('');
  const [today, setToday] = useState('');
  const [nowMins, setNowMins] = useState(null);
  const [rashiOpen, setRashiOpen] = useState(null);
  const [shared, setShared] = useState(false);
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN';

  // Resolve dates in the browser; honour ?date= links from the Panchang page.
  useEffect(() => {
    const now = new Date();
    const q = new URLSearchParams(window.location.search).get('date');
    setToday(toIso(now));
    setDate(q && /^\d{4}-\d{2}-\d{2}$/.test(q) ? q : toIso(now));
    setNowMins(now.getHours() * 60 + now.getMinutes());
  }, []);

  const u = useMemo(() => (date ? getDailyUpay(date, city) : null), [date, city]);
  const next = useMemo(() => (date ? upcoming(date, city, 30).slice(1) : []), [date, city]);
  const isToday = date === today;

  const shift = (days) => {
    const d = new Date(`${date}T12:00`);
    d.setDate(d.getDate() + days);
    setDate(toIso(d));
  };
  const pick = (iso) => {
    setDate(iso);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!u) return <section className={styles.section} />;
  const { day, navratri } = u;
  const pc = day.panchang;
  const range = (w) => `${fmtMinutes(w.start)} – ${fmtMinutes(w.end)}`;
  const pakshaWord = (x) => x.split(' ')[0];

  const hinduLine = t({
    en: `${day.month.adhik ? 'Adhik ' : ''}${day.month.purnimanta.en} ${pakshaWord(pc.tithi.paksha.en)} ${pc.tithi.name.en} · Vikram Samvat ${day.samvat}`,
    hi: `${day.month.adhik ? 'अधिक ' : ''}${day.month.purnimanta.hi} ${pakshaWord(pc.tithi.paksha.hi)} ${pc.tithi.name.hi} · विक्रम संवत ${day.samvat}`,
  });

  const lead = navratri ? null : u.festivals[0] || u.vrats[0] || null;
  const highlights = dayHighlights(day);

  const shareText = () => {
    const L = (v) => t(v);
    const main = navratri ? navratri.devi : lead || u.tithi;
    const steps = (navratri ? navratri.devi.upay : main.upay || []).slice(0, 2).map((s, i) => `${i + 1}. ${L(s)}`);
    return [
      `🪔 ${L({ en: "Today's Upay", hi: 'आज का उपाय' })} — ${new Date(`${date}T12:00`).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}`,
      hinduLine,
      highlights.length ? `✨ ${highlights.map((h) => L(h.label)).join(' · ')}` : '',
      `🙏 ${L(navratri ? navratri.devi.name : u.headline.title)}`,
      `📿 ${navratri ? navratri.devi.beej : main.mantra}`,
      ...steps,
      `${L({ en: 'Vaar', hi: 'वार' })}: ${L(u.vaar.upay[0])}`,
      `⚠ ${L({ en: 'Rahu Kaal', hi: 'राहु काल' })}: ${range(pc.rahu)}`,
      `${window.location.origin}/aaj-ka-upay?date=${date}`,
    ]
      .filter(Boolean)
      .join('\n');
  };
  const share = async () => {
    const text = shareText();
    try {
      if (navigator.share) await navigator.share({ title: t({ en: "Today's Upay", hi: 'आज का उपाय' }), text });
      else {
        await navigator.clipboard.writeText(text);
        setShared(true);
        setTimeout(() => setShared(false), 1800);
      }
    } catch {}
  };

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Controls */}
        <div className={`card ${styles.controls}`}>
          <div className={styles.dateNav}>
            <button onClick={() => shift(-1)} aria-label={t({ en: 'Previous day', hi: 'पिछला दिन' })}>
              <ChevronLeft size={20} />
            </button>
            <label className="sr-only" htmlFor="up-date">
              {t({ en: 'Date', hi: 'तिथि' })}
            </label>
            <input id="up-date" type="date" className="input" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} min="1900-01-01" max="2100-12-31" />
            <button onClick={() => shift(1)} aria-label={t({ en: 'Next day', hi: 'अगला दिन' })}>
              <ChevronRight size={20} />
            </button>
            {!isToday && (
              <button className={styles.todayBtn} onClick={() => setDate(today)}>
                {t({ en: 'Today', hi: 'आज' })}
              </button>
            )}
          </div>
          <div className={styles.cityPick}>
            <MapPin size={18} />
            <label className="sr-only" htmlFor="up-city">
              {t({ en: 'City', hi: 'शहर' })}
            </label>
            <select id="up-city" className="input" value={cityId} onChange={(e) => setCityId(e.target.value)}>
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {t(c.name)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Day strip */}
        <div className={`${styles.strip} fade-up`} key={date + cityId}>
          <div className={styles.stripDate}>
            <span className={styles.stripDay}>{new Date(`${date}T12:00`).getDate()}</span>
            <span>
              <strong>{new Date(`${date}T12:00`).toLocaleDateString(locale, { weekday: 'long', month: 'long', year: 'numeric' })}</strong>
              <small>{hinduLine}</small>
            </span>
          </div>
          <ul className={styles.stripFacts}>
            <li>
              <small>{t({ en: 'Tithi', hi: 'तिथि' })}</small>
              <strong>{t(pc.tithi.name)}</strong>
            </li>
            <li>
              <small>{t({ en: 'Nakshatra', hi: 'नक्षत्र' })}</small>
              <strong>{t(pc.nakshatra.name)}</strong>
            </li>
            <li>
              <small>{t({ en: 'Yoga', hi: 'योग' })}</small>
              <strong>{t(pc.yoga)}</strong>
            </li>
            <li>
              <small>{t({ en: 'Sunrise', hi: 'सूर्योदय' })}</small>
              <strong>{fmtMinutes(pc.sunrise)}</strong>
            </li>
          </ul>
          {highlights.length > 0 && (
            <div className={styles.stripTags}>
              {highlights.map((h, i) => (
                <span key={i} className={styles[`tag_${h.tone}`]}>
                  {h.tone === 'devi' ? '🔱' : h.tone === 'fest' ? '🪔' : '🙏'} {t(h.label)}
                </span>
              ))}
            </div>
          )}
          <div className={styles.stripActions}>
            <button onClick={share} className="btn btn-primary btn-sm">
              {shared ? <Check size={15} /> : <Share2 size={15} />}{' '}
              {shared ? t({ en: 'Copied!', hi: 'कॉपी हो गया!' }) : t({ en: 'Share today’s upay', hi: 'आज का उपाय शेयर करें' })}
            </button>
            <button onClick={() => window.print()} className="btn btn-ghost btn-sm">
              <Printer size={15} /> {t({ en: 'Print', hi: 'प्रिंट' })}
            </button>
            <Link href="/panchang" className="btn btn-ghost btn-sm">
              {t({ en: 'Full Panchang', hi: 'पूरा पंचांग' })}
            </Link>
          </div>
        </div>

        {/* Headline: Navratri / festival / vrat */}
        {navratri && <NavratriBlock n={navratri} rules={u.rules} date={date} onPick={pick} />}

        {(u.festivals.length > 0 || u.vrats.length > 0) && (
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>
              <Sparkles size={22} /> {t({ en: 'Festivals & vrat today', hi: 'आज के पर्व एवं व्रत' })}
            </h2>
            <div className={styles.festGrid}>
              {u.festivals.map((f) => (
                <UpayCard key={f.key} icon={Flame} eyebrow={{ en: 'Festival', hi: 'पर्व' }} title={f.name} sub={t(f.deity)} item={f} accent="#d1342f" />
              ))}
              {u.vrats.map((v) => (
                <UpayCard key={v.key} icon={Moon} eyebrow={{ en: 'Vrat', hi: 'व्रत' }} title={v.name} sub={t(v.deity)} item={v} accent="#7b4bb3" />
              ))}
            </div>
          </div>
        )}

        {!navratri && !lead && (
          <p className={styles.plainDay}>
            <Info size={16} />{' '}
            {t({
              en: 'No major festival or vrat today — follow the tithi, vaar and nakshatra upay below.',
              hi: 'आज कोई बड़ा पर्व या व्रत नहीं है — नीचे दिए तिथि, वार और नक्षत्र के उपाय करें।',
            })}
          </p>
        )}

        {/* Daily panchang upay */}
        <div className={styles.block}>
          <h2 className={styles.blockTitle}>
            <Flame size={22} /> {t({ en: 'Upay by today’s panchang', hi: 'आज के पंचांग अनुसार उपाय' })}
          </h2>
          <div className={styles.threeGrid}>
            <UpayCard
              icon={Moon}
              eyebrow={{ en: `Tithi · ${pc.tithi.paksha.en}`, hi: `तिथि · ${pc.tithi.paksha.hi}` }}
              title={pc.tithi.name}
              sub={`${t({ en: 'Deity', hi: 'देवता' })}: ${t(u.tithi.deity)}`}
              item={u.tithi}
              accent="#3a63b8"
            />
            <UpayCard
              icon={Sun}
              eyebrow={{ en: `Vaar · ${u.vaar.planet.en}`, hi: `वार · ${u.vaar.planet.hi}` }}
              title={pc.vaara}
              sub={`${t({ en: 'Deity', hi: 'देवता' })}: ${t(u.vaar.deity)} · ${t({ en: 'Colour', hi: 'रंग' })}: ${t(u.vaar.color.name)}`}
              item={{ ...u.vaar, note: { en: `Planet mantra japa count: ${u.vaar.count.toLocaleString('en-IN')} (over 40 days).`, hi: `ग्रह मंत्र जाप संख्या: ${u.vaar.count.toLocaleString('en-IN')} (40 दिनों में)।` } }}
              accent={u.vaar.color.hex === '#eef0f3' ? '#9aa3ad' : u.vaar.color.hex}
            />
            <UpayCard
              icon={Star}
              eyebrow={{ en: `Nakshatra · lord ${u.nakshatra.lord.en}`, hi: `नक्षत्र · स्वामी ${u.nakshatra.lord.hi}` }}
              title={pc.nakshatra.name}
              sub={`${t({ en: 'Deity', hi: 'देवता' })}: ${t(u.nakshatra.deity)} · ${t({ en: 'Pada', hi: 'चरण' })} ${u.nakshatra.pada}`}
              item={u.nakshatra}
              accent="#1e9e5a"
            />
          </div>
        </div>

        {/* Timings & cautions */}
        <div className={styles.twoGrid}>
          <div className={`card ${styles.timings}`}>
            <h3>
              <Clock size={18} /> {t({ en: 'Best time for upay', hi: 'उपाय का शुभ समय' })}
            </h3>
            <ul>
              {u.timings.map((w) => {
                const live = isToday && nowMins >= w.start && nowMins < w.end;
                return (
                  <li key={w.key} className={live ? styles.live : ''}>
                    <span>
                      <strong>{t(w.label)}</strong>
                      <small>{t(w.use)}</small>
                    </span>
                    <b>{range(w)}</b>
                    {live && <em>{t({ en: 'Now', hi: 'अभी' })}</em>}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={`card ${styles.cautions}`}>
            <h3>
              <TriangleAlert size={18} /> {t({ en: 'Be careful today', hi: 'आज सावधानी' })}
            </h3>
            <ul>
              {u.cautions.map((c, i) => (
                <li key={i} className={styles[`c_${c.tone}`]}>
                  <strong>
                    {t(c.title)}
                    {c.time && <b> · {range(c.time)}</b>}
                  </strong>
                  <p>{t(c.text)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rashi-wise upay */}
        <div className={styles.block} id="rashi-upay">
          <h2 className={styles.blockTitle}>
            <Sparkles size={22} /> {t({ en: 'Upay for your rashi today', hi: 'आज आपकी राशि का उपाय' })}
          </h2>
          <p className={styles.blockLead}>
            {t({
              en: 'Based on the Moon’s transit from each rashi. Choose your Moon sign (or the rashi of your name’s first letter).',
              hi: 'हर राशि से चंद्रमा के गोचर पर आधारित। अपनी चंद्र राशि (या नाम के पहले अक्षर की राशि) चुनें।',
            })}
          </p>
          <div className={styles.rashiGrid}>
            {u.rashi.map((r, i) => {
              const open = rashiOpen === i;
              return (
                <button
                  key={r.slug}
                  type="button"
                  className={`${styles.rashi} ${open ? styles.rashiOpen : ''} ${r.chandrashtama ? styles.rashiWarn : ''}`}
                  style={{ '--el': ELEMENTS[r.element].color }}
                  onClick={() => setRashiOpen(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className={styles.rashiTop}>
                    <span className={`glyph ${styles.rashiGlyph}`}>{r.glyph}</span>
                    <span>
                      <strong>{r.name.hi}</strong>
                      <small>{r.sign.name}</small>
                    </span>
                    <span className={styles.rashiStars}>{'★'.repeat(r.stars)}</span>
                  </span>
                  <span className={styles.rashiMantra}>{r.remedy.mantra}</span>
                  <span className={styles.rashiAct}>{t(r.remedy.act)}</span>
                  {open && (
                    <span className={styles.rashiMore}>
                      {r.remedy.extra && <span className={styles.rashiMantra}>{r.remedy.extra}</span>}
                      <span>
                        {t({ en: 'Chant 108 times', hi: '108 बार जाप करें' })} · {t({ en: 'Rashi lord', hi: 'राशि स्वामी' })}: {t(r.lord)}
                      </span>
                      <span>
                        {t({ en: 'Lucky colour', hi: 'शुभ रंग' })}: <b>{t(r.lucky.color)}</b> · {t({ en: 'Number', hi: 'अंक' })}: <b>{r.lucky.number}</b> · {t({ en: 'Direction', hi: 'दिशा' })}: <b>{t(r.lucky.direction)}</b>
                      </span>
                      <span>{t(r.houseLabel)}</span>
                      {r.chandrashtama && <span className={styles.warnText}>⚠ {t({ en: 'Chandrashtama — keep the day calm, avoid big decisions.', hi: 'चंद्राष्टम — दिन शांत रखें, बड़े निर्णय टालें।' })}</span>}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <Link href="/panchang#rashifal" className={styles.inlineLink}>
            {t({ en: 'Read the full rashifal for all 12 signs', hi: 'सभी 12 राशियों का पूरा राशिफल पढ़ें' })} <ChevronRight size={15} />
          </Link>
        </div>

        {/* Upcoming */}
        <div className={styles.block} id="upcoming">
          <h2 className={styles.blockTitle}>
            <CalendarDays size={22} /> {t({ en: 'Upcoming vrat & festivals', hi: 'आगामी व्रत एवं त्योहार' })}
          </h2>
          <ul className={styles.upcoming}>
            {next
              .map((h) => ({ h, list: dayHighlights(h) }))
              .filter((x) => x.list.length)
              .map(({ h, list }) => {
                const dt = new Date(`${h.date}T12:00`);
                return (
                  <li key={h.date}>
                    <button type="button" onClick={() => pick(h.date)}>
                      <span className={styles.upDate}>
                        <strong>{dt.getDate()}</strong>
                        <small>{dt.toLocaleDateString(locale, { month: 'short' })}</small>
                      </span>
                      <span className={styles.upBody}>
                        <small>
                          {dt.toLocaleDateString(locale, { weekday: 'long' })} · {t(h.month.purnimanta)} {t(h.panchang.tithi.paksha).split(' ')[0]} {t(h.panchang.tithi.name)}
                        </small>
                        <span className={styles.upTags}>
                          {list.map((l, i) => (
                            <span key={i} className={styles[`tag_${l.tone}`]}>
                              {t(l.label)}
                            </span>
                          ))}
                        </span>
                      </span>
                      <ChevronRight size={18} className={styles.upArrow} />
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>

        <p className={styles.disclaimer}>
          {t({
            en: 'Tithi, nakshatra and month are calculated astronomically for local sunrise of the chosen city; festivals that depend on Pradosh, noon or midnight use that time. Dates may differ by a day from your local printed panchang or family tradition — follow your kul parampara where it differs. Upay are traditional and devotional; for health, legal or financial problems please also consult a qualified professional.',
            hi: 'तिथि, नक्षत्र और मास चुने गए शहर के स्थानीय सूर्योदय के अनुसार खगोलीय गणना से निकाले गए हैं; प्रदोष, मध्याह्न या मध्यरात्रि पर आधारित पर्वों में उसी समय को लिया गया है। स्थानीय छपे पंचांग या कुल परंपरा से तिथि में एक दिन का अंतर हो सकता है — भिन्नता होने पर अपनी कुल परंपरा का पालन करें। उपाय पारंपरिक और भक्तिपूर्ण हैं; स्वास्थ्य, कानूनी या आर्थिक समस्याओं में योग्य विशेषज्ञ से भी परामर्श लें।',
          })}
        </p>
      </div>
    </section>
  );
}
