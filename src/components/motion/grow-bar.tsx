"use client";

import { m } from "motion/react";
import { EASE } from "./reveal";

/** Progress bar that fills when it scrolls into view. */
export function GrowBar({ value, className, delay = 0 }: { value: number; className?: string; delay?: number }) {
  return (
    <m.span
      className={className}
      style={{ width: `${value}%`, originX: 0, display: "block" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.4, delay, ease: EASE }}
    />
  );
}
