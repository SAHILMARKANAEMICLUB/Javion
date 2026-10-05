import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  drawSequenceFrame,
  LIVE_IMAGE_FRAME_COUNT,
  liveImageSrc,
  preloadLiveImages,
  scrollProgressToFrameFloat,
  sequenceScrollRoomVh,
  setupSequenceCanvas,
} from '../../utils/liveImageSequence';

gsap.registerPlugin(ScrollTrigger);

const ASSEMBLY_PARTS = [
  'Hex Bolt',
  'Flat Washer',
  'Material / Joint',
  'Flat Washer',
  'Lock Washer',
  'Hex Nut',
];

export default function IndustriesWeServe({ reduced, showPartLabels = true }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const partLabelRefs = useRef([]);
  const imagesRef = useRef([]);
  const canvasStateRef = useRef({ ctx: null, w: 0, h: 0 });
  const progressRef = useRef(0);
  const lastFrameRef = useRef(-1);
  const activePartRef = useRef(-1);
  const lastProgressRef = useRef(0);
  const [sequenceReady, setSequenceReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollRoomVh, setScrollRoomVh] = useState(() => sequenceScrollRoomVh());

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => {
      setScrollRoomVh(
        sequenceScrollRoomVh(LIVE_IMAGE_FRAME_COUNT, mq.matches ? 2.35 : undefined)
      );
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let cancelled = false;
    let observer;

    const startPreload = () => {
      preloadLiveImages((i) => {
        if (!cancelled) setLoadProgress(Math.round(((i + 1) / LIVE_IMAGE_FRAME_COUNT) * 100));
      }).then((images) => {
        if (cancelled) return;
        imagesRef.current = images;
        setSequenceReady(true);
      });
    };

    if (typeof IntersectionObserver === 'undefined') {
      startPreload();
      return () => {
        cancelled = true;
      };
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer?.disconnect();
        startPreload();
      },
      { root: null, rootMargin: '120% 0px', threshold: 0 }
    );
    observer.observe(section);

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!sequenceReady || reduced) return undefined;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!section || !viewport || !canvas) return undefined;

    const scroller = document.documentElement;
    const partLabels = partLabelRefs.current.slice();

    const paint = () => {
      const { ctx, w, h } = canvasStateRef.current;
      if (!ctx || !imagesRef.current.length) return;

      const floatFrame = scrollProgressToFrameFloat(progressRef.current);
      const frameIdx = Math.floor(floatFrame + 1e-5);
      if (frameIdx === lastFrameRef.current) return;
      lastFrameRef.current = frameIdx;

      drawSequenceFrame(ctx, imagesRef.current, floatFrame, w, h, 'auto');
    };

    const hideAllPartLabels = (exceptIndex = -1) => {
      partLabels.forEach((el, i) => {
        if (!el || i === exceptIndex) return;
        gsap.set(el, {
          autoAlpha: 0,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
        });
      });
    };

    const partIndexForProgress = (progress) =>
      Math.min(
        ASSEMBLY_PARTS.length - 1,
        Math.floor(Math.max(0, Math.min(progress, 0.9999)) * ASSEMBLY_PARTS.length)
      );

    const showPartLabel = (index, { animate } = { animate: true }) => {
      if (index === activePartRef.current) return;

      gsap.killTweensOf(partLabels);
      hideAllPartLabels(index);

      const next = partLabels[index];
      if (!next) {
        activePartRef.current = index;
        return;
      }

      if (animate) {
        gsap.fromTo(
          next,
          { autoAlpha: 0, y: 12, scale: 0.94, filter: 'blur(10px)' },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.28,
            ease: 'power2.out',
            overwrite: 'auto',
          }
        );
      } else {
        gsap.set(next, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)' });
      }
      activePartRef.current = index;
    };

    const updatePartLabel = (progress, { fastScroll = false } = {}) => {
      showPartLabel(partIndexForProgress(progress), { animate: !fastScroll });
    };

    const syncCanvas = () => {
      canvasStateRef.current = setupSequenceCanvas(canvas, viewport);
      lastFrameRef.current = -1;
      paint();
    };

    syncCanvas();
    gsap.set(partLabels, { autoAlpha: 0 });
    activePartRef.current = -1;
    updatePartLabel(0);

    const playhead = { progress: 0 };

    const ctx = gsap.context(() => {
      gsap.to(playhead, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          scroller,
          start: 'top top',
          end: 'bottom bottom',
          pin: viewport,
          scrub: 0.35,
          pinSpacing: false,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    const tick = () => {
      const progress = playhead.progress;
      const jump = Math.abs(progress - lastProgressRef.current);
      lastProgressRef.current = progress;
      progressRef.current = progress;
      paint();
      updatePartLabel(progress, { fastScroll: jump > 0.022 });
    };
    gsap.ticker.add(tick);

    const onResize = () => {
      syncCanvas();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize, { passive: true });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(true), 200);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tick);
      gsap.killTweensOf(partLabels);
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [sequenceReady, reduced, scrollRoomVh]);

  if (reduced) {
    return (
      <section id="industries" className="industries-page py-16 px-6" data-chapter="02">
        <img
          src={liveImageSrc(0)}
          alt="Manufacturing sequence"
          className="w-full max-w-4xl mx-auto rounded-lg object-cover"
          style={{ maxHeight: 420 }}
        />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="ind-sequence-track ind-sequence-track--assembly"
      data-chapter="02"
    >
      <div ref={viewportRef} className="ind-sequence-viewport ind-sequence-viewport--assembly">
        <canvas ref={canvasRef} className="ind-sequence-canvas" aria-hidden />
        <div className="ind-sequence-edge ind-sequence-edge--top" aria-hidden />
        <div className="ind-sequence-edge ind-sequence-edge--bottom" aria-hidden />
        {showPartLabels && (
          <>
            <div className="ind-sequence-part-labels" aria-hidden>
              {ASSEMBLY_PARTS.map((part, index) => (
                <div
                  key={`${part}-${index}`}
                  ref={(element) => {
                    partLabelRefs.current[index] = element;
                  }}
                  className="ind-sequence-part-label"
                >
                  <span className="ind-sequence-part-name">{part}</span>
                </div>
              ))}
            </div>
            <span className="sr-only">Assembly sequence: {ASSEMBLY_PARTS.join(' to ')}</span>
          </>
        )}

        {!sequenceReady && (
          <div className="ind-sequence-loader absolute inset-0 z-10 flex flex-col items-center justify-center gap-4">
            <img
              src={liveImageSrc(0)}
              alt=""
              className="ind-sequence-placeholder absolute inset-0 w-full h-full object-cover opacity-40"
              aria-hidden
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="ind-sequence-loader-bar">
                <div className="ind-sequence-loader-fill" style={{ width: `${loadProgress}%` }} />
              </div>
              <span
                className="text-[10px] font-body uppercase tracking-[0.28em]"
                style={{ color: 'var(--cin-text-muted)' }}
              >
                Loading sequence {loadProgress}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Scroll room — height sets how much scroll scrubs through all frames */}
      <div
        className="ind-sequence-scroll-room"
        style={{ height: `${scrollRoomVh}vh` }}
        aria-hidden
      />
    </section>
  );
}
