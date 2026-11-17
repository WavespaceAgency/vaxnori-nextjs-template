"use client";

import { m } from "motion/react";
import { EASE } from "./reveal";

/**
 * Animates a heading word by word (blur + lift).
 * Opacity is not changed, so the text still counts for LCP right away.
 */
export function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <m.span
          key={`${word}-${i}`}
          className="inline-block whitespace-pre"
          initial={{ y: "0.35em", filter: "blur(10px)" }}
          animate={{ y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </m.span>
      ))}
    </span>
  );
}
