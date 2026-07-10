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

export default function IndustriesWeServe({ reduced }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const canvasStateRef = useRef({ ctx: null, w: 0, h: 0 });
  const progressRef = useRef(0);
  const lastFrameRef = useRef(-1);
  const [sequenceReady, setSequenceReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const scrollRoomVh = sequenceScrollRoomVh();

  useEffect(() => {
    let cancelled = false;
    preloadLiveImages((i) => {
      if (!cancelled) setLoadProgress(Math.round(((i + 1) / LIVE_IMAGE_FRAME_COUNT) * 100));
    }).then((images) => {
      if (cancelled) return;
      imagesRef.current = images;
      setSequenceReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!sequenceReady || reduced) return undefined;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!section || !viewport || !canvas) return undefined;

    const scroller = document.documentElement;

    const paint = () => {
      const { ctx, w, h } = canvasStateRef.current;
      if (!ctx || !imagesRef.current.length) return;

      const floatFrame = scrollProgressToFrameFloat(progressRef.current);
      const frameIdx = Math.floor(floatFrame + 1e-5);
      if (frameIdx === lastFrameRef.current) return;
      lastFrameRef.current = frameIdx;

      drawSequenceFrame(ctx, imagesRef.current, floatFrame, w, h);
    };

    const syncCanvas = () => {
      canvasStateRef.current = setupSequenceCanvas(canvas, viewport);
      lastFrameRef.current = -1;
      paint();
    };

    syncCanvas();

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
          scrub: true,
          pinSpacing: false,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    const tick = () => {
      progressRef.current = playhead.progress;
      paint();
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
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [sequenceReady, reduced]);

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
      className="ind-sequence-track"
      data-chapter="02"
    >
      <div ref={viewportRef} className="ind-sequence-viewport">
        <canvas ref={canvasRef} className="ind-sequence-canvas" aria-hidden />

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
              <span className="text-[10px] font-body uppercase tracking-[0.28em] text-white/70">
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
