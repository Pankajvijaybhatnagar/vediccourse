'use client';

import { useLang } from '@/lib/i18n';
import { CENTRE, COMPASS, QUESTIONS, STAR_LEGEND } from '@/lib/vastu';
import styles from './vastu.module.css';

const R_IN = 40;
const R_OUT = 112;
const R_LABEL = 131;

const polar = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [+(r * Math.sin(a)).toFixed(2), +(-r * Math.cos(a)).toFixed(2)];
};

function wedge(center, half) {
  const [x1, y1] = polar(R_OUT, center - half);
  const [x2, y2] = polar(R_OUT, center + half);
  const [x3, y3] = polar(R_IN, center + half);
  const [x4, y4] = polar(R_IN, center - half);
  return `M${x1} ${y1}A${R_OUT} ${R_OUT} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${R_IN} ${R_IN} 0 0 0 ${x4} ${y4}Z`;
}

const dirName = (key) => (key === 'C' ? CENTRE : COMPASS.find((c) => c.key === key))?.name;
const starLabel = (n) => STAR_LEGEND.find((l) => l.stars === n)?.label;

/** Works out what each compass sector should show for this question and the active option. */
function compassState(q, activeOpt, answers) {
  const cells = {}; // key -> { cls, text }
  const set = (key, cls, text) => (cells[key] = { cls, text });

  if (q.chart === 'c8' || q.chart === 'c16') {
    if (q.zone) {
      set(q.zone, activeOpt ? `${styles.strong} ${styles[`s${activeOpt.stars}`]}` : styles.focusCell, activeOpt ? `${activeOpt.stars}★` : '?');
    } else {
      // Heat map: options that point at a single direction tint it by their rating.
      q.options.forEach((opt) => {
        if (opt.dirs.length !== 1) return;
        const k = opt.dirs[0];
        if (!cells[k] || cells[k].stars < opt.stars) cells[k] = { cls: `${styles.heat} ${styles[`s${opt.stars}`]}`, text: `${opt.stars}★`, stars: opt.stars };
      });
      activeOpt?.dirs.forEach((k) => set(k, `${styles.strong} ${styles[`s${activeOpt.stars}`]}`, `${activeOpt.stars}★`));
    }
  } else if (q.chart === 'pair' && activeOpt?.dirs[0]) {
    const [high, low] = activeOpt.dirs[0].split('>');
    set(high, styles.high, '▲');
    set(low, styles.low, '▼');
  } else if (q.chart === 'door' && answers[1] != null) {
    set(QUESTIONS[0].options[answers[1]].dirs[0], styles.doorCell, '⌂');
  }
  return cells;
}

function Compass({ q, activeOpt, answers }) {
  const { t } = useLang();
  const mode = q.chart === 'c16' || q.chart === 'door' ? 16 : 8;
  const half = 360 / mode / 2;
  const cells = compassState(q, activeOpt, answers);
  const sectors = COMPASS.map((c, i) => ({ ...c, angle: i * 22.5, main: i % 2 === 0 })).filter((c) => mode === 16 || c.main);
  const centre = cells.C;

  return (
    <svg viewBox="-172 -178 344 350" className={styles.compass} role="img" aria-label={t({ en: 'Direction chart', hi: 'दिशा चार्ट' })}>
      <circle r="150" className={styles.ring} />
      <circle r={R_OUT + 2} className={styles.ringInner} />
      {sectors.map((s) => {
        const cell = cells[s.key];
        const [tx, ty] = polar((R_IN + R_OUT) / 2 + 4, s.angle);
        return (
          <g key={s.key} className={`${styles.sec} ${cell?.cls || ''}`}>
            <path d={wedge(s.angle, half)} />
            {cell && (
              <text x={tx} y={ty} className={styles.secText}>
                {cell.text}
              </text>
            )}
          </g>
        );
      })}
      <g className={`${styles.sec} ${centre?.cls || ''}`}>
        <circle r={R_IN - 3} />
        <text y={centre ? -4 : 4} className={styles.centreText}>
          {t({ en: 'Centre', hi: 'मध्य' })}
        </text>
        {centre && (
          <text y={12} className={styles.secText}>
            {centre.text}
          </text>
        )}
      </g>

      {COMPASS.map((c, i) => {
        if (mode === 8 && i % 2) return null;
        const [x, y] = polar(R_LABEL, i * 22.5);
        const hot = cells[c.key];
        return i % 2 === 0 ? (
          <g key={c.key} className={`${styles.label} ${hot ? styles.labelHot : ''}`}>
            <text x={x} y={y - 2} className={styles.labelHi}>
              {c.name.hi}
            </text>
            <text x={x} y={y + 10} className={styles.labelEn}>
              {c.key}
            </text>
          </g>
        ) : (
          <text key={c.key} x={x} y={y + 3} className={`${styles.labelSub} ${hot ? styles.labelHot : ''}`}>
            {c.key}
          </text>
        );
      })}

      <path d="M0 -176 L9 -156 L0 -161 L-9 -156 Z" className={styles.northArrow} />
      <g className={styles.sun}>
        <circle cx="161" cy="-30" r="6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const [x1, y1] = polar(9, a);
          const [x2, y2] = polar(12, a);
          return <line key={a} x1={161 + x1} y1={-30 + y1} x2={161 + x2} y2={-30 + y2} />;
        })}
      </g>
    </svg>
  );
}

