import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CINEMATIC_IMG, HERO_COLLAGE_IMAGES, onCinematicImgError } from '../mock';
import useReducedMotion from '../hooks/useReducedMotion';
import useCinematicScroll from '../hooks/useCinematicScroll';
import ProductsNav from '../components/ProductsNav';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../seo/site';
import { homePageJsonLd, GEO_ENTITY_DEFINITION } from '../seo/geo';
import CertificationsQuality from '../components/cinematic/CertificationsQuality';
import IndustriesWeServe from '../components/cinematic/IndustriesWeServe';
import DocumentsResources from '../components/cinematic/DocumentsResources';
import GlobalFeatures from '../components/GlobalFeatures';
import { headlineBlurIn } from '../utils/cinematicAnimations';
import blueprintFooter from '../assets/blueprint-footer-navy.png';
import './Cinematic.css';

gsap.registerPlugin(ScrollTrigger);

const THEME = {
  bg: '#f4f6f8',
  bgWhite: '#ffffff',
  bgAlt: '#e8ecf0',
  text: '#0A1D37',
  textMuted: 'rgba(10,29,55,0.65)',
  textLight: 'rgba(10,29,55,0.45)',
  navy: '#0A1D37',
  navyMid: '#1e4976',
  accent: '#38B6FF',
  accentDark: '#0095D9',
};

const TEXT_3D = {
  textShadow: '0 1px 0 rgba(255,255,255,0.9), 0 2px 16px rgba(15,23,42,0.08)',
};

const CDN = 'https://cdn.prod.website-files.com/64e31036eccea9001058bfc8';
const CDN2 = 'https://cdn.prod.website-files.com/64e85c16c3e5fe1806b372fc';

const IMG = {
  ...CINEMATIC_IMG,
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
};

const TEXT_3D_ON_MEDIA = {
  textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.25)',
};

