import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { POOJAS } from '@/lib/karmkand/poojas';
import { SAMAGRI, SAMAGRI_CATEGORIES } from '@/lib/karmkand/samagri';
import PoojaCard from './PoojaCard';
import styles from './karmkand.module.css';

export const metadata = {
  title: 'कर्मकांड — पूजा पद्धति एवं पूजा सामग्री',
  description: 'कर्मकांड को सरल शुद्ध हिंदी में सीखें — दैनिक पूजा, षोडशोपचार, गणेश, लक्ष्मी, सत्यनारायण, रुद्राभिषेक, हवन की विधि और पूजा सामग्री का महत्व।',
};

const PRINCIPLES = [
  { title: 'शुद्धि', text: 'पूजा से पहले स्नान, स्वच्छ वस्त्र और शांत मन। बाहरी और भीतरी दोनों पवित्रता आवश्यक है।' },
  { title: 'दिशा', text: 'पूजा करते समय मुख पूर्व या उत्तर की ओर रखें। घर में पूजा का स्थान ईशान कोण में श्रेष्ठ है।' },
  { title: 'समय', text: 'ब्रह्म मुहूर्त (सूर्योदय से लगभग डेढ़ घंटा पहले) और संध्या काल पूजा के लिए सर्वोत्तम हैं।' },
  { title: 'आसन', text: 'भूमि पर सीधे न बैठें। कुश, ऊन या कंबल का आसन बिछाकर स्थिर होकर बैठें।' },
  { title: 'संकल्प', text: 'हाथ में जल लेकर पूजा का उद्देश्य बोलना संकल्प है। इससे पूजा को दिशा और दृढ़ता मिलती है।' },
  { title: 'श्रद्धा', text: 'भगवान वस्तुओं के नहीं, भाव के भूखे हैं। विधि में भूल हो जाए तो क्षमा प्रार्थना से पूर्णता होती है।' },
];

const UPCHAR = [
  ['१', 'ध्यान', 'भगवान के स्वरूप का मन में चिंतन', '—'],
  ['२', 'आवाहन', 'भगवान को आमंत्रित करना', '—'],
  ['३', 'आसन', 'बैठने के लिए स्थान अर्पण', '—'],
  ['४', 'पाद्य', 'चरण धोने के लिए जल', '—'],
  ['५', 'अर्घ्य', 'हाथ धोने के लिए सुगंधित जल', '—'],
  ['६', 'आचमन', 'पीने के लिए शुद्ध जल', '—'],
  ['७', 'स्नान', 'जल और पंचामृत से स्नान', '—'],
  ['८', 'वस्त्र', 'नए वस्त्र अर्पण', '—'],
  ['९', 'यज्ञोपवीत', 'जनेऊ अर्पण', '—'],
  ['१०', 'गंध', 'चंदन, रोली, अक्षत', '✓ पंचोपचार'],
  ['११', 'पुष्प', 'फूल और माला', '✓ पंचोपचार'],
  ['१२', 'धूप', 'सुगंधित धूप', '✓ पंचोपचार'],
  ['१३', 'दीप', 'घी का दीपक', '✓ पंचोपचार'],
  ['१४', 'नैवेद्य', 'भोग, फल, ताम्बूल', '✓ पंचोपचार'],
  ['१५', 'आरती-प्रदक्षिणा', 'आरती और परिक्रमा', '—'],
  ['१६', 'पुष्पांजलि', 'पुष्पांजलि और नमस्कार', '—'],
];

