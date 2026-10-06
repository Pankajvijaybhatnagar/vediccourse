'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Send } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { ME, panditName, usePandit } from '@/lib/pandit/store';
import { Avatar, Empty, PageHead, RequireProfile, Shell, styles as s } from './ui';

export default function Messages() {
  return (
    <Shell>
      <RequireProfile>
        <Inner />
      </RequireProfile>
    </Shell>
  );
}

function Inner() {
  const { t, lang } = useLang();
  const params = useSearchParams();
  const { messages, connections, panditById, sendMessage } = usePandit();
  const [text, setText] = useState('');
  const body = useRef(null);

  // Threads: everyone messaged plus accepted connections, newest activity first.
  const threads = useMemo(() => {
    const last = new Map();
    connections.filter((c) => c.status === 'accepted').forEach((c) => last.set(c.from === ME ? c.to : c.from, null));
    messages.forEach((m) => last.set(m.from === ME ? m.to : m.from, m));
    return [...last.entries()]
      .map(([id, m]) => ({ id, last: m, p: panditById(id) }))
      .filter((x) => x.p)
      .sort((a, b) => (b.last?.at || '').localeCompare(a.last?.at || ''));
  }, [messages, connections, panditById]);

  const [active, setActive] = useState(params.get('to') || null);
  const current = active || threads[0]?.id;
  const other = panditById(current);
  const convo = messages.filter((m) => (m.from === ME && m.to === current) || (m.to === ME && m.from === current));

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: 'smooth' });
  }, [convo.length, current]);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim() || !current) return;
    sendMessage(current, text.trim());
    setText('');
  };

  if (!threads.length && !other)
    return (
      <>
        <PageHead title={{ en: 'Messages', hi: 'संदेश' }} />
        <Empty icon="💬" text={t({ en: 'Connect with pandits to start a conversation.', hi: 'बातचीत शुरू करने के लिए पंडितों से जुड़ें।' })}>
          <Link href="/pandit-sangh/network" className="btn btn-primary">
            {t({ en: 'Find pandits', hi: 'पंडित खोजें' })}
          </Link>
        </Empty>
      </>
    );

  const list = other && !threads.some((x) => x.id === current) ? [{ id: current, p: other, last: null }, ...threads] : threads;

  return (
    <>
      <PageHead title={{ en: 'Messages', hi: 'संदेश' }} sub={{ en: 'Coordinate muhurat, samagri and travel with your team.', hi: 'मुहूर्त, सामग्री और यात्रा का अपनी टीम से समन्वय करें।' }} />
      <div className={s.inbox}>
        <div className={s.threads}>
          {list.map(({ id, p, last }) => (
            <button key={id} className={s.thread} aria-current={id === current} onClick={() => setActive(id)}>
              <Avatar name={p.name} hue={p.hue} size={38} />
              <span style={{ minWidth: 0 }}>
                <strong style={{ display: 'block', fontSize: '0.92rem' }}>{panditName(p, lang)}</strong>
                <small>{last ? `${last.from === ME ? `${t({ en: 'You', hi: 'आप' })}: ` : ''}${last.text}` : t({ en: 'Say namaste 🙏', hi: 'नमस्ते कहें 🙏' })}</small>
              </span>
            </button>
          ))}
        </div>
        <div className={s.chat}>
          {other && (
            <>
              <div className={s.chatHead}>
                <Avatar name={other.name} hue={other.hue} size={36} />
                <div>
                  <Link href={`/pandit-sangh/pandit/${other.id}`}>
                    <strong>{panditName(other, lang)}</strong>
                  </Link>
                  <small className="muted" style={{ display: 'block', fontSize: '0.8rem' }}>
                    {other.city}
                  </small>
                </div>
              </div>
              <div className={s.chatBody} ref={body}>
                {convo.length ? (
                  convo.map((m) => (
                    <div key={m.id} className={`${s.bubble} ${m.from === ME ? s.bubbleMe : ''}`}>
                      {m.text}
                      <time>{new Date(m.at).toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</time>
                    </div>
                  ))
                ) : (
                  <p className="muted" style={{ margin: 'auto', textAlign: 'center' }}>
                    {t({ en: 'No messages yet.', hi: 'अभी कोई संदेश नहीं।' })}
                  </p>
                )}
              </div>
              <form className={s.chatForm} onSubmit={submit}>
                <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder={t({ en: 'Write a message…', hi: 'संदेश लिखें…' })} aria-label={t({ en: 'Message', hi: 'संदेश' })} />
                <button type="submit" className="btn btn-primary" disabled={!text.trim()} aria-label={t({ en: 'Send', hi: 'भेजें' })}>
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
