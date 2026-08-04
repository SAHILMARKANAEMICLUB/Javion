import { PRODUCT_IMAGES_BUCKET, assertSupabaseConfigured, supabase } from '../lib/supabaseClient';

const STORAGE_PUBLIC_MARKER = `/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`;

function throwSb(error, fallback = 'Request failed') {
  const err = new Error(error?.message || fallback);
  err.status = error?.status || 400;
  err.code = error?.code;
  throw err;
}

function asList(value) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return [];
}

function mapProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    grades: row.grades || '',
    sizes: row.sizes || '',
    finish: row.finish || '',
    description: row.description || '',
    overview: row.overview || '',
    applications: asList(row.applications),
    standards: asList(row.standards),
    features: asList(row.features),
    image: row.image || '',
    gallery: asList(row.gallery),
    is_published: Boolean(row.is_published),
    sort_order: row.sort_order || 0,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function toDbPayload(payload) {
  const image = payload.image || '';
  const gallery = asList(payload.gallery);
  if (image && !isSupabaseStorageUrl(image)) {
    const err = new Error('Product images must be uploaded to Storage (external URLs are not allowed).');
    err.status = 400;
    throw err;
  }
  for (const g of gallery) {
    if (!isSupabaseStorageUrl(g)) {
      const err = new Error('Gallery images must be uploaded to Storage (external URLs are not allowed).');
      err.status = 400;
      throw err;
    }
  }
  return {
    slug: String(payload.slug || '').trim(),
    name: String(payload.name || '').trim(),
    category: String(payload.category || '').trim(),
    grades: payload.grades || '',
    sizes: payload.sizes || '',
    finish: payload.finish || '',
    description: payload.description || '',
    overview: payload.overview || '',
    applications: asList(payload.applications),
    standards: asList(payload.standards),
    features: asList(payload.features),
    image,
    gallery,
    is_published: payload.is_published !== false,
    sort_order: Number(payload.sort_order) || 0,
  };
}

/** Map product so public routes keep using slug as `id`. */
export function normalizeProduct(product) {
  if (!product) return null;
  const row = mapProduct(product);
  return {
    ...row,
    dbId: row.id,
    id: row.slug,
  };
}

export function mediaUrl(src) {
  if (!src) return '';
  return src;
}

export function isSupabaseStorageUrl(url) {
  return Boolean(url && String(url).includes(STORAGE_PUBLIC_MARKER));
}

export function storagePathFromUrl(url) {
  if (!isSupabaseStorageUrl(url)) return null;
  const idx = String(url).indexOf(STORAGE_PUBLIC_MARKER);
  if (idx === -1) return null;
  const path = decodeURIComponent(String(url).slice(idx + STORAGE_PUBLIC_MARKER.length));
  if (!path || path.includes('..')) return null;
  return path;
}

async function removeStorageUrls(urls) {
  const paths = (urls || []).map(storagePathFromUrl).filter(Boolean);
  if (!paths.length) return;
  const { error } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove(paths);
  if (error) {
    // Non-fatal for product delete if file already gone
    console.warn('[javion] storage cleanup:', error.message);
  }
}

export async function fetchProducts(params = {}) {
  assertSupabaseConfigured();
  let q = supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (params.category && params.category !== 'All') {
    q = q.eq('category', params.category);
  }
  if (params.q) {
    const safe = String(params.q).replace(/[%_,]/g, ' ').trim();
    if (safe) {
      q = q.or(`name.ilike.%${safe}%,description.ilike.%${safe}%,slug.ilike.%${safe}%`);
    }
  }

  const { data, error } = await q;
  if (error) throwSb(error, 'Failed to list products');
  return (data || []).map(normalizeProduct);
}

export async function fetchCategories() {
  assertSupabaseConfigured();
  const { data, error } = await supabase
    .from('products')
    .select('category')
    .eq('is_published', true)
    .order('category', { ascending: true });
  if (error) throwSb(error, 'Failed to list categories');
  const cats = [...new Set((data || []).map((r) => r.category).filter(Boolean))];
  return ['All', ...cats];
}

export async function fetchProductBySlug(slug) {
  assertSupabaseConfigured();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();
  if (error) throwSb(error, 'Failed to get product');
  if (!data) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  return normalizeProduct(data);
}

