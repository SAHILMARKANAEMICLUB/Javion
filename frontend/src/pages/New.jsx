import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, Box, Layers, Sparkles, Zap, Shield, BarChart3, ChevronRight,
} from 'lucide-react';
import { HERO_VIDEO, PROJECTS } from '../mock';
import useReducedMotion from '../hooks/useReducedMotion';
import './New.css';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: Layers, title: 'Live 3D Previews', desc: 'Every quote ships with an interactive model. Clients see the piece before a single spark flies.' },
  { icon: Zap, title: 'Instant Quoting', desc: 'AI-assisted estimates from drawings. What took days now takes minutes — without sacrificing precision.' },
  { icon: Shield, title: 'Quality Gates', desc: 'Tolerance checkpoints at every stage. 99.7% accuracy, documented and traceable.' },
  { icon: BarChart3, title: 'Project Timeline', desc: 'From sketch to install — one cinematic timeline your team and clients share.' },
  { icon: Box, title: 'Material Library', desc: 'Steel, stainless, brass, copper — specs, finishes, and lead times in one place.' },
  { icon: Sparkles, title: 'Cinematic Delivery', desc: 'Hand-off experiences that feel like a film premiere, not a warehouse drop-off.' },
];

const STATS = [
  { v: 24, suf: '+', l: 'Years forging' },
  { v: 1200, suf: '+', l: 'Projects delivered' },
  { v: 99.7, dec: 1, suf: '%', l: 'Tolerance accuracy' },
  { v: 48, suf: 'h', l: 'Avg. quote turnaround' },
];

function useTilt(max = 10) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(12px)`;
    };
    const onLeave = () => { el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [max]);
  return ref;
}

function MouseSpotlight({ reduced }) {
  const ref = useRef(null);
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    const move = (e) => {
      if (el) {
        el.style.setProperty('--mx', `${e.clientX}px`);
        el.style.setProperty('--my', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [reduced]);
  if (reduced) return null;
  return <div ref={ref} className="new-spotlight" aria-hidden />;
}

function FloatingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-5 flex items-center justify-between">
      <Link to="/" className="new-glass px-4 py-2 rounded-full text-[12px] font-medium tracking-[0.18em] uppercase">
        Metal360
      </Link>
      <div className="hidden md:flex items-center gap-1 new-glass rounded-full px-2 py-1.5">
        {['Platform', 'Work', 'Process', 'Contact'].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="px-4 py-2 text-[13px] text-[var(--new-muted)] hover:text-[var(--new-text)] transition-colors rounded-full">
            {l}
          </a>
        ))}
      </div>
      <Link to="/realisations" className="new-btn-primary px-5 py-2.5 text-[13px] inline-flex items-center gap-2">
        View work <ArrowRight size={14} />
      </Link>
    </nav>
  );
}

function Hero({ reduced }) {
  const heroRef = useRef(null);
  const tiltRef = useTilt(6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from('.new-hero-el', { opacity: 0, y: 50, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.3 });
      gsap.to('.new-hero-parallax', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={heroRef} id="platform" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="new-hero-parallax absolute inset-0">
        <video
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.38) contrast(1.12) saturate(0.75)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(12,10,9,0.5) 0%, rgba(12,10,9,0.65) 50%, rgba(12,10,9,0.95) 100%),
              radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(0,0,0,0.5) 100%)
            `,
          }}
        />
        <div className="new-grid-bg absolute inset-0 opacity-40" />
      </div>

      <div ref={tiltRef} className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 w-full" style={{ transformStyle: 'preserve-3d' }}>
        <div className="new-hero-el inline-flex items-center gap-2 new-glass rounded-full px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-[var(--new-muted)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--new-gold)] animate-pulse" />
          SaaS for precision metalwork
        </div>
        <h1 className="new-hero-el font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight max-w-4xl">
          Forge faster.{' '}
          <span className="new-gradient-text italic">Deliver cinematic.</span>
        </h1>
        <p className="new-hero-el mt-6 text-lg text-[var(--new-muted)] max-w-xl leading-relaxed">
          Metal360 Platform unites quoting, 3D previews, and project timelines — so every piece feels like a premiere, not a purchase order.
        </p>
        <div className="new-hero-el mt-10 flex flex-wrap gap-4">
          <Link to="/cinematic" className="new-btn-primary px-8 py-4 text-sm inline-flex items-center gap-2 cursor-pointer">
            Watch the film <ChevronRight size={16} />
          </Link>
          <a href="#work" className="new-btn-ghost px-8 py-4 text-sm inline-flex items-center gap-2 cursor-pointer">
            Explore platform
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats({ reduced }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.new-stat', { opacity: 0, y: 30, stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' } });
      if (!reduced) {
        ref.current?.querySelectorAll('.new-count').forEach((el) => {
          const target = parseFloat(el.dataset.target);
          const dec = parseInt(el.dataset.dec || '0', 10);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 2, ease: 'power3.out',
            onUpdate: () => { el.textContent = obj.v.toFixed(dec); },
            scrollTrigger: { trigger: el, start: 'top 90%' },
          });
        });
      }
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} className="relative py-16 border-y border-[var(--new-border)]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.l} className="new-stat text-center md:text-left">
            <div className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
              <span className="new-count" data-target={s.v} data-dec={s.dec || 0}>{reduced ? s.v : 0}</span>
              <span className="new-gradient-text">{s.suf}</span>
            </div>
            <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[var(--new-muted)]">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const tiltRef = useTilt(8);
  const Icon = feature.icon;
  return (
    <div
      ref={tiltRef}
      className="new-feature-card new-card-3d new-glass rounded-2xl p-8 cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(202,138,4,0.15))' }}>
        <Icon size={20} className="text-[var(--new-amber)]" strokeWidth={1.5} />
      </div>
      <div className="text-[11px] text-[var(--new-gold)] tracking-[0.2em] mb-2">0{index + 1}</div>
      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
      <p className="text-[var(--new-muted)] text-[15px] leading-relaxed">{feature.desc}</p>
    </div>
  );
}

