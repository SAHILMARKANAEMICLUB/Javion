import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import {
  INDUSTRIES,
  INDUSTRIES_SCROLL_VIDEO,
  INDUSTRIES_SCROLL_VIDEO_POSTER,
  onCinematicImgError,
} from '../mock';
import ScrollScrubVideo from '../components/cinematic/ScrollScrubVideo';
import IndustryCardScrollVideo from '../components/cinematic/IndustryCardScrollVideo';
import { headlineBlurIn } from '../utils/cinematicAnimations';
import useReducedMotion from '../hooks/useReducedMotion';
import ProductsNav from '../components/ProductsNav';
import IndustriesWeServe from '../components/cinematic/IndustriesWeServe';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../seo/site';
import './Cinematic.css';
import './Products.css';
import './Industries.css';

gsap.registerPlugin(ScrollTrigger);

export default function Industries() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.body.style.background = '#f4f6f8';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      headlineBlurIn('.ind-page-headline', {
        reduced,
        scrollTrigger: { trigger: '.ind-page-intro', start: 'top 85%' },
        y: 28,
        blur: 14,
      });

      gsap.from('.ind-page-reveal', {
        opacity: 0,
        y: 28,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ind-page-intro', start: 'top 82%' },
      });

      gsap.utils.toArray('.ind-page-card').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="cinematic-page products-page industries-page">
      <Seo {...PAGE_SEO.industries} />
      <ProductsNav active="industries" />

      {/* Scroll-scrub assembly: frame sequence (default) or MP4 when INDUSTRIES_SCROLL_VIDEO is set */}
      <div className="ind-page-flow">
        {INDUSTRIES_SCROLL_VIDEO ? (
          <ScrollScrubVideo
            src={INDUSTRIES_SCROLL_VIDEO}
            poster={INDUSTRIES_SCROLL_VIDEO_POSTER}
            reduced={reduced}
          />
        ) : (
          <IndustriesWeServe reduced={reduced} />
        )}
      </div>

      <section className="ind-page-intro relative z-[1] px-8 md:px-16 pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="cin-eyebrow ind-page-reveal">Industries we cater</div>
        <h1
          className="font-display mt-4 cin-heading ind-page-headline max-w-3xl"
          style={{
            fontSize: 'clamp(1.85rem, 4.2vw, 3rem)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
          }}
        >
          Hardware specified for the <span className="cin-gradient-text">world you build</span>
        </h1>
        <p
          className="ind-page-reveal mt-5 font-body text-[15px] leading-relaxed max-w-2xl"
          style={{ color: 'var(--cin-text-muted)' }}
        >
          From automotive lines to solar farms, our fasteners are chosen for the loads, environments,
          and standards each industry demands — with products matched to how they are actually used
          on the job.
        </p>
      </section>

      <section className="relative z-[1] px-8 md:px-16 pb-16 md:pb-24" aria-label="Industry details">
        <div className="ind-page-list">
          {INDUSTRIES.map((industry, idx) => (
            <article
              key={industry.id}
              id={industry.id}
              className={`ind-page-card ${idx % 2 === 1 ? 'ind-page-card--flip' : ''}`}
            >
              {industry.video && !reduced ? (
                <IndustryCardScrollVideo
                  src={industry.video}
                  poster={industry.image}
                  alt={industry.name}
                  reduced={reduced}
                />
              ) : (
                <div className="ind-page-card-media">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    loading="lazy"
                    onError={onCinematicImgError}
                  />
                </div>
              )}
              <div className="ind-page-card-body">
                <div className="cin-eyebrow" style={{ color: 'var(--cin-cyan-dark)' }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h2 className="font-display mt-3 text-2xl md:text-3xl cin-heading">{industry.name}</h2>
                <p className="mt-2 font-body text-[13px] uppercase tracking-[0.16em]" style={{ color: 'var(--cin-text-light)' }}>
                  {industry.tagline}
                </p>
                <p className="mt-4 font-body text-[14px] leading-relaxed" style={{ color: 'var(--cin-text-muted)' }}>
                  {industry.description}
                </p>
                <div className="mt-6">
                  <div className="cin-eyebrow" style={{ color: 'var(--cin-text-light)' }}>
                    Products we supply
                  </div>
                  <ul className="ind-page-products mt-3">
                    {industry.products.map((product) => (
                      <li key={product}>{product}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 mt-6 font-body text-[12px] uppercase tracking-[0.18em] cin-heading"
                >
                  View products <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-[1] px-8 md:px-16 pb-16 md:pb-24 pt-10">
        <div className="prod-finale border border-[var(--cin-border-light)] rounded-[20px] px-8 md:px-12 py-10 md:py-12">
          <div className="cin-eyebrow">Next step</div>
          <h2
            className="font-display mt-4 cin-heading max-w-3xl"
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            Need fasteners for your <span className="cin-gradient-text">industry</span>?
          </h2>
          <p className="mt-4 font-body text-[15px] max-w-xl" style={{ color: 'var(--cin-text-muted)' }}>
            Tell us the application, material, and volume — we will map the right hardware and finish.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/contact"
              className="cin-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase"
            >
              Connect us <ArrowRight size={14} />
            </Link>
            <Link
              to="/products"
              className="cin-btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase rounded-full"
            >
              Browse products
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