export async function fetchRelatedProducts(slug, limit = 3) {
  assertSupabaseConfigured();
  const current = await fetchProductBySlug(slug);
  const { data: sameCat, error: e1 } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .eq('category', current.category)
    .neq('slug', slug)
    .order('sort_order', { ascending: true });
  if (e1) throwSb(e1, 'Failed to get related products');

  const { data: others, error: e2 } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .neq('category', current.category)
    .neq('slug', slug)
    .order('sort_order', { ascending: true });
  if (e2) throwSb(e2, 'Failed to get related products');

  return [...(sameCat || []), ...(others || [])].slice(0, limit).map(normalizeProduct);
}

export async function adminLogin(email, password) {
  assertSupabaseConfigured();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: String(email || '').trim(),
    password: String(password || ''),
  });
  if (error) throwSb(error, 'Invalid email or password');
  return {
    ok: true,
    username: data.user?.email || email,
    must_change_password: false,
  };
}

export async function adminLogout() {
  assertSupabaseConfigured();
  await supabase.auth.signOut();
}

export async function adminMe() {
  assertSupabaseConfigured();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    const err = new Error('Not authenticated');
    err.status = 401;
    throw err;
  }
  return {
    id: data.user.id,
    username: data.user.email,
    must_change_password: false,
  };
}

export async function adminChangePassword(currentPassword, newPassword) {
  assertSupabaseConfigured();
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData?.user?.email) throwSb(userErr, 'Not authenticated');

  const email = userData.user.email;
  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  if (reauthError) {
    const err = new Error('Current password is incorrect');
    err.status = 400;
    throw err;
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throwSb(error, 'Failed to change password');
  return { ok: true, detail: 'Password updated' };
}

export async function adminListProducts(params = {}) {
  assertSupabaseConfigured();
  let q = supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (params.category && params.category !== 'All') {
    q = q.eq('category', params.category);
  }
  if (params.q) {
    const safe = String(params.q).replace(/[%_,]/g, ' ').trim();
    if (safe) {
      q = q.or(`name.ilike.%${safe}%,description.ilike.%${safe}%,slug.ilike.%${safe}%`);
    }
  }

  const { data, error } = await q;
  if (error) throwSb(error, 'Failed to list products');
  return (data || []).map(mapProduct);
}

export async function adminGetProduct(id) {
  assertSupabaseConfigured();
  const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
  if (error) throwSb(error, 'Failed to get product');
  if (!data) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  return mapProduct(data);
}

export async function adminCreateProduct(payload) {
  assertSupabaseConfigured();
  const row = toDbPayload(payload);
  const { data, error } = await supabase.from('products').insert(row).select('*').single();
  if (error) throwSb(error, 'Failed to create product');
  return mapProduct(data);
}

export async function adminUpdateProduct(id, payload) {
  assertSupabaseConfigured();
  const { data: current, error: curErr } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (curErr) throwSb(curErr, 'Failed to load product');
  if (!current) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }

  const row = toDbPayload({ ...mapProduct(current), ...payload });
  const { data, error } = await supabase.from('products').update(row).eq('id', id).select('*').single();
  if (error) throwSb(error, 'Failed to update product');

  const oldUrls = [current.image, ...asList(current.gallery)];
  const newUrls = [data.image, ...asList(data.gallery)];
  const keep = new Set(newUrls.filter(Boolean));
  const removed = oldUrls.filter((u) => u && isSupabaseStorageUrl(u) && !keep.has(u));
  await removeStorageUrls(removed);

  return mapProduct(data);
}

export async function adminDeleteProduct(id) {
  assertSupabaseConfigured();
  const { data: current, error: curErr } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (curErr) throwSb(curErr, 'Failed to load product');
  if (!current) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }

  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throwSb(error, 'Failed to delete product');

  await removeStorageUrls([current.image, ...asList(current.gallery)]);
  return { ok: true, deleted_id: Number(id) };
}

export async function adminUploadImages(files) {
  assertSupabaseConfigured();
  const list = Array.from(files || []).filter(Boolean);
  if (!list.length) throw new Error('No files selected');

  const urls = [];
  for (const file of list) {
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
    const { error } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    });
    if (error) throwSb(error, 'Upload failed');
    const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return { urls, url: urls[0] };
}

export async function adminDeleteUpload(url) {
  assertSupabaseConfigured();
  if (!isSupabaseStorageUrl(url)) {
    const err = new Error('Only uploaded product images can be deleted this way');
    err.status = 400;
    throw err;
  }
  await removeStorageUrls([url]);
  return { ok: true };
}
