import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Volume2, VolumeX, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CDN = 'https://cdn.prod.website-files.com/64e31036eccea9001058bfc8';
const CDN2 = 'https://cdn.prod.website-files.com/64e85c16c3e5fe1806b372fc';

const IMG = {
  forge: 'https://images.unsplash.com/photo-1531053326607-9d349096d887?crop=entropy&cs=srgb&fm=jpg&w=2400&q=85',
  hand: 'https://images.unsplash.com/photo-1683470157212-cd4005549fce?crop=entropy&cs=srgb&fm=jpg&w=2400&q=85',
  spark: 'https://images.unsplash.com/photo-1716469801932-3b1b5494615c?crop=entropy&cs=srgb&fm=jpg&w=2400&q=85',
  steel: 'https://images.unsplash.com/photo-1599307169204-4176df0cdfe4?crop=entropy&cs=srgb&fm=jpg&w=2400&q=85',
  griffon: `${CDN}/65323ec1a64d6d0909b8ffb5_metal360_griffon_tiffauges_143_BD.jpg`,
  kiosque: `${CDN}/65323ec1a20d785f6469cdd2_kiosque_la_digue_03_bd3-2.jpg`,
  moulin: `${CDN}/65323ec153e01bf83befac41_metal360_moulin_neuf_76__bd.jpg`,
  pergola: `${CDN}/65323ec1715331597422d103_metal360_pergola_vertou_414__bd-2.jpg`,
  caves: `${CDN}/65323ec1afb79142dd44bc6f_gite_caves_secretes190_HDR_bd.jpg`,
  spirale: `${CDN2}/69fb5afeb004b1f42c09cefc_PHOTO-PRINCIPALE.jpg`,
  elegance: `${CDN2}/69fb5a37ef8470ae3c5c959e_PHOTO-PRINCIPALE.jpg`,
  team: `${CDN}/651c08b16dfb35365e6a096b_metal360_groupe_sept_23.jpg`,
};

