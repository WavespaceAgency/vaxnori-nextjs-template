"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { DemoVideo } from "@/config/demo-video";
import { VideoDialog } from "./video-dialog";

/** Poster image with a "Play the video" bar. Opens the video in an accessible dialog. */
export function VideoBlock({ video }: { video: DemoVideo }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
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

      <VideoDialog video={video} open={open} onClose={close} />
    </>
  );
}
