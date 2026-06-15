import React, { useEffect, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X } from 'lucide-react';
import { PROJECTS, CATEGORIES } from '../mock';
import ContactBlock from '../components/ContactBlock';

gsap.registerPlugin(ScrollTrigger);

export default function Realisations() {
  const [filter, setFilter] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const visible = useMemo(() => {
    if (!filter) return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.r-h1 .word', {
        y: 50, opacity: 0, rotateX: -15,
        duration: 0.8, ease: 'power3.out', stagger: 0.07, delay: 0.2,
      });
      gsap.utils.toArray('.proj-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: (i % 4) * 0.08,
            scrollTrigger: { trigger: el, start: 'top 90%' }
          });
      });
    });
    return () => ctx.revert();
  }, [visible]);

  return (
    <main style={{ backgroundColor: '#F5F3EF' }}>
      {/* Hero text */}
      <section className="px-6 md:px-[8vw] pt-36 md:pt-44 pb-16">
        <div className="max-w-5xl">
          <div className="eyebrow">Réalisations</div>
          <h1
            className="r-h1 headline-mixed mt-5"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.1 }}
          >
            <span className="word inline-block">Nos&nbsp;</span>
            <span className="word inline-block">dernières&nbsp;</span>
            <em className="word inline-block">créations</em>
          </h1>
          <p className="mt-6 max-w-xl" style={{ color: '#3D3D3D', fontSize: 18, lineHeight: 1.7 }}>
            Une sélection de pièces uniques, façonnées dans notre atelier — escaliers, garde-corps, portails, mobilier et travaux d'exception.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 md:px-[8vw] sticky top-[72px] z-30 py-4" style={{ backgroundColor: '#F5F3EF' }}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-3">
          {CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(active ? null : c)}
                className="text-[13px] transition-colors duration-200"
                style={{
                  color: active ? '#1A1A1A' : '#888880',
                  paddingBottom: 4,
                  borderBottom: active ? '2px solid #1A1A1A' : '2px solid transparent',
                }}
              >
                {c}
              </button>
            );
          })}
          {filter && (
            <button
              onClick={() => setFilter(null)}
              className="ml-auto inline-flex items-center gap-1 text-[12px]"
              style={{ color: '#1A1A1A' }}
            >
              <X size={14} strokeWidth={1.5} /> Effacer le filtre
            </button>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-[8vw] pb-24">
        <div
          className="grid gap-4 max-w-7xl mx-auto"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}
        >
          {visible.map((p) => (
            <article
              key={p.id}
              className="proj-card relative overflow-hidden group"
              style={{ borderRadius: 6, aspectRatio: '4 / 3', cursor: 'pointer' }}
              onMouseEnter={() => setHoverId(p.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              <img
                src={p.cover}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transition: 'transform 0.7s ease', transform: hoverId === p.id ? 'scale(1.05)' : 'scale(1)' }}
                loading="lazy"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ backgroundColor: 'rgba(10,10,10,0.55)', opacity: hoverId === p.id ? 1 : 0 }}
              />
              <div
                className="absolute inset-x-0 bottom-0 p-5 text-white"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 70%)',
                }}
              >
                <div className="text-[11px] uppercase" style={{ letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)' }}>{p.category}</div>
                <h3 className="font-display" style={{ fontWeight: 600, fontSize: 22, marginTop: 4 }}>{p.title}</h3>
              </div>
              {/* Hover content */}
              <div
                className="absolute inset-0 p-6 flex flex-col justify-end"
                style={{
                  opacity: hoverId === p.id ? 1 : 0,
                  transform: hoverId === p.id ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.35s ease, transform 0.4s ease',
                  color: '#FFFFFF',
                }}
              >
                {p.thumbs && p.thumbs.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {p.thumbs.slice(0, 5).map((t, i) => (
                      <div key={i} className="overflow-hidden" style={{ width: 56, height: 56, borderRadius: 3 }}>
                        <img src={t} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <span className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-4 py-2 text-[12px] w-fit" style={{ letterSpacing: '0.08em', borderRadius: 2 }}>
                  Voir la réalisation <ArrowRight size={14} strokeWidth={1.5} />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            className="text-[13px] px-6 py-3 transition-colors"
            style={{ border: '1px solid #1A1A1A', color: '#1A1A1A', borderRadius: 2, letterSpacing: '0.06em' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1A1A1A'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1A1A1A'; }}
          >
            Voir plus de créations
          </button>
        </div>
      </section>

      <ContactBlock />
    </main>
  );
}
