'use client';

import Link from 'next/link';
import { BookUser, Briefcase, HandCoins, MessageCircle, Network, ScrollText, ShieldCheck, Upload } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { COMMISSION_RATE } from '@/lib/pandit/catalog';
import { inr, splitPayment } from '@/lib/pandit/payments';
import { usePandit } from '@/lib/pandit/store';
import { Avatar, Verified, styles as s } from './ui';

const FEATURES = [
  {
    icon: BookUser,
    title: { en: 'Yajman register (बही)', hi: 'यजमान बही' },
    text: {
      en: 'Every family in one place: gotra, pravar, kuldevi, native place, vanshavali, ancestors’ tithis and the rituals done for them.',
      hi: 'हर परिवार एक जगह — गोत्र, प्रवर, कुलदेवी, मूल स्थान, वंशावली, पूर्वजों की तिथियाँ और उनके लिए हुए संस्कार।',
    },
  },
  {
    icon: Upload,
    title: { en: 'Import from Excel', hi: 'एक्सेल से आयात' },
    text: {
      en: 'Already keep a diary or spreadsheet? Upload a CSV and all your yajmans come in at once. Export anytime.',
      hi: 'डायरी या एक्सेल में रिकॉर्ड है? CSV अपलोड करें, सभी यजमान एक साथ जुड़ जाएँगे। जब चाहें निर्यात करें।',
    },
  },
  {
    icon: ScrollText,
    title: { en: 'Remedies from kul parampara', hi: 'कुल परंपरा से उपाय' },
    text: {
      en: 'Shraddh dates for each ancestor, overdue family traditions and rashi remedies, ready to send on WhatsApp in one tap.',
      hi: 'हर पूर्वज की श्राद्ध तिथि, छूटी हुई कुल परंपराएँ और राशि उपाय — एक क्लिक में व्हाट्सऐप पर भेजें।',
    },
  },
  {
    icon: Network,
    title: { en: 'Pandit network', hi: 'पंडित नेटवर्क' },
    text: {
      en: 'A professional profile like LinkedIn. Connect with pandits across cities, endorse each other’s skills and message directly.',
      hi: 'लिंक्डइन जैसी व्यावसायिक प्रोफ़ाइल। विभिन्न शहरों के पंडितों से जुड़ें, एक-दूसरे की विशेषज्ञता का समर्थन करें और सीधे संदेश भेजें।',
    },
  },
  {
    icon: Briefcase,
    title: { en: 'Share the work', hi: 'काम साझा करें' },
    text: {
      en: 'Too many bookings on one muhurat? Post the anushthan on the work board; trusted pandits apply and you choose the team.',
      hi: 'एक ही मुहूर्त पर बहुत सारी बुकिंग? अनुष्ठान कार्य बोर्ड पर डालें; विश्वसनीय पंडित आवेदन करें और आप टीम चुनें।',
    },
  },
  {
    icon: HandCoins,
    title: { en: 'Fair, automatic split', hi: 'उचित, स्वचालित बँटवारा' },
    text: {
      en: `The yajman pays once. After the platform’s ${COMMISSION_RATE * 100}% commission, the dakshina is split by role and paid to every pandit.`,
      hi: `यजमान एक बार भुगतान करता है। मंच के ${COMMISSION_RATE * 100}% कमीशन के बाद दक्षिणा भूमिका के अनुसार हर पंडित में बँट जाती है।`,
    },
  },
];

const STEPS = [
  { title: { en: 'Create your profile', hi: 'प्रोफ़ाइल बनाएँ' }, text: { en: 'Specialities, languages, city, experience.', hi: 'विशेषज्ञता, भाषाएँ, शहर, अनुभव।' } },
  { title: { en: 'Add your yajmans', hi: 'यजमान जोड़ें' }, text: { en: 'One by one or upload your Excel/CSV.', hi: 'एक-एक करके या एक्सेल/CSV अपलोड करें।' } },
  { title: { en: 'Post or take work', hi: 'काम दें या लें' }, text: { en: 'Share overflow anushthans, apply to others’ jobs.', hi: 'अतिरिक्त अनुष्ठान साझा करें, दूसरों के काम में आवेदन करें।' } },
  { title: { en: 'Get paid', hi: 'भुगतान पाएँ' }, text: { en: 'Dakshina split by role, straight to each pandit.', hi: 'भूमिका अनुसार दक्षिणा सीधे हर पंडित को।' } },
];

