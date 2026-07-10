import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { JAVION_LOGO } from '../mock';
import { markAppReady, waitForAppReady } from '../utils/appReady';
import './Loader.css';

const RING_CIRCUMFERENCE = 113;

export default function Loader({ onFinish }) {
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const statusRef = useRef(null);
  const ringRef = useRef(null);
  const barRef = useRef(null);
  const progressRef = useRef({ v: 0 });
  const finishedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setProgress = (p) => {
      gsap.set(barRef.current, { scaleX: p });
      const ring = ringRef.current?.querySelector('.jav-loader-ring-progress');
      if (ring) ring.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - p));
    };

    const exit = () => {
      if (finishedRef.current || cancelled) return;
      finishedRef.current = true;

      const done = () => {
        markAppReady();
        onFinish?.();
      };

      gsap.to(rootRef.current, {
        opacity: 0,
        duration: reduced ? 0.25 : 0.5,
        ease: 'power2.inOut',
        onComplete: done,
      });
    };

    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, statusRef.current, ringRef.current], {
        opacity: 0,
        y: 16,
        filter: 'blur(8px)',
      });
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' });
      setProgress(0);

      gsap.timeline()
        .to(logoRef.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: 'power3.out',
        })
        .to(
          ringRef.current,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' },
          0.08
        )
        .to(
          statusRef.current,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' },
          0.14
        );

      const progressTween = gsap.to(progressRef.current, {
        v: 0.88,
        duration: 2.2,
        ease: 'power1.out',
        onUpdate: () => setProgress(progressRef.current.v),
      });

      waitForAppReady().then(() => {
        if (cancelled) return;
        progressTween.kill();
        gsap.to(progressRef.current, {
          v: 1,
          duration: 0.3,
          ease: 'power2.out',
          onUpdate: () => setProgress(progressRef.current.v),
          onComplete: exit,
        });
      });
    }, rootRef);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [onFinish]);

  return (
    <div ref={rootRef} className="jav-loader" aria-busy="true" aria-label="Loading">
      <div className="jav-loader-core">
        <img
          ref={logoRef}
          src={JAVION_LOGO}
          alt="Javion Fasteners"
          className="jav-loader-logo"
          draggable={false}
        />

        <div ref={ringRef} className="jav-loader-ring" aria-hidden>
          <svg viewBox="0 0 44 44">
            <defs>
              <linearGradient id="jav-loader-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0095D9" />
                <stop offset="100%" stopColor="#38B6FF" />
              </linearGradient>
            </defs>
            <circle className="jav-loader-ring-track" cx="22" cy="22" r="18" />
            <circle className="jav-loader-ring-progress" cx="22" cy="22" r="18" />
          </svg>
        </div>

        <p ref={statusRef} className="jav-loader-status">Loading</p>
      </div>

      <div className="jav-loader-bar-wrap" aria-hidden>
        <div ref={barRef} className="jav-loader-bar" />
      </div>
    </div>
  );
}
