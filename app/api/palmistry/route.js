import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

// Palm reading needs the Node runtime (SDK + larger request bodies).
export const runtime = 'nodejs';
export const maxDuration = 120;

const MAX_BYTES = 5 * 1024 * 1024; // Claude's per-image limit (base64-decoded)
const TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Created on first use so a key added to the environment is picked up after a restart,
// and a missing key gives our own clear error instead of crashing the module.
let client;
const getClient = () => (client ||= new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }));

const ENV_FILES = ['.env', '.env.local', '.env.production', '.env.production.local', '.env.development', '.env.development.local'];

/**
 * GET /api/palmistry — safe configuration check for the server (never reveals the key).
 * Shows whether the key is loaded, which env files the running app can see, and the mode,
 * so a "key missing" error on a deployed server can be diagnosed from the browser.
 */
export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY || '';
  const cwd = process.cwd();
  const files = Object.fromEntries(
    ENV_FILES.map((f) => {
      const full = path.join(cwd, f);
      if (!fs.existsSync(full)) return [f, 'not found'];
      const hasKey = /^\s*ANTHROPIC_API_KEY\s*=\s*\S+/m.test(fs.readFileSync(full, 'utf8'));
      return [f, hasKey ? 'found, has ANTHROPIC_API_KEY' : 'found, NO ANTHROPIC_API_KEY line'];
    }),
  );
  return Response.json({
    keyLoaded: Boolean(key),
    keyStartsWith: key ? `${key.slice(0, 10)}…` : null,
    keyLength: key.length,
    mode: process.env.NODE_ENV,
    appFolder: cwd,
    envFiles: files,
    hint: key
      ? 'Key is loaded. Palm reading should work.'
      : process.env.NODE_ENV === 'production'
        ? 'Key not loaded. Put ANTHROPIC_API_KEY=... in .env.local (or .env.production) inside appFolder, then restart the app (e.g. pm2 restart <name>).'
        : 'Key not loaded. This server runs in development mode, which ignores .env.production. Put the key in .env.local inside appFolder, then restart.',
  });
}

// Every reader-facing field comes back in English (_en) and Hindi (_hi) so the site's EN/HI toggle
// switches instantly. This schema is too big for strict structured outputs (grammar limit), so it is
// given to the model in the prompt and normalize() validates the result and rebuilds { en, hi }.
const S = { type: 'string' };
const obj = (properties) => ({ type: 'object', properties, required: Object.keys(properties), additionalProperties: false });
const arr = (items, description) => ({ type: 'array', items, ...(description ? { description } : {}) });

const LINE_KEYS = ['life', 'head', 'heart', 'fate', 'sun', 'marriage', 'health'];

const SCHEMA = obj({
  is_palm: { type: 'boolean', description: 'false if the image is not a clear open human palm' },
  problem_en: { type: 'string', description: 'If is_palm is false or the photo is poor: what is wrong and how to retake it. Else empty.' },
  problem_hi: S,
  photo_quality: { type: 'string', enum: ['good', 'fair', 'poor'] },
  hand_detected: { type: 'string', enum: ['left', 'right', 'unclear'], description: 'Which hand the photo appears to show.' },
  summary_en: { type: 'string', description: '3-4 sentence overview.' },
  summary_hi: S,
  hand_type: { type: 'string', enum: ['earth', 'air', 'fire', 'water', 'unclear'] },
  hand_desc_en: S,
  hand_desc_hi: S,
  hand_meaning_en: S,
  hand_meaning_hi: S,
  lines: arr(
    obj({
      key: { type: 'string', enum: LINE_KEYS },
      seen: { type: 'boolean', description: 'false if not visible in the photo' },
      desc_en: { type: 'string', description: 'What the line looks like in THIS photo: start, end, depth, breaks, branches, islands.' },
      desc_hi: S,
      meaning_en: S,
      meaning_hi: S,
    }),
    'One entry for each of the 7 lines: life, head, heart, fate, sun, marriage, health.',
  ),
  mounts: arr(
    obj({ name_en: S, name_hi: S, prominence: { type: 'string', enum: ['prominent', 'normal', 'flat', 'unclear'] }, meaning_en: S, meaning_hi: S }),
    'The 7 mounts: Jupiter/गुरु, Saturn/शनि, Sun/सूर्य, Mercury/बुध, Venus/शुक्र, Moon/चंद्र, Mars/मंगल.',
  ),
  special_signs: arr(
    obj({ sign_en: S, sign_hi: S, location_en: S, location_hi: S, meaning_en: S, meaning_hi: S }),
    'Only signs actually visible: cross, star, triangle, trishul, fish, mystic cross, simian line, etc.',
  ),
  life_areas: arr(obj({ title_en: S, title_hi: S, text_en: S, text_hi: S }), 'Exactly: Personality, Career & Wealth, Love & Marriage, Health, Overall Fortune.'),
  points: arr(
    obj({ kind: { type: 'string', enum: ['strength', 'caution', 'remedy'] }, en: S, hi: S }),
    '3-5 strengths, 2-4 cautions, 3-5 simple harmless remedies (mantra, daan, habits; gemstone only as optional advice).',
  ),
});

const str = (v) => (typeof v === 'string' ? v : '');
const list = (v) => (Array.isArray(v) ? v.filter((x) => x && typeof x === 'object') : []);
const pick = (v, allowed, fallback) => (allowed.includes(v) ? v : fallback);
const bi = (o, k) => ({ en: str(o?.[`${k}_en`]), hi: str(o?.[`${k}_hi`]) });

