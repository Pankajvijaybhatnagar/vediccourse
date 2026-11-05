import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenAI, ApiError as GeminiApiError, ThinkingLevel } from '@google/genai';

// Palm reading needs the Node runtime (SDK + larger request bodies).
export const runtime = 'nodejs';
export const maxDuration = 120;

const MAX_BYTES = 5 * 1024 * 1024; // Claude's per-image limit (base64-decoded)
const TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Which AI reads the palm: Gemini when GEMINI_API_KEY is set, otherwise Claude (ANTHROPIC_API_KEY).
// Clients are created on first use so a key added to the environment is picked up after a restart.
// Tried in order; the next one is used when a model is overloaded, timed out or unavailable to this key.
// gemini-3.5-flash is a fixed version (stable); the *-latest aliases follow Google's newest models.
// GEMINI_MODEL in the environment puts a model of your choice first.
const GEMINI_MODELS = [...new Set([process.env.GEMINI_MODEL, 'gemini-3.5-flash', 'gemini-flash-latest', 'gemini-flash-lite-latest'].filter(Boolean))];
// Built-in Gemini key (server-side only; this file never ships to the browser). A GEMINI_API_KEY
// set in the server environment overrides it, so the key can be rotated without a code change.
const GEMINI_BUILTIN_KEY = 'AIzaSyAXJGNNbe5PxJb54ZFOq10kqIUp71NKAVU';
const geminiKey = () => process.env.GEMINI_API_KEY || GEMINI_BUILTIN_KEY;
// Claude is the backup when every Gemini model is busy. Its key must come from the server environment
// (ANTHROPIC_API_KEY in .env.local): GitHub blocks pushes that contain Anthropic keys.
const claudeKey = () => process.env.ANTHROPIC_API_KEY || '';
const provider = () => (geminiKey() ? 'gemini' : claudeKey() ? 'claude' : null);
let claude;
let gemini;
const getClaude = () => (claude ||= new Anthropic({ apiKey: claudeKey() }));
// SDK retries are off (attempts: 1) and each call is capped at 60s, so a busy model fails fast and
// POST() moves on to the next model in GEMINI_MODELS, then to Claude.
const getGemini = () => (gemini ||= new GoogleGenAI({ apiKey: geminiKey(), httpOptions: { timeout: 60_000, retryOptions: { attempts: 1 } } }));

// Gemini overloaded or rate-limited: worth a retry or a fallback to Claude.
class GeminiBusy extends Error {
  constructor(status) {
    super(typeof status === 'number' ? `HTTP ${status}` : status);
  }
}

// Friendly errors raised by either provider and turned into a JSON response in POST().
class ReadingError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const ENV_FILES = ['.env', '.env.local', '.env.production', '.env.production.local', '.env.development', '.env.development.local'];

/**
 * GET /api/palmistry — safe configuration check for the server (never reveals the key).
 * Shows whether the key is loaded, which env files the running app can see, and the mode,
 * so a "key missing" error on a deployed server can be diagnosed from the browser.
 */
