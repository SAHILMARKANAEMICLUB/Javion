import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { headlineBlurIn } from '../utils/cinematicAnimations';
import useReducedMotion from '../hooks/useReducedMotion';
import ProductsNav from '../components/ProductsNav';
import './Cinematic.css';
import './Products.css';
import './NotFound.css';

export default function NotFound() {
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
      headlineBlurIn('.nf-headline', {
        reduced,
        y: 28,
        blur: 14,
      });
      gsap.from('.nf-reveal', {
        opacity: 0,
        y: 28,
        stagger: 0.08,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.12,
      });
      gsap.fromTo(
        '.nf-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: 'power2.out', delay: 0.45 }
      );
      if (!reduced) {
        gsap.to('.nf-orb--cyan', {
          xPercent: -6,
          yPercent: 8,
          duration: 9,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        gsap.to('.nf-orb--navy', {
          xPercent: 7,
          yPercent: -5,
          duration: 11,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="cinematic-page products-page not-found-page">
      <div className="prod-bg pointer-events-none" aria-hidden>
        <div className="prod-bg-base" />
        <div className="prod-bg-patch prod-bg-patch--cyan" />
        <div className="prod-bg-patch prod-bg-patch--navy" />
        <div className="prod-bg-grid cin-grid-bg" />
      </div>

      <ProductsNav />

      <main className="nf-main relative z-[1]">
        <div className="nf-stage" aria-hidden>
          <div className="nf-orb nf-orb--cyan" />
          <div className="nf-orb nf-orb--navy" />
          <div className="nf-ring" />
        </div>

        <div className="nf-stack">
          <p className="cin-eyebrow nf-reveal">Off the path</p>
          <div className="nf-line nf-reveal" aria-hidden />
          <h1
            className="nf-headline font-display cin-heading"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
            }}
          >
            This route doesn&apos;t <span className="cin-gradient-text">exist</span>.
          </h1>
          <p
            className="nf-copy font-body nf-reveal"
            style={{ color: 'var(--cin-text-muted)' }}
          >
            The link may be outdated, or the page may have moved.
            Continue through the site from here.
          </p>

          <div className="nf-actions nf-reveal">
            <Link
              to="/home"
              className="cin-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase"
            >
              <ArrowLeft size={14} />
              Back to home
            </Link>
            <Link
              to="/products"
              className="cin-btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase rounded-full"
            >
              Products <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="cin-btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase rounded-full"
            >
              Contact
            </Link>
          </div>

          <div className="nf-links nf-reveal font-body">
            <Link to="/home#quality">Quality</Link>
            <span aria-hidden>·</span>
            <Link to="/home#resources">Resources</Link>
            <span aria-hidden>·</span>
            <Link to="/">Coming soon</Link>
          </div>
        </div>
      </main>

      <footer className="relative z-[1] pb-10 text-center">
        <p className="text-[10px] font-body uppercase tracking-[0.28em]" style={{ color: 'var(--cin-text-light)' }}>
          Javion Fasteners · Precision Manufacturing · ISO-Grade
        </p>
      </footer>
    </div>
  );
}
