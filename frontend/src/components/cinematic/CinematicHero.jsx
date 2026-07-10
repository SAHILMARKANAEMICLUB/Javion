import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, FileText } from 'lucide-react';
import { HERO_VIDEO, HERO_VIDEO_FALLBACK, HERO_VIDEO_POSTER } from '../../mock';
import { isAppReady, onAppReady } from '../../utils/appReady';

gsap.registerPlugin(ScrollTrigger);

const TAGLINE = 'Precision engineered · ISO-grade · Built to spec';
const TAGLINE_PARTS = TAGLINE.split(' · ');
const SPECS = ['M6 – M24', 'Grade 8.8', 'Hot-dip galvanized', 'Custom threads'];

const HERO_TEXT_IN = {
  opacity: 0,
  y: 36,
  filter: 'blur(16px)',
};

const HERO_TEXT_OUT = {
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  duration: 1.1,
  ease: 'power3.out',
  clearProps: 'filter',
};

export default function CinematicHero({ reduced }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const play = () => {
      video.play().catch(() => {});
    };

    play();
    video.addEventListener('canplay', play);
    video.addEventListener('loadeddata', play);

    const onVisible = () => {
      if (!document.hidden) play();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      video.removeEventListener('canplay', play);
      video.removeEventListener('loadeddata', play);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.set(['.hero-badge', '.hero-scroll-hint'], HERO_TEXT_IN);
      gsap.set('.hero-headline .hw', HERO_TEXT_IN);
      gsap.set('.hero-tagline-part', { ...HERO_TEXT_IN, y: 24, filter: 'blur(12px)' });
      gsap.set('.hero-cta-row .hero-blur-item', HERO_TEXT_IN);
      gsap.set('.hero-specs .hero-spec', HERO_TEXT_IN);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    let ctx;

    const runIntro = () => {
      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set(['.hero-blur-item', '.hero-headline .hw', '.hero-tagline-part'], {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
          });
          return;
        }

        gsap.set(['.hero-badge', '.hero-scroll-hint'], HERO_TEXT_IN);
        gsap.set('.hero-headline .hw', HERO_TEXT_IN);
        gsap.set('.hero-tagline-part', { ...HERO_TEXT_IN, y: 24, filter: 'blur(12px)' });
        gsap.set('.hero-cta-row .hero-blur-item', HERO_TEXT_IN);
        gsap.set('.hero-specs .hero-spec', HERO_TEXT_IN);

        const intro = gsap.timeline({ delay: 0.15 });

        intro
          .to('.hero-badge', { ...HERO_TEXT_OUT, duration: 1 }, 0)
          .to('.hero-headline .hw', { ...HERO_TEXT_OUT, stagger: 0.09, duration: 1.15 }, 0.12)
          .to('.hero-tagline-part', { ...HERO_TEXT_OUT, stagger: 0.08, duration: 0.95, y: 0 }, 0.55)
          .to('.hero-cta-row .hero-blur-item', { ...HERO_TEXT_OUT, stagger: 0.12, duration: 0.9 }, 0.85)
          .to('.hero-specs .hero-spec', { ...HERO_TEXT_OUT, stagger: 0.06, duration: 0.85, y: 0 }, 1.05)
          .to('.hero-scroll-hint', { ...HERO_TEXT_OUT, duration: 1 }, 1.25);

        gsap.to('.hero-video-inner', {
          scale: 1.06,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        });

        gsap.to(contentRef.current, {
          y: -72,
          opacity: 0,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 1.1,
          },
        });
      }, sectionRef);
    };

    if (isAppReady()) runIntro();
    else onAppReady(runIntro);

    return () => ctx?.revert();
  }, [reduced]);

  const headline = ['Industrial', 'fasteners', 'that', 'hold', 'the', 'line.'];

  return (
    <section
      ref={sectionRef}
      className="ov-section hero-industrial relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div
        className="hero-video absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${HERO_VIDEO_POSTER})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-video-inner absolute inset-0 will-change-transform">
          <video
            ref={videoRef}
            className="hero-video-el absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_VIDEO_POSTER}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
            <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />
          </video>
        </div>
        <div className="hero-video-vignette absolute inset-0 pointer-events-none z-[1]" />
      </div>

      <div className="hero-bottom-blur absolute inset-x-0 bottom-0 z-[2] pointer-events-none" aria-hidden />
      <div className="hero-bottom-fade absolute inset-x-0 bottom-0 z-[3] pointer-events-none" aria-hidden />

      <div
        ref={contentRef}
        className="hero-content relative z-10 w-full max-w-4xl mx-auto px-6 md:px-10 pt-28 pb-36 md:pt-32 md:pb-44 min-h-screen flex flex-col items-center justify-center text-center"
      >
        <div
          className="hero-badge hero-blur-item inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-7"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38B6FF] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38B6FF]" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/80 font-body">
            Javion Fasteners · Manufacturing
          </span>
        </div>

        <h1
          className="hero-headline font-display text-white leading-[1.05] tracking-[-0.03em] max-w-3xl"
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 4rem)',
            fontWeight: 600,
          }}
        >
          {headline.map((w, i) => (
            <span
              key={i}
              className="hw inline-block mr-[0.26em]"
              style={i !== 1 ? { textShadow: '0 2px 40px rgba(0,0,0,0.35)' } : undefined}
            >
              {i === 1 ? <span className="cin-gradient-text">{w}</span> : w}
            </span>
          ))}
        </h1>

        <p
          className="hero-tagline font-body mt-5 max-w-xl"
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
            textShadow: '0 1px 20px rgba(0,0,0,0.3)',
          }}
        >
          {TAGLINE_PARTS.map((part, i) => (
            <span key={part} className="hero-tagline-part inline-block">
              {part}
              {i < TAGLINE_PARTS.length - 1 && (
                <span className="text-white/45" aria-hidden> · </span>
              )}
            </span>
          ))}
        </p>

        <div className="hero-cta-row flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#scatter"
            data-cursor
            className="hero-blur-item cin-btn-primary inline-flex items-center gap-2 px-8 py-4 text-[13px] font-semibold tracking-[0.06em] transition-transform hover:-translate-y-0.5"
          >
            EXPLORE PRODUCTS <ArrowRight size={16} />
          </a>
          <a
            href="#quote"
            data-cursor
            className="hero-blur-item inline-flex items-center gap-2 px-8 py-4 text-[13px] font-semibold tracking-[0.06em] rounded-full transition-colors hover:bg-white/15"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.4)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
            }}
          >
            GET A QUOTE <FileText size={16} />
          </a>
        </div>

        <div className="hero-specs hero-blur-item mt-10 flex flex-wrap items-center justify-center gap-2">
          {SPECS.map((s) => (
            <span
              key={s}
              className="hero-spec text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full font-body"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(6px)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5">
        <span className="hero-scroll-hint-label text-[9px] uppercase tracking-[0.32em] font-body">
          Scroll to explore
        </span>
        <div className="hero-scroll-hint-arrow" aria-hidden>
          <ChevronDown size={20} strokeWidth={1.75} className="hero-scroll-chevron" />
          <ChevronDown size={20} strokeWidth={1.75} className="hero-scroll-chevron hero-scroll-chevron--trail" />
        </div>
      </div>
    </section>
  );
}