// Validate the model's flat JSON and rebuild it into the { en, hi } shape the page renders.
function normalize(o) {
  if (!o || typeof o !== 'object') throw new Error('not an object');
  const lines = {};
  for (const k of LINE_KEYS) {
    const l = list(o.lines).find((x) => x.key === k);
    lines[k] = { seen: Boolean(l?.seen), description: bi(l, 'desc'), meaning: bi(l, 'meaning') };
  }
  const pts = (kind) => list(o.points).filter((p) => p.kind === kind).map((p) => ({ en: str(p.en), hi: str(p.hi) }));
  return {
    is_palm: o.is_palm !== false,
    problem: bi(o, 'problem'),
    photo_quality: pick(o.photo_quality, ['good', 'fair', 'poor'], 'fair'),
    hand_detected: pick(o.hand_detected, ['left', 'right', 'unclear'], 'unclear'),
    summary: bi(o, 'summary'),
    hand_shape: { type: pick(o.hand_type, ['earth', 'air', 'fire', 'water', 'unclear'], 'unclear'), description: bi(o, 'hand_desc'), meaning: bi(o, 'hand_meaning') },
    lines,
    mounts: list(o.mounts).map((m) => ({ name: bi(m, 'name'), prominence: pick(m.prominence, ['prominent', 'normal', 'flat', 'unclear'], 'unclear'), meaning: bi(m, 'meaning') })),
    special_signs: list(o.special_signs).map((x) => ({ sign: bi(x, 'sign'), location: bi(x, 'location'), meaning: bi(x, 'meaning') })),
    life_areas: list(o.life_areas).map((a) => ({ title: bi(a, 'title'), text: bi(a, 'text') })),
    strengths: pts('strength'),
    cautions: pts('caution'),
    remedies: pts('remedy'),
  };
}

// The reply should be bare JSON; tolerate a ```json fence or stray text around it.
function extractJson(text) {
  const a = text.indexOf('{');
  const b = text.lastIndexOf('}');
  if (a < 0 || b <= a) throw new Error('no JSON in reply');
  return JSON.parse(text.slice(a, b + 1));
}

const SYSTEM = `You are an experienced palmist trained in Indian Hast Rekha / Samudrik Shastra and Western chirology, writing a reading for a Vedic astrology website.

Read only what is genuinely visible in the photo. Describe each line as you actually see it (where it starts and ends, depth, breaks, branches, islands). If a line or mount can't be made out, set seen=false or prominence="unclear" and say so, rather than inventing detail. If the image is not an open human palm, set is_palm=false, explain in "problem", and fill the other fields with short placeholders.

Tone: warm, encouraging, practical. Palmistry is traditional guidance, not certainty: never predict death, the exact age of death, serious illness, divorce or infertility as fact. Phrase health and relationship points as tendencies to look after. Remedies must be harmless.`;

export async function POST(req) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'AI palm reading is not configured on the server (ANTHROPIC_API_KEY missing).' }, { status: 503 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { image, mediaType, gender, hand, name } = body || {};
  if (typeof image !== 'string' || !TYPES.includes(mediaType)) {
    return Response.json({ error: 'Please upload a JPG, PNG or WEBP photo.' }, { status: 400 });
  }
  if (Buffer.byteLength(image, 'base64') > MAX_BYTES) {
    return Response.json({ error: 'Photo is too large (max 5 MB).' }, { status: 413 });
  }

  const person = String(name || '').slice(0, 60).trim();
  const g = gender === 'female' ? 'female' : 'male';
  const h = hand === 'left' ? 'left' : 'right';

  const prompt = `Read this palm.
Person: ${person || 'not given'}, ${g}.
The user says this is the ${h} hand. (In Samudrik Shastra the main hand is the right for men and the left for women.)
Fields ending in _en (or named "en") are English; fields ending in _hi (or named "hi") carry the same content in natural Hindi (Devanagari). Use common Hindi palmistry terms (जीवन रेखा, भाग्य रेखा, गुरु पर्वत ...). Keep the enum values in English.

Reply with ONLY one JSON object (no markdown, no commentary) that matches this JSON Schema:
${JSON.stringify(SCHEMA)}`;

  try {
    const response = await getClient().beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'medium' },
      system: SYSTEM,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: image } },
            { type: 'text', text: prompt },
          ],
        },
      ],
    });

    if (response.stop_reason === 'refusal') {
      return Response.json({ error: 'This photo could not be read. Please upload a clear photo of an open palm.' }, { status: 422 });
    }
    if (response.stop_reason === 'max_tokens') {
      return Response.json({ error: 'The reading was cut short. Please try again.' }, { status: 502 });
    }
    const out = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    let report;
    try {
      report = normalize(extractJson(out));
    } catch (e) {
      console.error('palmistry: unparseable reply', e.message, out.slice(0, 300));
      return Response.json({ error: 'The reading could not be prepared. Please try again.' }, { status: 502 });
    }
    return Response.json({ report });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json({ error: 'Too many readings right now. Please try again in a minute.' }, { status: 429 });
    }
    if (err instanceof Anthropic.BadRequestError) {
      console.error('palmistry: bad request', err.message);
      return Response.json({ error: 'The photo could not be processed. Please try a different photo.' }, { status: 400 });
    }
    if (err instanceof Anthropic.AuthenticationError) {
      console.error('palmistry: invalid ANTHROPIC_API_KEY');
      return Response.json({ error: 'AI palm reading is not configured correctly.' }, { status: 503 });
    }
    console.error('palmistry:', err);
    return Response.json({ error: 'Palm reading failed. Please try again.' }, { status: 502 });
  }
}
