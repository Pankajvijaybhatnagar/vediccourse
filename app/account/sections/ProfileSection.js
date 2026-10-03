'use client';

import { useRef, useState } from 'react';
import { Camera, MapPin, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useLang } from '@/lib/i18n';
import { Avatar } from '@/components/auth/UserMenu';
import { authErrorMessage } from '@/components/auth/errors';
import BirthPlacePicker from '@/components/BirthPlacePicker';
import { Notice } from '../ui';
import styles from '../account.module.css';

const MAX_AVATAR_MB = 5;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];

function AvatarEditor() {
  const { t } = useLang();
  const { user, setUser } = useAuth();
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  const upload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type)) {
      setNotice({ type: 'error', text: { en: 'Please choose a JPG, PNG, WebP, AVIF or GIF image.', hi: 'कृपया JPG, PNG, WebP, AVIF या GIF चित्र चुनें।' } });
      return;
    }
    if (file.size > MAX_AVATAR_MB * 1024 * 1024) {
      setNotice({ type: 'error', text: { en: `Image must be under ${MAX_AVATAR_MB} MB.`, hi: `चित्र ${MAX_AVATAR_MB} MB से छोटा होना चाहिए।` } });
      return;
    }
    const form = new FormData();
    form.append('file', file);
    setBusy(true);
    setNotice(null);
    try {
      const { data } = await api('/users/me/avatar', { method: 'PUT', body: form });
      setUser(data);
      setNotice({ type: 'ok', text: { en: 'Photo updated.', hi: 'फ़ोटो अपडेट हो गई।' } });
    } catch (err) {
      setNotice({
        type: 'error',
        text:
          err.status === 503
            ? { en: 'Photo uploads are not available right now. Please try again later.', hi: 'फ़ोटो अपलोड अभी उपलब्ध नहीं है। कृपया बाद में प्रयास करें।' }
            : authErrorMessage(err),
      });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    setNotice(null);
    try {
      const { data } = await api('/users/me/avatar', { method: 'DELETE' });
      setUser(data);
    } catch (err) {
      setNotice({ type: 'error', text: authErrorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.avatarRow}>
      <Avatar user={user} size={84} />
      <div>
        <div className={styles.btnRow}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => inputRef.current?.click()} disabled={busy}>
            <Camera size={15} aria-hidden="true" /> {busy ? t({ en: 'Uploading…', hi: 'अपलोड हो रहा है…' }) : t({ en: 'Change photo', hi: 'फ़ोटो बदलें' })}
          </button>
          {user.avatar?.url && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={remove} disabled={busy}>
              <Trash2 size={15} aria-hidden="true" /> {t({ en: 'Remove', hi: 'हटाएँ' })}
            </button>
          )}
        </div>
        <p className={styles.hint}>{t({ en: `JPG, PNG or WebP, up to ${MAX_AVATAR_MB} MB.`, hi: `JPG, PNG या WebP, अधिकतम ${MAX_AVATAR_MB} MB।` })}</p>
        <input ref={inputRef} type="file" accept={IMAGE_TYPES.join(',')} hidden onChange={upload} aria-label={t({ en: 'Upload profile photo', hi: 'प्रोफ़ाइल फ़ोटो अपलोड करें' })} />
        <Notice notice={notice} />
      </div>
    </div>
  );
}

