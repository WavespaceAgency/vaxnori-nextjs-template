"use client";

import { AnimatePresence, animate, m, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, type ReactNode } from "react";

/** Video-like easing (slow in, slow out). */
export const EASE_IN_OUT = [0.45, 0, 0.2, 1] as const;
/** Soft spring for things that appear. */
export const SOFT_SPRING = { type: "spring", stiffness: 210, damping: 26, mass: 0.9 } as const;

/** A number that rolls smoothly to its new value (e.g. 18% → 51%). */
export function RollingNumber({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 1.1, ease: EASE_IN_OUT });
    return () => controls.stop();
  }, [value, mv, reduce]);
  return <m.span className={className}>{text}</m.span>;
}

/** Cross-fades between texts (soft blur + small lift) instead of swapping them instantly. */
export function SwapText({ id, children, className }: { id: string | number; children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-grid ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={id}
          className="col-start-1 row-start-1"
          initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
          transition={{ duration: 0.45, ease: EASE_IN_OUT }}
        >
          {children}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

/** Types `text` at a steady pace with a blinking caret. Restarts when `run` changes. */
export function TypeText({ text, run, duration = 1.6 }: { text: string; run: number | string; duration?: number }) {
  const reduce = useReducedMotion();
  const progress = useMotionValue(reduce ? text.length : 0);
  const typed = useTransform(progress, (v) => text.slice(0, Math.round(v)));
  const caret = useTransform(progress, (v) => (v < text.length ? 1 : 0));
  useEffect(() => {
    if (reduce) {
      progress.set(text.length);
      return;
    }
    progress.set(0);
    const controls = animate(progress, text.length, { duration, ease: "linear", delay: 0.15 });
    return () => controls.stop();
  }, [run, text, duration, reduce, progress]);
  return (
    <span>
      <m.span aria-hidden="true">{typed}</m.span>
      <m.span aria-hidden="true" style={{ opacity: caret }} className="ml-px inline-block h-[1.05em] w-px translate-y-[2px] bg-brand" />
      <span className="sr-only">{text}</span>
    </span>
  );
}
