/** Only one industry card video plays at a time (avoids decode jank). */
let activeVideo = null;

export function setActiveIndustryVideo(video) {
  if (activeVideo && activeVideo !== video && !activeVideo.paused) {
    activeVideo.pause();
  }
  activeVideo = video;
}

export function clearActiveIndustryVideo(video) {
  if (activeVideo === video) activeVideo = null;
}
