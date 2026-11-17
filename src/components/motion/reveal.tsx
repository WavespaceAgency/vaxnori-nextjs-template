"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

/** Shared easing for the whole site (soft "ease-out-expo"). */
export const EASE = [0.16, 1, 0.3, 1] as const;

const tags = { div: m.div, li: m.li, ul: m.ul, ol: m.ol, article: m.article, figure: m.figure, section: m.section, span: m.span } as const;
type Tag = keyof typeof tags;

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  /** Seconds before the animation starts. */
  delay?: number;
  /** Start distance in px (moves up into place). */
  y?: number;
  /** Start slightly smaller. */
  scale?: boolean;
  id?: string;
};

/** Fades, un-blurs and lifts its content the first time it scrolls into view. */
export function Reveal({ children, as = "div", className, delay = 0, y = 24, scale = false, id }: RevealProps) {
  const Component = tags[as];
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y, scale: scale ? 0.96 : 1, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

const container: Variants = {
  hidden: {},
  show: (custom: { gap: number; delay: number }) => ({
    transition: { staggerChildren: custom.gap, delayChildren: custom.delay },
  }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

/** Parent for a group of items that appear one after another. */
export function Stagger({
  children,
  as = "div",
  className,
  gap = 0.08,
  delay = 0,
  amount = 0.15,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  gap?: number;
  delay?: number;
  amount?: number;
}) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      variants={container}
      custom={{ gap, delay }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Component>
  );
}

/** One item inside <Stagger>. */
export function StaggerItem({ children, as = "div", className }: { children: ReactNode; as?: Tag; className?: string }) {
  const Component = tags[as];
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  );
}
