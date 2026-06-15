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
    { t: 'Bienvenue', em: false },
    { t: 'chez', em: false },
    { t: 'Metal360,', em: true },
    { t: 'où', em: false },
    { t: 'notre', em: false },
    { t: 'métier', em: false },
    { t: 'de', em: false },
    { t: 'métallier', em: false },
    { t: 'est', em: false },
    { t: 'bien', em: false },
    { t: 'plus', em: false },
    { t: "qu'une", em: false },
    { t: 'simple', em: false },
    { t: 'fabrication,', em: false },
    { t: "c'est", em: false },
    { t: 'une', em: false },
    { t: 'expérience', em: true },
    { t: 'complète', em: true },
    { t: 'de', em: false },
    { t: 'bout', em: false },
    { t: 'en', em: false },
    { t: 'bout.', em: false },
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
              Passionnés et inspirés par les métaux
            </span>
            , nous transformons l'acier, l'inox et l'aluminium &amp; concevons
            des ouvrages métalliques uniques pour embellir vos intérieurs et
            extérieurs.
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
            Défiler
          </span>
          <ChevronDown size={22} strokeWidth={1.2} className="mt-2" />
        </a>
      </section>

      {/* WELCOME — scattered editorial layout */}
      <section
        id="welcome"
        className="relative px-6 md:px-[6vw] py-28 md:py-40 overflow-hidden"
        style={{ backgroundColor: '#F5F3EF' }}
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
      <section className="py-24" style={{ backgroundColor: '#F5F3EF' }}>
        <div data-animate className="px-6 md:px-[8vw]">
          <div className="eyebrow">Réalisations</div>
          <h2
            className="headline-mixed mt-4"
            style={{ fontSize: 'clamp(34px, 5.4vw, 68px)' }}
          >
            Nos dernières <em>créations</em>
          </h2>
        </div>

        <div className="mt-12">
          <ProjectCarousel projects={PROJECTS} />
        </div>

        <div className="text-center mt-10">
          <Link
            to="/realisations"
            className="inline-flex items-center gap-2 text-[14px] border-b pb-1 hover:opacity-60 transition-opacity"
            style={{ color: '#1A1A1A', borderColor: '#1A1A1A' }}
          >
            Découvrir toutes nos réalisations <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="px-6 md:px-[8vw] py-28" style={{ backgroundColor: '#F5F3EF' }}>
        <div data-animate className="max-w-7xl mx-auto">
          <div className="eyebrow">Notre équipe</div>
          <h2
            className="headline-mixed mt-4"
            style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
          >
            Une équipe <em>dynamique, motivée &amp; qualifiée</em>
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
              alt="L'équipe Metal360"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            <div
              className="absolute bottom-8 right-8 inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-5 py-3 text-[12px]"
              style={{ letterSpacing: '0.1em', borderRadius: 2 }}
            >
              Découvrir l'équipe <ArrowRight size={14} strokeWidth={1.5} />
            </div>
          </div>
        </Link>
        <p
          className="max-w-2xl mt-12"
          style={{ color: '#3D3D3D', fontSize: 18, lineHeight: 1.85 }}
          data-animate
        >
          Passionnés par le travail du métal et du fer forgé, notre équipe vous
          propose des prestations sur-mesure pour la création et la fabrication
          sur mesure de vos ouvrages métalliques. L'équipe maîtrise le potentiel
          de chaque alliage : acier, inox, aluminium, laiton, cuivre, fonte
          … ainsi que l'ensemble des procédés de soudure : TIG, MIG, électrode
          enrobé, brasage.
        </p>
      </section>

      <Testimonials />

      <ContactBlock />
    </main>
  );
}
