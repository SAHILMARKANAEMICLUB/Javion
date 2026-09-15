import { HERO_COLLAGE_IMAGES, JAVION_LOGO } from '../mock';
import { liveImageSrc } from './liveImageSequence';

function preloadImage(src, timeoutMs = 2200) {
  if (!src) return Promise.resolve();
  return Promise.race([
    new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      const done = () => resolve();
      img.onload = done;
      img.onerror = done;
      img.src = src;
    }),
    new Promise((resolve) => {
      setTimeout(resolve, timeoutMs);
    }),
  ]);
}

function criticalAssetUrls() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/home';
  const onCinematicHome = path === '/home' || path === '/cinematic';

  const urls = [JAVION_LOGO];

  if (onCinematicHome) {
    urls.push(HERO_COLLAGE_IMAGES[0], HERO_COLLAGE_IMAGES[1], liveImageSrc(0));
  }

  return urls;
}

/** Wait for fonts + critical above-the-fold assets — with min/max bounds */
export function waitForAppReady() {
  const minMs = 350;
  const maxMs = 1800;
  const start = Date.now();

  return new Promise((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minMs - elapsed);
      setTimeout(resolve, wait);
    };

    const maxTimer = setTimeout(finish, maxMs);

    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      ...criticalAssetUrls().map((src) => preloadImage(src)),
    ]).then(() => {
      clearTimeout(maxTimer);
      finish();
    });
  });
}

export function markAppReady() {
  window.__javionReady = true;
  window.dispatchEvent(new Event('app-ready'));
}

export function isAppReady() {
  return Boolean(window.__javionReady);
}

export function onAppReady(callback) {
  if (isAppReady()) {
    callback();
    return () => {};
  }
  window.addEventListener('app-ready', callback, { once: true });
  return () => window.removeEventListener('app-ready', callback);
}
