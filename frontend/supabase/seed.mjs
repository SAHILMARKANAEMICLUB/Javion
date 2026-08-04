/**
 * Seed products into Supabase with images uploaded to Storage (no external URLs).
 *
 * Usage:
 *   cd frontend
 *   # Add to .env.local:
 *   # SUPABASE_SERVICE_ROLE_KEY=...   (Project Settings → API → service_role)
 *   # OR SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD (existing Auth user)
 *   node supabase/seed.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { SEED_PRODUCTS } = require('./seedData.js');

const BUCKET = 'product-images';

function loadEnvLocal() {
  const envPath = resolve(__dirname, '../.env.local');
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const i = trimmed.indexOf('=');
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    const value = trimmed.slice(i + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const anon = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.SEED_ADMIN_EMAIL;
const adminPassword = process.env.SEED_ADMIN_PASSWORD;

if (!url || (!service && !anon)) {
  console.error('Missing REACT_APP_SUPABASE_URL and keys in .env.local');
  process.exit(1);
}

async function getClient() {
  if (service) {
    console.log('Using service_role key for seeding…');
    return createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } });
  }

  if (!adminEmail || !adminPassword) {
    console.error(
      'Add SUPABASE_SERVICE_ROLE_KEY to .env.local (recommended),\n' +
        'or set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD for an Auth admin user.'
    );
    process.exit(1);
  }

  console.log(`Signing in as ${adminEmail}…`);
  const client = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await client.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });
  if (error) {
    console.error('Admin login failed:', error.message);
    process.exit(1);
  }
  return client;
}

/** Minimal valid JPEG (1×1) used only if remote download fails. */
function tinyJpeg() {
  return Buffer.from(
    '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAALCAABAAEBAREA/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGfAP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//Z',
    'base64'
  );
}

async function downloadImage(remoteUrl) {
  try {
    const res = await fetch(remoteUrl, {
      headers: { 'User-Agent': 'JavionSeed/1.0' },
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 100) throw new Error('file too small');
    const type = res.headers.get('content-type') || 'image/jpeg';
    return { buf, contentType: type.split(';')[0].trim() || 'image/jpeg' };
  } catch (err) {
    console.warn(`  download failed (${err.message}), using placeholder`);
    return { buf: tinyJpeg(), contentType: 'image/jpeg' };
  }
}

function extFor(contentType) {
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('gif')) return 'gif';
  return 'jpg';
}

async function ensureBucket(supabase) {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = (buckets || []).some((b) => b.id === BUCKET || b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    });
    if (error && !String(error.message).toLowerCase().includes('already')) {
      console.warn('createBucket:', error.message);
    }
  }
}

async function uploadBuffer(supabase, path, buf, contentType) {
  const { error } = await supabase.storage.from(BUCKET).upload(path, buf, {
    contentType,
    upsert: true,
    cacheControl: '31536000',
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function cacheUpload(supabase, cache, remoteUrl, label) {
  if (!remoteUrl) return '';
  if (cache.has(remoteUrl)) return cache.get(remoteUrl);

  console.log(`  image: ${label}`);
  const { buf, contentType } = await downloadImage(remoteUrl);
  const hash = createHash('sha1').update(remoteUrl).digest('hex').slice(0, 12);
  const path = `seed/${hash}.${extFor(contentType)}`;
  const publicUrl = await uploadBuffer(supabase, path, buf, contentType);
  cache.set(remoteUrl, publicUrl);
  return publicUrl;
}

async function main() {
  const supabase = await getClient();
  await ensureBucket(supabase);

  const imageCache = new Map();
  let created = 0;
  let updated = 0;

  for (const item of SEED_PRODUCTS) {
    console.log(`Product: ${item.slug}`);
    const image = await cacheUpload(supabase, imageCache, item.image, `${item.slug}/main`);
    const gallery = [];
    for (let i = 0; i < (item.gallery || []).length; i += 1) {
      const g = await cacheUpload(supabase, imageCache, item.gallery[i], `${item.slug}/g${i + 1}`);
      if (g) gallery.push(g);
    }

    const row = {
      slug: item.slug,
      name: item.name,
      category: item.category,
      grades: item.grades || '',
      sizes: item.sizes || '',
      finish: item.finish || '',
      description: item.description || '',
      overview: item.overview || '',
      applications: item.applications || [],
      standards: item.standards || [],
      features: item.features || [],
      image,
      gallery,
      is_published: true,
      sort_order: item.sort_order || 0,
    };

    const { data: existing } = await supabase.from('products').select('id').eq('slug', item.slug).maybeSingle();

    if (existing?.id) {
      const { error } = await supabase.from('products').update(row).eq('id', existing.id);
      if (error) throw error;
      updated += 1;
    } else {
      const { error } = await supabase.from('products').insert(row);
      if (error) throw error;
      created += 1;
    }
  }

  console.log(`\nDone. created=${created} updated=${updated}`);
  console.log('All product images are in Supabase Storage bucket:', BUCKET);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
