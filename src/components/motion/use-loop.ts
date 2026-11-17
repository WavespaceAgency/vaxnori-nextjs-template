"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useState, type RefObject } from "react";

/**
 * Steps through `durations` (ms per phase) in a loop while `ref` is on screen.
 * Returns the current phase and a `cycle` counter (changes each time the loop restarts).
 * With reduced motion it stays on `staticPhase`.
 */
export function useLoop(ref: RefObject<Element | null>, durations: readonly number[], staticPhase = durations.length - 1) {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.3 });
  const [state, setState] = useState({ phase: 0, cycle: 0 });

  useEffect(() => {
    if (reduce || !inView) return;
    const timer = setTimeout(
      () =>
        setState((s) => {
          const next = (s.phase + 1) % durations.length;
          return { phase: next, cycle: next === 0 ? s.cycle + 1 : s.cycle };
        }),
      durations[state.phase],
    );
    return () => clearTimeout(timer);
  }, [state.phase, inView, reduce, durations]);

  return reduce ? { phase: staticPhase, cycle: 0 } : state;
}
