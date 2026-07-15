import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { JAVION_LOGO } from '../mock';
import useReducedMotion from '../hooks/useReducedMotion';
import './Cinematic.css';
import './ComingSoon.css';

export default function ComingSoon() {
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

    if (reduced) {
      gsap.set('.cs-reveal', { opacity: 1, y: 0, filter: 'blur(0px)' });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cs-reveal',
        { opacity: 0, y: 28, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.05,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.15,
        }
      );

      gsap.to('.cs-patch--cyan', {
        xPercent: -4,
        yPercent: 6,
        duration: 10,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.cs-patch--navy', {
        xPercent: 5,
        yPercent: -4,
        duration: 12,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.cs-line', {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.55,
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className="cinematic-page coming-soon-page"
      style={{ color: '#0A1D37' }}
    >
      <div className="cs-bg" aria-hidden>
        <div className="cs-bg-base" />
        <div className="cs-patch cs-patch--cyan" />
        <div className="cs-patch cs-patch--navy" />
        <div className="cs-patch cs-patch--steel" />
        <div className="cs-vignette" />
        <div className="cs-grain" />
      </div>

      <header className="cs-top">
        <Link to="/" className="cs-logo-link cs-reveal" aria-label="Javion home">
          <img src={JAVION_LOGO} alt="Javion Fasteners" className="cs-logo" />
        </Link>
      </header>

      <main className="cs-main">
        <div className="cs-stack">
          <p className="cin-eyebrow cs-reveal">Coming soon</p>
          <div className="cs-line cs-reveal" aria-hidden />
          <h1 className="cs-headline font-display italic cs-reveal">
            Precision is on the way.
          </h1>
          <p className="cs-copy font-body cs-reveal">
            We&apos;re crafting a new cinematic experience for{' '}
            <em className="cin-gradient-text italic" style={{ fontWeight: 700 }}>
              Javion Fasteners
            </em>
            — engineering, factory floor, and finishes told in motion.
          </p>
        </div>
      </main>

      <footer className="cs-footer cs-reveal">
        <span className="font-body">Javion Fasteners</span>
        <span className="cs-footer-dot" aria-hidden />
        <span className="font-body">Engineered to spec</span>
      </footer>
    </div>
  );
}
