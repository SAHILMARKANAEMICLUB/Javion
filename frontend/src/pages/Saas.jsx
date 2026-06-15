import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, Check, Sparkles, FileText, Layers, Users, Cpu, Boxes,
  TrendingUp, ChevronDown, Star, Menu, X, Play, Zap, ShieldCheck,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ACCENT_FROM = '#FF6B35';
const ACCENT_TO = '#F9A03F';
const BG = '#FAFAF7';
const TEXT = '#0A0A0A';
const MUTED = '#5A5A5A';
const BORDER = '#ECE9E2';

const Section = ({ id, children, className = '', style = {} }) => (
  <section id={id} className={`px-6 md:px-10 ${className}`} style={style}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const Pill = ({ children }) => (
  <span
    className="inline-flex items-center gap-2 px-3 py-1 text-[12px] font-medium"
    style={{
      background: 'rgba(255,107,53,0.08)',
      color: '#C73E0F',
      border: '1px solid rgba(255,107,53,0.18)',
      borderRadius: 999,
      letterSpacing: '0.02em',
    }}
  >
    {children}
  </span>
);

const PrimaryBtn = ({ children, large, href = '#', onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="inline-flex items-center gap-2 font-medium transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg"
    style={{
      background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
      color: '#FFFFFF',
      padding: large ? '14px 22px' : '10px 18px',
      borderRadius: 10,
      fontSize: large ? 15 : 13,
      boxShadow: '0 6px 22px -8px rgba(255,107,53,0.55)',
    }}
  >
    {children}
  </a>
);

const GhostBtn = ({ children, href = '#', large }) => (
  <a
    href={href}
    className="inline-flex items-center gap-2 font-medium transition-all duration-300 hover:bg-black/[0.04]"
    style={{
      color: TEXT,
      padding: large ? '14px 20px' : '10px 16px',
      borderRadius: 10,
      fontSize: large ? 15 : 13,
      border: `1px solid ${BORDER}`,
      background: '#FFFFFF',
    }}
  >
    {children}
  </a>
);

/* ---------- NAV ---------- */
function SaasNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(250,250,247,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        <Link to="/saas" className="flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center w-8 h-8"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
              borderRadius: 8,
            }}
          >
            <Zap size={16} color="#FFF" strokeWidth={2.5} fill="#FFF" />
          </span>
          <span style={{ color: TEXT, fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Metal360 <span style={{ color: '#C73E0F' }}>OS</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'Customers', 'Changelog', 'Docs'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[14px] transition-colors duration-200" style={{ color: MUTED }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-[14px]" style={{ color: TEXT }}>Sign in</a>
          <PrimaryBtn href="#cta">Start free trial <ArrowRight size={14} /></PrimaryBtn>
        </div>
        <button className="md:hidden" onClick={() => setOpen(true)} style={{ color: TEXT }}>
          <Menu size={22} />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col" style={{ background: BG }}>
          <div className="flex items-center justify-between px-6 py-4">
            <span style={{ color: TEXT, fontWeight: 600 }}>Metal360 <span style={{ color: '#C73E0F' }}>OS</span></span>
            <button onClick={() => setOpen(false)}><X size={24} /></button>
          </div>
          <nav className="flex flex-col gap-6 px-8 mt-10">
            {['Features', 'Pricing', 'Customers', 'Changelog', 'Docs'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="text-[22px]" style={{ color: TEXT }}>
                {l}
              </a>
            ))}
            <div className="mt-6"><PrimaryBtn large href="#cta">Start free trial <ArrowRight size={16} /></PrimaryBtn></div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' });
      gsap.from('.hero-h1 .hw', {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', stagger: 0.06, delay: 0.15,
      });
      gsap.from('.hero-sub', { opacity: 0, y: 18, duration: 0.8, delay: 0.6, ease: 'power3.out' });
      gsap.from('.hero-ctas > *', { opacity: 0, y: 12, duration: 0.7, stagger: 0.08, delay: 0.8 });
      gsap.from('.hero-trust', { opacity: 0, duration: 0.8, delay: 1 });
      gsap.from('.hero-mock', { opacity: 0, y: 60, scale: 0.96, duration: 1.1, delay: 0.7, ease: 'power3.out' });
      // Floating blob
      gsap.to('.blob-1', { y: -20, x: 10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.blob-2', { y: 18, x: -16, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });
    return () => ctx.revert();
  }, []);

  const words = ['The', 'operating', 'system', 'for', 'metalworkers.'];

  return (
    <section className="relative pt-36 md:pt-44 pb-28 overflow-hidden" style={{ background: BG }}>
      {/* Background blobs */}
      <div
        className="blob-1 absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,107,53,0.28), rgba(255,107,53,0) 60%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="blob-2 absolute top-10 right-[-180px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(249,160,63,0.22), rgba(249,160,63,0) 60%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 text-center">
        <div className="hero-eyebrow inline-flex">
          <Pill>
            <Sparkles size={12} /> Now with AI-powered quoting
          </Pill>
        </div>
        <h1
          className="hero-h1 mt-6 mx-auto"
          style={{
            fontSize: 'clamp(40px, 6.4vw, 84px)',
            fontWeight: 600,
            color: TEXT,
            letterSpacing: '-0.035em',
            lineHeight: 1.02,
            maxWidth: 1000,
          }}
        >
          {words.map((w, i) => (
            <span key={i} className="hw inline-block mr-[0.25em]">
              {i === words.length - 1 ? (
                <span style={{
                  background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontStyle: 'italic',
                }}>{w}</span>
              ) : w}
            </span>
          ))}
        </h1>
        <p
          className="hero-sub mt-7 mx-auto"
          style={{ color: MUTED, fontSize: 19, lineHeight: 1.6, maxWidth: 680, fontWeight: 400 }}
        >
          Quote in minutes, run projects from forge to install, and delight clients with beautiful proposals. Built for ateliers that make things by hand.
        </p>
        <div className="hero-ctas mt-9 flex flex-wrap items-center justify-center gap-3">
          <PrimaryBtn large href="#cta">Start free trial <ArrowRight size={16} /></PrimaryBtn>
          <GhostBtn large href="#"><Play size={14} /> Watch 2-min demo</GhostBtn>
        </div>
        <div className="hero-trust mt-6 text-[13px]" style={{ color: MUTED }}>
          Free for 14 days · No credit card · Cancel anytime
        </div>

        {/* Product mockup */}
        <div className="hero-mock mt-16 relative max-w-5xl mx-auto">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 16,
              border: `1px solid ${BORDER}`,
              boxShadow: '0 40px 80px -30px rgba(10,10,10,0.25), 0 8px 24px -8px rgba(255,107,53,0.18)',
              background: '#FFFFFF',
            }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${BORDER}`, background: '#FAFAF7' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
              <span className="ml-4 text-[12px]" style={{ color: MUTED }}>app.metal360.os / projects / spirale-infinie</span>
            </div>
            {/* Mock dashboard */}
            <div className="grid grid-cols-12 gap-0">
              {/* Sidebar */}
              <div className="col-span-3 hidden md:block p-5" style={{ borderRight: `1px solid ${BORDER}`, background: '#FCFBF7' }}>
                <div className="text-[11px] uppercase mb-3" style={{ color: MUTED, letterSpacing: '0.12em' }}>Workspace</div>
                {['Dashboard', 'Quotes', 'Projects', 'Materials', 'Team', 'Clients'].map((it, i) => (
                  <div key={it} className="flex items-center gap-2 py-2 text-[13px]" style={{ color: i === 2 ? TEXT : MUTED, fontWeight: i === 2 ? 600 : 400 }}>
                    {i === 2 && <span className="w-1 h-4" style={{ background: ACCENT_FROM, borderRadius: 2 }} />}
                    {it}
                  </div>
                ))}
              </div>
              {/* Main */}
              <div className="col-span-12 md:col-span-9 p-5 md:p-7 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px]" style={{ color: MUTED }}>PROJECT #482</div>
                    <div className="text-[18px] mt-1" style={{ color: TEXT, fontWeight: 600 }}>Spirale Infinie — Helical Staircase</div>
                  </div>
                  <span className="px-2.5 py-1 text-[11px]" style={{ background: 'rgba(40,200,128,0.12)', color: '#0F8C5C', borderRadius: 6 }}>In production</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  {[
                    { l: 'Quote value', v: '€42,800', s: '+12%' },
                    { l: 'Hours logged', v: '184h', s: '92%' },
                    { l: 'Materials', v: '12 SKUs', s: 'Stocked' },
                  ].map((s) => (
                    <div key={s.l} className="p-4" style={{ border: `1px solid ${BORDER}`, borderRadius: 10, background: '#FFF' }}>
                      <div className="text-[11px]" style={{ color: MUTED, letterSpacing: '0.05em' }}>{s.l.toUpperCase()}</div>
                      <div className="text-[20px] mt-1.5" style={{ color: TEXT, fontWeight: 600 }}>{s.v}</div>
                      <div className="text-[11px] mt-1" style={{ color: '#0F8C5C' }}>{s.s}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-4" style={{ border: `1px solid ${BORDER}`, borderRadius: 10 }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[12px]" style={{ color: TEXT, fontWeight: 600 }}>Pipeline progress</div>
                    <div className="text-[11px]" style={{ color: MUTED }}>4 / 6 stages</div>
                  </div>
                  <div className="flex gap-1.5">
                    {['Brief', 'Quote', 'Design', 'Fabrication', 'Finition', 'Install'].map((s, i) => (
                      <div key={s} className="flex-1">
                        <div className="h-1.5" style={{ background: i < 4 ? `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})` : BORDER, borderRadius: 999 }} />
                        <div className="text-[10px] mt-2" style={{ color: i < 4 ? TEXT : MUTED }}>{s}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Floating chip */}
          <div
            className="absolute hidden md:flex items-center gap-2 px-3 py-2 -bottom-5 left-10"
            style={{
              background: '#FFFFFF',
              border: `1px solid ${BORDER}`,
              borderRadius: 10,
              boxShadow: '0 14px 30px -12px rgba(10,10,10,0.2)',
            }}
          >
            <span style={{ background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`, borderRadius: 6, padding: 4 }}>
              <Sparkles size={12} color="#FFF" />
            </span>
            <span style={{ fontSize: 12, color: TEXT, fontWeight: 500 }}>AI quote generated in 12s</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- LOGO CLOUD ---------- */
