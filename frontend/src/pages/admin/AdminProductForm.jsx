import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Save, Trash2, Upload } from 'lucide-react';
import {
  adminCreateProduct,
  adminDeleteUpload,
  adminGetProduct,
  adminUpdateProduct,
  adminUploadImages,
  isSupabaseStorageUrl,
  mediaUrl,
} from '../../api/productsApi';
import '../Admin.css';

const EMPTY = {
  slug: '',
  name: '',
  category: 'Bolts',
  grades: '',
  sizes: '',
  finish: '',
  description: '',
  overview: '',
  applications: '',
  standards: '',
  features: '',
  image: '',
  gallery: [],
  is_published: true,
  sort_order: 0,
};

const CATEGORIES = ['Bolts', 'Nuts', 'Screws', 'Studs', 'Anchors', 'Washers'];

function listToArray(value) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');
}

function isManagedUpload(url) {
  return isSupabaseStorageUrl(url);
}

function isValidImageRef(value) {
  if (!value) return false;
  return isManagedUpload(value);
}

function validateForm(form) {
  const errors = {};
  const name = form.name.trim();
  const slug = form.slug.trim();
  const description = form.description.trim();
  const overview = form.overview.trim();
  const image = String(form.image || '').trim();
  const sortOrder = Number(form.sort_order);

  if (!name) errors.name = 'Product name is required.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!slug) errors.slug = 'Slug is required.';
  else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.slug = 'Use lowercase letters, numbers, and hyphens only (e.g. hex-bolts).';
  }

  if (!form.category) errors.category = 'Category is required.';

  if (!description) errors.description = 'Short description is required.';
  else if (description.length < 20) errors.description = 'Description must be at least 20 characters.';

  if (!overview) errors.overview = 'Overview is required.';
  else if (overview.length < 40) errors.overview = 'Overview must be at least 40 characters.';

  if (!form.grades.trim()) errors.grades = 'Grades are required.';
  if (!form.sizes.trim()) errors.sizes = 'Sizes are required.';
  if (!form.finish.trim()) errors.finish = 'Finish is required.';

  if (!image) errors.image = 'Main image is required. Upload a file.';
  else if (!isValidImageRef(image)) errors.image = 'Upload an image file (external URLs are not allowed).';

  const badGallery = (form.gallery || []).find((url) => !isValidImageRef(url));
  if (badGallery) errors.gallery = 'Gallery images must be uploaded files (not external URLs).';

  if (Number.isNaN(sortOrder)) errors.sort_order = 'Sort order must be a number.';
  else if (sortOrder < 0) errors.sort_order = 'Sort order cannot be negative.';

  return errors;
}

function Field({ label, error, children }) {
  return (
    <label className="admin-label">
      {label}
      {children}
      {error ? <span className="admin-field-error">{error}</span> : null}
    </label>
  );
}

