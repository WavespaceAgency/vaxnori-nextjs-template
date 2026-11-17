"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shows a fixed-size design (e.g. 1140×562) scaled down to the available width,
 * like the Figma mobile frames do. The box keeps its aspect ratio, so there is no layout shift.
 */
export function ScaleToFit({
  width,
  height,
  children,
  className,
}: {
  width: number;
  /** Height of the design. Use `className` with aspect-[…] classes for a responsive height instead. */
  height?: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => el.style.setProperty("--fit", String(Math.min(1, el.clientWidth / width)));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", className)}
      style={height ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      <div className="absolute top-0 left-0 h-[calc(100%/var(--fit,1))] origin-top-left" style={{ width, transform: "scale(var(--fit, 1))" }}>
        {children}
      </div>
    </div>
  );
}