export async function GET() {
  const cwd = process.cwd();
  const mask = (k) => (k ? `${k.slice(0, 8)}… (${k.length} chars)` : null);
  const files = Object.fromEntries(
    ENV_FILES.map((f) => {
      const full = path.join(cwd, f);
      if (!fs.existsSync(full)) return [f, 'not found'];
      const txt = fs.readFileSync(full, 'utf8');
      const has = (name) => new RegExp(`^\\s*${name}\\s*=\\s*\\S+`, 'm').test(txt);
      const keys = ['GEMINI_API_KEY', 'ANTHROPIC_API_KEY'].filter(has);
      return [f, keys.length ? `found, has ${keys.join(' + ')}` : 'found, no AI key line'];
    }),
  );
  const using = provider();
  return Response.json({
    using: using ? (using === 'gemini' ? `Gemini (${GEMINI_MODELS.join(' → ')})` : 'Claude (claude-opus-5-5)') : 'nothing — no key loaded',
    geminiKey: process.env.GEMINI_API_KEY ? `${mask(process.env.GEMINI_API_KEY)} from environment` : 'built-in key in code',
    anthropicKey: process.env.ANTHROPIC_API_KEY ? `${mask(process.env.ANTHROPIC_API_KEY)} from environment` : 'not set (optional backup)',
    mode: process.env.NODE_ENV,
    appFolder: cwd,
    envFiles: files,
    hint: using
      ? 'A key is loaded. Palm reading should work.'
      : 'No key loaded. Put GEMINI_API_KEY=... in .env.local inside appFolder, then restart the app (e.g. pm2 restart <name>).',
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
  const using = provider();
  if (!using) {
    return Response.json({ error: 'AI palm reading is not configured on the server (GEMINI_API_KEY missing).' }, { status: 503 });
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

  let out;
  try {
    if (using === 'gemini') {
      for (const model of GEMINI_MODELS) {
        try {
          out = await readWithGemini(image, mediaType, prompt, model);
          break;
        } catch (err) {
          if (!(err instanceof GeminiBusy)) throw err;
          console.warn(`palmistry: ${model} unavailable (${err.message}), trying next`);
        }
      }
      if (out === undefined) {
        if (!claudeKey()) throw new ReadingError(503, 'The AI palm reader is very busy right now. Please try again in a minute.');
        console.warn('palmistry: all Gemini models busy, falling back to Claude');
        out = await readWithClaude(image, mediaType, prompt);
      }
    } else {
      out = await readWithClaude(image, mediaType, prompt);
    }
  } catch (err) {
    if (err instanceof ReadingError) return Response.json({ error: err.message }, { status: err.status });
    console.error(`palmistry (${using}):`, err);
    return Response.json({ error: 'Palm reading failed. Please try again.' }, { status: 502 });
  }

  try {
    return Response.json({ report: normalize(extractJson(out)) });
  } catch (e) {
    console.error('palmistry: unparseable reply', e.message, out.slice(0, 300));
    return Response.json({ error: 'The reading could not be prepared. Please try again.' }, { status: 502 });
  }
}

async function readWithGemini(image, mediaType, prompt, model) {
  let response;
  const started = Date.now();
  try {
    response = await getGemini().models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ inlineData: { mimeType: mediaType, data: image } }, { text: prompt }] }],
      // LOW thinking keeps a reading to well under a minute; the default level can take several minutes.
      config: { systemInstruction: SYSTEM, responseMimeType: 'application/json', maxOutputTokens: 16000, thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } },
    });
  } catch (err) {
    if (err instanceof GeminiApiError) {
      console.error('palmistry: Gemini error', err.status, err.message);
      // Overloaded, timed out, over quota, or this model is not offered to the key: try the next model.
      if ([404, 429, 500, 503, 504].includes(err.status)) throw new GeminiBusy(err.status);
      if (err.status === 400 && /api key/i.test(err.message)) throw new ReadingError(503, 'AI palm reading is not configured correctly (invalid GEMINI_API_KEY).');
      if (err.status === 401 || err.status === 403) throw new ReadingError(503, 'AI palm reading is not configured correctly (GEMINI_API_KEY rejected).');
      if (err.status === 400) throw new ReadingError(400, 'The photo could not be processed. Please try a different photo.');
    }
    // Our 60s per-call cap (or a dropped connection) also means "try the next model".
    if (err?.name === 'AbortError' || /timed? ?out|abort|ECONNRESET|fetch failed/i.test(String(err?.message))) throw new GeminiBusy('timeout');
    throw err;
  }
  const finish = response.candidates?.[0]?.finishReason;
  if (response.promptFeedback?.blockReason || finish === 'SAFETY' || finish === 'PROHIBITED_CONTENT') {
    throw new ReadingError(422, 'This photo could not be read. Please upload a clear photo of an open palm.');
  }
  const u = response.usageMetadata || {};
  console.log(`palmistry: Gemini ${response.modelVersion || model} ${((Date.now() - started) / 1000).toFixed(1)}s, tokens in ${u.promptTokenCount} / thinking ${u.thoughtsTokenCount ?? 0} / out ${u.candidatesTokenCount}`);
  if (finish === 'MAX_TOKENS') throw new ReadingError(502, 'The reading was cut short. Please try again.');
  return response.text ?? '';
}

async function readWithClaude(image, mediaType, prompt) {
  let response;
  try {
    response = await getClaude().beta.messages.create({
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
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) throw new ReadingError(429, 'Too many readings right now. Please try again in a minute.');
    if (err instanceof Anthropic.AuthenticationError) throw new ReadingError(503, 'AI palm reading is not configured correctly (invalid ANTHROPIC_API_KEY).');
    if (err instanceof Anthropic.BadRequestError) {
      console.error('palmistry: Claude bad request', err.message);
      throw new ReadingError(400, 'The photo could not be processed. Please try a different photo.');
    }
    throw err;
  }
  if (response.stop_reason === 'refusal') throw new ReadingError(422, 'This photo could not be read. Please upload a clear photo of an open palm.');
  if (response.stop_reason === 'max_tokens') throw new ReadingError(502, 'The reading was cut short. Please try again.');
  return response.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
}