export default function AdminProductForm() {
  const { productId } = useParams();
  const isEdit = Boolean(productId);
  const navigate = useNavigate();
  const mainInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [touched, setTouched] = useState({});
  /** Uploads created in this session that are not yet saved on the product (for cleanup). */
  const [sessionUploads, setSessionUploads] = useState([]);
  const sessionUploadsRef = useRef([]);

  useEffect(() => {
    sessionUploadsRef.current = sessionUploads;
  }, [sessionUploads]);

  useEffect(() => {
    if (!isEdit) return undefined;
    let cancelled = false;
    setLoading(true);
    adminGetProduct(productId)
      .then((product) => {
        if (cancelled) return;
        setForm({
          slug: product.slug || '',
          name: product.name || '',
          category: product.category || 'Bolts',
          grades: product.grades || '',
          sizes: product.sizes || '',
          finish: product.finish || '',
          description: product.description || '',
          overview: product.overview || '',
          applications: listToArray(product.applications).join('\n'),
          standards: listToArray(product.standards).join('\n'),
          features: listToArray(product.features).join('\n'),
          image: product.image || '',
          gallery: listToArray(product.gallery),
          is_published: Boolean(product.is_published),
          sort_order: product.sort_order || 0,
        });
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load product');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isEdit, productId]);

  const title = useMemo(() => (isEdit ? 'Edit product' : 'New product'), [isEdit]);

  const markTouched = (key) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const trackSessionUpload = (url) => {
    if (!isManagedUpload(url)) return;
    setSessionUploads((prev) => (prev.includes(url) ? prev : [...prev, url]));
  };

  const removeManagedFile = async (url) => {
    if (!isManagedUpload(url)) return;
    try {
      await adminDeleteUpload(url);
    } catch {
      /* file may already be gone */
    }
    setSessionUploads((prev) => prev.filter((u) => u !== url));
  };

  const onChange = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'name' && !slugTouched) {
        next.slug = slugify(String(value));
      }
      return next;
    });
    setFieldErrors((prev) => {
      if (!prev[key] && !(key === 'name' && prev.slug && !slugTouched)) return prev;
      const copy = { ...prev };
      delete copy[key];
      if (key === 'name' && !slugTouched) delete copy.slug;
      return copy;
    });
  };

  const onMainUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingMain(true);
    setError('');
    try {
      const data = await adminUploadImages([file]);
      const url = data.url || data.urls?.[0];
      if (!url) throw new Error('Upload returned no URL');
      const previous = form.image;
      setForm((prev) => ({ ...prev, image: url }));
      trackSessionUpload(url);
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy.image;
        return copy;
      });
      // Drop replaced file if it was uploaded in this session (not the saved DB image yet).
      if (previous && sessionUploadsRef.current.includes(previous) && previous !== url) {
        await removeManagedFile(previous);
      }
    } catch (err) {
      setError(err.message || 'Main image upload failed');
      setFieldErrors((prev) => ({ ...prev, image: err.message || 'Upload failed' }));
    } finally {
      setUploadingMain(false);
    }
  };

  const onGalleryUpload = async (e) => {
    const files = e.target.files;
    e.target.value = '';
    if (!files?.length) return;
    setUploadingGallery(true);
    setError('');
    try {
      const data = await adminUploadImages(files);
      const urls = data.urls || (data.url ? [data.url] : []);
      if (!urls.length) throw new Error('Upload returned no URLs');
      setForm((prev) => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
      urls.forEach(trackSessionUpload);
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy.gallery;
        return copy;
      });
    } catch (err) {
      setError(err.message || 'Gallery upload failed');
      setFieldErrors((prev) => ({ ...prev, gallery: err.message || 'Upload failed' }));
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryItem = async (url) => {
    setForm((prev) => ({ ...prev, gallery: prev.gallery.filter((g) => g !== url) }));
    if (sessionUploadsRef.current.includes(url)) {
      await removeManagedFile(url);
    }
  };

  const clearMainImage = async () => {
    const previous = form.image;
    setForm((prev) => ({ ...prev, image: '' }));
    if (previous && sessionUploadsRef.current.includes(previous)) {
      await removeManagedFile(previous);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(form);
    setFieldErrors(errors);
    setTouched({
      name: true,
      slug: true,
      category: true,
      grades: true,
      sizes: true,
      finish: true,
      description: true,
      overview: true,
      image: true,
      gallery: true,
      sort_order: true,
    });
    if (Object.keys(errors).length) {
      setError('Please fix the highlighted fields below.');
      return;
    }

    setSaving(true);
    setError('');
    const payload = {
      slug: form.slug.trim(),
      name: form.name.trim(),
      category: form.category,
      grades: form.grades.trim(),
      sizes: form.sizes.trim(),
      finish: form.finish.trim(),
      description: form.description.trim(),
      overview: form.overview.trim(),
      applications: listToArray(form.applications),
      standards: listToArray(form.standards),
      features: listToArray(form.features),
      image: String(form.image).trim(),
      gallery: form.gallery,
      is_published: Boolean(form.is_published),
      sort_order: Number(form.sort_order) || 0,
    };

    try {
      if (isEdit) {
        await adminUpdateProduct(productId, payload);
      } else {
        await adminCreateProduct(payload);
      }
      setSessionUploads([]);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const show = (key) => (touched[key] ? fieldErrors[key] : '');

  if (loading) {
    return <p className="admin-muted">Loading product…</p>;
  }

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <div className="admin-eyebrow">Catalogue</div>
          <h1 className="admin-title">{title}</h1>
        </div>
        <Link to="/admin" className="admin-btn admin-btn--ghost">
          <ArrowLeft size={14} strokeWidth={2} />
          Back
        </Link>
      </div>

      <form className="admin-form" onSubmit={onSubmit} noValidate>
        <div className="admin-grid-2">
          <Field label="Name" error={show('name')}>
            <input
              className={`admin-input ${show('name') ? 'is-invalid' : ''}`}
              value={form.name}
              onChange={onChange('name')}
              onBlur={() => markTouched('name')}
            />
          </Field>
          <Field label="Slug (URL)" error={show('slug')}>
            <input
              className={`admin-input ${show('slug') ? 'is-invalid' : ''}`}
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                onChange('slug')(e);
              }}
              onBlur={() => markTouched('slug')}
            />
          </Field>
          <Field label="Category" error={show('category')}>
            <select
              className={`admin-input ${show('category') ? 'is-invalid' : ''}`}
              value={form.category}
              onChange={onChange('category')}
              onBlur={() => markTouched('category')}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sort order" error={show('sort_order')}>
            <input
              className={`admin-input ${show('sort_order') ? 'is-invalid' : ''}`}
              type="number"
              value={form.sort_order}
              onChange={onChange('sort_order')}
              onBlur={() => markTouched('sort_order')}
            />
          </Field>
          <Field label="Grades" error={show('grades')}>
            <input
              className={`admin-input ${show('grades') ? 'is-invalid' : ''}`}
              value={form.grades}
              onChange={onChange('grades')}
              onBlur={() => markTouched('grades')}
            />
          </Field>
          <Field label="Sizes" error={show('sizes')}>
            <input
              className={`admin-input ${show('sizes') ? 'is-invalid' : ''}`}
              value={form.sizes}
              onChange={onChange('sizes')}
              onBlur={() => markTouched('sizes')}
            />
          </Field>
          <Field label="Finish" error={show('finish')}>
            <input
              className={`admin-input ${show('finish') ? 'is-invalid' : ''}`}
              value={form.finish}
              onChange={onChange('finish')}
              onBlur={() => markTouched('finish')}
            />
          </Field>
          <label className="admin-label admin-checkbox">
            <input type="checkbox" checked={form.is_published} onChange={onChange('is_published')} />
            Published on website
          </label>
        </div>

        <Field label="Short description" error={show('description')}>
          <textarea
            className={`admin-input admin-textarea ${show('description') ? 'is-invalid' : ''}`}
            rows={3}
            value={form.description}
            onChange={onChange('description')}
            onBlur={() => markTouched('description')}
          />
        </Field>

        <Field label="Overview" error={show('overview')}>
          <textarea
            className={`admin-input admin-textarea ${show('overview') ? 'is-invalid' : ''}`}
            rows={5}
            value={form.overview}
            onChange={onChange('overview')}
            onBlur={() => markTouched('overview')}
          />
        </Field>

        <div className="admin-grid-3">
          <Field label="Applications (one per line)">
            <textarea
              className="admin-input admin-textarea"
              rows={5}
              value={form.applications}
              onChange={onChange('applications')}
            />
          </Field>
          <Field label="Standards (one per line)">
            <textarea
              className="admin-input admin-textarea"
              rows={5}
              value={form.standards}
              onChange={onChange('standards')}
            />
          </Field>
          <Field label="Features (one per line)">
            <textarea
              className="admin-input admin-textarea"
              rows={5}
              value={form.features}
              onChange={onChange('features')}
            />
          </Field>
        </div>

        <div className={`admin-upload-block ${show('image') ? 'is-invalid' : ''}`}>
          <div className="admin-upload-head">
            <span className="admin-label" style={{ margin: 0 }}>
              Main image
            </span>
            <div className="admin-upload-actions">
              <button
                type="button"
                className="admin-btn admin-btn--ghost admin-btn--compact"
                disabled={uploadingMain || saving}
                onClick={() => mainInputRef.current?.click()}
              >
                <Upload size={14} strokeWidth={2} />
                {uploadingMain ? 'Uploading…' : form.image ? 'Replace' : 'Upload'}
              </button>
              {form.image ? (
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost admin-btn--compact"
                  disabled={uploadingMain || saving}
                  onClick={clearMainImage}
                >
                  <Trash2 size={14} strokeWidth={2} />
                  Remove
                </button>
              ) : null}
            </div>
          </div>
          <input
            ref={mainInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            hidden
            onChange={onMainUpload}
          />
          {form.image ? (
            <div className="admin-upload-preview">
              <img src={mediaUrl(form.image)} alt="Main product" />
              <code className="admin-muted admin-small">{form.image}</code>
            </div>
          ) : (
            <button
              type="button"
              className="admin-upload-drop"
              disabled={uploadingMain}
              onClick={() => mainInputRef.current?.click()}
            >
              <ImagePlus size={22} strokeWidth={1.75} />
              <span>Upload image file only — stored in Supabase (no external URLs)</span>
            </button>
          )}
          {show('image') ? <span className="admin-field-error">{fieldErrors.image}</span> : null}
        </div>

        <div className={`admin-upload-block ${show('gallery') ? 'is-invalid' : ''}`}>
          <div className="admin-upload-head">
            <span className="admin-label" style={{ margin: 0 }}>
              Gallery images
            </span>
            <button
              type="button"
              className="admin-btn admin-btn--ghost admin-btn--compact"
              disabled={uploadingGallery || saving}
              onClick={() => galleryInputRef.current?.click()}
            >
              <Upload size={14} strokeWidth={2} />
              {uploadingGallery ? 'Uploading…' : 'Add images'}
            </button>
          </div>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            hidden
            onChange={onGalleryUpload}
          />
          {form.gallery.length ? (
            <div className="admin-gallery-grid">
              {form.gallery.map((url) => (
                <div key={url} className="admin-gallery-item">
                  <img src={mediaUrl(url)} alt="" />
                  <button
                    type="button"
                    className="admin-icon-btn admin-icon-btn--danger admin-gallery-remove"
                    title="Remove"
                    aria-label="Remove gallery image"
                    onClick={() => removeGalleryItem(url)}
                  >
                    <Trash2 size={14} strokeWidth={1.85} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="admin-muted admin-small" style={{ margin: 0 }}>
              Optional. Add extra product photos.
            </p>
          )}
          {show('gallery') ? <span className="admin-field-error">{fieldErrors.gallery}</span> : null}
        </div>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn" disabled={saving || uploadingMain || uploadingGallery}>
            <Save size={14} strokeWidth={2} />
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
          </button>
          <Link to="/admin" className="admin-btn admin-btn--ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
