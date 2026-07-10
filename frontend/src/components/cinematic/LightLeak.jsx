import React from 'react';

export default function LightLeak() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[400] overflow-hidden" aria-hidden>
      <div
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[50%] opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,107,53,0.35) 0%, transparent 70%)',
          animation: 'leak-drift-1 12s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute -bottom-[15%] -right-[5%] w-[50%] h-[45%] opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(249,160,63,0.4) 0%, transparent 65%)',
          animation: 'leak-drift-2 16s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute top-0 left-[-30%] w-[40%] h-full opacity-25"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,107,53,0.45) 50%, transparent 70%)',
          animation: 'leak-sweep 8s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes leak-drift-1 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(8%, 5%) scale(1.15); }
        }
        @keyframes leak-drift-2 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-6%, -4%) scale(1.1); }
        }
        @keyframes leak-sweep {
          0%, 100% { transform: translateX(0) skewX(-8deg); opacity: 0.15; }
          50% { transform: translateX(120vw) skewX(-8deg); opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
