import ZodiacWheel from '@/components/ZodiacWheel';
import styles from './home.module.css';

// Constellation heart: stars joined by fine lines, with a crescent moon.
function LoveArt() {
  const pts = [
    [200, 300], [120, 225], [85, 160], [100, 105], [150, 80], [200, 120],
    [250, 80], [300, 105], [315, 160], [280, 225],
  ];
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ') + ' Z';
  return (
    <svg viewBox="0 0 400 360" className={styles.heroSvg} aria-hidden="true">
      <defs>
        <radialGradient id="loveGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="1" stopColor="#fff3c4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="loveFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff8a65" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ef4b3f" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="180" r="170" fill="url(#loveGlow)" />
      <circle cx="200" cy="180" r="150" fill="none" stroke="#b8862b" strokeOpacity="0.35" strokeDasharray="3 6" className={styles.spinSlow} />
      <path d={path} fill="url(#loveFill)" stroke="#c0392b" strokeOpacity="0.7" strokeWidth="1.5" className={styles.drawPath} />
      <path d="M150 80 L200 300 M250 80 L200 300 M100 105 L300 105" stroke="#c0392b" strokeOpacity="0.25" />
      {pts.map(([x, y], i) => (
        <g key={i} className={styles.twinkle} style={{ animationDelay: `${i * 0.25}s` }}>
          <circle cx={x} cy={y} r="9" fill="#ffc21a" opacity="0.35" />
          <circle cx={x} cy={y} r="4" fill="#fff" stroke="#e88a00" strokeWidth="1.5" />
        </g>
      ))}
      <path d="M335 40a26 26 0 1 0 22 40 21 21 0 1 1-22-40z" fill="#ffc21a" />
      <text x="200" y="200" textAnchor="middle" fontSize="54" className={styles.heroHeart}>♥</text>
      {['♈︎', '♎︎', '♌︎', '♓︎'].map((g, i) => (
        <text key={g} x={[40, 360, 50, 350][i]} y={[250, 250, 60, 300][i]} fontSize="22" fill="#b8862b" className={`glyph ${styles.floatY}`} style={{ animationDelay: `${i * 0.7}s` }}>
          {g}
        </text>
      ))}
    </svg>
  );
}

// A glowing clay diya on a rangoli.
function DiyaArt() {
  return (
    <svg viewBox="0 0 400 360" className={styles.heroSvg} aria-hidden="true">
      <defs>
        <radialGradient id="flameGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="0.5" stopColor="#ffb13b" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffb13b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e85d04" />
          <stop offset="0.5" stopColor="#ffb703" />
          <stop offset="1" stopColor="#fff3b0" />
        </linearGradient>
        <linearGradient id="clay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9731f" />
          <stop offset="1" stopColor="#8a3a0c" />
        </linearGradient>
      </defs>
      {/* Rangoli */}
      <g transform="translate(200 250)" className={styles.spinSlow}>
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} rx="16" ry="58" fill={['#ef4b3f', '#ffc21a', '#1e9e5a', '#7b2cbf'][i % 4]} opacity="0.22" transform={`rotate(${i * 30}) translate(0 -40)`} />
        ))}
        <circle r="40" fill="none" stroke="#e88a00" strokeOpacity="0.5" strokeDasharray="4 5" />
      </g>
      <circle cx="200" cy="150" r="120" fill="url(#flameGlow)" className={styles.glowPulse} />
      {/* Diya bowl */}
      <path d="M120 230 Q200 300 280 230 Q275 215 260 214 L140 214 Q125 215 120 230Z" fill="url(#clay)" />
      <path d="M140 214 Q200 232 260 214" stroke="#ffd08a" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M255 214 Q282 200 296 206 Q284 218 262 222Z" fill="url(#clay)" />
      {/* Flame */}
      <path d="M200 120 C222 160 218 196 200 212 C182 196 178 160 200 120Z" fill="url(#flame)" className={styles.flame} />
      <path d="M200 160 C208 178 206 196 200 204 C194 196 192 178 200 160Z" fill="#fff" opacity="0.85" className={styles.flame} />
      {[[80, 90], [320, 80], [60, 200], [340, 190]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 8} L${x + 2.5} ${y - 2.5} ${x + 8} ${y} ${x + 2.5} ${y + 2.5} ${x} ${y + 8} ${x - 2.5} ${y + 2.5} ${x - 8} ${y} ${x - 2.5} ${y - 2.5}Z`} fill="#ffc21a" className={styles.twinkle} style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
    </svg>
  );
}

export default function HeroArt({ kind }) {
  if (kind === 'wheel') {
    return (
      <div className={styles.heroWheel}>
        <ZodiacWheel />
      </div>
    );
  }
  return kind === 'diya' ? <DiyaArt /> : <LoveArt />;
}
