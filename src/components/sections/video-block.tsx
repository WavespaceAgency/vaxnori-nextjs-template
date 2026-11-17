"use client";

import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { EASE } from "@/components/motion/reveal";

type Video = { poster: string; alt: string; label: string; src: string; emptyNote: string };

function isEmbed(src: string) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(src);
}

/** Poster image with a "Play the video" bar. Opens the video in an accessible dialog. */
export function VideoBlock({ video }: { video: Video }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-[322/183] w-full overflow-hidden text-left sm:aspect-[1140/552]"
        aria-haspopup="dialog"
      >
        <Image
          src={video.poster}
          alt={video.alt}
          fill
          sizes="(min-width: 1280px) 1140px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-5">
          <span className="text-sm leading-5 font-semibold text-white sm:text-[22px] sm:leading-[27px]">{video.label}</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:scale-110 sm:size-14">
            <svg viewBox="0 0 24 24" className="ml-0.5 size-4 sm:size-6" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
        </span>
      </button>

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
            onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute -top-12 right-0 flex size-11 items-center justify-center rounded-full bg-white text-ink"
              >
                <CloseIcon className="size-4" />
              </button>
              <div className="relative aspect-video overflow-hidden rounded-card bg-black">
                {video.src ? (
                  isEmbed(video.src) ? (
                    <iframe src={video.src} title={video.label} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="size-full" />
                  ) : (
                    <video src={video.src} poster={video.poster} controls autoPlay playsInline className="size-full" />
                  )
                ) : (
                  <>
                    <Image src={video.poster} alt="" fill sizes="100vw" className="object-cover opacity-40" />
                    <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-base text-white">{video.emptyNote}</p>
                  </>
                )}
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