function Features({ reduced }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.new-feature-card', {
        opacity: 0, y: 40, rotateX: reduced ? 0 : -8, stagger: 0.08, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} id="process" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-[11px] tracking-[0.25em] uppercase text-[var(--new-gold)] mb-4">Platform</div>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight max-w-2xl">
          Everything your workshop needs —{' '}
          <span className="new-gradient-text">in one cinematic flow.</span>
        </h2>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase({ reduced }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const items = PROJECTS.slice(0, 5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;
      const dist = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true,
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section id="work" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {items.map((p) => (
            <div key={p.id} className="new-glass rounded-2xl overflow-hidden">
              <img src={p.cover} alt={p.title} className="w-full h-48 object-cover" />
              <div className="p-6"><h3 className="font-semibold">{p.title}</h3><p className="text-sm text-[var(--new-muted)] mt-2">{p.excerpt}</p></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapRef} id="work" className="relative h-screen overflow-hidden">
      <div className="absolute top-28 left-8 md:left-16 z-10 pointer-events-none">
        <div className="text-[11px] tracking-[0.25em] uppercase text-[var(--new-gold)]">Selected work</div>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold mt-2">Built on the platform.</h2>
      </div>
      <div
        ref={trackRef}
        className="new-showcase-track absolute top-0 left-0 h-full flex items-center pl-[10vw] gap-8"
        style={{ perspective: '1400px' }}
      >
        {items.map((p, i) => (
          <ShowcaseCard key={p.id} project={p} index={i} total={items.length} />
        ))}
        <div className="shrink-0 w-[15vw]" />
      </div>
    </section>
  );
}

function ShowcaseCard({ project: p, index, total }) {
  const tiltRef = useTilt(5);
  const rotY = -12 + (index / (total - 1)) * 24;
  return (
    <div
      ref={tiltRef}
      className="shrink-0 w-[min(420px,70vw)] h-[55vh] new-glass rounded-2xl overflow-hidden new-card-3d"
      style={{ transform: `rotateY(${rotY}deg) translateZ(${index * 20}px)`, transformStyle: 'preserve-3d' }}
    >
      <img src={p.cover} alt={p.title} className="w-full h-[55%] object-cover" />
      <div className="p-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--new-gold)]">{p.category}</div>
        <h3 className="text-xl font-semibold mt-2">{p.title}</h3>
        <p className="text-sm text-[var(--new-muted)] mt-2 line-clamp-2">{p.excerpt}</p>
      </div>
    </div>
  );
}

function CTA({ reduced }) {
  const ref = useRef(null);
  const tiltRef = useTilt(8);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.new-cta-el', {
        opacity: 0, y: 40, stagger: 0.1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(202,138,4,0.12), transparent 70%)',
      }} />
      <div ref={tiltRef} className="new-cta-el relative max-w-3xl mx-auto text-center new-glass rounded-3xl p-12 md:p-16" style={{ transformStyle: 'preserve-3d' }}>
        <div className="text-[11px] tracking-[0.25em] uppercase text-[var(--new-gold)] mb-4">Start forging</div>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
          Ready to run your workshop like a <span className="new-gradient-text italic">premiere?</span>
        </h2>
        <p className="new-cta-el mt-4 text-[var(--new-muted)] max-w-md mx-auto">
          Join Metal360 Platform — where SaaS precision meets cinematic craft.
        </p>
        <div className="new-cta-el mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/realisations" className="new-btn-primary px-8 py-4 text-sm inline-flex items-center gap-2 cursor-pointer">
            View the work <ArrowRight size={16} />
          </Link>
          <Link to="/" className="new-btn-ghost px-8 py-4 text-sm cursor-pointer">
            Back to studio
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function New() {
  const reduced = useReducedMotion();

  useEffect(() => {
    document.body.style.background = '#0c0a09';
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      document.body.style.background = '';
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="new-page relative min-h-screen">
      <MouseSpotlight reduced={reduced} />
      <FloatingNav />
      <main className="relative z-[2]">
        <Hero reduced={reduced} />
        <Stats reduced={reduced} />
        <Features reduced={reduced} />
        <Showcase reduced={reduced} />
        <CTA reduced={reduced} />
      </main>
      <footer className="relative z-[2] py-8 text-center text-[11px] tracking-[0.2em] text-[var(--new-muted)] uppercase border-t border-[var(--new-border)]">
        Metal360 Platform · SaaS × Cinematic × Craft
      </footer>
    </div>
  );
}
