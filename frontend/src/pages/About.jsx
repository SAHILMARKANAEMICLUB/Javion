import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { ABOUT_STORY, onCinematicImgError } from '../mock';
import { headlineBlurIn } from '../utils/cinematicAnimations';
import useReducedMotion from '../hooks/useReducedMotion';
import ProductsNav from '../components/ProductsNav';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../seo/site';
import { aboutPageJsonLd, GEO_ENTITY_DEFINITION, GEO_STATS } from '../seo/geo';
import './Cinematic.css';
import './Products.css';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const rootRef = useRef(null);
  const gallerySectionRef = useRef(null);
  const galleryTrackRef = useRef(null);
  const reduced = useReducedMotion();
  const story = ABOUT_STORY;

  useEffect(() => {
    document.body.style.background = '#f4f6f8';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      headlineBlurIn('.about-headline', {
        reduced,
        scrollTrigger: { trigger: '.about-hero', start: 'top 80%' },
        y: 28,
        blur: 14,
      });

      gsap.from('.about-reveal', {
        opacity: 0,
        y: 28,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-hero', start: 'top 78%' },
      });

      const facility = root.querySelector('.about-facility');
      if (facility) {
        if (reduced) {
          gsap.set(facility, { clearProps: 'all' });
        } else {
          gsap.fromTo(
            facility,
            { y: 80, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: facility,
                start: 'top 88%',
                once: true,
              },
            }
          );
          gsap.fromTo(
            facility.querySelector('img'),
            { yPercent: 12, scale: 1.08 },
            {
              yPercent: 0,
              scale: 1,
              duration: 1.35,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: facility,
                start: 'top 88%',
                once: true,
              },
            }
          );
        }
      }

      const timelineWrap = root.querySelector('.about-timeline-wrap');
      const progress = root.querySelector('.about-timeline-rail-progress');
      const items = gsap.utils.toArray('.about-timeline-item');

      if (timelineWrap && progress && items.length) {
        gsap.set(progress, { scaleY: 0, transformOrigin: 'top center' });

        if (!reduced) {
          gsap.to(progress, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineWrap,
              start: 'top 65%',
              end: 'bottom 35%',
              scrub: true,
            },
          });
        } else {
          gsap.set(progress, { scaleY: 1 });
        }

        items.forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            x: reduced ? 0 : 28,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          });

          ScrollTrigger.create({
            trigger: el,
            start: 'top 70%',
            end: 'bottom 40%',
            onEnter: () => el.classList.add('is-active'),
            onEnterBack: () => el.classList.add('is-active'),
            onLeave: () => el.classList.remove('is-active'),
            onLeaveBack: () => el.classList.remove('is-active'),
          });
        });
      }

      const section = gallerySectionRef.current;
      const track = galleryTrackRef.current;
      if (section && track && !reduced) {
        const getTravel = () => Math.max(0, track.scrollWidth - section.clientWidth);

        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => -getTravel(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="cinematic-page products-page about-page">
      <Seo {...PAGE_SEO.about} jsonLd={[aboutPageJsonLd()]} />
      <div className="prod-bg pointer-events-none" aria-hidden>
        <div className="prod-bg-base" />
        <div className="prod-bg-patch prod-bg-patch--cyan" />
        <div className="prod-bg-patch prod-bg-patch--navy" />
        <div className="prod-bg-grid cin-grid-bg" />
      </div>

      <ProductsNav active="about" />

      <section className="about-hero relative z-[1] px-8 md:px-16 pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="cin-eyebrow about-reveal">{story.eyebrow}</div>
        <h1
          className="about-headline font-display mt-4 cin-heading max-w-4xl"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
          }}
        >
          {story.headline}{' '}
          <span className="cin-gradient-text">{story.headlineAccent}</span>
        </h1>
        <p
          className="about-reveal mt-4 font-body text-[15px] max-w-2xl"
          style={{ color: 'var(--cin-text-muted)' }}
        >
          {story.intro}
        </p>
        <p
          className="geo-entity-definition about-reveal mt-5 font-body text-[14px] max-w-2xl leading-relaxed"
          style={{ color: 'var(--cin-navy)' }}
        >
          {GEO_ENTITY_DEFINITION}
        </p>
        <p className="about-reveal mt-3 font-body text-[12px] uppercase tracking-[0.18em]" style={{ color: 'var(--cin-text-light)' }}>
          Based in {story.location}
        </p>
      </section>

      <section className="relative z-[1] border-y border-[var(--cin-border-light)]" aria-label="Company at a glance">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {GEO_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`about-reveal about-stat px-8 md:px-10 py-8 md:py-10 ${
                idx % 2 === 0 ? 'border-r border-[var(--cin-border-light)]' : ''
              } ${idx < 2 ? 'border-b lg:border-b-0 border-[var(--cin-border-light)]' : ''} ${
                idx === 2 ? 'lg:border-r border-[var(--cin-border-light)]' : ''
              }`}
            >
              <div className="font-display about-stat-value cin-gradient-text">{stat.value}</div>
              <div className="cin-eyebrow mt-3" style={{ color: 'var(--cin-text-light)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-[1] px-8 md:px-16 py-14 md:py-20">
        <div className="cin-eyebrow about-reveal">Mission</div>
        <div className="about-mission-row about-reveal mt-4">
          <h2
            className="font-display cin-heading about-mission-headline"
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}
          >
            Hardware you can <span className="cin-gradient-text">specify</span> with confidence.
          </h2>
          <p className="about-mission-copy font-body text-[15px] leading-relaxed" style={{ color: 'var(--cin-text-muted)' }}>
            {story.mission}
          </p>
        </div>
      </section>

      <section className="relative z-[1] px-8 md:px-16 pb-14 md:pb-20" aria-label="Our facility">
        <div className="about-facility overflow-hidden">
          <img
            src={story.facility.src}
            alt={story.facility.alt}
            loading="lazy"
            onError={onCinematicImgError}
          />
        </div>
        <p className="about-reveal mt-4 font-body text-[12px] uppercase tracking-[0.18em]" style={{ color: 'var(--cin-text-light)' }}>
          Our plant · {story.location}
        </p>
      </section>

      <section className="relative z-[1] border-y border-[var(--cin-border-light)]">
        <div className="px-8 md:px-16 pt-12 md:pt-16 pb-4">
          <div className="cin-eyebrow about-reveal">Timeline</div>
          <h2
            className="font-display mt-4 cin-heading about-reveal"
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}
          >
            How we <span className="cin-gradient-text">got here</span>
          </h2>
        </div>

        <div className="about-timeline-wrap px-8 md:px-16 pb-12 md:pb-16">
          <div className="about-timeline-rail" aria-hidden>
            <div className="about-timeline-rail-track" />
            <div className="about-timeline-rail-progress" />
          </div>

          <div className="about-timeline">
            {story.timeline.map((item) => (
              <article key={item.year} className="about-timeline-item">
                <div className="about-timeline-dot" aria-hidden>
                  <span />
                </div>
                <div className="about-timeline-grid">
                  <div className="cin-eyebrow about-timeline-year">{item.year}</div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl cin-heading">{item.title}</h3>
                    <p className="mt-3 font-body text-[14px] leading-relaxed max-w-2xl" style={{ color: 'var(--cin-text-muted)' }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-[1] px-8 md:px-16 py-14 md:py-20">
        <div className="cin-eyebrow about-reveal">What we stand for</div>
        <h2
          className="font-display mt-4 cin-heading about-reveal max-w-3xl"
          style={{
            fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          Values that show up on the <span className="cin-gradient-text">shop floor</span>
        </h2>
        <div className="about-values grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-8">
          {story.values.map((value) => (
            <div key={value.title} className="about-reveal about-value-card docs-card-face">
              <h3 className="font-display text-lg cin-heading">{value.title}</h3>
              <p className="mt-3 font-body text-[13px] leading-relaxed" style={{ color: 'var(--cin-text-muted)' }}>
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={gallerySectionRef}
        className="relative z-[1] about-gallery-section border-y border-[var(--cin-border-light)]"
        aria-label="Photo gallery"
      >
        <div className="about-gallery-marquee">
          <div ref={galleryTrackRef} className="about-gallery-track">
            {[...story.gallery, ...story.gallery].map((shot, i) => (
              <div key={`${shot.alt}-${i}`} className="about-gallery-item">
                <img src={shot.src} alt={shot.alt} loading="lazy" onError={onCinematicImgError} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-[1] px-8 md:px-16 pb-16 md:pb-24 pt-10">
        <div className="prod-finale border border-[var(--cin-border-light)] rounded-[20px] px-8 md:px-12 py-10 md:py-12">
          <div className="cin-eyebrow">Next step</div>
          <h2
            className="font-display mt-4 cin-heading max-w-3xl"
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            See the range — or <span className="cin-gradient-text">talk to us</span>.
          </h2>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/products"
              className="cin-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase"
            >
              Products <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact"
              className="cin-btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase rounded-full"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-[1] pb-10 text-center">
        <p className="text-[10px] font-body uppercase tracking-[0.28em]" style={{ color: 'var(--cin-text-light)' }}>
          Javion Fasteners · Precision Manufacturing · ISO-Grade
        </p>
      </footer>
    </div>
  );
}
