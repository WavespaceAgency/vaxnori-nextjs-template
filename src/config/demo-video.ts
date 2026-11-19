/**
 * The demo video.
 * ------------------------------------------------------------
 * Used by every "Watch a Demo" button (Home and How it works) and by the
 * video block on the How it works page. All of them open the same popup.
 *
 * `src`: a link to an .mp4 file (for example "/videos/demo.mp4" in `public/`)
 * or a YouTube / Vimeo embed URL, for example
 *   "https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
 *   "https://player.vimeo.com/video/VIDEO_ID?autoplay=1"
 * Leave it empty to show the "coming soon" note in the popup.
 *
 * The sample video is a 34-second screen recording of this template (1920×1080, H.264, no sound).
 */
export type DemoVideo = { poster: string; alt: string; label: string; src: string; emptyNote: string };

export const demoVideo: DemoVideo = {
  poster: "/images/how-it-works/video-poster.webp",
  alt: "Founder smiling at a laptop next to a whiteboard sketch: idea, Vaxnori AI service, build together",
  label: "Play the video",
  src: "/videos/vaxnori-demo.mp4",
  emptyNote: "The demo video is coming soon. Add your own video URL in src/config/demo-video.ts.",
};
