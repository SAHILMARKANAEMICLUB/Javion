import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TEAM_PHOTO, FOUNDER, MARQUEE_IMAGES_ROW1, MARQUEE_IMAGES_ROW2 } from '../mock';
import PhotoMarquee from '../components/PhotoMarquee';
import ContactBlock from '../components/ContactBlock';

gsap.registerPlugin(ScrollTrigger);

export default function Equipe() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.eq-h1 .word', {
        y: 50, opacity: 0, rotateX: -15,
        duration: 0.8, ease: 'power3.out', stagger: 0.06, delay: 0.2,
      });
      gsap.utils.toArray('[data-animate]').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main style={{ backgroundColor: '#0A0A0A' }}>
      {/* Hero text */}
      <section className="px-6 md:px-[8vw] pt-36 md:pt-44 pb-20">
        <div className="max-w-5xl">
          <div className="eyebrow">Notre équipe</div>
          <h1
            className="eq-h1 headline-mixed mt-5"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.15 }}
          >
            <span className="word inline-block">Nous sommes des&nbsp;</span>
            <em className="word inline-block">artisans</em>{' '}
            <em className="word inline-block">passionnés</em>{' '}
            <span className="word inline-block">par les métaux,&nbsp;</span>
            <em className="word inline-block">dévoués à chaque projet</em>{' '}
            <span className="word inline-block">comme une&nbsp;</span>
            <em className="word inline-block">œuvre d'art.</em>
          </h1>
        </div>
      </section>

      {/* Team photo */}
      <section className="px-6 md:px-[8vw] pb-24" data-animate>
        <div className="max-w-7xl mx-auto overflow-hidden" style={{ borderRadius: 6, height: '55vh' }}>
          <img src={TEAM_PHOTO} alt="L'équipe Metal360" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* History */}
      <section className="px-6 md:px-[8vw] py-20" data-animate>
        <div className="max-w-4xl">
          <div className="eyebrow">Notre histoire</div>
          <h2 className="headline-mixed mt-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Notre <em>histoire</em>
          </h2>
          <p className="mt-8" style={{ color: '#C9C4BC', fontSize: 18, lineHeight: 1.85, maxWidth: 680 }}>
            Fondé sur une exigence simple — celle du geste juste — Metal360 réunit aujourd'hui une équipe d'artisans
            métalliers formés aux techniques traditionnelles comme aux outils numériques les plus récents. De la
            conception au montage, chaque étape est pensée comme un acte d'auteur.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="px-6 md:px-[8vw] py-20" data-animate>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 overflow-hidden" style={{ borderRadius: 6 }}>
            <img src={FOUNDER.photo} alt={FOUNDER.name} className="w-full object-cover" style={{ height: 540 }} />
          </div>
          <div className="md:col-span-7">
            <div className="eyebrow">Fondateur</div>
            <h3 className="headline-mixed mt-3" style={{ fontSize: 'clamp(28px, 3.6vw, 44px)' }}>
              <em>{FOUNDER.name}</em>
            </h3>
            <div className="mt-2 italic text-[15px]" style={{ color: '#88847C' }}>{FOUNDER.role}</div>
            <p className="mt-6" style={{ color: '#C9C4BC', fontSize: 17, lineHeight: 1.85 }}>
              {FOUNDER.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Photo marquees */}
      <section className="py-20" data-animate>
        <div className="eyebrow px-6 md:px-[8vw] mb-8">L'atelier en images</div>
        <div className="flex flex-col gap-3">
          <PhotoMarquee images={MARQUEE_IMAGES_ROW1} direction="left" height={240} />
          <PhotoMarquee images={MARQUEE_IMAGES_ROW2} direction="right" height={240} />
        </div>
      </section>

      <ContactBlock />
    </main>
  );
}
