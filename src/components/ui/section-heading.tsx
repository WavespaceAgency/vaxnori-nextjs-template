import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./badge";

type SectionHeadingProps = {
  eyebrow?: string;
  /** First line, in the heading font. */
  title: string;
  /** Optional second line, in the grey pixel font. */
  accent?: string;
  description?: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "display" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
};

const titleSizes = {
  display: "text-[2.5rem] sm:text-5xl lg:text-display",
  h2: "text-[2rem] lg:text-h2",
  h3: "text-2xl lg:text-h3",
};

/** Heading pattern used across the design: eyebrow, title and a pixel-font accent line. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  as: Tag = "h2",
  size = "h2",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className={cn("font-heading-flex font-semibold tracking-[-0.03em] text-ink", titleSizes[size], "leading-[1.1]")}>
        {title}
        {accent ? (
          <>
            {" "}
            <span className="block font-pixel font-normal tracking-normal text-accent-text">{accent}</span>
          </>
        ) : null}
      </Tag>
      {description ? (
        <div className={cn("max-w-xl text-base leading-6 text-muted", align === "center" && "mx-auto")}>{description}</div>
      ) : null}
    </div>
  );
}
