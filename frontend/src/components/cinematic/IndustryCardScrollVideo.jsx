import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import {
  clearActiveIndustryVideo,
  setActiveIndustryVideo,
} from '../../utils/industryVideoPlayback';

/**
 * Smooth industry clip: lazy-load MP4, play while card is in view, pause when scrolled away.
 * (Scrubbing currentTime on scroll causes seek lag — native play is much smoother.)
 */
export default function IndustryCardScrollVideo({ src, poster, alt, reduced }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  useEffect(() => {
    if (reduced || !src) return undefined;

    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const lazy = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 105%',
      once: true,
      onEnter: () => setLoadVideo(true),
    });

    return () => lazy.kill();
  }, [reduced, src]);

  useEffect(() => {
    if (!loadVideo || reduced || !src) return undefined;

    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return undefined;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'auto';

    const onCanPlay = () => {
      setShowPoster(false);
      ScrollTrigger.refresh();
    };
    video.addEventListener('canplay', onCanPlay);
    if (video.readyState >= 3) setShowPoster(false);

    const play = () => {
      setActiveIndustryVideo(video);
      video.play().catch(() => {});
    };

    const stop = () => {
      video.pause();
      clearActiveIndustryVideo(video);
    };

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 72%',
      end: 'bottom 28%',
      onEnter: play,
      onEnterBack: play,
      onLeave: stop,
      onLeaveBack: stop,
    });

    if (st.isActive) play();

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      stop();
      st.kill();
    };
  }, [loadVideo, reduced, src]);

  if (reduced) {
    return (
      <div className="ind-page-card-media">
        <img src={poster} alt={alt} loading="lazy" className="ind-page-card-video" />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="ind-page-card-media ind-page-card-media--video">
      {showPoster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className="ind-page-card-video ind-page-card-poster"
          loading="lazy"
        />
      )}
      <video
        ref={videoRef}
        src={loadVideo ? src : undefined}
        poster={poster}
        muted
        playsInline
        loop
        preload={loadVideo ? 'auto' : 'none'}
        aria-label={alt}
        className="ind-page-card-video"
      />
    </div>
  );
}