export default function Landing() {
  const { t, lang } = useLang();
  const { me, pandits } = usePandit();
  const example = splitPayment(21000, [
    { panditId: 'a', weight: 2 },
    { panditId: 'b', weight: 1 },
    { panditId: 'c', weight: 1 },
  ]);
  const roles = [
    { en: 'Mukhya Acharya (you)', hi: 'मुख्य आचार्य (आप)' },
    { en: 'Sahayak Pandit', hi: 'सहायक पंडित' },
    { en: 'Path Karta', hi: 'पाठ कर्ता' },
  ];
  const colors = ['#e88a00', '#f5b942', '#f9d98c'];

  return (
    <>
      <section className="section mandala-bg" style={{ paddingTop: 48 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,0.85fr)', gap: 40, alignItems: 'center' }} data-hero>
          <div>
            <span className="eyebrow">{t({ en: 'For pandits & astrologers', hi: 'पंडितों और ज्योतिषियों के लिए' })}</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.3rem)' }}>
              {t({ en: 'Your yajmans, your network, ', hi: 'आपके यजमान, आपका नेटवर्क, ' })}
              <span className="gold-text">{t({ en: 'one workspace', hi: 'एक कार्यक्षेत्र' })}</span>
            </h1>
            <p className="muted" style={{ fontSize: '1.1rem', maxWidth: 560 }}>
              {t({
                en: 'Pandit Sangh is a digital bahi-khata and professional network for pandits. Keep every family’s gotra and traditions, remind them of shraddh and rituals, and share work with trusted pandits when you cannot be everywhere at once.',
                hi: 'पंडित संघ पंडितों के लिए डिजिटल बही-खाता और व्यावसायिक नेटवर्क है। हर परिवार का गोत्र और परंपराएँ सहेजें, उन्हें श्राद्ध व संस्कारों की याद दिलाएँ, और जब आप हर जगह एक साथ न पहुँच सकें तो विश्वसनीय पंडितों से काम साझा करें।',
              })}
            </p>
            <div className="actions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
              <Link href={me ? '/pandit-sangh/dashboard' : '/pandit-sangh/profile'} className="btn btn-primary btn-lg">
                {me ? t({ en: 'Open my workspace', hi: 'मेरा कार्यक्षेत्र खोलें' }) : t({ en: 'Join as a pandit — free', hi: 'पंडित के रूप में जुड़ें — निःशुल्क' })}
              </Link>
              <Link href="/pandit-sangh/network" className="btn btn-ghost btn-lg">
                {t({ en: 'Browse pandits', hi: 'पंडित देखें' })}
              </Link>
            </div>
          </div>

          <div className={s.panel} style={{ padding: 18 }}>
            <p className={`${s.small} muted`} style={{ margin: '0 0 10px', fontWeight: 700 }}>
              {t({ en: 'Pandits on the network', hi: 'नेटवर्क पर पंडित' })}
            </p>
            <ul className={s.list}>
              {pandits.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <Link href={`/pandit-sangh/pandit/${p.id}`} className={s.item}>
                    <Avatar name={p.name} hue={p.hue} size={40} />
                    <span className={s.itemBody}>
                      <strong style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        {lang === 'hi' ? p.nameHi : p.name} {p.verified && <Verified size={15} />}
                      </strong>
                      <small>
                        {p.city} · {p.headline}
                      </small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t({ en: 'Everything a pandit needs', hi: 'पंडित के लिए सब कुछ' })}</span>
            <h2>{t({ en: 'Built around how pandits really work', hi: 'पंडितों के वास्तविक काम के अनुसार बना' })}</h2>
          </div>
          <div className={s.cardsGrid}>
            {FEATURES.map(({ icon: I, title, text }) => (
              <div key={title.en} className={s.feature}>
                <span className={s.statIcon}>
                  <I size={22} />
                </span>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how" style={{ scrollMarginTop: 'calc(var(--header-h) + 70px)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t({ en: 'How it works', hi: 'कैसे काम करता है' })}</span>
            <h2>{t({ en: 'Four simple steps', hi: 'चार सरल चरण' })}</h2>
          </div>
          <div className={s.steps}>
            {STEPS.map((st) => (
              <div key={st.title.en} className={s.step}>
                <h3>{t(st.title)}</h3>
                <p>{t(st.text)}</p>
              </div>
            ))}
          </div>

          <div className={s.cols} style={{ marginTop: 40 }}>
            <div className={s.panel}>
              <h2>
                <HandCoins size={20} /> {t({ en: 'Example: Griha Pravesh with 3 pandits', hi: 'उदाहरण: 3 पंडितों के साथ गृह प्रवेश' })}
              </h2>
              <div className={s.splitTotal} style={{ marginTop: 0 }}>
                <div>
                  <span>{t({ en: 'Yajman pays', hi: 'यजमान का भुगतान' })}</span>
                  <strong>{inr(example.total)}</strong>
                </div>
                <div>
                  <span>
                    {t({ en: 'Platform commission', hi: 'मंच कमीशन' })} ({COMMISSION_RATE * 100}%)
                  </span>
                  <span>− {inr(example.commission)}</span>
                </div>
                {example.payouts.map((po, i) => (
                  <div key={po.panditId}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <i style={{ width: 10, height: 10, borderRadius: 3, background: colors[i], display: 'inline-block' }} />
                      {t(roles[i])}
                    </span>
                    <strong>{inr(po.amount)}</strong>
                  </div>
                ))}
              </div>
              <div className={s.bar} aria-hidden="true">
                {example.payouts.map((po, i) => (
                  <span key={po.panditId} style={{ width: `${(po.amount / example.total) * 100}%`, background: colors[i] }} />
                ))}
                <span style={{ width: `${(example.commission / example.total) * 100}%`, background: '#c9b48a' }} />
              </div>
              <p className={`${s.small} muted`} style={{ marginTop: 12, marginBottom: 0 }}>
                {t({
                  en: 'The lead pandit can change shares before releasing payment. Every pandit sees the same breakdown.',
                  hi: 'भुगतान वितरित करने से पहले मुख्य पंडित हिस्से बदल सकते हैं। हर पंडित को एक जैसा विवरण दिखता है।',
                })}
              </p>
            </div>
            <div className={s.panel}>
              <h2>
                <ShieldCheck size={20} /> {t({ en: 'Trust & privacy', hi: 'विश्वास एवं गोपनीयता' })}
              </h2>
              <ul className={`${s.small} muted`} style={{ paddingLeft: 18, margin: 0, display: 'grid', gap: 8 }}>
                <li>{t({ en: 'Your yajman register is private to you. Other pandits never see it.', hi: 'आपकी यजमान बही केवल आपकी है। अन्य पंडित इसे नहीं देख सकते।' })}</li>
                <li>{t({ en: 'Job posts show only the ritual, city and date, not the family’s details.', hi: 'कार्य पोस्ट में केवल अनुष्ठान, शहर और तिथि दिखती है, परिवार का विवरण नहीं।' })}</li>
                <li>{t({ en: 'Verified badge after document and reference checks.', hi: 'दस्तावेज़ और संदर्भ जाँच के बाद सत्यापित बैज।' })}</li>
                <li>
                  <MessageCircle size={14} style={{ display: 'inline', verticalAlign: '-2px' }} />{' '}
                  {t({ en: 'Remedies go out from your own WhatsApp, in your name.', hi: 'उपाय आपके अपने व्हाट्सऐप से, आपके नाम से जाते हैं।' })}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={s.cta}>
            <h2>{t({ en: 'Never miss a shraddh tithi again', hi: 'अब कोई श्राद्ध तिथि नहीं छूटेगी' })}</h2>
            <p>
              {t({
                en: 'Your yajmans will thank you for remembering what their own families had forgotten.',
                hi: 'जो परंपराएँ परिवार स्वयं भूल गए, उन्हें याद दिलाने के लिए यजमान आपके आभारी रहेंगे।',
              })}
            </p>
            <Link href={me ? '/pandit-sangh/yajman' : '/pandit-sangh/profile'} className="btn btn-primary btn-lg">
              {me ? t({ en: 'Go to my yajmans', hi: 'मेरे यजमान देखें' }) : t({ en: 'Create free profile', hi: 'निःशुल्क प्रोफ़ाइल बनाएँ' })}
            </Link>
          </div>
        </div>
      </section>
      <style>{`@media (max-width: 860px){ [data-hero]{ grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