function useTilt(max = 8, glow = false) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(24px)`;
      if (glow) {
        el.style.boxShadow = `${-x * 24}px ${y * 24}px 40px rgba(56,182,255,0.35), inset ${x * 8}px ${-y * 8}px 20px rgba(56,182,255,0.1)`;
      }
    };
    const onLeave = () => {
      el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
      if (glow) el.style.boxShadow = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [max, glow]);
  return ref;
}

function updateCoverflow(track, stageEl) {
  if (!track) return;
  const panels = track.querySelectorAll('.h-panel');
  const stage = stageEl || track.closest('.process-act-stage');
  const stageRect = stage?.getBoundingClientRect();
  const center = stageRect
    ? stageRect.left + stageRect.width / 2
    : window.innerWidth / 2;
  const span = stageRect?.width ?? window.innerWidth;
  const isMobile = span < 768;
  const rotScale = isMobile ? 22 : 38;
  const opacityFalloff = isMobile ? 0.65 : 0.9;

  panels.forEach((panel) => {
    const rect = panel.getBoundingClientRect();
    const panelCenter = rect.left + rect.width / 2;
    const dist = (panelCenter - center) / span;
    const rotY = dist * -rotScale;
    const z = 80 - Math.abs(dist) * 120;
    const opacity = 1 - Math.min(Math.abs(dist) * opacityFalloff, isMobile ? 0.35 : 0.55);
    const scale = 1 - Math.min(Math.abs(dist) * 0.12, isMobile ? 0.06 : 0.1);
    panel.style.transform = `rotateY(${rotY}deg) translateZ(${z}px) scale(${scale})`;
    panel.style.opacity = String(opacity);
  });
}

/** Horizontal travel so the last process card centers in the stage (not raw window). */
function getProcessScrollDistance(track, wrap) {
  const panels = track.querySelectorAll('.h-panel');
  if (!panels.length) return 0;

  const stage = wrap.querySelector('.process-act-stage');
  const viewportW = stage?.clientWidth ?? window.innerWidth;
  const viewportCenter = viewportW / 2;
  const last = panels[panels.length - 1];
  const trackX = Number(gsap.getProperty(track, 'x')) || 0;
  const trackRect = track.getBoundingClientRect();
  const lastRect = last.getBoundingClientRect();
  const lastCenterInTrack =
    lastRect.left - trackRect.left - trackX + lastRect.width / 2;

  return Math.max(0, lastCenterInTrack - viewportCenter);
}

function processActScrollLength(track, wrap) {
  const travel = getProcessScrollDistance(track, wrap);
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const minScroll = window.innerHeight * (isMobile ? 0.85 : 0.5);
  return Math.max(travel * (isMobile ? 1.25 : 1.05), minScroll);
}

/* ============== SCENE 1: FACTORY SHOWCASE COLLAGE (HERO) ============== */
/* Landscape blueprint PNGs — wider tiles so object-contain shows the full drawing */
const SCATTER_LAYOUT = [
  { alt: 'Hex head bolt — engineering drawing',           l: 2,  t: 6,   w: 32, h: 24, z: -200, rotY: 12,  rotX: -4,  curve: -18 },
  { alt: 'Fastener technical schematic',                  l: 34, t: 4,   w: 22, h: 26, z: -120, rotY: -8,  rotX: 3,   curve: -10 },
  { alt: 'Precision bolt blueprint',                      l: 56, t: 8,   w: 22, h: 24, z: -60,  rotY: 6,   rotX: -2,  curve: 0 },
  { alt: 'Threaded fastener drawing',                     l: 78, t: 6,   w: 20, h: 26, z: 80,   rotY: -14, rotX: 5,   curve: 10 },
  { alt: 'Hex head and socket cap screw drawings',        l: 3,  t: 34,  w: 34, h: 32, z: 40,   rotY: 10,  rotX: -6,  curve: -14 },
  { alt: 'Industrial fastener specification',             l: 38, t: 38,  w: 22, h: 28, z: -150, rotY: -5,  rotX: 4,   curve: -6 },
  { alt: 'Mechanical fastener detail',                    l: 62, t: 40,  w: 20, h: 26, z: 100,  rotY: 8,   rotX: -3,  curve: 14 },
  { alt: 'Fastener family — technical overview',          l: 8,  t: 66,  w: 84, h: 28, z: 150,  rotY: -6,  rotX: 2,   curve: 12 },
];

/*
 * Mobile grid — top/bottom bands hug a ~34–52% text band (no huge vertical gap).
 * Tile 8 spans full width on the bottom row.
 */
const SCATTER_LAYOUT_MOBILE = [
  { alt: 'Hex head bolt — engineering drawing',           l: 1.5, t: 8,   w: 48, h: 12, z: -60,  rotY: 2,  rotX: 0,  curve: -3 },
  { alt: 'Fastener technical schematic',                  l: 50.5, t: 8,   w: 48, h: 12, z: -50,  rotY: -2, rotX: 0,  curve: -2 },
  { alt: 'Precision bolt blueprint',                      l: 1.5, t: 20,  w: 48, h: 12, z: -40,  rotY: 2,  rotX: 0,  curve: 0 },
  { alt: 'Threaded fastener drawing',                     l: 50.5, t: 20,  w: 48, h: 12, z: 35,   rotY: -2, rotX: 0,  curve: 2 },
  { alt: 'Hex head and socket cap screw drawings',        l: 1.5, t: 52,  w: 48, h: 11, z: 30,   rotY: 2,  rotX: 0,  curve: -2 },
  { alt: 'Industrial fastener specification',             l: 50.5, t: 52,  w: 48, h: 11, z: -45, rotY: -2, rotX: 0,  curve: -2 },
  { alt: 'Mechanical fastener detail',                    l: 1.5, t: 63,  w: 48, h: 10, z: 45,   rotY: 2,  rotX: 0,  curve: 2 },
  { alt: 'Fastener family — technical overview',          l: 3,   t: 73,  w: 94, h: 10, z: 55,   rotY: 0,  rotX: 0,  curve: 0 },
];

function scatterTilesFromLayout(layout) {
  return layout.map((tile, i) => ({
    ...tile,
    src: HERO_COLLAGE_IMAGES[i] || CINEMATIC_IMG.factoryFloor,
  }));
}

function applyTileParallax(section, mouse) {
  if (!section) return;
  section.querySelectorAll('[data-tile-index]').forEach((el) => {
    const z = Number(el.dataset.tileZ) || 0;
    const px = -mouse.x * (Math.abs(z) / 50);
    const py = -mouse.y * (Math.abs(z) / 50);
    el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
  });
}

function buildScatterTimeline(scatter, layout, {
  scrollEnd = '+=600%',
  tunnelZoom = 2.35,
  tunnelHoldScale = 1.35,
  textZoomScale = 5.5,
  curveMult = 1,
} = {}) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scatter,
      start: 'top top',
      end: scrollEnd,
      pin: true,
      pinSpacing: true,
      scrub: 0.55,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo('.tile',
    {
      xPercent: -50,
      yPercent: -50,
      left: '50%',
      top: '50%',
      width: '8%',
      height: '8%',
      scale: 0.35,
      opacity: 0,
    },
    {
      xPercent: 0,
      yPercent: 0,
      left:   (i) => `${layout[i].l}%`,
      top:    (i) => `${layout[i].t}%`,
      width:  (i) => `${layout[i].w}%`,
      height: (i) => `${layout[i].h}%`,
      scale: 1,
      opacity: 1,
      ease: 'power2.out',
      stagger: 0.02,
      duration: 0.52,
    },
    0
  );

  tl.fromTo('.tile-3d',
    { rotateY: 0, rotateX: 0, z: -300 },
    {
      rotateY: (i) => layout[i].rotY,
      rotateX: (i) => layout[i].rotX,
      z: (i) => layout[i].z,
      ease: 'power2.out',
      stagger: 0.02,
      duration: 0.52,
    },
    0
  );

  tl.from('.ornament', { y: -20, opacity: 0, duration: 0.3, ease: 'power2.out' }, 0.1);

  const zoomStart = 0.3;
  const zoomHold = 0.95;
  const zoomExit = 0.14;
  const textZoomExit = 0.38;

  tl.to('.tunnel-wrap', {
    rotateY: 14,
    scale: tunnelHoldScale,
    z: 48,
    ease: 'none',
    duration: zoomHold,
  }, zoomStart);

  tl.to('.scatter-text', {
    scale: 1.06,
    opacity: 1,
    y: 0,
    ease: 'none',
    duration: zoomHold,
  }, zoomStart);

  tl.to('.tile', {
    scale: 1.06,
    opacity: 0.92,
    ease: 'none',
    duration: zoomHold,
  }, zoomStart);

  tl.to('.tile-3d', {
    rotateY: (i) => layout[i].rotY + layout[i].curve * 0.45 * curveMult,
    rotateX: (i) => layout[i].rotX * 0.55,
    z: (i) => layout[i].z + 60,
    ease: 'none',
    duration: zoomHold,
  }, zoomStart);

  const zoomFinish = zoomStart + zoomHold;

  tl.to('.tunnel-wrap', {
    rotateY: 34,
    scale: tunnelZoom,
    z: 180,
    ease: 'power4.in',
    duration: zoomExit,
  }, zoomFinish);

  tl.to('.scatter-text', {
    scale: textZoomScale,
    opacity: 0,
    y: -40,
    ease: 'power3.inOut',
    duration: textZoomExit,
  }, zoomFinish);

  tl.to('.tile', {
    scale: 1.45,
    opacity: 0,
    ease: 'power4.in',
    duration: zoomExit,
  }, zoomFinish);

  tl.to('.tile-3d', {
    rotateY: (i) => layout[i].rotY + layout[i].curve * 2.2 * curveMult,
    rotateX: (i) => layout[i].rotX * 1.4,
    z: (i) => layout[i].z + 320,
    ease: 'power4.in',
    duration: zoomExit,
  }, zoomFinish);

  return tl;
}

function ScatterCollage({ reduced }) {
  const sectionRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobileLayout, setIsMobileLayout] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  const [finePointer, setFinePointer] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  const activeLayout = isMobileLayout ? SCATTER_LAYOUT_MOBILE : SCATTER_LAYOUT;
  const scatterTiles = useMemo(() => scatterTilesFromLayout(activeLayout), [activeLayout]);

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 767px)');
    const pointerMq = window.matchMedia('(pointer: fine)');
    const onMobile = () => setIsMobileLayout(mobileMq.matches);
    const onPointer = () => setFinePointer(pointerMq.matches);
    onMobile();
    onPointer();
    mobileMq.addEventListener('change', onMobile);
    pointerMq.addEventListener('change', onPointer);
    return () => {
      mobileMq.removeEventListener('change', onMobile);
      pointerMq.removeEventListener('change', onPointer);
    };
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [isMobileLayout, reduced]);

  const onMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
    applyTileParallax(sectionRef.current, mouseRef.current);
  }, []);

  useEffect(() => {
    const scatter = sectionRef.current;
    if (!scatter) return undefined;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.from('.tile', {
          opacity: 0, y: 40, stagger: 0.06, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: scatter, start: 'top 75%' },
        });
        return;
      }

      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          buildScatterTimeline(scatter, SCATTER_LAYOUT, {
            scrollEnd: '+=600%',
            tunnelZoom: 2.35,
            tunnelHoldScale: 1.35,
            textZoomScale: 5.5,
            curveMult: 1,
          });
        },
        '(max-width: 767px)': () => {
          buildScatterTimeline(scatter, SCATTER_LAYOUT_MOBILE, {
            scrollEnd: '+=400%',
            tunnelZoom: 1.65,
            tunnelHoldScale: 1.12,
            textZoomScale: 3.2,
            curveMult: 0.35,
          });
        },
      });
    }, scatter);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="scatter"
      className="ov-section scatter-section relative w-full overflow-hidden cin-section-flow"
      style={{ perspective: '1200px' }}
      onMouseMove={finePointer ? onMouseMove : undefined}
      data-chapter="01"
    >
      <div className="scatter-bg pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="scatter-bg-base" />
        <div className="scatter-bg-patch scatter-bg-patch--cyan" />
        <div className="scatter-bg-patch scatter-bg-patch--navy" />
        <div className="scatter-bg-patch scatter-bg-patch--steel" />
        <div className="scatter-bg-patch scatter-bg-patch--warm" />
        <div className="scatter-bg-vignette" />
        <div className="scatter-bg-grain" />
      </div>
      <div className="tunnel-wrap absolute inset-0 z-[1]" style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 50%' }}>
        {scatterTiles.map((tile, i) => (
          <div
            key={i}
            className="tile scatter-tile absolute"
            style={{
              willChange: 'left, top, width, height, filter, opacity',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="tile-3d scatter-tile-3d w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              <div
                className="tile-parallax relative w-full h-full flex items-center justify-center"
                data-tile-index={i}
                data-tile-z={tile.z}
              >
                <img
                  src={tile.src}
                  alt={tile.alt || 'Fastener blueprint'}
                  className="scatter-hero-img max-w-full max-h-full w-full h-full"
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={i === 0 ? 'high' : undefined}
                  onError={onCinematicImgError}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="scatter-copy-wrap relative h-full w-full flex flex-col items-center justify-center pointer-events-none z-[2]" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="scatter-text text-center"
          style={{
            color: THEME.text,
            willChange: 'transform, opacity, filter',
            transformOrigin: '50% 50%',
          }}
        >
          <div className="cin-eyebrow scatter-eyebrow mb-4">Engineering &amp; precision</div>
          <h2 className="scatter-text-lede hero-headline font-body">
            Technical drawings and fastener specifications from{' '}
            <em className="cin-gradient-text italic" style={{ fontWeight: 700 }}>Javion Fasteners</em>
            {' '}— engineered at our G.I.D.C Waghodia, Vadodara plant before every bolt hits the line.
          </h2>
        </div>
      </div>

      <div className="scatter-blend-bottom absolute inset-x-0 bottom-0 z-[3] pointer-events-none" aria-hidden />
    </section>
  );
}

/* ============== SCENE 4: 3D HORIZONTAL CAROUSEL ============== */
const PROCESS_PANELS = [
  {
    n: '01',
    t: 'Design & Spec',
    d: 'Drawings, tolerances, and material grades locked before a single bar hits the line.',
    img: '/images/process/design-spec-blueprint.jpg',
    imgPosition: '50% 42%',
    imgFilter: 'brightness(1.02) contrast(1.05) saturate(0.98)',
  },
  {
    n: '02',
    t: 'Cold Forming',
    d: 'Headers, threads, and shanks shaped on multi-stage cold headers and thread rollers.',
    img: '/images/process/cold-forming.jpg',
    imgPosition: '50% 42%',
    imgFilter: 'brightness(0.95) contrast(1.06) saturate(1.02)',
  },
  { n: '03', t: 'Heat Treat', d: 'Quench, temper, and case hardening to Grade 8.8, 10.9, and customer spec.', img: IMG.forge },
  { n: '04', t: 'QC & Testing', d: 'Dimensional checks, tensile tests, and coating verification on every batch.', img: IMG.qualityCheck },
  { n: '05', t: 'Pack & Ship', d: 'Bagged, labelled, and dispatched — traceable from furnace to your site.', img: IMG.warehouse },
];

function HorizontalAct({ reduced }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;

      const scroller = document.documentElement;

      if (reduced) {
        headlineBlurIn('.process-headline', {
          reduced,
          scrollTrigger: { trigger: wrap, scroller, start: 'top 75%' },
        });
        return;
      }

      headlineBlurIn('.process-headline', {
        reduced,
        scrollTrigger: { trigger: wrap, scroller, start: 'top top', end: 'top 70%' },
        y: 28,
        blur: 14,
      });

      const stage = wrap.querySelector('.process-act-stage');
      const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

      gsap.to(track, {
        x: () => -getProcessScrollDistance(track, wrap),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          scroller,
          start: 'top top',
          end: () => `+=${processActScrollLength(track, wrap)}`,
          pin: true,
          pinSpacing: true,
          scrub: isMobile() ? 0.65 : 1,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: () => updateCoverflow(track, stage),
          onRefresh: () => updateCoverflow(track, stage),
        },
      });

      requestAnimationFrame(() => {
        updateCoverflow(track, stage);
        ScrollTrigger.refresh();
      });
    }, wrapRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={wrapRef}
      id="process-act"
      className="process-act relative h-screen w-full overflow-hidden cin-section-flow"
      style={{ background: THEME.bg }}
      data-chapter="03"
    >
      <div className="process-act-header px-8 md:px-16">
        <div className="cin-eyebrow">ACT II — THE PROCESS</div>
        <h2
          className="process-headline font-display italic mt-2 cin-heading cin-text-shadow"
          style={{ fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.02em', ...TEXT_3D }}
        >
          From bar stock to bolt — five controlled steps.
        </h2>
      </div>

      <div className="process-act-stage">
        <div
          ref={trackRef}
          className="process-act-track h-full flex items-center pl-4 sm:pl-[6vw] md:pl-[8vw]"
          style={{ willChange: 'transform', perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {PROCESS_PANELS.map((p) => (
            <Panel3D key={p.n} panel={p} />
          ))}
          {/* End pad so Pack & Ship can scroll into viewport center */}
          <div className="process-act-end-pad shrink-0" aria-hidden />
        </div>
      </div>

      <div className="process-act-scroll-hint absolute bottom-8 right-8 z-20 text-[11px] flex items-center gap-3" style={{ color: THEME.textMuted, letterSpacing: '0.2em' }}>
        SCROLL <span className="inline-block h-[1px] w-10" style={{ background: `linear-gradient(90deg, transparent, ${THEME.accent})` }} />
      </div>
    </section>
  );
}

function Panel3D({ panel: p }) {
  const tiltRef = useTilt(8, true);

  return (
    <div className="h-panel shrink-0 mr-5 sm:mr-8 md:mr-14 flex flex-col justify-center" style={{ transformStyle: 'preserve-3d', opacity: 0.7 }}>
      <div
        ref={tiltRef}
        className="h-panel-inner relative overflow-hidden w-full h-full"
        style={{ borderRadius: 8, transformStyle: 'preserve-3d', boxShadow: '0 24px 60px -16px rgba(15,23,42,0.18), 0 0 0 1px rgba(15,23,42,0.06)' }}
      >
        <img
          src={p.img}
          alt={p.t}
          className="w-full h-full object-cover"
          style={{
            filter: p.imgFilter || 'brightness(0.88) contrast(1.05)',
            objectPosition: p.imgPosition || '50% 50%',
          }}
          loading="eager"
          decoding="async"
          onError={onCinematicImgError}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,29,55,0.15) 0%, rgba(10,29,55,0) 35%, rgba(10,29,55,0.75) 100%)' }} />
        <div className="absolute top-5 left-5 font-display italic cin-gradient-text" style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em' }}>
          {p.n}
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="font-display italic cin-on-media" style={{ fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', ...TEXT_3D_ON_MEDIA }}>
            {p.t}
          </div>
          <div className="mt-3 text-[13px] font-body" style={{ color: 'rgba(255,255,255,0.82)', maxWidth: 400, lineHeight: 1.55 }}>
            {p.d}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============== SCENE 5: COUNTERS ============== */
function Counters({ reduced }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const strip = ref.current?.querySelector('.cnt-stats-strip');
      if (!strip) return;

      headlineBlurIn('.cnt-title .cin-word', {
        reduced,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        rotateX: -18,
        stagger: 0.05,
        y: 36,
        blur: 14,
      });

      const nums = gsap.utils.toArray('.count', ref.current);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: strip,
          start: 'top 82%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      nums.forEach((el, i) => {
        const target = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const obj = { v: 0 };
        el.textContent = decimals > 0 ? '0.0' : '0';
        tl.to(
          obj,
          {
            v: target,
            duration: reduced ? 0.55 : 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = obj.v.toFixed(decimals);
            },
          },
          i * 0.18
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  const items = [
    { v: 24, suf: '+', l: 'years manufacturing' },
    { v: 1538, suf: '°C', l: 'heat treatment peak' },
    { v: 12, suf: 'M+', l: 'fasteners shipped yearly' },
    { v: 99.7, dec: 1, suf: '%', l: 'dimensional accuracy' },
  ];
  const t = 'Numbers that mean nothing without the hand.'.split(' ');

  return (
    <section ref={ref} className="cnt-interlude relative w-full overflow-hidden py-16 md:py-24 cin-section-soft-light cin-section-blend-top cin-section-blend-bottom">
      <div className="relative z-[1] px-8 md:px-16 pb-10 md:pb-14">
        <div className="cin-eyebrow">INTERLUDE</div>
        <h2
          className="cnt-title font-display italic mt-4 cin-heading max-w-5xl"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            ...TEXT_3D,
          }}
        >
          {t.map((word, i) => (
            <span key={i} className="cin-word inline-block mr-[0.28em]">
              {word}
            </span>
          ))}
        </h2>
      </div>

      <div className="cnt-stats-strip grid grid-cols-2 md:grid-cols-4 w-full">
        {items.map((it) => (
          <div key={it.l} className="cnt-stat-col px-6 md:px-10 lg:px-12 py-10 md:py-14">
            <div
              className="font-display italic"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                color: THEME.text,
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              <span className="count" style={TEXT_3D} data-target={it.v} data-decimals={it.dec || 0}>0</span>
              <span className="cin-gradient-text">{it.suf}</span>
            </div>
            <div
              className="mt-3 text-[11px] md:text-[12px] font-body"
              style={{ color: THEME.textMuted, letterSpacing: '0.16em', textTransform: 'uppercase' }}
            >
              {it.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============== SCENE 6: CLIP-PATH REVEAL ============== */
function ClipReveal({ reduced }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.clip-img',
        { clipPath: 'inset(40% 20% 40% 20% round 0px)', scale: reduced ? 1 : 1.15, rotateZ: reduced ? 0 : -1.5 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          scale: 1,
          rotateZ: 0,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.clip-wrap', start: 'top 75%', end: 'top 10%', scrub: reduced ? false : 1.2 },
        }
      );
      gsap.from('.clip-eyebrow', { opacity: 0, y: 20, filter: reduced ? 'blur(0px)' : 'blur(8px)', duration: 1, scrollTrigger: { trigger: '.clip-wrap', start: 'top 75%', once: true } });
      headlineBlurIn('.clip-title .cin-word', {
        reduced,
        scrollTrigger: { trigger: '.clip-wrap', start: 'top 70%' },
        rotateX: -15,
        stagger: 0.05,
        y: 30,
        blur: 14,
      });
      headlineBlurIn('.clip-media-line', {
        reduced,
        scrollTrigger: { trigger: '.clip-wrap', start: 'top 55%' },
        y: 24,
        blur: 12,
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  const t = 'And then —'.split(' ');

  return (
    <section className="clip-wrap relative overflow-hidden pt-24 pb-8 md:pb-12 px-6 cin-section-flow cin-section-blend-top">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <div className="clip-eyebrow cin-eyebrow">FINALE</div>
        <h2 className="clip-title font-display italic mt-4 cin-heading" style={{
          fontSize: 'clamp(40px, 6vw, 88px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.025em',
        }}>
          {t.map((word, i) => (
            <span key={i} className="cin-word inline-block mr-[0.25em]" style={TEXT_3D}>{word}</span>
          ))}
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-2">
        <div className="clip-img relative overflow-hidden cin-card" style={{ height: '70vh', borderRadius: 8, willChange: 'clip-path, transform' }}>
          <img src={IMG.griffon} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.92) contrast(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6) 100%)' }} />
          <div className="absolute bottom-8 left-8 right-8 text-center">
            <div className="clip-media-line font-display italic cin-on-media" style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.02em', ...TEXT_3D_ON_MEDIA }}>
              the metal remembers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== FINALE — page footer ============== */
function FinaleOutro({ reduced }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.finale-blueprint', { y: '70%', opacity: 0 });

      headlineBlurIn('.end-line .cin-word', {
        reduced,
        scrollTrigger: { trigger: '.end-line', start: 'top 80%' },
        rotateX: -18,
        stagger: 0.06,
        y: 40,
        blur: 16,
      });
      gsap.from('.finale-footer-meta', {
        opacity: 0,
        y: reduced ? 0 : 20,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.finale-brand-stage', start: 'top 92%', once: true },
      });

      if (reduced) {
        gsap.set('.finale-blueprint', { y: 0, opacity: 0.55 });
        gsap.set('.finale-brand-word', { y: 0, filter: 'none', opacity: 1 });
        return;
      }

      gsap.fromTo(
        '.finale-blueprint',
        { y: '70%', opacity: 0 },
        {
          y: '0%',
          opacity: 0.55,
          duration: 1.35,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.finale-brand-stage',
            start: 'top 95%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.finale-brand-word',
        { y: 90, filter: 'blur(22px)', opacity: 0.2 },
        {
          y: 0,
          filter: 'blur(0px)',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.finale-brand-stage',
            start: 'top 98%',
            end: 'bottom bottom',
            scrub: 1.1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const t = 'You bring the vision. We bring the fire.'.split(' ');
  const year = new Date().getFullYear();

  return (
    <footer
      ref={sectionRef}
      id="quote"
      className="finale-outro cin-page-footer relative w-full overflow-hidden text-center cin-section-soft-light cin-section-blend-top"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${THEME.bg} 0%, ${THEME.bgWhite} 18%, ${THEME.bg} 100%)`,
        }}
      />

      {/* Blueprint band — behind JAVION wordmark */}
      <div
        className="finale-blueprint pointer-events-none select-none absolute inset-x-0 bottom-0 z-[1]"
        aria-hidden="true"
      >
        <img
          src={blueprintFooter}
          alt=""
          loading="lazy"
          className="block w-full h-auto"
        />
      </div>

      <div className="relative z-[2]">
        <div className="overflow-hidden pt-16 md:pt-24 pb-0">
          <div className="finale-marquee flex" style={{ animation: 'cinema-marquee 24s linear infinite', willChange: 'transform' }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="font-display italic shrink-0 pr-12" style={{
                fontSize: 'clamp(80px, 13vw, 220px)', fontWeight: 400, color: 'rgba(26,35,50,0.06)', lineHeight: 1, letterSpacing: '-0.04em',
              }}>
                Precision · Torque · Precision · <span className="cin-gradient-text">Trusted</span> ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="px-8 md:px-16 pb-0 md:pb-2 pt-10 md:pt-14">
          <div className="cin-eyebrow">END CREDITS</div>
          <h2
            className="end-line font-display italic mt-6 cin-heading mx-auto max-w-5xl"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
            }}
          >
            {t.map((word, i) => (
              <span
                key={i}
                className="cin-word inline-block mr-[0.25em]"
                style={i !== t.length - 1 ? TEXT_3D : undefined}
              >
                {i === t.length - 1 ? <span className="cin-gradient-text">{word}</span> : word}
              </span>
            ))}
          </h2>

          <div className="finale-footer-brand relative z-[3] mt-12 md:mt-16">
            <div className="finale-footer-meta relative z-10 px-4 pb-6 md:pb-8">
              <p className="text-[10px] font-body uppercase tracking-[0.28em]" style={{ color: THEME.textLight }}>
                Javion Fasteners · Precision Manufacturing · ISO-Grade
              </p>
            </div>

            <div className="finale-brand-stage relative w-full overflow-hidden">
              <Link
                to="/"
                className="finale-brand-word block w-full text-center font-body uppercase will-change-transform"
                aria-label="Javion home"
                data-cursor
              >
                JAVION
              </Link>
              <p
                className="finale-footer-copy absolute left-0 right-0 z-10 text-center text-[11px] font-body pointer-events-none"
                style={{ color: THEME.textLight, bottom: 'clamp(0px, 2.5vh, 0px)' }}
              >
                © {year} Javion Fasteners. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cinema-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
      `}</style>
    </footer>
  );
}

/* ============== ROOT ============== */
export default function Cinematic() {
  const reduced = useReducedMotion();
  useCinematicScroll(!reduced);

  useEffect(() => {
    document.body.style.background = THEME.bg;
    document.documentElement.style.scrollBehavior = 'auto';
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(true), 1200);
    return () => {
      document.body.style.background = '';
      document.documentElement.style.scrollBehavior = '';
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <div className="cinematic-page" style={{ background: THEME.bg, color: THEME.text, cursor: 'auto' }}>
      <Seo
        {...PAGE_SEO.home}
        jsonLd={[homePageJsonLd()]}
      />
      <p className="geo-entity-definition sr-only">{GEO_ENTITY_DEFINITION}</p>
      <ProductsNav active="home" showProgress />
      <ScatterCollage reduced={reduced} />
      <IndustriesWeServe reduced={reduced} />
      <HorizontalAct reduced={reduced} />
      <Counters reduced={reduced} />
      <ClipReveal reduced={reduced} />
      <CertificationsQuality reduced={reduced} />
      <DocumentsResources reduced={reduced} />
      <FinaleOutro reduced={reduced} />
      <GlobalFeatures variant="cinematic" />
    </div>
  );
}
