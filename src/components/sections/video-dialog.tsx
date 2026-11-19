"use client";

import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/icons";
import { EASE } from "@/components/motion/reveal";
import type { DemoVideo } from "@/config/demo-video";

function isEmbed(src: string) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(src);
}

/**
 * Accessible video popup: focus moves to the close button, Escape or a click outside closes it,
 * the page does not scroll behind it, and focus returns to the button that opened it.
 * It is rendered into <body> (a portal), so a parent with a transform or animation cannot trap it.
 */
export function VideoDialog({ video, open, onClose }: { video: DemoVideo; open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // `document` exists only in the browser: render nothing on the server.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Without a player the close button is the only control: keep Tab on it.
      if (e.key === "Tab" && !document.querySelector("[data-video-player]")) {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={video.label}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 flex size-11 items-center justify-center rounded-full bg-white text-ink"
            >
              <CloseIcon className="size-4" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-card bg-black">
              {video.src ? (
                isEmbed(video.src) ? (
                  <iframe
                    data-video-player
                    src={video.src}
                    title={video.label}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                ) : (
                  <video data-video-player src={video.src} controls autoPlay muted playsInline className="size-full object-cover" />
                )
              ) : (
                <>
                  <Image src={video.poster} alt="" fill sizes="100vw" className="object-cover opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <p className="max-w-md rounded-card bg-black/75 px-5 py-3 text-center text-base leading-6 text-white">{video.emptyNote}</p>
                  </div>
                </>
              )}
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
