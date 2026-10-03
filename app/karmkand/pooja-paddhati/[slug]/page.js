import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Signal, ListOrdered } from 'lucide-react';
import { getPooja } from '../../data';
import SamagriChecklist from './SamagriChecklist';
import PoojaSteps from './PoojaSteps';
import MantraCard from './MantraCard';
import styles from '../../karmkand.module.css';

// Rendered on first request, then cached and revalidated (ISR), so builds don't depend on the API.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pooja = await getPooja(slug);
  if (!pooja) return {};
  const image = pooja.coverImage?.url;
  return {
    title: `${pooja.name} — सम्पूर्ण विधि`,
    description: pooja.short,
    alternates: { canonical: `/karmkand/pooja-paddhati/${pooja.slug}` },
    openGraph: { title: `${pooja.name} — सम्पूर्ण विधि`, description: pooja.short, type: 'article', ...(image && { images: [image] }) },
  };
}

const TOC = [
  ['parichay', 'परिचय'],
  ['samay', 'शुभ समय एवं दिशा'],
  ['samagri', 'पूजा सामग्री'],
  ['taiyari', 'तैयारी'],
  ['vidhi', 'पूजा विधि'],
  ['mantra', 'मंत्र एवं अर्थ'],
  ['niyam', 'नियम एवं लाभ'],
  ['prashn', 'प्रश्नोत्तर'],
];

export default async function PoojaDetail({ params }) {
  const { slug } = await params;
  const pooja = await getPooja(slug);
  if (!pooja) notFound();

  const { prev, next, categoryName: category } = pooja;
  const items = (pooja.samagri ?? []).map((s) => ({ ...s, slug: s.item }));
  const steps = pooja.steps ?? [];

  return (
    <section className={`${styles.section} page-top`} style={{ paddingTop: 'calc(var(--header-h) + 16px)' }}>
      <div className="container">
        <header className={`${styles.detailHero} ${styles[`tone_${pooja.tone}`]} fade-up`}>
          <span className={styles.poojaEmoji} aria-hidden="true">
            {pooja.icon}
          </span>
          <div>
            <nav className={styles.crumbs} aria-label="मार्ग">
              <Link href="/">होम</Link> › <Link href="/karmkand">कर्मकांड</Link> › <Link href="/karmkand/pooja-paddhati">पूजा पद्धति</Link>
            </nav>
            <h1>{pooja.name}</h1>
            <div className={styles.meta}>
              <span>🙏 {pooja.deity}</span>
              <span>
                <Signal size={13} /> {pooja.level}
              </span>
              <span>
                <Clock size={13} /> {pooja.duration}
              </span>
              <span>
                <ListOrdered size={13} /> {steps.length} चरण
              </span>
              {category && <span>{category}</span>}
            </div>
            <p className={styles.detailShort}>{pooja.short}</p>
          </div>
        </header>

        <div className={styles.detailLayout}>
          <nav className={styles.toc} aria-label="विषय सूची">
            <strong>विषय सूची</strong>
            {TOC.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className={styles.content}>
            <section id="parichay">
              <h2 className={styles.h2}>परिचय</h2>
              {(pooja.intro ?? []).map((para) => (
                <p key={para.slice(0, 24)} className={styles.lead}>
                  {para}
                </p>
              ))}
            </section>

            <section id="samay">
              <h2 className={styles.h2}>शुभ समय एवं दिशा</h2>
              <div className={styles.facts}>
                <div className={styles.fact}>
                  <span>🕉️</span>
                  <div>
                    <strong>कब करें</strong>
                    <p>{pooja.when}</p>
                  </div>
                </div>
                <div className={styles.fact}>
                  <span>🧭</span>
                  <div>
                    <strong>दिशा एवं स्थान</strong>
                    <p>{pooja.direction}</p>
                  </div>
                </div>
              </div>
              <p className="muted" style={{ marginTop: 12, fontSize: '0.95rem' }}>
                आज की तिथि, नक्षत्र और राहु काल जानने के लिए <Link href="/panchang" style={{ color: 'var(--saffron-deep)', fontWeight: 700 }}>आज का पंचांग</Link> देखें।
              </p>
            </section>

            <section id="samagri">
              <h2 className={styles.h2}>पूजा सामग्री</h2>
              <SamagriChecklist slug={pooja.slug} items={items} />
              {pooja.extraSamagri?.length > 0 && (
                <div className={styles.extra}>
                  <strong>अन्य आवश्यक वस्तुएँ</strong>
                  <ul>
                    {pooja.extraSamagri.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section id="taiyari">
              <h2 className={styles.h2}>पूजा से पहले की तैयारी</h2>
              <ul className={styles.prepList}>
                {(pooja.preparation ?? []).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </section>

            <section id="vidhi">
              <PoojaSteps name={pooja.name} steps={steps} />
            </section>

            <section id="mantra">
              <h2 className={styles.h2}>प्रमुख मंत्र एवं उनका अर्थ</h2>
              <div className={styles.mantras}>
                {(pooja.mantras ?? []).map((m) => (
                  <MantraCard key={m.name} mantra={m} />
                ))}
              </div>
            </section>

            <section id="niyam">
              <h2 className={styles.h2}>नियम एवं लाभ</h2>
              <div className={styles.twoCol}>
                <div className={`${styles.listCard} ${styles.rules}`}>
                  <h3>ध्यान रखने योग्य नियम</h3>
                  <ul>
                    {(pooja.rules ?? []).map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className={`${styles.listCard} ${styles.benefits}`}>
                  <h3>पूजा के लाभ</h3>
                  <ul>
                    {(pooja.benefits ?? []).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section id="prashn">
              <h2 className={styles.h2}>प्रश्नोत्तर</h2>
              {(pooja.faq ?? []).map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
              {prev && next && (
                <div className={styles.pager}>
                  <Link href={`/karmkand/pooja-paddhati/${prev.slug}`}>
                    <small>← पिछली पूजा</small>
                    <strong>{prev.name}</strong>
                  </Link>
                  <Link href={`/karmkand/pooja-paddhati/${next.slug}`}>
                    <small>अगली पूजा →</small>
                    <strong>{next.name}</strong>
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
