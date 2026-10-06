'use client';

import Link from 'next/link';
import { Award, Clock, MapPin, MessageCircle, Star, UserCheck, UserPlus } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { SPECIALITIES } from '@/lib/pandit/catalog';
import { ME, panditName, usePandit } from '@/lib/pandit/store';
import { Avatar, Verified, styles as s } from './ui';

/** Connect / pending / message button for one pandit. */
export function ConnectButton({ panditId, block }) {
  const { t } = useLang();
  const { me, connectionWith, connect, respondConnection } = usePandit();
  const c = connectionWith(panditId);
  const cls = `btn btn-sm ${block ? 'btn-block' : ''}`;

  if (!me)
    return (
      <Link href="/pandit-sangh/profile" className={`${cls} btn-ghost`}>
        <UserPlus size={15} /> {t({ en: 'Connect', hi: 'जुड़ें' })}
      </Link>
    );
  if (c?.status === 'accepted')
    return (
      <Link href={`/pandit-sangh/messages?to=${panditId}`} className={`${cls} btn-ghost`}>
        <MessageCircle size={15} /> {t({ en: 'Message', hi: 'संदेश' })}
      </Link>
    );
  if (c?.status === 'pending' && c.to === ME)
    return (
      <button type="button" className={`${cls} btn-primary`} onClick={() => respondConnection(c.id, true)}>
        <UserCheck size={15} /> {t({ en: 'Accept', hi: 'स्वीकारें' })}
      </button>
    );
  if (c?.status === 'pending')
    return (
      <button type="button" className={`${cls} btn-ghost`} disabled>
        <Clock size={15} /> {t({ en: 'Request sent', hi: 'अनुरोध भेजा' })}
      </button>
    );
  return (
    <button type="button" className={`${cls} btn-primary`} onClick={() => connect(panditId)}>
      <UserPlus size={15} /> {t({ en: 'Connect', hi: 'जुड़ें' })}
    </button>
  );
}

export default function PanditCard({ p }) {
  const { t, lang } = useLang();
  return (
    <article className={s.pCard}>
      <div className={s.pTop}>
        <Avatar name={p.name} hue={p.hue} size={56} />
        <div style={{ minWidth: 0 }}>
          <h3>
            <Link href={`/pandit-sangh/pandit/${p.id}`}>{panditName(p, lang)}</Link>
            {p.verified && <Verified size={16} />}
          </h3>
          <p className={s.headline}>{p.headline}</p>
        </div>
      </div>
      <div className={s.meta}>
        <span>
          <MapPin size={14} /> {p.city}
        </span>
        <span>
          <Award size={14} /> {p.experience} {t({ en: 'yrs', hi: 'वर्ष' })}
        </span>
        {p.rating && (
          <span>
            <Star size={14} fill="#f5b400" color="#f5b400" /> {p.rating} ({p.reviews})
          </span>
        )}
      </div>
      <div className={s.chips}>
        {p.specialities.slice(0, 4).map((k) => (
          <span key={k} className={s.chip}>
            {t(SPECIALITIES[k])}
          </span>
        ))}
      </div>
      <div className={s.cardFoot}>
        <Link href={`/pandit-sangh/pandit/${p.id}`} className="btn btn-ghost btn-sm">
          {t({ en: 'View profile', hi: 'प्रोफ़ाइल' })}
        </Link>
        <ConnectButton panditId={p.id} />
      </div>
    </article>
  );
}