export default function KarmkandPage() {
  return (
    <>
      <PageHeader
        eyebrow="सनातन पूजा विधान"
        title="कर्मकांड"
        highlight="सरल हिंदी में"
        crumb="कर्मकांड"
        lead="पूजा की सही विधि और हर सामग्री का अर्थ — आरंभ से, सरल और शुद्ध हिंदी में। अब घर पर स्वयं श्रद्धा और विधि से पूजा करें।"
      />

      <section className={styles.section}>
        <div className="container">
          {/* परिचय */}
          <Reveal className={styles.introGrid}>
            <div>
              <span className="eyebrow">परिचय</span>
              <h2>कर्मकांड क्या है?</h2>
              <p className={styles.lead}>
                वेदों के तीन भाग माने गए हैं — <b>कर्मकांड</b>, <b>उपासना कांड</b> और <b>ज्ञान कांड</b>। कर्मकांड वह भाग है जिसमें यज्ञ, पूजा,
                संस्कार और अनुष्ठान की विधियाँ बताई गई हैं। सरल शब्दों में, भगवान की आराधना को सही क्रम, सही सामग्री और सही मंत्रों के साथ करने की
                पद्धति ही कर्मकांड है।
              </p>
              <p className={styles.lead}>
                कर्मकांड के दो मुख्य अंग हैं — <b>पूजा पद्धति</b> (पूजा कैसे करें) और <b>पूजा सामग्री</b> (किन वस्तुओं से और क्यों करें)। इन दोनों को
                समझ लेने पर कोई भी व्यक्ति अपने घर में विधिपूर्वक पूजा कर सकता है।
              </p>
            </div>
            <div className={styles.shloka}>
              <p className={styles.sanskrit}>{'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥'}</p>
              <small>
                <b>अर्थ —</b> जो भक्त प्रेम से मुझे पत्ता, फूल, फल या जल अर्पित करता है, उस शुद्ध मन वाले भक्त की भेंट को मैं प्रेमपूर्वक स्वीकार करता हूँ।
                <br />— श्रीमद्भगवद्गीता ९.२६
              </small>
            </div>
          </Reveal>

          <div className={styles.pillars}>
            {[
              ['🙏', 'श्रद्धा', 'पूजा का प्राण भाव है। बिना श्रद्धा के विधि केवल क्रिया रह जाती है।'],
              ['💧', 'शुद्धि', 'तन, मन, स्थान और सामग्री — चारों की पवित्रता पूजा को फलदायी बनाती है।'],
              ['📿', 'विधि', 'सही क्रम से की गई पूजा मन को एकाग्र करती है और परंपरा को जीवित रखती है।'],
            ].map(([icon, title, text], i) => (
              <Reveal key={title} delay={i * 100} className={styles.pillar}>
                <span>{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>

          {/* दो अंग */}
          <div className={styles.block}>
            <div className="section-head">
              <span className="eyebrow">कर्मकांड के दो अंग</span>
              <h2>
                कहाँ से <span className="gold-text">आरंभ करें?</span>
              </h2>
              <p>पहले पूजा की विधि समझें, फिर प्रत्येक सामग्री का महत्व जानें।</p>
            </div>
            <div className={styles.divisions}>
              <Link href="/karmkand/pooja-paddhati" className={`${styles.division} ${styles.divPaddhati}`}>
                <span className={styles.divIcon}>📜</span>
                <h2>पूजा पद्धति</h2>
                <p>दैनिक पूजा से लेकर रुद्राभिषेक और गृह प्रवेश तक — {POOJAS.length} पूजाओं की चरणबद्ध विधि, मंत्र, अर्थ, नियम और लाभ।</p>
                <div className={styles.divList}>
                  {POOJAS.slice(0, 5).map((p) => (
                    <span key={p.slug}>{p.name.split(' (')[0]}</span>
                  ))}
                  <span>और भी…</span>
                </div>
                <span className={styles.divCta}>विधि सीखें →</span>
              </Link>
              <Link href="/karmkand/pooja-samagri" className={`${styles.division} ${styles.divSamagri}`}>
                <span className={styles.divIcon}>🪔</span>
                <h2>पूजा सामग्री</h2>
                <p>{SAMAGRI.length} पूजा सामग्रियों का कोश — प्रत्येक वस्तु का आध्यात्मिक महत्व, प्रयोग की सही विधि और आवश्यक सावधानियाँ।</p>
                <div className={styles.divList}>
                  {SAMAGRI_CATEGORIES.slice(0, 5).map((c) => (
                    <span key={c.id}>
                      {c.icon} {c.name}
                    </span>
                  ))}
                </div>
                <span className={styles.divCta}>सामग्री जानें →</span>
              </Link>
            </div>
          </div>

          {/* पूजा के मूल नियम */}
          <div className={styles.block}>
            <div className="section-head">
              <span className="eyebrow">आधारभूत ज्ञान</span>
              <h2>
                पूजा से पहले <span className="gold-text">छह बातें</span> जानें
              </h2>
            </div>
            <div className={styles.principles}>
              {PRINCIPLES.map((pr, i) => (
                <Reveal key={pr.title} delay={(i % 3) * 90} className={`card ${styles.principle}`}>
                  <span className={styles.principleNum}>{['१', '२', '३', '४', '५', '६'][i]}</span>
                  <div>
                    <h3>{pr.title}</h3>
                    <p>{pr.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* उपचार तालिका */}
          <div className={styles.block}>
            <div className="section-head">
              <span className="eyebrow">पूजा का व्याकरण</span>
              <h2>
                षोडशोपचार और <span className="gold-text">पंचोपचार</span>
              </h2>
              <p>
                हर पूजा में भगवान की अतिथि के समान सेवा की जाती है। विस्तृत पूजा में सोलह सेवाएँ (षोडशोपचार) और दैनिक पूजा में उनमें से पाँच (पंचोपचार)
                की जाती हैं।
              </p>
            </div>
            <Reveal className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>क्रम</th>
                    <th>उपचार</th>
                    <th>अर्थ</th>
                    <th>दैनिक पूजा में</th>
                  </tr>
                </thead>
                <tbody>
                  {UPCHAR.map(([n, name, meaning, daily]) => (
                    <tr key={n}>
                      <td>{n}</td>
                      <td>
                        <b>{name}</b>
                      </td>
                      <td>{meaning}</td>
                      <td>{daily}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>

          {/* सीखने का क्रम */}
          <div className={styles.block}>
            <div className="section-head">
              <span className="eyebrow">सीखने का क्रम</span>
              <h2>
                चार चरणों में <span className="gold-text">पूजा में निपुण बनें</span>
              </h2>
            </div>
            <div className={styles.path}>
              {[
                ['/karmkand/pooja-paddhati/dainik-pooja', 'दैनिक पूजा से आरंभ', 'पाँच उपचारों वाली सरल दैनिक पूजा प्रतिदिन करें। यही हर पूजा की नींव है।'],
                ['/karmkand/pooja-samagri', 'सामग्री का अर्थ समझें', 'दीपक, कलश, अक्षत, तुलसी — हर वस्तु क्यों प्रयोग होती है, यह जानें।'],
                ['/karmkand/pooja-paddhati/shodashopachar-poojan', 'षोडशोपचार सीखें', 'सोलह उपचारों की पूर्ण विधि सीखें, जिससे किसी भी देवता की पूजा कर सकें।'],
                ['/jyotish-seekhen', 'ज्योतिष की ओर', 'ग्रह, नक्षत्र और मुहूर्त को समझकर पूजा के सही समय का ज्ञान प्राप्त करें।'],
              ].map(([href, title, text], i) => (
                <Reveal key={title} delay={i * 90}>
                  <Link href={href} className={styles.pathStep} style={{ display: 'block', height: '100%' }}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          {/* सभी पूजाएँ */}
          <div className={styles.block}>
            <div className="row-head">
              <h2>
                <span className="om">ॐ</span> प्रमुख पूजा विधियाँ
              </h2>
              <Link href="/karmkand/pooja-paddhati" className="view-all">
                सभी देखें
              </Link>
            </div>
            <div className={styles.poojaGrid}>
              {POOJAS.slice(0, 6).map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <PoojaCard pooja={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
