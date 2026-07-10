import React from 'react';

/** Clean cinematic overlays — no particles, dots, or 3D elements. */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 90% 75% at 50% 42%, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[45vh]"
        style={{
          background: 'linear-gradient(to top, rgba(255,107,53,0.05) 0%, transparent 65%)',
        }}
      />
    </div>
  );
}
