import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/** Normalize keys from .env or user input (BOM, CRLF, wrapping quotes). */
export function normalizeAdminKey(value) {
  if (value == null) return '';
  let s = String(value);
  s = s.replace(/^\uFEFF/, '');
  s = s.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  s = s.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

function stripInlineComment(raw) {
  const t = raw.trim();
  const i = t.indexOf('#');
  if (i === -1) return t;
  return t.slice(0, i).trim();
}

/**
 * Decode .env bytes: UTF-8, UTF-8 BOM, UTF-16 LE/BE (Windows “Unicode” saves break plain utf8 reads).
 */
export function readEnvFileAsText(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.length === 0) return '';

  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.slice(2).toString('utf16le');
  }
  if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) {
    const b = Buffer.from(buf.slice(2));
    b.swap16();
    return b.toString('utf16le');
  }

  let start = 0;
  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    start = 3;
  }

  const sampleEnd = Math.min(buf.length, 512);
  const sample = buf.subarray(start, sampleEnd);
  const nullCount = sample.reduce((n, b) => n + (b === 0 ? 1 : 0), 0);
  if (sample.length > 16 && nullCount / sample.length > 0.12) {
    const asLe = buf.slice(start).toString('utf16le');
    if (asLe.includes('ADMIN_SECRET') || asLe.includes('PORT')) {
      return asLe;
    }
  }

  return buf.slice(start).toString('utf8');
}

/**
 * Parse ADMIN_SECRET from raw .env text. Returns null if the key is not present.
 */
function extractAdminSecretFromEnvText(text) {
  let t = text;
  if (t.length && t.charCodeAt(0) === 0xfeff) t = t.slice(1);

  for (let line of t.split(/\r?\n/)) {
    line = line.replace(/^\uFEFF/g, '').trim();
    if (!line || line.startsWith('#')) continue;

    const eq = line.indexOf('=');
    if (eq === -1) continue;

    const name = line.slice(0, eq).trim();
    if (name !== 'ADMIN_SECRET') continue;

    let val = line.slice(eq + 1);
    val = stripInlineComment(val);
    return normalizeAdminKey(val);
  }
  return null;
}

function candidateEnvPaths() {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  return [
    path.join(moduleDir, '..', '..', '.env'),
    path.join(process.cwd(), '.env'),
    path.join(process.cwd(), 'backend', '.env'),
  ];
}

/**
 * Read ADMIN_SECRET from the first backend/.env that contains the key.
 */
export function getConfiguredAdminSecret() {
  const seen = new Set();
  for (const envPath of candidateEnvPaths()) {
    const resolved = path.resolve(envPath);
    if (seen.has(resolved)) continue;
    seen.add(resolved);

    try {
      if (!fs.existsSync(resolved)) continue;
      const text = readEnvFileAsText(resolved);
      const parsed = extractAdminSecretFromEnvText(text);
      if (parsed !== null) {
        return parsed;
      }
    } catch {
      /* try next */
    }
  }

  if (process.env.ADMIN_SECRET) {
    console.warn(
      '[admin] ADMIN_SECRET not found in any .env file; using process.env (may not match your editor).'
    );
  }
  return normalizeAdminKey(process.env.ADMIN_SECRET);
}
