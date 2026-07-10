import { JAVION_LOGO, CINEMATIC_IMG } from '../mock';
import { liveImageSrc } from './liveImageSequence';

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

/** Wait for window, fonts, and key assets — with min/max bounds */
export function waitForAppReady() {
  const minMs = 650;
  const maxMs = 3200;
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
      new Promise((resolveLoad) => {
        if (document.readyState === 'complete') resolveLoad();
        else window.addEventListener('load', resolveLoad, { once: true });
      }),
      preloadImage(JAVION_LOGO),
      preloadImage(CINEMATIC_IMG.cncMachine),
      preloadImage(CINEMATIC_IMG.fasteners),
      preloadImage(CINEMATIC_IMG.qualityCheck),
      preloadImage(CINEMATIC_IMG.assemblyLine),
      preloadImage(CINEMATIC_IMG.oilGas),
      preloadImage(CINEMATIC_IMG.marine),
      preloadImage(CINEMATIC_IMG.aerospace),
      preloadImage(liveImageSrc(0)),
      preloadImage(liveImageSrc(1)),
      preloadImage(liveImageSrc(2)),
      preloadImage(liveImageSrc(3)),
      preloadImage(liveImageSrc(4)),
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
