import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Above-the-fold fade-up done with CSS only, so it starts on the very first paint
 * (no waiting for JavaScript – keeps Largest Contentful Paint fast).
 * Same values as <Reveal>: 28px rise, 0.8s, ease (0.22, 1, 0.36, 1).
 */
export function HeroReveal({ children, delay = 0, className, as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "span" }) {
  return (
    <Tag
      className={cn("motion-safe:animate-[hero-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]", className)}
      style={{ animationDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
