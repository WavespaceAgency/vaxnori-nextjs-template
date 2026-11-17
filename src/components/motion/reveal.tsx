"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

/** Shared easing – the same curve the Vaxnori Framer site uses. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Start state: 0.001 (not 0) keeps text eligible for LCP, like Framer does. */
const HIDDEN = 0.001;

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

/** Fades and lifts its content (28px) the first time it scrolls into view. `scale` = mockup style (97%, 20px). */
export function Reveal({ children, as = "div", className, delay = 0, y, scale = false, id }: RevealProps) {
  const lift = y ?? (scale ? 20 : 28);
  const Component = tags[as];
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: HIDDEN, y: lift, scale: scale ? 0.97 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
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

/** Exported so other components (e.g. the accordion) can join a <Stagger>. */
export const staggerItem: Variants = {
  hidden: { opacity: HIDDEN, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const item = staggerItem;

/** Parent for a group of items that appear one after another. */
export function Stagger({
  children,
  as = "div",
  className,
  gap = 0.1,
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
