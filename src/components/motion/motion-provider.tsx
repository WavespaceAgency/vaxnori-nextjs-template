"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads Motion once for the whole site.
 * - `LazyMotion` + `m` components keep the bundle small; the animation engine is
 *   downloaded after the page has rendered (it never blocks the first paint).
 * - `reducedMotion="user"` turns off movement for visitors who ask for less motion.
 */
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
