import Link from 'next/link';
import styles from './blog.module.css';

/**
 * Minimal, safe Markdown renderer for blog content authored in the CMS.
 * Supports headings (#, ##, ###), paragraphs, bullet / numbered lists, block quotes,
 * **bold**, *italic* and [links](url). Everything becomes React elements, never raw HTML,
 * so content can't inject markup or scripts. Link targets are limited to http(s), mailto and site-relative paths.
 */

const SAFE_URL = /^(https?:\/\/|mailto:|\/(?!\/))/i;

function inline(text, keyBase) {
  const out = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\))/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyBase}-${i++}`;
    if (m[2]) out.push(<strong key={key}>{m[2]}</strong>);
    else if (m[3]) out.push(<em key={key}>{m[3]}</em>);
    else if (m[4]) {
      const href = m[5];
      if (!SAFE_URL.test(href)) out.push(m[4]);
      else if (href.startsWith('/')) out.push(<Link key={key} href={href}>{m[4]}</Link>);
      else out.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer nofollow">{m[4]}</a>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({ source = '' }) {
  const blocks = String(source).replace(/\r\n/g, '\n').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className={styles.prose}>
      {blocks.map((block, bi) => {
        const lines = block.split('\n');
        const heading = block.match(/^(#{1,3})\s+(.+)$/);
        if (heading && lines.length === 1) {
          const Tag = `h${heading[1].length + 1}`; // # → h2 (the page owns the h1)
          return <Tag key={bi}>{inline(heading[2], bi)}</Tag>;
        }
        if (lines.every((l) => /^[-*]\s+/.test(l))) {
          return (
            <ul key={bi}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.replace(/^[-*]\s+/, ''), `${bi}-${li}`)}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => /^\d+[.)]\s+/.test(l))) {
          return (
            <ol key={bi}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.replace(/^\d+[.)]\s+/, ''), `${bi}-${li}`)}</li>
              ))}
            </ol>
          );
        }
        if (lines.every((l) => l.startsWith('>'))) {
          return <blockquote key={bi}>{inline(lines.map((l) => l.replace(/^>\s?/, '')).join(' '), bi)}</blockquote>;
        }
        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <span key={li}>
                {li > 0 && <br />}
                {inline(l, `${bi}-${li}`)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
