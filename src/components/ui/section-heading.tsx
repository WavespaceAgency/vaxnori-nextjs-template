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
  /** Show the short line before the eyebrow (Figma hides it on feature rows). */
  eyebrowLine?: boolean;
  /** id on the heading, for aria-labelledby on the section. */
  id?: string;
  size?: "display" | "h2";
  align?: "left" | "center";
  /** Put the accent words on their own line. */
  accentBreak?: boolean;
  /** Put the accent words on their own line on phones only. */
  accentBreakMobile?: boolean;
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
};

const titleSizes = {
  display: "text-[2.5rem] leading-[1.1] tracking-[-0.03em] sm:text-5xl lg:text-display",
  h2: "text-2xl leading-7 tracking-[-0.03em] lg:text-h2 lg:leading-[44px]",
};

/** Heading pattern used across the design: eyebrow, title + pixel-font accent, description. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  as: Tag = "h2",
  eyebrowLine = true,
  id,
  size = "h2",
  align = "left",
  accentBreak = false,
  accentBreakMobile = false,
  tone = "dark",
  className,
  titleClassName,
  descriptionClassName,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2 lg:gap-3", align === "center" && "items-center text-center", className)}>
      {eyebrow ? (
        <Eyebrow tone={tone === "dark" ? "brand" : "light"} line={eyebrowLine}>
          {eyebrow}
        </Eyebrow>
      ) : null}
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
                accentBreakMobile && "max-lg:block",
                tone === "dark" ? "text-accent-text" : "text-white/75",
              )}
            >
              {accent}
            </span>
          </>
        ) : null}
      </Tag>
      {description ? (
        <p className={cn("mt-2 max-w-[473px] text-sm leading-[22px] lg:mt-1 lg:text-base lg:leading-6", tone === "dark" ? "text-muted" : "text-white/70", align === "center" && "mx-auto", descriptionClassName)}>
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