function Logos() {
  const items = ['Atelier Lambert', 'Forge Mercier', 'Studio Roussel', 'Maison Fonteneau', 'Métallerie Vertou', 'Studeffi'];
  return (
    <section className="py-12" style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-center text-[13px]" style={{ color: MUTED, letterSpacing: '0.06em' }}>
          Trusted by 500+ ateliers across France &amp; Europe
        </p>
        <div className="mt-7 grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
          {items.map((n) => (
            <div key={n} className="text-center text-[14px]" style={{ color: '#9C988E', fontWeight: 500, letterSpacing: '0.02em' }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURES ---------- */
function Features() {
  const features = [
    { icon: Sparkles, title: 'AI Quoting', desc: 'Upload a sketch or photo. Metal360 OS estimates materials, hours, and price in seconds — refine with one click.' },
    { icon: Layers, title: 'Project Pipeline', desc: 'Kanban for ateliers — track every job from brief to install with stage automations and bottleneck alerts.' },
    { icon: Boxes, title: 'Material Library', desc: 'Track steel, inox, aluminium, brass stocks with live cost integrations. Auto-deduct on production.' },
    { icon: Users, title: 'Client Portal', desc: 'Beautiful, branded proposals with 3D previews and e-sign. Clients comment directly on revisions.' },
    { icon: Cpu, title: 'CAD Integration', desc: 'Native plug-ins for Fusion 360, SolidWorks, Rhino. Drawings, BOMs, and revisions stay in sync.' },
    { icon: ShieldCheck, title: 'Workshop Hours', desc: 'Mobile time tracking for artisans. Live margin per project — know exactly where you make money.' },
  ];
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.feat-card').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <Section id="features" className="py-28">
      <div className="max-w-3xl">
        <Pill>Features</Pill>
        <h2 className="mt-5" style={{ fontSize: 'clamp(32px, 4.4vw, 56px)', fontWeight: 600, color: TEXT, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
          Everything you need to run a modern <span style={{ background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>atelier</span>.
        </h2>
        <p className="mt-5 text-[18px]" style={{ color: MUTED, maxWidth: 640, lineHeight: 1.6 }}>
          One workspace for quoting, fabrication, materials, clients, and your team. Built with the obsessive attention to detail you expect from a Webflow-grade product.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="feat-card p-7 transition-all duration-300 hover:translate-y-[-3px]"
              style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: 14 }}>
              <span
                className="inline-flex items-center justify-center w-11 h-11"
                style={{
                  background: 'rgba(255,107,53,0.08)',
                  color: '#C73E0F',
                  borderRadius: 10,
                  border: '1px solid rgba(255,107,53,0.15)',
                }}
              >
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <h3 className="mt-5" style={{ fontSize: 18, fontWeight: 600, color: TEXT, letterSpacing: '-0.01em' }}>{f.title}</h3>
              <p className="mt-2 text-[14.5px]" style={{ color: MUTED, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- SHOWCASE ---------- */
function Showcase({ id, eyebrow, title, desc, bullets, mock, reverse }) {
  return (
    <Section id={id} className="py-24">
      <div className={`grid md:grid-cols-12 gap-12 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
        <div className="md:col-span-5" style={{ direction: 'ltr' }}>
          <Pill>{eyebrow}</Pill>
          <h3 className="mt-5" style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 600, color: TEXT, letterSpacing: '-0.022em', lineHeight: 1.12 }}>
            {title}
          </h3>
          <p className="mt-4 text-[17px]" style={{ color: MUTED, lineHeight: 1.65 }}>{desc}</p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px]" style={{ color: TEXT }}>
                <span className="inline-flex items-center justify-center mt-0.5" style={{ background: 'rgba(255,107,53,0.1)', color: '#C73E0F', width: 20, height: 20, borderRadius: 999 }}>
                  <Check size={12} strokeWidth={2.5} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-7"><GhostBtn>Learn more <ArrowRight size={14} /></GhostBtn></div>
        </div>
        <div className="md:col-span-7" style={{ direction: 'ltr' }}>{mock}</div>
      </div>
    </Section>
  );
}

const QuoteMock = () => (
  <div className="relative" style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: 14, padding: 22, boxShadow: '0 30px 60px -30px rgba(10,10,10,0.18)' }}>
    <div className="text-[11px]" style={{ color: MUTED, letterSpacing: '0.08em' }}>NEW QUOTE</div>
    <div className="mt-1" style={{ fontSize: 18, fontWeight: 600, color: TEXT }}>Garde-corps — Villa Bel Air</div>
    <div className="mt-5 grid grid-cols-2 gap-3 text-[13px]">
      {[
        { l: 'Material', v: 'Inox 316L · 18m' },
        { l: 'Finition', v: 'Brushed matte' },
        { l: 'Workshop hours', v: '38h estimated' },
        { l: 'Install hours', v: '12h estimated' },
      ].map((r) => (
        <div key={r.l} className="p-3" style={{ border: `1px solid ${BORDER}`, borderRadius: 8 }}>
          <div style={{ color: MUTED, fontSize: 11, letterSpacing: '0.05em' }}>{r.l.toUpperCase()}</div>
          <div className="mt-1" style={{ color: TEXT, fontWeight: 500 }}>{r.v}</div>
        </div>
      ))}
    </div>
    <div className="mt-5 p-4" style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.06), rgba(249,160,63,0.04))', border: `1px solid rgba(255,107,53,0.18)`, borderRadius: 10 }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[12px]" style={{ color: '#C73E0F' }}>AI Estimated Total</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: TEXT, letterSpacing: '-0.02em' }}>€18,420</div>
        </div>
        <div className="text-right text-[11px]" style={{ color: MUTED }}>
          Margin · <span style={{ color: '#0F8C5C', fontWeight: 600 }}>34%</span>
          <div>Generated · 9.4s</div>
        </div>
      </div>
    </div>
  </div>
);

const PipelineMock = () => {
  const cols = [
    { name: 'Quote', items: [{ t: 'Garde-corps Villa', v: '€18.4k' }, { t: 'Portail Domaine R.', v: '€8.2k' }] },
    { name: 'Design', items: [{ t: 'Escalier Spirale', v: '€42.8k' }] },
    { name: 'Fabrication', items: [{ t: 'Verrière atelier', v: '€12.1k' }, { t: 'Mobilier édition', v: '€5.8k' }] },
    { name: 'Install', items: [{ t: 'Pergola Vertou', v: '€9.4k' }] },
  ];
  return (
    <div className="grid grid-cols-4 gap-3" style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: 14, padding: 16 }}>
      {cols.map((c, ci) => (
        <div key={c.name} className="p-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px]" style={{ color: MUTED, letterSpacing: '0.08em' }}>{c.name.toUpperCase()}</span>
            <span className="text-[10px] px-1.5 py-0.5" style={{ background: BORDER, color: MUTED, borderRadius: 4 }}>{c.items.length}</span>
          </div>
          <div className="space-y-2">
            {c.items.map((it) => (
              <div key={it.t} className="p-3" style={{ background: '#FAFAF7', border: `1px solid ${BORDER}`, borderRadius: 8 }}>
                <div className="text-[12px]" style={{ color: TEXT, fontWeight: 500 }}>{it.t}</div>
                <div className="text-[11px] mt-1" style={{ color: MUTED }}>{it.v}</div>
                <div className="mt-2 h-1" style={{ background: ci < 3 ? `linear-gradient(90deg, ${ACCENT_FROM}, ${ACCENT_TO})` : BORDER, borderRadius: 999, width: ['25%', '55%', '78%', '95%'][ci] }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------- STATS ---------- */
function Stats() {
  const items = [
    { v: '500+', l: 'Ateliers' },
    { v: '50k+', l: 'Quotes generated' },
    { v: '32%', l: 'Faster delivery' },
    { v: '4.9/5', l: 'Customer rating' },
  ];
  return (
    <section className="py-20" style={{ background: BG, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map((s) => (
          <div key={s.l}>
            <div style={{ fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 700, color: TEXT, letterSpacing: '-0.03em',
              background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {s.v}
            </div>
            <div className="text-[13px] mt-2" style={{ color: MUTED, letterSpacing: '0.05em' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function TestimonialsSaas() {
  const items = [
    { quote: 'We went from 3-hour quoting to under 10 minutes. Our close rate doubled in a single quarter.', name: 'Tommy Bouchet', role: 'Founder · Metal360' },
    { quote: 'Finally a project tool that thinks like a metalworker. The pipeline view alone is worth the price.', name: 'Sophie Lambert', role: 'Directrice · Atelier Lambert' },
    { quote: 'The client portal makes us look 10 years more modern. Architects love it. So do we.', name: 'Antoine Mercier', role: 'Maître Artisan · Forge Mercier' },
  ];
  return (
    <Section id="customers" className="py-28">
      <div className="max-w-3xl">
        <Pill>Customers</Pill>
        <h2 className="mt-5" style={{ fontSize: 'clamp(32px, 4.4vw, 56px)', fontWeight: 600, color: TEXT, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
          Loved by ateliers that ship <span style={{ background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>beautifully</span>.
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((t) => (
          <div key={t.name} className="p-7 flex flex-col" style={{ background: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: 14 }}>
            <div className="flex gap-1" style={{ color: ACCENT_FROM }}>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill={ACCENT_FROM} strokeWidth={0} />)}
            </div>
            <p className="mt-4 text-[16px]" style={{ color: TEXT, lineHeight: 1.55 }}>&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-6 pt-5 flex items-center gap-3" style={{ borderTop: `1px solid ${BORDER}` }}>
              <span className="w-9 h-9 inline-flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`, color: '#FFF', borderRadius: 999, fontWeight: 600, fontSize: 13 }}>
                {t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </span>
              <div>
                <div className="text-[14px]" style={{ color: TEXT, fontWeight: 600 }}>{t.name}</div>
                <div className="text-[12px]" style={{ color: MUTED }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- PRICING ---------- */
function Pricing() {
  const tiers = [
    {
      name: 'Atelier', price: '€49', period: '/month', desc: 'For solo artisans getting started.',
      features: ['1 user', '20 active projects', 'AI quoting (50/mo)', 'Material library', 'Email support'],
      featured: false,
    },
    {
      name: 'Studio', price: '€149', period: '/month', desc: 'For growing ateliers shipping daily.',
      features: ['5 users', 'Unlimited projects', 'AI quoting (unlimited)', 'Client portal + e-sign', 'CAD integrations', 'Priority support'],
      featured: true,
    },
    {
      name: 'Forge', price: 'Custom', period: '', desc: 'Multi-site ateliers with custom needs.',
      features: ['Unlimited users', 'SSO + audit logs', 'Dedicated success manager', 'On-prem deployment', 'Custom integrations', '99.99% SLA'],
      featured: false,
    },
  ];
  return (
    <Section id="pricing" className="py-28">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex"><Pill>Pricing</Pill></div>
        <h2 className="mt-5" style={{ fontSize: 'clamp(32px, 4.4vw, 56px)', fontWeight: 600, color: TEXT, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
          Simple pricing. <span style={{ background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>Built to scale.</span>
        </h2>
        <p className="mt-4 text-[17px]" style={{ color: MUTED }}>Start free for 14 days. No credit card required.</p>
      </div>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiers.map((t) => (
          <div key={t.name} className="relative p-7 flex flex-col"
            style={{
              background: t.featured ? 'linear-gradient(180deg, #FFFFFF, #FFF7F1)' : '#FFFFFF',
              border: t.featured ? `1.5px solid ${ACCENT_FROM}` : `1px solid ${BORDER}`,
              borderRadius: 16,
              boxShadow: t.featured ? '0 30px 60px -30px rgba(255,107,53,0.35)' : 'none',
            }}>
            {t.featured && (
              <span className="absolute top-4 right-4 px-2 py-1 text-[10px]" style={{ background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`, color: '#FFF', borderRadius: 999, letterSpacing: '0.08em', fontWeight: 600 }}>
                MOST POPULAR
              </span>
            )}
            <div className="text-[14px]" style={{ color: MUTED, letterSpacing: '0.05em' }}>{t.name}</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span style={{ fontSize: 44, fontWeight: 700, color: TEXT, letterSpacing: '-0.03em' }}>{t.price}</span>
              <span className="text-[14px]" style={{ color: MUTED }}>{t.period}</span>
            </div>
            <p className="text-[13.5px] mt-1" style={{ color: MUTED }}>{t.desc}</p>
            <div className="mt-6">
              {t.featured
                ? <PrimaryBtn large href="#cta">Start free trial <ArrowRight size={16} /></PrimaryBtn>
                : <GhostBtn large href="#cta">Get started <ArrowRight size={16} /></GhostBtn>}
            </div>
            <ul className="mt-7 space-y-3 text-[14px]" style={{ color: TEXT }}>
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={16} strokeWidth={2} style={{ color: '#C73E0F', marginTop: 2 }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    { q: 'How does the free trial work?', a: 'You get full Studio access for 14 days. No credit card required. Cancel any time, your data stays exportable for 60 days.' },
    { q: 'Can I migrate from my current tool?', a: 'Yes — we offer free white-glove migration from Excel, Quickbooks, Procore, and most ERP systems. Average setup time is under an hour.' },
    { q: 'Which CAD software is supported?', a: 'Native plug-ins for Fusion 360, SolidWorks, Rhino, and AutoCAD. We also support STEP and DXF imports.' },
    { q: 'Where is my data stored?', a: 'EU-only (Paris + Frankfurt). SOC2 Type II certified, GDPR compliant, with daily encrypted backups.' },
    { q: 'Do you offer onboarding?', a: 'Every Studio and Forge plan includes a 1-hour personalized onboarding with a Metal360 OS specialist.' },
    { q: 'Can I cancel any time?', a: 'Yes. No long-term contracts. Pause, downgrade, or cancel from your billing settings in seconds.' },
  ];
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" className="py-28">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex"><Pill>FAQ</Pill></div>
        <h2 className="mt-5" style={{ fontSize: 'clamp(32px, 4.4vw, 52px)', fontWeight: 600, color: TEXT, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
          Questions, answered.
        </h2>
      </div>
      <div className="mt-12 max-w-3xl mx-auto divide-y" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        {items.map((it, i) => (
          <button
            key={it.q}
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full text-left py-6 flex items-start gap-4"
            style={{ borderColor: BORDER }}
          >
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <span style={{ fontSize: 16, color: TEXT, fontWeight: 500 }}>{it.q}</span>
                <ChevronDown
                  size={18}
                  style={{ color: MUTED, transition: 'transform 0.3s', transform: open === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
                />
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? 200 : 0, opacity: open === i ? 1 : 0, marginTop: open === i ? 12 : 0 }}
              >
                <p className="text-[15px]" style={{ color: MUTED, lineHeight: 1.65 }}>{it.a}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CTA + FOOTER ---------- */
function FinalCTA() {
  return (
    <section id="cta" className="px-6 md:px-10 py-24" style={{ background: BG }}>
      <div
        className="max-w-7xl mx-auto relative overflow-hidden text-center px-8 py-20"
        style={{
          background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
          borderRadius: 20,
          color: '#FFFFFF',
        }}
      >
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full" style={{ background: 'rgba(255,255,255,0.12)', filter: 'blur(40px)' }} />
        <div className="absolute -bottom-24 -right-10 w-96 h-96 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', filter: 'blur(50px)' }} />
        <div className="relative">
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Ready to run your atelier <em style={{ fontWeight: 700 }}>like a studio</em>?
          </h2>
          <p className="mt-5 mx-auto text-[18px]" style={{ color: 'rgba(255,255,255,0.92)', maxWidth: 600 }}>
            Join 500+ teams using Metal360 OS to quote faster, ship beautifully, and grow margins.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#" className="inline-flex items-center gap-2 font-semibold transition-all hover:translate-y-[-1px]"
              style={{ background: '#FFFFFF', color: '#C73E0F', padding: '14px 24px', borderRadius: 10, fontSize: 15 }}>
              Start free trial <ArrowRight size={16} />
            </a>
            <a href="#" className="inline-flex items-center gap-2 font-semibold transition-all hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.6)', color: '#FFFFFF', padding: '14px 22px', borderRadius: 10, fontSize: 15 }}>
              Book a demo
            </a>
          </div>
          <div className="mt-5 text-[13px]" style={{ color: 'rgba(255,255,255,0.85)' }}>14-day free trial · No credit card · Cancel anytime</div>
        </div>
      </div>
    </section>
  );
}

function SaasFooter() {
  const cols = [
    { t: 'Product', items: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Integrations'] },
    { t: 'Resources', items: ['Documentation', 'API', 'Help center', 'Status', 'Security'] },
    { t: 'Company', items: ['About', 'Careers', 'Blog', 'Press', 'Contact'] },
    { t: 'Legal', items: ['Privacy', 'Terms', 'DPA', 'Cookies'] },
  ];
  return (
    <footer className="px-6 md:px-10 py-16" style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8" style={{ background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`, borderRadius: 8 }}>
              <Zap size={16} color="#FFF" fill="#FFF" strokeWidth={2.5} />
            </span>
            <span style={{ color: TEXT, fontWeight: 600, fontSize: 18 }}>Metal360 <span style={{ color: '#C73E0F' }}>OS</span></span>
          </div>
          <p className="mt-4 text-[14px]" style={{ color: MUTED, maxWidth: 280, lineHeight: 1.6 }}>
            The operating system for modern ateliers. Built in France, used worldwide.
          </p>
          <p className="mt-6 text-[12px]" style={{ color: MUTED }}>© {new Date().getFullYear()} Metal360 OS. All rights reserved.</p>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <div className="text-[12px]" style={{ color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{c.t}</div>
            <ul className="mt-4 space-y-2.5">
              {c.items.map((it) => (
                <li key={it}><a href="#" className="text-[14px] transition-colors" style={{ color: TEXT }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C73E0F')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = TEXT)}>{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */
export default function Saas() {
  return (
    <div style={{ background: BG, color: TEXT, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
      <SaasNav />
      <Hero />
      <Logos />
      <Features />
      <Showcase
        id="quoting"
        eyebrow="AI Quoting"
        title={<>From sketch to quote in <span style={{ background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>under a minute</span>.</>}
        desc="Upload a sketch, photo, or CAD file. Metal360 OS computes materials, hours, finition costs, and margin instantly."
        bullets={['Vision-based material recognition', 'Live cost from your supplier feeds', 'Versioned proposals with e-sign']}
        mock={<QuoteMock />}
      />
      <Showcase
        id="pipeline"
        eyebrow="Project Pipeline"
        title={<>Every project, <span style={{ background: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>perfectly tracked</span>.</>}
        desc="Drag-and-drop Kanban purpose-built for ateliers. Brief, quote, design, fabrication, finition, install — every stage automated."
        bullets={['Bottleneck alerts before they hurt', 'Auto-deduct stock at production', 'Real-time margin per project']}
        mock={<PipelineMock />}
        reverse
      />
      <Stats />
      <TestimonialsSaas />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <SaasFooter />
    </div>
  );
}
