'use client';

import { SIGNS } from '@/lib/zodiac';
import { useLang } from '@/lib/i18n';
import styles from './NorthIndianChart.module.css';

// House label anchors for the North Indian diamond chart (400×400).
const HOUSES = {
  1: [200, 100], 2: [100, 42], 3: [42, 100], 4: [100, 200], 5: [42, 300], 6: [100, 358],
  7: [200, 300], 8: [300, 358], 9: [358, 300], 10: [300, 200], 11: [358, 100], 12: [300, 42],
};
// Where each house's sign number sits (toward the chart centre).
const SIGN_NUM = {
  1: [200, 170], 2: [100, 80], 3: [80, 100], 4: [170, 200], 5: [80, 300], 6: [100, 320],
  7: [200, 230], 8: [300, 320], 9: [320, 300], 10: [230, 200], 11: [320, 100], 12: [300, 80],
};

export default function NorthIndianChart({ kundli, label }) {
  const { t } = useLang();
  const lagnaIdx = SIGNS.indexOf(kundli.lagna.sign);
  const byHouse = {};
  kundli.planets.forEach((pl) => (byHouse[pl.house] ||= []).push(pl));

  return (
    <svg viewBox="-4 -4 408 408" className={styles.chart} role="img" aria-label={label || t({ en: 'Lagna chart', hi: 'लग्न कुंडली' })}>
      <rect x="0" y="0" width="400" height="400" rx="6" fill="#fffaf0" stroke="#c9a66b" strokeWidth="2" />
      <path d="M0 0 L400 400 M400 0 L0 400" stroke="#c9a66b" strokeWidth="1.5" />
      <path d="M200 0 L400 200 L200 400 L0 200 Z" fill="none" stroke="#c9a66b" strokeWidth="1.5" />
      <path d="M200 0 L300 100 L200 200 L100 100 Z" fill="rgba(255,194,26,0.14)" />
      {Object.entries(SIGN_NUM).map(([house, [x, y]]) => (
        <text key={house} x={x} y={y} textAnchor="middle" dominantBaseline="central" className={styles.signNum}>
          {((lagnaIdx + Number(house) - 1) % 12) + 1}
        </text>
      ))}
      <text x="200" y="130" textAnchor="middle" className={styles.ascLabel}>
        {t({ en: 'Asc', hi: 'लग्न' })}
      </text>
      {Object.entries(HOUSES).map(([house, [x, y]]) => {
        const list = byHouse[house] || [];
        const lines = [];
        for (let i = 0; i < list.length; i += 3) lines.push(list.slice(i, i + 3));
        return (
          <text key={house} x={x} y={y - (lines.length - 1) * 9} textAnchor="middle" className={styles.planetText}>
            {lines.map((row, i) => (
              <tspan key={i} x={x} dy={i === 0 ? 0 : 18}>
                {row.map((pl) => `${t(pl.abbr)}${pl.retro ? '*' : ''}`).join(' ')}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}
