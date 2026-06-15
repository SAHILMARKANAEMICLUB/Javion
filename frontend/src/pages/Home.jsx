import React, { useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HERO_VIDEO,
  HERO_VIDEO_FALLBACK,
  PROJECTS,
  GRID_IMAGES,
  TEAM_PHOTO,
} from '../mock';
import ProjectCarousel from '../components/ProjectCarousel';
import Testimonials from '../components/Testimonials';
import ContactBlock from '../components/ContactBlock';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.hero-h1 .word', {
        y: 80,
        opacity: 0,
        rotateX: -20,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.3,
      });
      gsap.from('.hero-sub', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        delay: 1.2,
        ease: 'power2.out',
      });
      gsap.from('.hero-scroll', { opacity: 0, duration: 0.8, delay: 1.5 });

      // Welcome H2 word-by-word reveal
      gsap.utils.toArray('.welcome-h2 .w').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.04,
            scrollTrigger: { trigger: '.welcome-h2', start: 'top 80%' },
          }
        );
      });

      // Scattered photos parallax + entrance
      gsap.utils.toArray('.scatter-img').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%' },
          }
        );
        // light parallax
        gsap.to(el, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Generic section animation
      gsap.utils.toArray('[data-animate]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Welcome H2 split into words for staggered reveal
  const welcomeWords = [
    { t: 'Welcome', em: false },
    { t: 'to', em: false },
    { t: 'Metal360,', em: true },
    { t: 'where', em: false },
    { t: 'a', em: false },
    { t: "metalworker's", em: false },
    { t: 'craft', em: false },
    { t: 'is', em: false },
    { t: 'never', em: false },
    { t: 'just', em: false },
    { t: 'fabrication', em: false },
    { t: '—', em: false },
    { t: "it's", em: false },
    { t: 'a', em: false },
    { t: 'whole', em: true },
    { t: 'experience,', em: true },
    { t: 'from', em: false },
    { t: 'first', em: false },
    { t: 'sketch', em: false },
    { t: 'to', em: false },
    { t: 'final', em: false },
    { t: 'install.', em: false },
  ];

  return (
    <main>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={GRID_IMAGES[2]}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
          <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(10,10,10,0.5)' }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h1
            className="hero-h1 text-white"
            style={{
              fontSize: 'clamp(64px, 12vw, 160px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            <span
              className="word inline-block font-display italic"
              style={{ fontWeight: 700 }}
            >
              Metal
            </span>{' '}
            <span
              className="word inline-block font-body"
              style={{ fontWeight: 300 }}
            >
              360
            </span>
          </h1>
          <p
            className="hero-sub mt-10 text-white mx-auto"
            style={{
              maxWidth: 760,
              fontWeight: 300,
              fontSize: 19,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            <span
              className="font-display italic"
              style={{ fontWeight: 700 }}
            >
              Forged by hand, drawn by intention
            </span>
            — we shape steel, stainless, and aluminum into pieces that outlive trends and turn architecture into a memory.
          </p>
        </div>
        <a
          href="#welcome"
          className="hero-scroll absolute bottom-10 left-0 right-0 flex flex-col items-center scroll-indicator"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          <span
            className="text-[11px] uppercase"
            style={{ letterSpacing: '0.2em' }}
          >
            Scroll
          </span>
          <ChevronDown size={22} strokeWidth={1.2} className="mt-2" />
        </a>
      </section>

      {/* WELCOME — scattered editorial layout */}
      <section
        id="welcome"
        className="relative px-6 md:px-[6vw] py-28 md:py-40 overflow-hidden"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        {/* H2 centered */}
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2
            className="welcome-h2 headline-mixed"
            style={{ fontSize: 'clamp(26px, 3.6vw, 46px)', lineHeight: 1.25 }}
          >
            {welcomeWords.map((w, i) => (
              <React.Fragment key={i}>
                <span className="w inline-block">
                  {w.em ? <em>{w.t}</em> : w.t}
                </span>
                {i < welcomeWords.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </h2>
        </div>

        {/* Scattered photo grid — asymmetric editorial layout */}
        <div className="max-w-7xl mx-auto mt-20 grid grid-cols-12 gap-3 md:gap-4">
          <div className="col-span-6 md:col-span-3 scatter-img overflow-hidden" style={{ borderRadius: 4, aspectRatio: '3 / 4' }}>
            <img src={GRID_IMAGES[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-6 md:col-span-4 scatter-img overflow-hidden md:mt-16" style={{ borderRadius: 4, aspectRatio: '4 / 3' }}>
            <img src={GRID_IMAGES[1]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-12 md:col-span-5 scatter-img overflow-hidden" style={{ borderRadius: 4, aspectRatio: '16 / 11' }}>
            <img src={GRID_IMAGES[2]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>

          <div className="col-span-6 md:col-span-4 scatter-img overflow-hidden md:-mt-10" style={{ borderRadius: 4, aspectRatio: '4 / 5' }}>
            <img src={GRID_IMAGES[3]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-6 md:col-span-3 scatter-img overflow-hidden md:mt-10" style={{ borderRadius: 4, aspectRatio: '3 / 4' }}>
            <img src={GRID_IMAGES[4]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-12 md:col-span-5 scatter-img overflow-hidden" style={{ borderRadius: 4, aspectRatio: '5 / 4' }}>
            <img src={GRID_IMAGES[5]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>

          <div className="col-span-6 md:col-span-5 scatter-img overflow-hidden md:mt-8" style={{ borderRadius: 4, aspectRatio: '5 / 3' }}>
            <img src={GRID_IMAGES[6]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-6 md:col-span-3 scatter-img overflow-hidden" style={{ borderRadius: 4, aspectRatio: '3 / 4' }}>
            <img src={GRID_IMAGES[7]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-span-12 md:col-span-4 scatter-img overflow-hidden md:mt-16" style={{ borderRadius: 4, aspectRatio: '4 / 3' }}>
            <img src={GRID_IMAGES[8]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* REALISATIONS — horizontal carousel */}
      <section className="py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <div data-animate className="px-6 md:px-[8vw]">
          <div className="eyebrow">Selected Work</div>
          <h2
            className="headline-mixed mt-4"
            style={{ fontSize: 'clamp(34px, 5.4vw, 68px)' }}
          >
            Our latest <em>creations</em>
          </h2>
        </div>

        <div className="mt-12">
          <ProjectCarousel projects={PROJECTS} />
        </div>

        <div className="text-center mt-10">
          <Link
            to="/realisations"
            className="inline-flex items-center gap-2 text-[14px] border-b pb-1 hover:opacity-60 transition-opacity"
            style={{ color: '#F5F3EF', borderColor: '#F5F3EF' }}
          >
            Explore the full portfolio <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="px-6 md:px-[8vw] py-28" style={{ backgroundColor: '#0A0A0A' }}>
        <div data-animate className="max-w-7xl mx-auto">
          <div className="eyebrow">The Studio</div>
          <h2
            className="headline-mixed mt-4"
            style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
          >
            A studio <em>obsessed with the well-made.</em>
          </h2>
        </div>
        <Link
          to="/equipe-metal360"
          data-animate
          className="block max-w-7xl mx-auto mt-12 overflow-hidden group"
          style={{ borderRadius: 6 }}
        >
          <div className="relative" style={{ height: '64vh' }}>
            <img
              src={TEAM_PHOTO}
              alt="The Metal360 studio"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            <div
              className="absolute bottom-8 right-8 inline-flex items-center gap-2 bg-white text-[#F5F3EF] px-5 py-3 text-[12px]"
              style={{ letterSpacing: '0.1em', borderRadius: 2 }}
            >
              Meet the studio <ArrowRight size={14} strokeWidth={1.5} />
            </div>
          </div>
        </Link>
        <p
          className="max-w-2xl mt-12"
          style={{ color: '#C9C4BC', fontSize: 18, lineHeight: 1.85 }}
          data-animate
        >
          Twelve artisans. One workshop. A shared belief that metal is more than a material — it is a language. Every commission begins the same way: by listening. To the building, to the brief, to the way light will fall on the piece long after we are gone.
        </p>
      </section>

      <Testimonials />

      <ContactBlock />
    </main>
  );
}
