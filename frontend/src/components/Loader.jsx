import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onFinish }) {
  const [count, setCount] = useState(0);
  const overlayRef = useRef(null);
  const counterRef = useRef({ v: 0 });

  useEffect(() => {
    const tween = gsap.to(counterRef.current, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counterRef.current.v)),
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => onFinish && onFinish(),
        });
      },
    });
    return () => tween.kill();
  }, [onFinish]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-display italic text-white" style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 700 }}>
          Metal
        </span>
        <span className="font-body text-white" style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 300 }}>
          360
        </span>
      </div>
      <div
        className="absolute bottom-10 right-10 font-display italic text-white"
        style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700 }}
      >
        {String(count).padStart(3, '0')}
      </div>
    </div>
  );
}
