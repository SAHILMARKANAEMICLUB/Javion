import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned section: scroll position scrubs video currentTime (play while scrolling, still when not).
 * Put MP4 in `public/` e.g. `/videos/assembly.mp4`.
 */
export default function ScrollScrubVideo({
  src,
  poster,
  scrollRoomVh = 168,
  reduced,
  className = 'ind-sequence-track',
  id = 'industries',
}) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const onMeta = () => setReady(true);
    video.addEventListener('loadedmetadata', onMeta);
    if (video.readyState >= 1) setReady(true);

    return () => video.removeEventListener('loadedmetadata', onMeta);
  }, [src]);

  useEffect(() => {
    if (!ready || reduced) return undefined;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const video = videoRef.current;
    if (!section || !viewport || !video) return undefined;

    video.pause();
    video.currentTime = 0;

    const playhead = { progress: 0 };
    const scroller = document.documentElement;

    const syncTime = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      const t = playhead.progress * duration;
      if (Math.abs(video.currentTime - t) > 0.04) {
        video.currentTime = t;
      }
    };

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

    gsap.ticker.add(syncTime);

    return () => {
      gsap.ticker.remove(syncTime);
      video.pause();
      ctx.revert();
    };
  }, [ready, reduced]);

  if (reduced) {
    return (
      <section id={id} className={`${className} py-16 px-6`}>
        <video
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          className="w-full max-w-4xl mx-auto rounded-lg"
          style={{ maxHeight: 420 }}
        />
      </section>
    );
  }

  return (
    <section ref={sectionRef} id={id} className={className}>
      <div ref={viewportRef} className="ind-sequence-viewport">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          className="ind-sequence-canvas object-cover"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="ind-sequence-edge ind-sequence-edge--top" aria-hidden />
        <div className="ind-sequence-edge ind-sequence-edge--bottom" aria-hidden />
      </div>
      <div
        className="ind-sequence-scroll-room"
        style={{ height: `${scrollRoomVh}vh` }}
        aria-hidden
      />
    </section>
  );
}
