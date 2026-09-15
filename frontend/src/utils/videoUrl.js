/** Encode filenames with spaces/special chars for public `/videos/` paths. */
export function publicVideoUrl(fileName) {
  return `/videos/${encodeURIComponent(fileName)}`;
}
