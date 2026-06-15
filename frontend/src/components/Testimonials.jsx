import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../mock';

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section className="py-24 md:py-32 px-6 md:px-[8vw]" style={{ backgroundColor: '#F5F3EF' }}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="eyebrow mb-6">Témoignages</div>
        <blockquote
          key={idx}
          className="font-display italic"
          style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.5 }}
        >
          “{t.quote}”
        </blockquote>
        <div className="mt-8">
          <div className="text-[14px]" style={{ color: '#1A1A1A', fontWeight: 600 }}>{t.author}</div>
          <div className="text-[13px] mt-1" style={{ color: '#888880' }}>{t.title}</div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="transition-opacity hover:opacity-60"
            aria-label="Précédent"
            style={{ color: '#1A1A1A' }}
          >
            <ChevronLeft size={20} strokeWidth={1.2} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <span
                key={i}
                className="block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: i === idx ? '#1A1A1A' : '#C9C4BC' }}
              />
            ))}
          </div>
          <button
            onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)}
            className="transition-opacity hover:opacity-60"
            aria-label="Suivant"
            style={{ color: '#1A1A1A' }}
          >
            <ChevronRight size={20} strokeWidth={1.2} />
          </button>
        </div>
      </div>
    </section>
  );
}
