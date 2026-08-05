import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, Check } from 'lucide-react';
import { fetchProductBySlug, fetchRelatedProducts } from '../api/productsApi';
import { onCinematicImgError } from '../mock';
import { headlineBlurIn } from '../utils/cinematicAnimations';
import useReducedMotion from '../hooks/useReducedMotion';
import ProductsNav from '../components/ProductsNav';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../seo/site';
import './Cinematic.css';
import './Products.css';

export default function ProductDetail() {
  const { productId } = useParams();
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [productId]);

  useEffect(() => {
    document.body.style.background = '#f4f6f8';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    Promise.all([fetchProductBySlug(productId), fetchRelatedProducts(productId, 3)])
      .then(([row, relatedRows]) => {
        if (cancelled) return;
        setProduct(row);
        setRelated(relatedRows);
      })
      .catch(() => {
        if (!cancelled) {
          setProduct(null);
          setRelated([]);
          setNotFound(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [productId]);

  useEffect(() => {
    if (!product) return undefined;
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      headlineBlurIn('.pd-headline', {
        reduced,
        y: 28,
        blur: 14,
        duration: 0.95,
      });
      gsap.from('.pd-reveal', {
        opacity: 0,
        y: 28,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.08,
      });
    }, root);

    return () => ctx.revert();
  }, [product, productId, reduced]);

  if (!loading && notFound) {
    return <Navigate to="/products" replace />;
  }

  if (loading || !product) {
    return (
      <div className="cinematic-page products-page product-detail-page">
        <Seo title="Product" description="Loading product details." path={`/products/${productId}`} />
        <ProductsNav active="products" />
        <div className="relative z-[1] px-8 md:px-16 pt-32 pb-20">
          <p className="font-body" style={{ color: 'var(--cin-text-muted)' }}>
            Loading product…
          </p>
        </div>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const heroSrc = gallery[activeImage] || product.image;

  return (
    <div ref={rootRef} className="cinematic-page products-page product-detail-page">
      <Seo
        title={product.name}
        description={
          product.description || `${product.name} — precision fasteners from Javion.`
        }
        path={`/products/${product.slug || productId}`}
        image={product.image}
        type="product"
      />
      <div className="prod-bg pointer-events-none" aria-hidden>
        <div className="prod-bg-base" />
        <div className="prod-bg-patch prod-bg-patch--cyan" />
        <div className="prod-bg-patch prod-bg-patch--navy" />
        <div className="prod-bg-grid cin-grid-bg" />
      </div>

      <ProductsNav active="products" />

      <div className="relative z-[1] px-8 md:px-16 pt-28 md:pt-32">
        <p className="pd-crumb font-body pd-reveal">
          <Link to="/products">Products</Link>
          <span className="opacity-30 mx-2" aria-hidden>/</span>
          <span style={{ color: 'var(--cin-text-light)' }}>{product.category}</span>
          <span className="opacity-30 mx-2" aria-hidden>/</span>
          <span style={{ color: 'var(--cin-navy)' }}>{product.name}</span>
        </p>
      </div>

      <section className="relative z-[1] px-8 md:px-16 pt-8 pb-12 md:pb-16">
        <div className="pd-hero-grid">
          <div className="pd-gallery pd-reveal">
            <div className="pd-gallery-main">
              <img src={heroSrc} alt={product.name} onError={onCinematicImgError} />
              <div className="pd-gallery-fade" aria-hidden />
              <span className="cin-eyebrow pd-media-eyebrow">{product.category}</span>
            </div>
            {gallery.length > 1 && (
              <div className="pd-thumbs">
                {gallery.map((src, i) => (
                  <button
                    key={`${product.id}-g-${i}`}
                    type="button"
                    className={`pd-thumb ${i === activeImage ? 'is-active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt="" onError={onCinematicImgError} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pd-info">
            <div className="cin-eyebrow pd-reveal">{product.category}</div>
            <h1
              className="pd-headline font-display mt-4 cin-heading"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                fontWeight: 500,
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
              }}
            >
              {product.name.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="cin-gradient-text">{product.name.split(' ').slice(-1)[0]}</span>
            </h1>
            <p className="pd-reveal mt-4 font-body text-[15px] max-w-xl" style={{ color: 'var(--cin-text-muted)' }}>
              {product.description}
            </p>

            <div className="pd-spec-strip pd-reveal border-y border-[var(--cin-border-light)] mt-8">
              {[
                { label: 'Grades', value: product.grades },
                { label: 'Sizes', value: product.sizes },
                { label: 'Finish', value: product.finish },
              ].map((row) => (
                <div key={row.label} className="pd-spec-row font-body">
                  <span className="pd-spec-label">{row.label}</span>
                  <span className="pd-spec-value">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8 pd-reveal">
              <Link
                to="/contact"
                className="cin-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase"
              >
                Request quote <ArrowRight size={14} />
              </Link>
              <Link
                to="/products"
                className="cin-btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase rounded-full"
              >
                All products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-[1] border-y border-[var(--cin-border-light)]">
        <div className="px-8 md:px-16 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 pd-reveal">
            <div className="cin-eyebrow">Overview</div>
            <h2
              className="font-display mt-4 cin-heading"
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
              }}
            >
              Built for <span className="cin-gradient-text">controlled</span> performance.
            </h2>
            <p className="mt-4 font-body text-[15px] leading-relaxed max-w-2xl" style={{ color: 'var(--cin-text-muted)' }}>
              {product.overview}
            </p>
          </div>
          <div className="lg:col-span-5 pd-reveal">
            <div className="cin-eyebrow mb-4">Standards</div>
            <div className="flex flex-wrap gap-2">
              {(product.standards || []).map((std) => (
                <span key={std} className="pd-std-chip font-body">{std}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-[1] grid grid-cols-1 md:grid-cols-2 border-b border-[var(--cin-border-light)]">
        <div className="pd-reveal px-8 md:px-16 py-10 md:py-14 md:border-r border-[var(--cin-border-light)]">
          <div className="cin-eyebrow">Key features</div>
          <ul className="pd-check-list font-body mt-6">
            {(product.features || []).map((item) => (
              <li key={item}>
                <Check size={15} strokeWidth={2} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pd-reveal px-8 md:px-16 py-10 md:py-14">
          <div className="cin-eyebrow">Applications</div>
          <ul className="pd-check-list font-body mt-6">
            {(product.applications || []).map((item) => (
              <li key={item}>
                <Check size={15} strokeWidth={2} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative z-[1] px-8 md:px-16 py-14 md:py-20">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <div className="cin-eyebrow">Continue</div>
              <h2
                className="font-display mt-3 cin-heading"
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                }}
              >
                Related <span className="cin-gradient-text">products</span>
              </h2>
            </div>
            <Link to="/products" className="cin-nav-link font-body font-medium hidden sm:inline-flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="docs-mosaic-row docs-mosaic-row--triple">
            {related.map((item) => (
              <div key={item.id} className="docs-mosaic-cell">
                <Link to={`/products/${item.id}`} className="docs-card">
                  <div className="docs-card-face prod-doc-face">
                    <div className="prod-doc-media prod-doc-media--sm">
                      <img src={item.image} alt="" loading="lazy" onError={onCinematicImgError} />
                    </div>
                    <div className="docs-card-top">
                      <span className="docs-card-tag">{item.category}</span>
                    </div>
                    <h3 className="docs-card-title font-display">{item.name}</h3>
                    <p className="docs-card-desc font-body">{item.description}</p>
                    <span className="docs-card-cta font-body">
                      View details <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="relative z-[1] pb-10 text-center">
        <p className="text-[10px] font-body uppercase tracking-[0.28em]" style={{ color: 'var(--cin-text-light)' }}>
          Javion Fasteners · Precision Manufacturing · ISO-Grade
        </p>
      </footer>
    </div>
  );
}
