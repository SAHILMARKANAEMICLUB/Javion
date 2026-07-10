import { gsap } from 'gsap';

/** Fade + blur reveal for section headlines (scroll-triggered or timeline) */
export function headlineBlurIn(target, options = {}) {
  const {
    reduced = false,
    scrollTrigger,
    stagger = 0.06,
    y = 32,
    blur = 14,
    duration = 1.1,
    delay = 0,
    rotateX = 0,
    ease = 'power3.out',
    once = true,
    timelinePosition,
    timeline,
  } = options;

  const vars = {
    opacity: 0,
    y: reduced ? 18 : y,
    stagger,
    duration: reduced ? 0.65 : duration,
    delay,
    ease,
  };

  if (!reduced) {
    vars.filter = `blur(${blur}px)`;
    if (rotateX) vars.rotateX = rotateX;
  }

  if (timeline) {
    return timeline.from(target, vars, timelinePosition ?? 0);
  }

  if (scrollTrigger) {
    vars.scrollTrigger = { once, ...scrollTrigger };
  }

  return gsap.from(target, vars);
}
