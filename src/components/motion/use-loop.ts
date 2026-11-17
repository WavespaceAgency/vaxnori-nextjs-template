"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useState, type RefObject } from "react";

/**
 * Steps through `durations` (ms per phase) in a loop while `ref` is on screen.
 * Returns the current phase. With reduced motion it stays on `staticPhase`.
 */
export function useLoop(ref: RefObject<Element | null>, durations: readonly number[], staticPhase = durations.length - 1) {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.3 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const timer = setTimeout(() => setPhase((p) => (p + 1) % durations.length), durations[phase]);
    return () => clearTimeout(timer);
  }, [phase, inView, reduce, durations]);

  return reduce ? staticPhase : phase;
}