/* ============== CUSTOM CURSOR ============== */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x; let ry = y;
    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    window.addEventListener('mousemove', onMove);
    const raf = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    // hover triggers
    const enter = () => setHover(true);
    const leave = () => setHover(false);
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(id);
    };
  }, []);
  return (
    <>
      <div
        ref={dotRef}
        className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{ width: 6, height: 6, background: '#FF6B35', mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9998] rounded-full transition-[width,height,border] duration-200"
        style={{
          width: hover ? 70 : 36,
          height: hover ? 70 : 36,
          border: '1px solid rgba(255,107,53,0.6)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}

/* ============== TOP HUD ============== */
function TopHUD({ muted, setMuted }) {
  const barRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const sc = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) || 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${sc})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return (
    <>
      {/* Top progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[1000]" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          ref={barRef}
          className="origin-left h-full"
          style={{
            background: 'linear-gradient(90deg, #FF6B35, #F9A03F)',
            transform: 'scaleX(0)',
            transition: 'transform 0.05s linear',
          }}
        />
      </div>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference">
        <Link to="/" className="flex items-center gap-2" data-cursor>
          <span className="text-[12px]" style={{ color: '#FFF', letterSpacing: '0.2em', fontWeight: 500 }}>
            METAL360 — A FILM
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <span className="hidden md:inline text-[11px]" style={{ color: '#FFF', letterSpacing: '0.22em' }}>
            CHAPTER 01 / 04
          </span>
          <button
            onClick={() => setMuted((m) => !m)}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.35)', color: '#FFF' }}
            data-cursor
          >
            {muted ? <VolumeX size={14} strokeWidth={1.5} /> : <Volume2 size={14} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </>
  );
}

/* ============== SCENE 1: OVERTURE ============== */
function Overture() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ov-eyebrow', { opacity: 0, y: 20, duration: 1.2, delay: 0.6, ease: 'power3.out' });
      gsap.from('.ov-line .ow', {
        opacity: 0, y: 60, duration: 1.4, ease: 'power3.out', stagger: 0.08, delay: 1.0,
      });
      gsap.from('.ov-foot', { opacity: 0, duration: 1, delay: 2.4 });
      gsap.to('.ov-section', {
        opacity: 0, scale: 1.05,
        ease: 'none',
        scrollTrigger: { trigger: '.ov-section', start: 'top top', end: 'bottom top', scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);
  const line1 = 'From the fire,'.split(' ');
  const line2 = 'something is born.'.split(' ');
  return (
    <section className="ov-section relative h-screen w-full flex items-center justify-center overflow-hidden" style={{ background: '#050505' }}>
      {/* radial vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 60%, rgba(255,107,53,0.12), rgba(0,0,0,0) 60%)',
      }} />
      <div className="relative text-center px-6">
        <div className="ov-eyebrow text-[11px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.35em' }}>
          PROLOGUE · 2026
        </div>
        <h1
          className="ov-line mt-8 font-display italic"
          style={{
            fontSize: 'clamp(48px, 8vw, 130px)',
            color: '#F5F3EF',
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
          }}
        >
          {line1.map((w, i) => <span key={i} className="ow inline-block mr-[0.3em]">{w}</span>)}
        </h1>
        <h1
          className="ov-line mt-2 font-display italic"
          style={{
            fontSize: 'clamp(48px, 8vw, 130px)',
            color: '#F5F3EF',
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
          }}
        >
          {line2.map((w, i) => (
            <span key={i} className="ow inline-block mr-[0.3em]" style={i === 1 ? {
              background: 'linear-gradient(135deg, #FF6B35, #F9A03F)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            } : {}}>
              {w}
            </span>
          ))}
        </h1>
        <div className="ov-foot mt-14 inline-flex flex-col items-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <div className="text-[10px]" style={{ letterSpacing: '0.3em' }}>SCROLL TO BEGIN</div>
          <div className="mt-3 h-10 w-[1px]" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} />
        </div>
      </div>
    </section>
  );
}

/* ============== SCENE 2: BIG HERO IMAGE WITH PARALLAX ============== */
function ActOne() {
  const imgRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 25, scale: 1.15, ease: 'none',
        scrollTrigger: { trigger: '.act1', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.from('.act1-eyebrow', { opacity: 0, y: 30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.act1', start: 'top 60%' } });
      gsap.from('.act1-title .w', { opacity: 0, y: 50, duration: 1, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.act1-title', start: 'top 80%' } });
      gsap.from('.act1-meta', { opacity: 0, y: 20, duration: 1, delay: 0.6,
        scrollTrigger: { trigger: '.act1', start: 'top 50%' } });
    });
    return () => ctx.revert();
  }, []);
  const t = 'Acte I — Le feu'.split(' ');
  return (
    <section className="act1 relative h-screen w-full overflow-hidden">
      <img
        ref={imgRef}
        src={IMG.forge}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.6) contrast(1.1) saturate(0.85)' }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.75) 100%)',
      }} />
      <div className="relative h-full flex flex-col justify-end px-8 md:px-16 pb-20">
        <div className="act1-eyebrow text-[11px]" style={{ color: '#F9A03F', letterSpacing: '0.3em' }}>
          ACT I · THE FORGE
        </div>
        <h2 className="act1-title font-display italic mt-4" style={{
          fontSize: 'clamp(44px, 7vw, 110px)',
          color: '#F5F3EF', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.025em',
        }}>
          {t.map((w, i) => <span key={i} className="w inline-block mr-[0.25em]">{w}</span>)}
        </h2>
        <div className="act1-meta mt-6 text-[15px]" style={{ color: 'rgba(245,243,239,0.7)', maxWidth: 540, lineHeight: 1.6 }}>
          1538 °C — the moment steel surrenders. Where every piece begins, in the breath between solid and liquid.
        </div>
      </div>
    </section>
  );
}

/* ============== SCENE 3: PINNED CHAPTER WITH SCRUBBED TEXT/IMG CROSSFADES ============== */
function PinnedChapters() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.pin-slide');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: () => '+=' + (slides.length * window.innerHeight * 0.85),
          scrub: 0.6,
        },
      });
      slides.forEach((s, i) => {
        if (i > 0) {
          tl.to(slides[i - 1], { opacity: 0, scale: 1.06, duration: 1 }, i)
            .fromTo(s, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1 }, i);
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const slides = [
    {
      eyebrow: 'CHAPTER II',
      title: 'Le métal',
      sub: 'Acier, inox, aluminium, laiton, cuivre. Each alloy whispers a different story. Listen to them.',
      img: IMG.steel,
    },
    {
      eyebrow: 'CHAPTER III',
      title: 'La main',
      sub: 'Tradition meets precision. The hand that has shaped a thousand pieces knows where to bend, where to break, where to hold.',
      img: IMG.hand,
    },
    {
      eyebrow: 'CHAPTER IV',
      title: "L'étincelle",
      sub: 'A million sparks. Each one a choice. Each one another step toward the form that wants to exist.',
      img: IMG.spark,
    },
  ];

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" style={{ background: '#050505' }}>
      {slides.map((s, i) => (
        <div
          key={i}
          className="pin-slide absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.55) contrast(1.05)' }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.7) 100%)',
          }} />
          <div className="relative h-full grid grid-cols-12 gap-6 items-center px-8 md:px-16">
            <div className="col-span-12 md:col-span-6">
              <div className="text-[11px]" style={{ color: '#F9A03F', letterSpacing: '0.32em' }}>
                {s.eyebrow}
              </div>
              <h3 className="font-display italic mt-4" style={{
                fontSize: 'clamp(56px, 9vw, 140px)',
                color: '#F5F3EF', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.03em',
              }}>
                {s.title}
              </h3>
              <p className="mt-6 text-[16px]" style={{ color: 'rgba(245,243,239,0.78)', maxWidth: 460, lineHeight: 1.65 }}>
                {s.sub}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ============== SCENE 4: HORIZONTAL SCROLL — THE PROCESS ============== */
function HorizontalAct() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const panels = [
    { n: '01', t: 'Conception', d: 'Le crayon avant le métal. The drawing before the steel — every curve, every joint, every shadow imagined.', img: IMG.spirale },
    { n: '02', t: 'Découpe', d: 'Précision au dixième. CNC plasma & laser, where mathematics becomes movement.', img: IMG.elegance },
    { n: '03', t: 'Soudure', d: 'TIG, MIG, brasage. The invisible art of joining, where two become one without a trace.', img: IMG.kiosque },
    { n: '04', t: 'Finition', d: 'Brossé, patiné, thermolaqué. The skin of the piece — what your hand will feel, what the light will love.', img: IMG.moulin },
    { n: '05', t: 'Installation', d: 'Le moment de vérité. Months of work meet the building, the room, the eye that finally sees.', img: IMG.pergola },
  ];

  return (
    <section ref={wrapRef} className="relative h-screen w-full overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Top label */}
      <div className="absolute top-0 left-0 right-0 z-10 px-8 md:px-16 pt-28 pointer-events-none">
        <div className="text-[11px]" style={{ color: '#F9A03F', letterSpacing: '0.3em' }}>ACT II — THE PROCESS</div>
        <div className="font-display italic mt-2" style={{ color: '#F5F3EF', fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Five hands, one piece.
        </div>
      </div>

      <div ref={trackRef} className="absolute top-0 left-0 h-full flex items-center pl-[8vw]" style={{ willChange: 'transform' }}>
        {panels.map((p, i) => (
          <div
            key={p.n}
            className="shrink-0 mr-12 md:mr-16 flex flex-col justify-center"
            style={{ width: 'clamp(360px, 60vw, 720px)', height: '70vh', marginTop: '6vh' }}
          >
            <div className="relative overflow-hidden flex-1" style={{ borderRadius: 4 }}>
              <img src={p.img} alt={p.t} className="w-full h-full object-cover" style={{ filter: 'brightness(0.88) contrast(1.05)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)' }} />
              <div className="absolute top-5 left-5 font-display italic" style={{ color: '#F9A03F', fontSize: 64, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em' }}>
                {p.n}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-display italic" style={{ color: '#F5F3EF', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                  {p.t}
                </div>
                <div className="mt-3 text-[13px]" style={{ color: 'rgba(245,243,239,0.78)', maxWidth: 400, lineHeight: 1.55 }}>
                  {p.d}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ minWidth: '20vw' }} />
      </div>

      {/* Hint */}
      <div className="absolute bottom-8 right-8 text-[11px] flex items-center gap-3" style={{ color: 'rgba(245,243,239,0.5)', letterSpacing: '0.2em' }}>
        SCROLL <span className="inline-block h-[1px] w-10" style={{ background: 'linear-gradient(90deg, transparent, #F9A03F)' }} />
      </div>
    </section>
  );
}

/* ============== SCENE 5: ANIMATED COUNTERS ============== */
function Counters() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const nums = gsap.utils.toArray('.count');
      nums.forEach((el) => {
        const target = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => { el.textContent = obj.v.toFixed(decimals); },
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
      gsap.from('.cnt-title .w', { opacity: 0, y: 40, stagger: 0.05, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    });
    return () => ctx.revert();
  }, []);
  const items = [
    { v: 24, suf: 'ans', l: 'years in the trade' },
    { v: 1538, suf: '°C', l: 'where steel surrenders' },
    { v: 12, suf: 'k+', l: 'pieces shaped by hand' },
    { v: 99.7, dec: 1, suf: '%', l: 'precision tolerance' },
  ];
  const t = 'Numbers that mean nothing without the hand.'.split(' ');
  return (
    <section ref={ref} className="relative py-32 md:py-44 px-8 md:px-16 overflow-hidden" style={{ background: '#050505' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-[11px]" style={{ color: '#F9A03F', letterSpacing: '0.32em' }}>INTERLUDE</div>
        <h2 className="cnt-title font-display italic mt-4" style={{
          color: '#F5F3EF', fontSize: 'clamp(36px, 5.2vw, 72px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.025em', maxWidth: 900,
        }}>
          {t.map((w, i) => <span key={i} className="w inline-block mr-[0.25em]">{w}</span>)}
        </h2>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          {items.map((it) => (
            <div key={it.l}>
              <div className="font-display italic" style={{
                fontSize: 'clamp(48px, 7vw, 96px)', color: '#F5F3EF', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em',
              }}>
                <span className="count" data-target={it.v} data-decimals={it.dec || 0}>0</span>
                <span style={{
                  background: 'linear-gradient(135deg, #FF6B35, #F9A03F)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>{it.suf}</span>
              </div>
              <div className="mt-3 text-[12px]" style={{ color: 'rgba(245,243,239,0.55)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                {it.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== SCENE 6: CLIP-PATH REVEAL ============== */
function ClipReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.clip-img',
        { clipPath: 'inset(40% 20% 40% 20% round 0px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'power3.out',
          scrollTrigger: { trigger: '.clip-wrap', start: 'top 75%', end: 'top 10%', scrub: 1 },
        }
      );
      gsap.from('.clip-eyebrow', { opacity: 0, y: 20, duration: 1,
        scrollTrigger: { trigger: '.clip-wrap', start: 'top 75%' } });
      gsap.from('.clip-title .w', { opacity: 0, y: 30, duration: 0.9, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: '.clip-wrap', start: 'top 70%' } });
    });
    return () => ctx.revert();
  }, []);
  const t = 'And then —'.split(' ');
  return (
    <section className="clip-wrap relative overflow-hidden pt-24 pb-32 px-6" style={{ background: '#050505' }}>
      <div className="max-w-6xl mx-auto text-center mb-10">
        <div className="clip-eyebrow text-[11px]" style={{ color: '#F9A03F', letterSpacing: '0.3em' }}>FINALE</div>
        <h2 className="clip-title font-display italic mt-4" style={{
          color: '#F5F3EF', fontSize: 'clamp(40px, 6vw, 88px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.025em',
        }}>
          {t.map((w, i) => <span key={i} className="w inline-block mr-[0.25em]">{w}</span>)}
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-2">
        <div className="clip-img relative overflow-hidden" style={{ height: '70vh', borderRadius: 4 }}>
          <img src={IMG.griffon} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.92) contrast(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6) 100%)' }} />
          <div className="absolute bottom-8 left-8 right-8 text-center">
            <div className="font-display italic" style={{ color: '#F5F3EF', fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.02em' }}>
              the metal remembers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== SCENE 7: VERTICAL MARQUEE WORD ============== */
function CreditsMarquee() {
  return (
    <section className="relative overflow-hidden py-24" style={{ background: '#050505' }}>
      <div className="flex" style={{ animation: 'cinema-marquee 24s linear infinite', willChange: 'transform' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="font-display italic shrink-0 pr-12" style={{
            fontSize: 'clamp(80px, 13vw, 220px)', fontWeight: 400, color: '#F5F3EF', lineHeight: 1, letterSpacing: '-0.04em',
          }}>
            Forgé · Façonné · Forgé · <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #F9A03F)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Vivant</span> ·&nbsp;
          </span>
        ))}
      </div>
      <style>{`
        @keyframes cinema-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
      `}</style>
    </section>
  );
}

/* ============== SCENE 8: ENDING + CTA ============== */
function Ending() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.end-line .w', { opacity: 0, y: 40, stagger: 0.06, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.end-line', start: 'top 80%' } });
      gsap.from('.end-cta', { opacity: 0, y: 20, duration: 1, delay: 0.5,
        scrollTrigger: { trigger: '.end-line', start: 'top 70%' } });
    });
    return () => ctx.revert();
  }, []);
  const t = 'You bring the vision. We bring the fire.'.split(' ');
  return (
    <section className="relative py-40 px-6 text-center overflow-hidden" style={{ background: '#050505' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255,107,53,0.18), transparent 55%)',
        }}
      />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-[11px]" style={{ color: '#F9A03F', letterSpacing: '0.32em' }}>END CREDITS</div>
        <h2 className="end-line font-display italic mt-6" style={{
          fontSize: 'clamp(40px, 7vw, 110px)', color: '#F5F3EF', fontWeight: 400, lineHeight: 0.98, letterSpacing: '-0.03em',
        }}>
          {t.map((w, i) => (
            <span key={i} className="w inline-block mr-[0.25em]" style={i === t.length - 1 ? {
              background: 'linear-gradient(135deg, #FF6B35, #F9A03F)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            } : {}}>{w}</span>
          ))}
        </h2>
        <div className="end-cta mt-14 flex flex-wrap items-center justify-center gap-4">
          <Link to="/realisations" data-cursor
            className="inline-flex items-center gap-2 px-7 py-4 transition-all hover:translate-y-[-2px]"
            style={{
              background: 'linear-gradient(135deg, #FF6B35, #F9A03F)',
              color: '#FFF', borderRadius: 999, fontSize: 14, letterSpacing: '0.08em', fontWeight: 500,
              boxShadow: '0 10px 40px -10px rgba(255,107,53,0.55)',
            }}
          >
            VOIR LES RÉALISATIONS <ArrowRight size={16} />
          </Link>
          <Link to="/" data-cursor
            className="inline-flex items-center gap-2 px-7 py-4 transition-colors"
            style={{
              border: '1px solid rgba(245,243,239,0.3)', color: '#F5F3EF', borderRadius: 999, fontSize: 14, letterSpacing: '0.08em', fontWeight: 500,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(245,243,239,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            RETOUR À L'ATELIER
          </Link>
        </div>
        <div className="mt-24 text-[10px]" style={{ color: 'rgba(245,243,239,0.35)', letterSpacing: '0.3em' }}>
          A METAL360 FILM · DIRECTED BY THE HAND · SCORED BY THE FIRE · 2026
        </div>
      </div>
    </section>
  );
}

/* ============== ROOT ============== */
export default function Cinematic() {
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    document.body.style.background = '#050505';
    return () => { document.body.style.background = ''; };
  }, []);
  return (
    <div style={{ background: '#050505', color: '#F5F3EF', cursor: 'auto' }}>
      <Cursor />
      <TopHUD muted={muted} setMuted={setMuted} />
      {/* Film grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[500] opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>\")",
        }}
      />
      <Overture />
      <ActOne />
      <PinnedChapters />
      <HorizontalAct />
      <Counters />
      <ClipReveal />
      <CreditsMarquee />
      <Ending />
    </div>
  );
}
