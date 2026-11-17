"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE } from "./reveal";

/**
 * Counts a stat up from 0 when it scrolls into view.
 * Works with values like "3 days", "94%", "$2,140" or "11 hrs".
 * The real value is always in the HTML (good for SEO and screen readers).
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!inView || reduce || !match || !ref.current) return;
    const [, prefix, number, suffix] = match;
    const target = Number.parseFloat(number.replace(/,/g, ""));
    const decimals = number.split(".")[1]?.length ?? 0;
    const format = (v: number) =>
      prefix + v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