export default function ProfileSection() {
  const { t, setLang } = useLang();
  const { user, setUser } = useAuth();
  const b = user.birthDetails || {};

  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    language: user.language || 'en',
    gender: user.gender || 'unspecified',
    date: b.date || '',
    time: b.time || '',
  });
  const [place, setPlace] = useState(b.place?.lat != null ? b.place : null);
  const [editPlace, setEditPlace] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
    setNotice(null);
  };

  const onPlace = (p) => {
    setPlace(p ? { name: p.name?.en || p.name, lat: p.lat, lon: p.lon, tz: p.tz } : null);
    setNotice(null);
  };

  const save = async (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim() && form.name.trim().length < 2) next.name = { en: 'Name must be at least 2 characters.', hi: 'नाम कम से कम 2 अक्षर का हो।' };
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = { en: 'Enter a valid email address.', hi: 'कृपया सही ईमेल दर्ज करें।' };
    if ((form.time || place) && !form.date) next.date = { en: 'Add your date of birth to save birth details.', hi: 'जन्म विवरण सहेजने के लिए जन्म तिथि दर्ज करें।' };
    setErrors(next);
    if (Object.keys(next).length) return;

    const body = { language: form.language, gender: form.gender };
    if (form.name.trim()) body.name = form.name.trim();
    if (form.email.trim() && form.email.trim().toLowerCase() !== (user.email || '')) body.email = form.email.trim();
    if (form.date) {
      body.birthDetails = {
        date: form.date,
        ...(form.time && { time: form.time }),
        ...(place && { place: { name: place.name, lat: place.lat, lon: place.lon, tz: place.tz } }),
      };
    }

    setBusy(true);
    setNotice(null);
    try {
      const { data } = await api('/users/me', { method: 'PATCH', body });
      setUser(data);
      if (data.language) setLang(data.language);
      setEditPlace(false);
      setNotice({ type: 'ok', text: { en: 'Profile saved.', hi: 'प्रोफ़ाइल सहेजी गई।' } });
    } catch (err) {
      setNotice({ type: 'error', text: authErrorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const err = (k) =>
    errors[k] && (
      <p className="error-text" id={`pf-${k}-error`}>
        {t(errors[k])}
      </p>
    );

  return (
    <div className={styles.stack}>
      <AvatarEditor />

      <form className={styles.form} onSubmit={save} noValidate>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label htmlFor="pf-name">{t({ en: 'Full name', hi: 'पूरा नाम' })}</label>
            <input id="pf-name" className={`input ${errors.name ? 'invalid' : ''}`} autoComplete="name" maxLength={80} value={form.name} onChange={set('name')} aria-describedby={errors.name ? 'pf-name-error' : undefined} />
            {err('name')}
          </div>
          <div className={styles.field}>
            <label htmlFor="pf-phone">{t({ en: 'Mobile number', hi: 'मोबाइल नंबर' })}</label>
            <input id="pf-phone" className="input" value={user.phone ? `+91 ${user.phone}` : t({ en: 'Not added', hi: 'नहीं जोड़ा गया' })} readOnly disabled />
          </div>
          <div className={styles.field}>
            <label htmlFor="pf-email">{t({ en: 'Email', hi: 'ईमेल' })}</label>
            <input id="pf-email" type="email" className={`input ${errors.email ? 'invalid' : ''}`} autoComplete="email" maxLength={254} value={form.email} onChange={set('email')} aria-describedby={errors.email ? 'pf-email-error' : undefined} />
            {err('email')}
          </div>
          <div className={styles.field}>
            <label htmlFor="pf-language">{t({ en: 'Preferred language', hi: 'पसंदीदा भाषा' })}</label>
            <select id="pf-language" className="input" value={form.language} onChange={set('language')}>
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="pf-gender">{t({ en: 'Gender', hi: 'लिंग' })}</label>
            <select id="pf-gender" className="input" value={form.gender} onChange={set('gender')}>
              <option value="unspecified">{t({ en: 'Prefer not to say', hi: 'नहीं बताना चाहते' })}</option>
              <option value="female">{t({ en: 'Female', hi: 'महिला' })}</option>
              <option value="male">{t({ en: 'Male', hi: 'पुरुष' })}</option>
              <option value="other">{t({ en: 'Other', hi: 'अन्य' })}</option>
            </select>
          </div>
        </div>

        <fieldset className={styles.fieldset}>
          <legend>{t({ en: 'Birth details (used for your Kundli)', hi: 'जन्म विवरण (आपकी कुंडली हेतु)' })}</legend>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="pf-date">{t({ en: 'Date of birth', hi: 'जन्म तिथि' })}</label>
              <input id="pf-date" type="date" className={`input ${errors.date ? 'invalid' : ''}`} max={new Date().toISOString().slice(0, 10)} min="1900-01-01" value={form.date} onChange={set('date')} aria-describedby={errors.date ? 'pf-date-error' : undefined} />
              {err('date')}
            </div>
            <div className={styles.field}>
              <label htmlFor="pf-time">{t({ en: 'Time of birth', hi: 'जन्म समय' })}</label>
              <input id="pf-time" type="time" className="input" value={form.time} onChange={set('time')} />
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.fakeLabel}>{t({ en: 'Place of birth', hi: 'जन्म स्थान' })}</span>
            {!editPlace ? (
              <div className={styles.placeRow}>
                <MapPin size={16} aria-hidden="true" />
                <span>{place?.name || t({ en: 'Not added', hi: 'नहीं जोड़ा गया' })}</span>
                <button type="button" className={styles.linkBtn} onClick={() => setEditPlace(true)}>
                  {place ? t({ en: 'Change', hi: 'बदलें' }) : t({ en: 'Add place', hi: 'स्थान जोड़ें' })}
                </button>
              </div>
            ) : (
              <div className={styles.placeEdit}>
                <BirthPlacePicker onChange={onPlace} />
                <button type="button" className={styles.linkBtn} onClick={() => { setEditPlace(false); setPlace(b.place?.lat != null ? b.place : null); }}>
                  {t({ en: 'Cancel', hi: 'रद्द करें' })}
                </button>
              </div>
            )}
          </div>
        </fieldset>

        <Notice notice={notice} />
        <div>
          <button className="btn btn-primary" disabled={busy}>
            {busy ? t({ en: 'Saving…', hi: 'सहेजा जा रहा है…' }) : t({ en: 'Save changes', hi: 'परिवर्तन सहेजें' })}
          </button>
        </div>
      </form>
    </div>
  );
}
