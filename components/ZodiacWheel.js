import { SIGNS } from '@/lib/zodiac';
import styles from './ZodiacWheel.module.css';

const polar = (r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [200 + r * Math.cos(a), 200 + r * Math.sin(a)];
};

// Round to keep server/client SVG markup identical.
const fmt = (n) => Math.round(n * 100) / 100;

export default function ZodiacWheel() {
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.glow} />
      <svg viewBox="0 0 400 400" className={styles.svg}>
        <defs>
          <linearGradient id="wheelGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f8e3ae" />
            <stop offset="0.5" stopColor="#e9c47a" />
            <stop offset="1" stopColor="#a8773a" />
          </linearGradient>
          <radialGradient id="wheelCore" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#2a1f6b" stopOpacity="0.9" />
            <stop offset="1" stopColor="#0b0925" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Outer rotating ring with signs */}
        <g className={styles.outer}>
          <circle cx="200" cy="200" r="190" fill="none" stroke="url(#wheelGold)" strokeWidth="1" opacity="0.7" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="url(#wheelGold)" strokeWidth="0.8" opacity="0.6" />
          {ticks.map((deg) => {
            const [x1, y1] = polar(190, deg);
            const [x2, y2] = polar(deg % 30 === 0 ? 150 : 184, deg);
            return (
              <line
                key={deg}
                x1={fmt(x1)}
                y1={fmt(y1)}
                x2={fmt(x2)}
                y2={fmt(y2)}
                stroke="#e9c47a"
                strokeWidth={deg % 30 === 0 ? 0.8 : 0.5}
                opacity={deg % 30 === 0 ? 0.6 : 0.35}
              />
            );
          })}
          {SIGNS.map((sign, i) => {
            const deg = i * 30 + 15;
            const [x, y] = polar(170, deg);
            return (
              <text
                key={sign.slug}
                x={fmt(x)}
                y={fmt(y)}
                className={`${styles.glyph} glyph`}
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${deg} ${fmt(x)} ${fmt(y)})`}
              >
                {sign.glyph}
              </text>
            );
          })}
        </g>

        {/* Counter-rotating inner ring */}
        <g className={styles.inner}>
          <circle cx="200" cy="200" r="120" fill="none" stroke="#b79cff" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.7" />
          <circle cx="200" cy="200" r="100" fill="url(#wheelCore)" stroke="url(#wheelGold)" strokeWidth="0.6" opacity="0.9" />
          {/* Hexagram of intersecting triangles */}
          <polygon
            points={[0, 120, 240].map((d) => polar(100, d).map(fmt).join(',')).join(' ')}
            fill="none"
            stroke="#e9c47a"
            strokeWidth="0.6"
            opacity="0.5"
          />
          <polygon
            points={[60, 180, 300].map((d) => polar(100, d).map(fmt).join(',')).join(' ')}
            fill="none"
            stroke="#b79cff"
            strokeWidth="0.6"
            opacity="0.5"
          />
          {Array.from({ length: 12 }, (_, i) => {
            const [x, y] = polar(120, i * 30);
            return <circle key={i} cx={fmt(x)} cy={fmt(y)} r="2" fill="#f6dfa8" />;
          })}
        </g>

        {/* Sun core */}
        <circle cx="200" cy="200" r="38" fill="url(#wheelGold)" className={styles.core} />
        <circle cx="200" cy="200" r="52" fill="none" stroke="#e9c47a" strokeWidth="0.5" opacity="0.5" />
        <path d="M212 186a18 18 0 1 0 0 28 14 14 0 1 1 0-28z" fill="#1b1330" opacity="0.85" />
      </svg>

      {/* Orbiting planets */}
      <span className={`${styles.orbit} ${styles.o1}`}>
        <span className={`${styles.planet} ${styles.p1}`} />
      </span>
      <span className={`${styles.orbit} ${styles.o2}`}>
        <span className={`${styles.planet} ${styles.p2}`} />
      </span>
    </div>
  );
}