/* Front wall seen from inside the house, split into 9 padas, for "where along the wall is the door". */
function Wall({ q, activeOpt }) {
  const { t } = useLang();
  const W = 260;
  const pada = W / 9;
  const heat = {};
  q.options.forEach((opt) => opt.dirs.forEach((d) => (heat[d] = opt.stars)));
  const activeKey = activeOpt?.dirs[0];

  return (
    <svg viewBox="0 0 300 220" className={styles.wall} role="img" aria-label={t({ en: 'Door position on the wall', hi: 'दीवार पर द्वार की स्थिति' })}>
      <text x="150" y="16" className={styles.wallCaption}>
        {t({ en: 'Main-door wall', hi: 'मुख्य द्वार वाली दीवार' })}
      </text>
      <path d="M20 34 V150 M280 34 V150" className={styles.sideWall} />
      {Array.from({ length: 9 }, (_, i) => {
        const key = `p${i + 1}`;
        const stars = heat[key];
        const on = activeKey === key;
        return (
          <g key={key} className={`${styles.sec} ${on ? `${styles.strong} ${styles[`s${stars}`]}` : stars ? `${styles.heat} ${styles[`s${stars}`]}` : ''}`}>
            <rect x={20 + i * pada} y="30" width={pada} height="22" />
            {stars && (
              <text x={20 + i * pada + pada / 2} y="45" className={styles.secText}>
                {stars}★
              </text>
            )}
            {on && <path d={`M${20 + i * pada + 3} 52 A${pada - 6} ${pada - 6} 0 0 1 ${20 + (i + 1) * pada - 3} ${52 + pada - 6}`} className={styles.doorSwing} />}
          </g>
        );
      })}
      <g className={`${styles.sec} ${activeKey === 'corner' ? `${styles.strong} ${styles.s1}` : `${styles.heat} ${styles.s1}`}`}>
        <path d="M281 30 L297 30 L281 52 Z" />
      </g>
      <text x="40" y="74" className={styles.wallSide}>
        ← {t({ en: 'Left', hi: 'बायाँ' })}
      </text>
      <text x="260" y="74" className={styles.wallSide}>
        {t({ en: 'Right', hi: 'दायाँ' })} →
      </text>
      <g className={styles.person}>
        <circle cx="150" cy="150" r="10" />
        <path d="M134 190 Q150 160 166 190 Z" />
        <path d="M150 136 V100 M143 107 L150 98 L157 107" className={styles.lookArrow} />
      </g>
      <text x="150" y="210" className={styles.wallCaption}>
        {t({ en: 'Standing inside, facing the door', hi: 'घर के अंदर खड़े होकर द्वार की ओर देखते हुए' })}
      </text>
    </svg>
  );
}

