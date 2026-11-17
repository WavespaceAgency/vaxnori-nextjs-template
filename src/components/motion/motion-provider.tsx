"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads Motion once for the whole site.
 * - `LazyMotion` + `m` components keep the bundle small.
 * - `reducedMotion="user"` turns off movement for visitors who ask for less motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMax} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
