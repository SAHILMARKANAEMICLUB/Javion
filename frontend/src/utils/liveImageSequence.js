export const LIVE_IMAGE_FRAME_COUNT = 51;
/** vh of scroll per frame transition inside the sequence track */
export const SEQUENCE_SCROLL_VH_PER_FRAME = 3.25;

const LIVE_IMAGE_BASE = '/images/live_image/ezgif-frame-';

export function liveImageSrc(index) {
  return `${LIVE_IMAGE_BASE}${String(index + 1).padStart(3, '0')}.jpg`;
}

export function sequenceScrollRoomVh(frameCount = LIVE_IMAGE_FRAME_COUNT) {
  return (frameCount - 1) * SEQUENCE_SCROLL_VH_PER_FRAME;
}

function loadImage(index) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    if (index < 5) img.fetchPriority = 'high';
    img.onload = async () => {
      try {
        await img.decode();
      } catch {
        /* optional */
      }
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = liveImageSrc(index);
  });
}

export async function preloadLiveImages(onFrameLoaded) {
  const images = new Array(LIVE_IMAGE_FRAME_COUNT);
  for (let i = 0; i < LIVE_IMAGE_FRAME_COUNT; i += 1) {
    images[i] = await loadImage(i);
    onFrameLoaded?.(i, images[i]);
  }
  return images;
}

export function setupSequenceCanvas(canvas, container) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = container.clientWidth;
  const h = container.clientHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  return { ctx, w, h };
}

function drawCover(ctx, img, w, h) {
  if (!img?.naturalWidth) return;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(w / iw, h / ih);
  const dw = Math.round(iw * scale);
  const dh = Math.round(ih * scale);
  ctx.drawImage(img, Math.round((w - dw) / 2), Math.round((h - dh) / 2), dw, dh);
}

function resolveFrame(images, index) {
  if (images[index]?.naturalWidth) return images[index];
  for (let d = 1; d < images.length; d += 1) {
    if (images[index - d]?.naturalWidth) return images[index - d];
    if (images[index + d]?.naturalWidth) return images[index + d];
  }
  return null;
}

export function drawSequenceFrame(ctx, images, floatIndex, w, h) {
  if (!images?.length || !ctx) return;
  const max = LIVE_IMAGE_FRAME_COUNT - 1;
  const idx = Math.max(0, Math.min(Math.floor(floatIndex + 1e-5), max));
  const img = resolveFrame(images, idx);
  if (!img) return;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  drawCover(ctx, img, w, h);
}

export function scrollProgressToFrameFloat(progress, frameCount = LIVE_IMAGE_FRAME_COUNT) {
  const max = frameCount - 1;
  return Math.max(0, Math.min(progress, 1)) * max;
}

export function scrollProgressToFrameIndex(progress, frameCount = LIVE_IMAGE_FRAME_COUNT) {
  return Math.floor(scrollProgressToFrameFloat(progress, frameCount) + 1e-5);
}

export function scrollProgressToFrame(progress, frameCount = LIVE_IMAGE_FRAME_COUNT) {
  return scrollProgressToFrameFloat(progress, frameCount);
}
