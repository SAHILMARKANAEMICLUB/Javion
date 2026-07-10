import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ChromaticAberration() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let triggers = [];
    const timer = setTimeout(() => {
      const selectors = ['.ov-section', '[data-chapter="02"]', '[data-chapter="03"]', '.clip-wrap', '.end-line'];
      selectors.forEach((sel) => {
        const target = document.querySelector(sel);
        if (!target) return;
        triggers.push(
          ScrollTrigger.create({
            trigger: target,
            start: 'top 60%',
            end: 'bottom 40%',
            onUpdate: (self) => {
              const peak = 1 - Math.abs(self.progress - 0.5) * 2;
              el.style.opacity = String(Math.max(0, peak * 0.3));
            },
            onLeave: () => { el.style.opacity = '0'; },
            onLeaveBack: () => { el.style.opacity = '0'; },
          })
        );
      });
    }, 400);

    return () => {
      clearTimeout(timer);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[480] opacity-0 mix-blend-screen"
      aria-hidden
      style={{
        background: `
          radial-gradient(ellipse at 30% 50%, rgba(255,0,0,0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 50%, rgba(0,100,255,0.08) 0%, transparent 50%)
        `,
      }}
    />
  );
}
