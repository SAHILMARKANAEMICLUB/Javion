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
          <div className="eyebrow">The Studio</div>
          <h1
            className="eq-h1 headline-mixed mt-5"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.15 }}
          >
            <span className="word inline-block">We are&nbsp;</span>
            <em className="word inline-block">artisans</em>{' '}
            <em className="word inline-block">obsessed</em>{' '}
            <span className="word inline-block">with metal —&nbsp;</span>
            <em className="word inline-block">devoted to every project</em>{' '}
            <span className="word inline-block">as if it were&nbsp;</span>
            <em className="word inline-block">a work of art.</em>
          </h1>
        </div>
      </section>

      {/* Team photo */}
      <section className="px-6 md:px-[8vw] pb-24" data-animate>
        <div className="max-w-7xl mx-auto overflow-hidden" style={{ borderRadius: 6, height: '55vh' }}>
          <img src={TEAM_PHOTO} alt="The Metal360 studio" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* History */}
      <section className="px-6 md:px-[8vw] py-20" data-animate>
        <div className="max-w-4xl">
          <div className="eyebrow">Our story</div>
          <h2 className="headline-mixed mt-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            A studio built on <em>one stubborn idea.</em>
          </h2>
          <p className="mt-8" style={{ color: '#C9C4BC', fontSize: 18, lineHeight: 1.85, maxWidth: 680 }}>
            Metal360 began with a refusal — to treat metalwork as a commodity. From the first weld, the studio has been guided by a single instinct: every commission deserves to feel inevitable. From sketch to install, our artisans move with the same patience whether the piece is a private staircase or a public sculpture. Slow when it matters. Fast where it doesn&apos;t. Never rushed where it shows.
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
            <div className="eyebrow">Founder</div>
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
        <div className="eyebrow px-6 md:px-[8vw] mb-8">Inside the workshop</div>
        <div className="flex flex-col gap-3">
          <PhotoMarquee images={MARQUEE_IMAGES_ROW1} direction="left" height={240} />
          <PhotoMarquee images={MARQUEE_IMAGES_ROW2} direction="right" height={240} />
        </div>
      </section>

      <ContactBlock />
    </main>
  );
}
