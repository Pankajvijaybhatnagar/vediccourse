import { Poppins, Mukta, Yatra_One, Tiro_Devanagari_Sanskrit } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

// Poppins and Mukta both ship Devanagari glyphs, so Hindi and English share one typographic voice.
const display = Poppins({
  subsets: ['latin', 'devanagari'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const body = Mukta({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

// Decorative Hindi display face for राशिफल thumbnails.
const deco = Yatra_One({
  subsets: ['latin', 'devanagari'],
  weight: '400',
  variable: '--font-deco',
  display: 'swap',
});

// Classical face for Sanskrit mantras in the Karmkand section.
const sanskrit = Tiro_Devanagari_Sanskrit({
  subsets: ['latin', 'devanagari'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-sanskrit',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'VedicDhaam — Vedic Astrology, Rashifal, Kundli & Panchang | वैदिकधाम',
    template: '%s · VedicDhaam',
  },
  description:
    'Daily rashifal, free Janam Kundli, Kundli matching, Panchang, tarot, numerology and consultations with expert astrologers in Hindi and English. दैनिक राशिफल, मुफ़्त कुंडली और पंचांग।',
  keywords: ['vedic astrology', 'rashifal', 'kundli', 'panchang', 'horoscope', 'राशिफल', 'कुंडली', 'पंचांग', 'ज्योतिष'],
  icons: { icon: '/icon.svg' },
};

export const viewport = {
  themeColor: '#ffc21a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-lang="en" className={`${display.variable} ${body.variable} ${deco.variable} ${sanskrit.variable}`}>
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
