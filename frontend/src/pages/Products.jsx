import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { fetchCategories, fetchProducts } from '../api/productsApi';
import { onCinematicImgError } from '../mock';
import { headlineBlurIn } from '../utils/cinematicAnimations';
import useReducedMotion from '../hooks/useReducedMotion';
import ProductsNav from '../components/ProductsNav';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../seo/site';
import './Cinematic.css';
import './Products.css';

gsap.registerPlugin(ScrollTrigger);

/** Alternate mosaic rows: 60/40 then 30/40/30 — same rhythm as Resources. */
function buildOddEvenRows(docs) {
  const rows = [];
  let i = 0;
  let rowIndex = 0;
  while (i < docs.length) {
    const isWidePair = rowIndex % 2 === 0;
    const take = isWidePair ? 2 : 3;
    const slice = docs.slice(i, i + take);
    if (!slice.length) break;
    rows.push({
      id: `row-${rowIndex}`,
      pattern: slice.length >= 3 ? 'triple' : 'wide',
      items: slice,
    });
    i += take;
    rowIndex += 1;
  }
  return rows;
}

export default function Products() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.background = '#f4f6f8';
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    Promise.all([fetchCategories(), fetchProducts()])
      .then(([cats, rows]) => {
        if (cancelled) return;
        setCategories(cats?.length ? cats : ['All']);
        setProducts(rows);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load products');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    if (filter === 'All') return products;
    return products.filter((p) => p.category === filter);
  }, [filter, products]);

  const rows = useMemo(() => buildOddEvenRows(visible), [visible]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || loading) return undefined;

    const ctx = gsap.context(() => {
      headlineBlurIn('.prod-headline', {
        reduced,
        scrollTrigger: { trigger: '.prod-hero-section', start: 'top 80%' },
        y: 28,
        blur: 14,
      });

      gsap.from('.prod-reveal', {
        opacity: 0,
        y: 28,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.prod-hero-section', start: 'top 78%' },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, loading]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || loading) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.prod-mosaic-cell',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.out',
          overwrite: true,
        }
      );
    }, root);

    return () => ctx.revert();
  }, [visible, loading]);

  return (
    <div ref={rootRef} className="cinematic-page products-page">
      <Seo {...PAGE_SEO.products} />
      <div className="prod-bg pointer-events-none" aria-hidden>
        <div className="prod-bg-base" />
        <div className="prod-bg-patch prod-bg-patch--cyan" />
        <div className="prod-bg-patch prod-bg-patch--navy" />
        <div className="prod-bg-grid cin-grid-bg" />
      </div>

      <ProductsNav active="products" />

      <section className="prod-hero-section relative z-[1] cin-section-soft-light">
        <div className="px-8 md:px-16 pt-28 md:pt-32 pb-10 md:pb-14">
          <div className="cin-eyebrow prod-reveal">Product range</div>
          <h1
            className="prod-headline font-display mt-4 cin-heading max-w-4xl"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
            }}
          >
            Engineered fasteners for <span className="cin-gradient-text">every joint</span>.
          </h1>
          <p className="prod-reveal mt-4 font-body text-[15px] max-w-2xl" style={{ color: 'var(--cin-text-muted)' }}>
            Bolts, nuts, screws, studs, and anchors — cold-formed, heat-treated, and finished to spec.
            Filter by category or open any product for full details.
          </p>
        </div>

        <div className="prod-filter-band prod-reveal border-y border-[var(--cin-border-light)]">
          <div className="px-8 md:px-16 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="prod-filter-row flex flex-wrap items-center gap-1">
              {categories.map((cat) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    className={`prod-filter-chip font-body ${active ? 'is-active' : ''}`}
                    aria-pressed={active}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <p className="prod-count font-body">
              {loading ? 'Loading…' : `${visible.length} product${visible.length === 1 ? '' : 's'}`}
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-[1] px-8 md:px-16 py-10 md:py-14" aria-label="Product list">
        {error && (
          <p className="font-body text-[14px] mb-6" style={{ color: '#b42318' }}>
            {error}. Check your Supabase connection in `.env.local`.
          </p>
        )}
        {!loading && !error && !visible.length && (
          <p className="font-body text-[14px]" style={{ color: 'var(--cin-text-muted)' }}>
            No products in this category yet.
          </p>
        )}
        <div className="docs-mosaic prod-mosaic">
          {rows.map((row) => (
            <div
              key={row.id}
              className={`docs-mosaic-row docs-mosaic-row--${row.pattern}${
                row.items.length === 1 ? ' docs-mosaic-row--single' : ''
              }`}
            >
              {row.items.map((product, idx) => (
                <div key={product.id} className="docs-mosaic-cell prod-mosaic-cell">
                  <Link
                    to={`/products/${product.id}`}
                    className={`docs-card prod-doc-card ${idx === 0 && row.pattern === 'wide' ? 'docs-card--featured' : ''}`}
                  >
                    <div className="docs-card-face prod-doc-face">
                      <div className="prod-doc-media">
                        <img
                          src={product.image}
                          alt=""
                          loading="lazy"
                          onError={onCinematicImgError}
                        />
                      </div>
                      <div className="docs-card-top">
                        <span className="docs-card-tag">{product.category}</span>
                      </div>
                      <h2 className="docs-card-title font-display">{product.name}</h2>
                      <p className="docs-card-desc font-body">{product.description}</p>
                      <dl className="prod-inline-specs font-body">
                        <div><dt>Grades</dt><dd>{product.grades}</dd></div>
                        <div><dt>Sizes</dt><dd>{product.sizes}</dd></div>
                      </dl>
                      <span className="docs-card-cta font-body">
                        View details <ArrowRight size={13} strokeWidth={1.75} />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-[1] px-8 md:px-16 pb-16 md:pb-24">
        <div className="prod-finale border border-[var(--cin-border-light)] rounded-[20px] px-8 md:px-12 py-10 md:py-12 cin-section-soft-light">
          <div className="cin-eyebrow">Custom &amp; OEM</div>
          <h2
            className="font-display mt-4 cin-heading max-w-3xl"
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            Need a drawing-driven <span className="cin-gradient-text">spec</span>?
          </h2>
          <p className="mt-4 font-body text-[15px] max-w-xl" style={{ color: 'var(--cin-text-muted)' }}>
            Send drawings or OEM requirements — we form, treat, coat, and ship to your line.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/contact"
              className="cin-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase"
            >
              Get a quote <ArrowRight size={14} />
            </Link>
            <Link
              to="/home#resources"
              className="cin-btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase rounded-full"
            >
              Documents
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-[1] pb-10 text-center">
        <p className="text-[10px] font-body uppercase tracking-[0.28em]" style={{ color: 'var(--cin-text-light)' }}>
          Javion Fasteners · Precision Manufacturing · ISO-Grade
        </p>
      </footer>
    </div>
  );
}