function Caption({ q, activeOpt, answers }) {
  const { t } = useLang();
  if (activeOpt && activeOpt.stars != null && q.chart !== 'plain' && q.chart !== 'door') {
    let where;
    if (q.zone) where = dirName(q.zone);
    else if (q.chart === 'pair') {
      const [h, l] = activeOpt.dirs[0]?.split('>') || [];
      where = h && { en: `▲ high ${dirName(h).en} · ▼ low ${dirName(l).en}`, hi: `▲ ऊँचा ${dirName(h).hi} · ▼ नीचा ${dirName(l).hi}` };
    } else if (q.chart === 'wall') where = null;
    else if (activeOpt.dirs.length) {
      const names = activeOpt.dirs.map(dirName).filter(Boolean);
      // Skip when the option text already names the direction, e.g. "ईशान (NE)".
      const repeats = names.every((n) => t(activeOpt).toLowerCase().includes(t(n).toLowerCase()));
      if (!repeats) where = { en: names.map((n) => n.en).join(', '), hi: names.map((n) => n.hi).join(', ') };
    }
    return (
      <p className={`${styles.caption} ${styles[`s${activeOpt.stars}`]}`}>
        <strong>{t(activeOpt)}</strong>
        {where && <span>{t(where)}</span>}
        <em>
          {activeOpt.stars}★ · {t(starLabel(activeOpt.stars))}
        </em>
      </p>
    );
  }

  let note;
  if (q.zone) note = { en: `This question is about the ${dirName(q.zone).en} corner (highlighted)`, hi: `यह प्रश्न ${dirName(q.zone).hi} कोण के बारे में है (चिह्नित)` };
  else if (q.chart === 'pair') note = { en: 'Pick an option — ▲ shows the high side, ▼ the low side', hi: 'विकल्प चुनें — ▲ ऊँचा भाग, ▼ नीचा भाग दिखाएगा' };
  else if (q.chart === 'door') {
    note = answers[1] != null
      ? { en: `⌂ Your main door: ${t(QUESTIONS[0].options[answers[1]])}`, hi: `⌂ आपका मुख्य द्वार: ${t(QUESTIONS[0].options[answers[1]])}` }
      : { en: 'Answer question 1 to see your main door here', hi: 'प्रश्न 1 का उत्तर दें, आपका मुख्य द्वार यहाँ दिखेगा' };
  } else if (q.chart === 'plain') note = { en: 'Reference chart of the eight directions', hi: 'आठों दिशाओं का संदर्भ चार्ट' };
  if (note) return <p className={styles.caption}>{t(note)}</p>;

  return (
    <ul className={styles.heatLegend}>
      {[5, 3, 1].map((n) => (
        <li key={n} className={styles[`s${n}`]}>
          <span /> {t(starLabel(n))}
        </li>
      ))}
    </ul>
  );
}

export default function DirectionChart({ q, active, answers }) {
  const { t } = useLang();
  const activeOpt = active != null ? q.options[active] : null;

  return (
    <div className={styles.chartBox}>
      <span className={styles.chartTitle}>{t({ en: 'Direction chart', hi: 'दिशा चार्ट' })}</span>
      {q.chart === 'wall' ? <Wall q={q} activeOpt={activeOpt} /> : <Compass q={q} activeOpt={activeOpt} answers={answers} />}
      <Caption q={q} activeOpt={activeOpt} answers={answers} />
      <details className={styles.howTo}>
        <summary>{t({ en: 'How do I find directions?', hi: 'दिशा कैसे पहचानें?' })}</summary>
        <ul>
          <li>{t({ en: 'Stand at the centre of the house and open the Compass app on your phone — where the needle shows N is north.', hi: 'घर के ठीक मध्य में खड़े होकर मोबाइल का Compass ऐप खोलें — सुई जिस ओर N दिखाए, वह उत्तर है।' })}</li>
          <li>{t({ en: 'The sun rises roughly in the east (☀ on the chart).', hi: 'सूर्य लगभग पूर्व दिशा से उगता है (चार्ट पर ☀)।' })}</li>
          <li>{t({ en: 'A corner between two directions is a kona — e.g. between north and east is Ishaan (NE).', hi: 'दो दिशाओं के बीच का कोना "कोण" कहलाता है — जैसे उत्तर और पूर्व के बीच ईशान।' })}</li>
        </ul>
      </details>
    </div>
  );
}
