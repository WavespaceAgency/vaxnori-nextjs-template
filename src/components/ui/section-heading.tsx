import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./badge";

export type HeadingContent = {
  eyebrow?: string;
  /** Main words, in the heading font. */
  title: string;
  /** Accent words, in the grey pixel font. */
  accent?: string;
  description?: string;
};

type SectionHeadingProps = HeadingContent & {
  as?: "h1" | "h2" | "h3";
  /** id on the heading, for aria-labelledby on the section. */
  id?: string;
  size?: "display" | "h2";
  align?: "left" | "center";
  /** Put the accent words on their own line. */
  accentBreak?: boolean;
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
};

const titleSizes = {
  display: "text-[2.5rem] leading-[1.1] tracking-[-0.03em] sm:text-5xl lg:text-display",
  h2: "text-[2rem] leading-[1.125] tracking-[-0.03em] lg:text-h2",
};

/** Heading pattern used across the design: eyebrow, title + pixel-font accent, description. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  as: Tag = "h2",
  id,
  size = "h2",
  align = "left",
  accentBreak = false,
  tone = "dark",
  className,
  titleClassName,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone === "dark" ? "brand" : "light"}>{eyebrow}</Eyebrow> : null}
      <Tag
        id={id}
        className={cn(
          "font-heading-flex font-medium",
          tone === "dark" ? "text-ink" : "text-white",
          titleSizes[size],
          titleClassName,
        )}
      >
        {title}
        {accent ? (
          <>
            {" "}
            <span
              className={cn(
                "font-pixel-line",
                accentBreak && "block",
                tone === "dark" ? "text-accent-text" : "text-white/75",
              )}
            >
              {accent}
            </span>
          </>
        ) : null}
      </Tag>
      {description ? (
        <p className={cn("max-w-xl text-base leading-6", tone === "dark" ? "text-muted" : "text-white/70", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
