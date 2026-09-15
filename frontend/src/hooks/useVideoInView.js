import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Auto-play muted video while the element is in view; pause (and optionally reset) when it leaves.
 * Use on industry cards when each row has a short loop MP4.
 */
export default function useVideoInView({ resetOnLeave = true, start = 'top 78%', end = 'bottom 22%' } = {}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return undefined;

    video.muted = true;
    video.playsInline = true;
    video.pause();

    const play = () => {
      video.play().catch(() => {});
    };
    const stop = () => {
      video.pause();
      if (resetOnLeave) video.currentTime = 0;
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      onEnter: play,
      onEnterBack: play,
      onLeave: stop,
      onLeaveBack: stop,
    });

    return () => {
      stop();
      st.kill();
    };
  }, [resetOnLeave, start, end]);

  return { containerRef, videoRef };
}
