import React, { useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_VIDEO, HERO_VIDEO_FALLBACK, PROJECTS, GRID_IMAGES, TEAM_PHOTO } from '../mock';
import ProjectCard from '../components/ProjectCard';
import Testimonials from '../components/Testimonials';
import ContactBlock from '../components/ContactBlock';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.hero-h1 .word', {
        y: 60,
        opacity: 0,
        rotateX: -20,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.3,
      });
      gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.8, delay: 1.1, ease: 'power2.out' });
      gsap.from('.hero-scroll', { opacity: 0, duration: 0.8, delay: 1.4 });

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

      gsap.utils.toArray('.grid-img').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: (i % 6) * 0.06,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* HERO */}
      <section ref={heroRef} className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1683470157212-cd4005549fce?crop=entropy&cs=srgb&fm=jpg&w=2000&q=85"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
          <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,10,10,0.45)' }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h1
            className="hero-h1 text-white"
            style={{
              fontSize: 'clamp(56px, 11vw, 140px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="word inline-block font-display italic" style={{ fontWeight: 700 }}>Metal</span>{' '}
            <span className="word inline-block font-body" style={{ fontWeight: 300 }}>360</span>
          </h1>
          <p
            className="hero-sub mt-8 text-white mx-auto"
            style={{
              maxWidth: 720,
              fontWeight: 300,
              fontSize: 18,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.88)',
            }}
          >
            <em className="font-display not-italic" style={{ fontStyle: 'italic', fontWeight: 700 }}>Passionnés et inspirés par les métaux</em>, nous transformons l'acier, l'inox et l'aluminium &amp; concevons des ouvrages métalliques uniques pour embellir vos intérieurs et extérieurs.
          </p>
        </div>
        <div
          className="hero-scroll absolute bottom-10 left-0 right-0 flex flex-col items-center scroll-indicator"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          <span className="text-[11px] uppercase" style={{ letterSpacing: '0.18em' }}>Défiler</span>
          <ChevronDown size={20} strokeWidth={1.2} className="mt-2" />
        </div>
      </section>

      {/* WELCOME / ABOUT */}
      <section className="px-6 md:px-[8vw] py-24 md:py-32" style={{ backgroundColor: '#F5F3EF' }}>
        <div className="max-w-4xl mx-auto text-center" data-animate>
          <h2
            className="headline-mixed"
            style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', lineHeight: 1.25 }}
          >
            Bienvenue chez <em>Metal360,</em> où notre métier de métallier est bien plus qu'une simple fabrication, c'est une <em>expérience complète</em> de bout en bout.
          </h2>
        </div>

        {/* Photo grid */}
        <div className="max-w-6xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-3">
          {GRID_IMAGES.slice(0, 8).map((src, i) => (
            <div
              key={i}
              className="grid-img overflow-hidden"
              style={{
                borderRadius: 4,
                aspectRatio: i % 3 === 0 ? '3 / 4' : '4 / 5',
              }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* REALISATIONS */}
      <section className="px-6 md:px-[8vw] py-24" style={{ backgroundColor: '#F5F3EF' }}>
        <div data-animate className="max-w-7xl mx-auto">
          <div className="eyebrow">Réalisations</div>
          <h2
            className="headline-mixed mt-4"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            Nos dernières <em>créations</em>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.slice(0, 4).map((p) => (
            <ProjectCard key={p.id} project={p} height="60vh" />
          ))}
        </div>

        <div className="text-center mt-12">
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
      <section className="px-6 md:px-[8vw] py-24" style={{ backgroundColor: '#F5F3EF' }}>
        <div data-animate className="max-w-7xl mx-auto">
          <div className="eyebrow">Notre équipe</div>
          <h2
            className="headline-mixed mt-4"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
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
          <div className="relative" style={{ height: '60vh' }}>
            <img
              src={TEAM_PHOTO}
              alt="L'équipe Metal360"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute bottom-8 right-8 inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-4 py-2 text-[12px]" style={{ letterSpacing: '0.08em', borderRadius: 2 }}>
              Découvrir l'équipe <ArrowRight size={14} strokeWidth={1.5} />
            </div>
          </div>
        </Link>
        <p
          className="max-w-2xl mt-10"
          style={{ color: '#3D3D3D', fontSize: 18, lineHeight: 1.8 }}
          data-animate
        >
          Passionnés par le travail du métal, nos artisans métalliers conjuguent expertise traditionnelle et savoir-faire contemporain. Chaque projet est pensé, dessiné et façonné dans notre atelier en Maine-et-Loire.
        </p>
      </section>

      <Testimonials />

      <ContactBlock />
    </main>
  );
}
