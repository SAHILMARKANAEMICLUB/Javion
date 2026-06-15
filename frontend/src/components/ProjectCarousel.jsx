import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCarousel({ projects }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    return () => {
      el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, []);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.55 * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-6"
        style={{
          scrollSnapType: 'x mandatory',
          paddingLeft: '8vw',
          paddingRight: '8vw',
          scrollbarWidth: 'none',
        }}
      >
        {projects.map((p) => (
          <Link
            key={p.id}
            to="/realisations"
            className="relative shrink-0 group overflow-hidden block"
            style={{
              width: 'clamp(320px, 44vw, 720px)',
              height: '62vh',
              borderRadius: 6,
              scrollSnapAlign: 'start',
            }}
          >
            <img
              src={p.cover}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 55%)',
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-9 text-white">
              <div
                className="text-[11px] uppercase mb-2"
                style={{
                  letterSpacing: '0.16em',
                  color: 'rgba(255,255,255,0.78)',
                }}
              >
                {p.category}
              </div>
              <h3
                className="font-display"
                style={{ fontWeight: 700, fontSize: 26, fontStyle: 'italic', lineHeight: 1.15 }}
              >
                {p.title}
              </h3>
              <p
                className="mt-3 text-[14px]"
                style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 460, lineHeight: 1.6 }}
              >
                {p.excerpt}
              </p>
              <div
                className="mt-5 inline-flex items-center gap-2 bg-white text-[#F5F3EF] px-4 py-2 text-[12px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  letterSpacing: '0.1em',
                  borderRadius: 2,
                  transform: 'translateY(8px)',
                }}
              >
                Voir la réalisation
              </div>
            </div>
          </Link>
        ))}
        <div style={{ minWidth: '4vw' }} />
      </div>

      {/* Arrows */}
      <div className="flex items-center justify-end gap-3 px-[8vw] mt-2">
        <button
          aria-label="Précédent"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          className="w-12 h-12 flex items-center justify-center transition-opacity"
          style={{
            border: '1px solid #F5F3EF',
            borderRadius: 999,
            color: '#F5F3EF',
            opacity: canPrev ? 1 : 0.3,
          }}
        >
          <ChevronLeft size={18} strokeWidth={1.4} />
        </button>
        <button
          aria-label="Suivant"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          className="w-12 h-12 flex items-center justify-center transition-opacity"
          style={{
            border: '1px solid #F5F3EF',
            borderRadius: 999,
            color: '#F5F3EF',
            opacity: canNext ? 1 : 0.3,
          }}
        >
          <ChevronRight size={18} strokeWidth={1.4} />
        </button>
      </div>
    </div>
  );
}
