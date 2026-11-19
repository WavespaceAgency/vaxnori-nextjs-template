"use client";

import { useCallback, useState, type ComponentProps } from "react";
import { buttonClasses } from "@/components/ui/button";
import type { DemoVideo } from "@/config/demo-video";
import { VideoDialog } from "./video-dialog";

type Props = {
  label: string;
  /** Where the link goes when JavaScript is off (for example the How it works video). */
  href: string;
  video: DemoVideo;
} & Pick<NonNullable<Parameters<typeof buttonClasses>[0]>, "variant" | "size" | "className"> &
  Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** A button-styled link ("Watch a Demo") that opens the demo video in a popup. */
export function VideoCta({ label, href, video, variant, size, className, ...rest }: Props) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <a
        href={href}
        role="button"
        aria-haspopup="dialog"
        className={buttonClasses({ variant, size, className })}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        onKeyDown={(e) => {
          // role="button" should also react to Space, like a real button.
          if (e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        {...rest}
      >
        {label}
      </a>
      <VideoDialog video={video} open={open} onClose={close} />
    </>
  );
}
