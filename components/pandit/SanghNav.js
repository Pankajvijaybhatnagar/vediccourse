'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, LayoutDashboard, MessageCircle, Network, ScrollText, UserRound, Users, Wallet } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { ME, usePandit } from '@/lib/pandit/store';
import s from './sangh.module.css';

const LINKS = [
  { href: '/pandit-sangh/dashboard', icon: LayoutDashboard, label: { en: 'My Workspace', hi: 'मेरा कार्यक्षेत्र' } },
  { href: '/pandit-sangh/yajman', icon: Users, label: { en: 'Yajmans', hi: 'यजमान' } },
  { href: '/pandit-sangh/kaam', icon: Briefcase, label: { en: 'Work Board', hi: 'कार्य बोर्ड' }, badge: 'jobs' },
  { href: '/pandit-sangh/network', icon: Network, label: { en: 'Pandit Network', hi: 'पंडित नेटवर्क' }, badge: 'requests' },
  { href: '/pandit-sangh/messages', icon: MessageCircle, label: { en: 'Messages', hi: 'संदेश' }, badge: 'messages' },
  { href: '/pandit-sangh/kamai', icon: Wallet, label: { en: 'Earnings', hi: 'कमाई' } },
  { href: '/pandit-sangh/profile', icon: UserRound, label: { en: 'My Profile', hi: 'मेरी प्रोफ़ाइल' } },
];

/** Threads whose latest message came from the other pandit. */
export function unansweredThreads(messages) {
  const last = new Map();
  messages.forEach((m) => last.set(m.from === ME ? m.to : m.from, m));
  return [...last.values()].filter((m) => m.from !== ME).length;
}

export default function SanghNav() {
  const { t } = useLang();
  const path = usePathname();
  const { connections, messages, jobs, me } = usePandit();

  const counts = {
    requests: connections.filter((c) => c.to === ME && c.status === 'pending').length,
    messages: unansweredThreads(messages),
    jobs: jobs.filter((j) => j.postedBy === ME && j.applicants.length && j.status === 'open').length,
  };

  return (
    <nav className={s.subnav} aria-label={t({ en: 'Pandit Sangh', hi: 'पंडित संघ' })}>
      <div className={`container ${s.subnavInner}`}>
        <Link href="/pandit-sangh" className={s.brand}>
          <span aria-hidden="true">ॐ</span> {t({ en: 'Pandit Sangh', hi: 'पंडित संघ' })}
        </Link>
        {LINKS.map(({ href, icon: I, label, badge }) => {
          const active = path === href || path.startsWith(`${href}/`);
          const n = me && badge ? counts[badge] : 0;
          return (
            <Link key={href} href={href} className={s.subLink} aria-current={active ? 'page' : undefined}>
              <I size={16} /> {t(label)}
              {n > 0 && <span className={s.dot}>{n}</span>}
            </Link>
          );
        })}
        <Link href="/pandit-sangh#how" className={s.subLink}>
          <ScrollText size={16} /> {t({ en: 'How it works', hi: 'कैसे काम करता है' })}
        </Link>
      </div>
    </nav>
  );
}
