import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { adminDeleteProduct, adminListProducts } from '../../api/productsApi';
import '../Admin.css';

const PAGE_SIZE = 10;

function ProductActions({ product, onDelete }) {
  return (
    <div className="admin-row-actions">
      <Link
        to={`/products/${product.slug}`}
        className="admin-icon-btn"
        title="View on site"
        aria-label={`View ${product.name}`}
        target="_blank"
        rel="noreferrer"
      >
        <Eye size={15} strokeWidth={1.85} />
      </Link>
      <Link
        to={`/admin/products/${product.id}/edit`}
        className="admin-icon-btn"
        title="Edit"
        aria-label={`Edit ${product.name}`}
      >
        <Pencil size={15} strokeWidth={1.85} />
      </Link>
      <button
        type="button"
        className="admin-icon-btn admin-icon-btn--danger"
        title="Delete"
        aria-label={`Delete ${product.name}`}
        onClick={() => onDelete(product)}
      >
        <Trash2 size={15} strokeWidth={1.85} />
      </button>
    </div>
  );
}

function DeleteConfirmModal({ product, deleting, error, onCancel, onConfirm }) {
  const cancelRef = useRef(null);
  const open = Boolean(product);

  useEffect(() => {
    if (!open) return undefined;

    cancelRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape' && !deleting) onCancel();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, deleting, onCancel]);

  if (!product) return null;

  return (
    <div
      className="admin-modal-root"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !deleting) onCancel();
      }}
    >
      <div
        className="admin-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-delete-title"
        aria-describedby="admin-delete-desc"
      >
        <button
          type="button"
          className="admin-modal-close"
          aria-label="Close"
          disabled={deleting}
          onClick={onCancel}
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="admin-modal-icon" aria-hidden>
          <Trash2 size={22} strokeWidth={1.85} />
        </div>

        <h2 id="admin-delete-title" className="admin-modal-title">
          Delete product?
        </h2>
        <p id="admin-delete-desc" className="admin-modal-text">
          You’re about to permanently delete{' '}
          <strong>{product.name}</strong>
          {product.slug ? (
            <>
              {' '}
              (<code>{product.slug}</code>)
            </>
          ) : null}
          . Uploaded images for this product will also be removed. This cannot be undone.
        </p>

        {error ? <p className="admin-error">{error}</p> : null}

        <div className="admin-modal-actions">
          <button
            ref={cancelRef}
            type="button"
            className="admin-btn admin-btn--ghost"
            disabled={deleting}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--danger"
            disabled={deleting}
            onClick={onConfirm}
          >
            <Trash2 size={14} strokeWidth={2} />
            {deleting ? 'Deleting…' : 'Delete product'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const load = async (search = q) => {
    setLoading(true);
    setError('');
    try {
      const rows = await adminListProducts({ q: search || undefined });
      setProducts(rows);
      setPage(1);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageProducts = useMemo(
    () => products.slice(pageStart, pageStart + PAGE_SIZE),
    [products, pageStart]
  );
  const rangeFrom = products.length ? pageStart + 1 : 0;
  const rangeTo = Math.min(pageStart + PAGE_SIZE, products.length);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const openDelete = (product) => {
    setDeleteError('');
    setPendingDelete(product);
  };

  const closeDelete = () => {
    if (deleting) return;
    setPendingDelete(null);
    setDeleteError('');
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError('');
    try {
      await adminDeleteProduct(pendingDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (err) {
      setDeleteError(err.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="admin-page-head">
        <div>
          <div className="admin-eyebrow">Catalogue</div>
          <h1 className="admin-title">
            Products <span style={{ color: 'var(--admin-cyan-dark)' }}>dashboard</span>
          </h1>
        </div>
        <Link to="/admin/products/new" className="admin-btn admin-btn--add">
          <Plus size={15} strokeWidth={2} />
          Add product
        </Link>
      </div>

      <form
        className="admin-toolbar"
        onSubmit={(e) => {
          e.preventDefault();
          load(q);
        }}
      >
        <input
          className="admin-input"
          placeholder="Search name or slug…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit" className="admin-btn admin-btn--ghost">
          <Search size={14} strokeWidth={2} />
          Search
        </button>
      </form>

      {error && <p className="admin-error">{error}</p>}
      {loading ? (
        <p className="admin-muted">Loading…</p>
      ) : (
        <>
          <div className="admin-table-wrap admin-table-wrap--desktop">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Slug</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-product-cell">
                        {product.image ? (
                          <img src={product.image} alt="" className="admin-product-thumb" />
                        ) : (
                          <div className="admin-product-thumb" aria-hidden />
                        )}
                        <div>
                          <strong>{product.name}</strong>
                          <div className="admin-muted admin-small">{product.grades || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>
                      <code>{product.slug}</code>
                    </td>
                    <td>
                      <span
                        className={`admin-badge ${product.is_published ? 'admin-badge--yes' : 'admin-badge--no'}`}
                      >
                        {product.is_published ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <ProductActions product={product} onDelete={openDelete} />
                    </td>
                  </tr>
                ))}
                {!pageProducts.length && (
                  <tr>
                    <td colSpan={5} className="admin-muted">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="admin-product-cards">
            {pageProducts.map((product) => (
              <article key={product.id} className="admin-product-card">
                <div className="admin-product-card-top">
                  {product.image ? (
                    <img src={product.image} alt="" className="admin-product-thumb" />
                  ) : (
                    <div className="admin-product-thumb" aria-hidden />
                  )}
                  <div className="admin-product-card-meta">
                    <strong>{product.name}</strong>
                    <div className="admin-muted admin-small">{product.category}</div>
                    <code className="admin-slug-chip">{product.slug}</code>
                  </div>
                  <span
                    className={`admin-badge ${product.is_published ? 'admin-badge--yes' : 'admin-badge--no'}`}
                  >
                    {product.is_published ? 'Live' : 'Draft'}
                  </span>
                </div>
                {product.grades ? (
                  <p className="admin-muted admin-small admin-product-card-grades">{product.grades}</p>
                ) : null}
                <ProductActions product={product} onDelete={openDelete} />
              </article>
            ))}
            {!pageProducts.length && <p className="admin-muted">No products found.</p>}
          </div>

          {products.length > 0 ? (
            <div className="admin-pagination">
              <p className="admin-muted admin-pagination-meta">
                Showing {rangeFrom}–{rangeTo} of {products.length}
              </p>
              <div className="admin-pagination-controls">
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost admin-btn--compact"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={14} strokeWidth={2} />
                  Prev
                </button>
                <span className="admin-pagination-page">
                  Page {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost admin-btn--compact"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <ChevronRight size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}

      <DeleteConfirmModal
        product={pendingDelete}
        deleting={deleting}
        error={deleteError}
        onCancel={closeDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
