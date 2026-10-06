'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Info, RotateCcw } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { LANGUAGES, SPECIALITIES, VEDAS } from '@/lib/pandit/catalog';
import { usePandit } from '@/lib/pandit/store';
import { PageHead, ToggleChips, styles as s } from './ui';

export default function ProfileForm() {
  const { t } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const { me, saveProfile, resetAll, loaded } = usePandit();
  const first = !me;

  const [f, setF] = useState(null);
  const [samples, setSamples] = useState(true);
  const [errors, setErrors] = useState({});

  if (!loaded) return null;
  const form = f ?? {
    name: me?.name ?? user?.name ?? '',
    nameHi: me?.nameHi ?? '',
    headline: me?.headline ?? '',
    phone: me?.phone ?? user?.phone ?? '',
    city: me?.city ?? '',
    state: me?.state ?? '',
    experience: me?.experience ?? '',
    ved: me?.ved ?? '',
    languages: me?.languages ?? ['hi', 'sa'],
    specialities: me?.specialities ?? ['karmkand'],
    bio: me?.bio ?? '',
    upi: me?.upi ?? '',
    available: me?.available ?? true,
    hue: me?.hue ?? 28,
  };
  const set = (k) => (e) => setF({ ...form, [k]: e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = t({ en: 'Please enter your name', hi: 'कृपया अपना नाम लिखें' });
    if (!form.city.trim()) err.city = t({ en: 'Please enter your city', hi: 'कृपया अपना शहर लिखें' });
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, '').slice(-10))) err.phone = t({ en: 'Enter a 10-digit mobile number', hi: '10 अंकों का मोबाइल नंबर लिखें' });
    if (!form.specialities.length) err.specialities = t({ en: 'Choose at least one', hi: 'कम से कम एक चुनें' });
    setErrors(err);
    if (Object.keys(err).length) return;
    saveProfile({ ...form, experience: Number(form.experience) || 0 }, { withSamples: samples });
    router.push('/pandit-sangh/dashboard');
  };

  return (
    <div className={`container ${s.shell}`} style={{ maxWidth: 900 }}>
      <PageHead
        title={first ? { en: 'Create your pandit profile', hi: 'अपनी पंडित प्रोफ़ाइल बनाएँ' } : { en: 'My profile', hi: 'मेरी प्रोफ़ाइल' }}
        sub={{ en: 'This is what other pandits see on the network.', hi: 'नेटवर्क पर अन्य पंडित यही देखेंगे।' }}
      />

      <form className={s.form} onSubmit={submit} noValidate>
        <div className={s.formSection}>
          <h3>{t({ en: 'Basic details', hi: 'मूल विवरण' })}</h3>
          <p className={s.hint}>
            {t({ en: 'Fields marked * are required.', hi: '* वाले खाने आवश्यक हैं।' })}
          </p>
          <div className={s.fields}>
            <div className="field">
              <label htmlFor="pf-name">{t({ en: 'Full name (English) *', hi: 'पूरा नाम (अंग्रेज़ी में) *' })}</label>
              <input id="pf-name" className={`input ${errors.name ? 'invalid' : ''}`} value={form.name} onChange={set('name')} placeholder="Pt. Ramakant Dwivedi" />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="pf-namehi">{t({ en: 'Name in Hindi', hi: 'नाम हिंदी में' })}</label>
              <input id="pf-namehi" className="input" value={form.nameHi} onChange={set('nameHi')} placeholder="पं. रमाकांत द्विवेदी" />
            </div>
            <div className={`field ${s.full}`}>
              <label htmlFor="pf-head">{t({ en: 'Headline', hi: 'परिचय पंक्ति' })}</label>
              <input id="pf-head" className="input" value={form.headline} onChange={set('headline')} placeholder={t({ en: 'e.g. Karmkandi & Jyotishi · Vivah, Griha Pravesh, Rudrabhishek', hi: 'जैसे: कर्मकांडी एवं ज्योतिषी · विवाह, गृह प्रवेश, रुद्राभिषेक' })} />
            </div>
            <div className="field">
              <label htmlFor="pf-phone">{t({ en: 'Mobile (WhatsApp) *', hi: 'मोबाइल (व्हाट्सऐप) *' })}</label>
              <input id="pf-phone" className={`input ${errors.phone ? 'invalid' : ''}`} inputMode="tel" value={form.phone} onChange={set('phone')} placeholder="98XXXXXXXX" />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
            <div className="field">
              <label htmlFor="pf-exp">{t({ en: 'Experience (years)', hi: 'अनुभव (वर्ष)' })}</label>
              <input id="pf-exp" className="input" type="number" min="0" max="80" value={form.experience} onChange={set('experience')} />
            </div>
            <div className="field">
              <label htmlFor="pf-city">{t({ en: 'City *', hi: 'शहर *' })}</label>
              <input id="pf-city" className={`input ${errors.city ? 'invalid' : ''}`} value={form.city} onChange={set('city')} />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>
            <div className="field">
              <label htmlFor="pf-state">{t({ en: 'State', hi: 'राज्य' })}</label>
              <input id="pf-state" className="input" value={form.state} onChange={set('state')} />
            </div>
            <div className="field">
              <label htmlFor="pf-ved">{t({ en: 'Ved / Shakha', hi: 'वेद / शाखा' })}</label>
              <select id="pf-ved" className="input" value={form.ved} onChange={set('ved')}>
                <option value="">{t({ en: '— Select —', hi: '— चुनें —' })}</option>
                {Object.entries(VEDAS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {t(v)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="pf-upi">{t({ en: 'UPI ID for payouts', hi: 'भुगतान हेतु UPI आईडी' })}</label>
              <input id="pf-upi" className="input" value={form.upi} onChange={set('upi')} placeholder="name@upi" />
            </div>
          </div>
        </div>

        <div className={s.formSection}>
          <h3>{t({ en: 'Specialities *', hi: 'विशेषज्ञता *' })}</h3>
          <p className={s.hint}>
            {t({ en: 'Pandits searching for help filter by these.', hi: 'सहायता खोजने वाले पंडित इन्हीं से फ़िल्टर करते हैं।' })}
          </p>
          <ToggleChips options={SPECIALITIES} value={form.specialities} onChange={set('specialities')} label={{ en: 'Specialities', hi: 'विशेषज्ञता' }} />
          {errors.specialities && <p className="error-text">{errors.specialities}</p>}
        </div>

        <div className={s.formSection}>
          <h3>{t({ en: 'Languages', hi: 'भाषाएँ' })}</h3>
          <p className={s.hint}>
            {t({ en: 'Languages you can conduct rituals and explain in.', hi: 'जिन भाषाओं में आप अनुष्ठान करा और समझा सकते हैं।' })}
          </p>
          <ToggleChips options={LANGUAGES} value={form.languages} onChange={set('languages')} label={{ en: 'Languages', hi: 'भाषाएँ' }} />
        </div>

        <div className={s.formSection}>
          <h3>{t({ en: 'About you', hi: 'आपके बारे में' })}</h3>
          <textarea className="input" rows={5} value={form.bio} onChange={set('bio')} placeholder={t({ en: 'Where you studied, your guru parampara, the anushthans you lead…', hi: 'आपने कहाँ अध्ययन किया, गुरु परंपरा, कौन-से अनुष्ठान कराते हैं…' })} style={{ marginTop: 8 }} />
          <label className={s.check} style={{ marginTop: 14 }}>
            <input type="checkbox" checked={form.available} onChange={set('available')} />
            <span>{t({ en: 'Show me as available for work from other pandits', hi: 'अन्य पंडितों के काम के लिए मुझे उपलब्ध दिखाएँ' })}</span>
          </label>
        </div>

        {first && (
          <div className={s.formSection}>
            <label className={s.check}>
              <input type="checkbox" checked={samples} onChange={(e) => setSamples(e.target.checked)} />
              <span>
                <strong>{t({ en: 'Add sample yajmans, connections and a paid job', hi: 'नमूना यजमान, कनेक्शन और एक भुगतान वाला काम जोड़ें' })}</strong>
                <br />
                <span className={`muted ${s.small}`}>{t({ en: 'Helpful to explore. You can delete them anytime.', hi: 'समझने में सहायक। इन्हें कभी भी हटा सकते हैं।' })}</span>
              </span>
            </label>
          </div>
        )}

        <div className={s.notice}>
          <Info size={16} />
          <span>
            {t({
              en: 'For now your Pandit Sangh data is saved in this browser only. Use “Export” on the Yajmans page to keep a backup.',
              hi: 'अभी आपका पंडित संघ डेटा केवल इसी ब्राउज़र में सहेजा जाता है। बैकअप के लिए यजमान पृष्ठ पर “निर्यात” का उपयोग करें।',
            })}
          </span>
        </div>

        <div className={s.formFoot}>
          {!first && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                if (window.confirm(t({ en: 'Delete your profile and all Pandit Sangh data in this browser?', hi: 'इस ब्राउज़र से आपकी प्रोफ़ाइल और पंडित संघ का सारा डेटा हटाएँ?' }))) {
                  resetAll();
                  router.push('/pandit-sangh');
                }
              }}
            >
              <RotateCcw size={16} /> {t({ en: 'Delete all data', hi: 'सारा डेटा हटाएँ' })}
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {first ? t({ en: 'Create profile', hi: 'प्रोफ़ाइल बनाएँ' }) : t({ en: 'Save changes', hi: 'बदलाव सहेजें' })}
          </button>
        </div>
      </form>
    </div>
  );
}
