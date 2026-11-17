import type { ReactNode } from "react";
import { HeroReveal } from "@/components/motion/hero-reveal";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { CornerSquares } from "./hero";

type Cta = { label: string; href: string };

/** Hero for inner pages (About, How it works, Pricing…): dotted band, corner squares, centred heading. */
export function PageHero({
  eyebrow,
  mobileEyebrow,
  title,
  accent,
  description,
  primaryCta,
  secondaryCta,
  titleClassName,
  accentInline = false,
  className,
  children,
}: {
  eyebrow?: string;
  /** Eyebrow shown on phones only (Figma mobile frames). */
  mobileEyebrow?: string;
  title: string;
  accent: string;
  description?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  titleClassName?: string;
  /** Let the accent words flow on the same line (default: own line). */
  accentInline?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title">
      <Container bordered className={cn("relative overflow-hidden", className)}>
        <div aria-hidden="true" className="bg-dots h-12 border-b border-line lg:h-[74px]" />
        <CornerSquares side="left" />
        <CornerSquares side="right" />

        <div className="relative px-[21px] pt-[72px] text-center sm:px-8 lg:pt-8">
          {eyebrow || mobileEyebrow ? (
            <HeroReveal delay={0.1} className={eyebrow ? undefined : "lg:hidden"}>
              <Eyebrow className="mb-2 justify-center lg:mb-3">{eyebrow ?? mobileEyebrow}</Eyebrow>
            </HeroReveal>
          ) : null}
          <HeroReveal delay={0.2}>
          <h1
            id="page-title"
            className={cn(
              "mx-auto max-w-[350px] font-heading-flex text-[32px] leading-10 font-medium tracking-[-0.03em] text-ink sm:max-w-[786px] sm:text-5xl sm:leading-[1.1] lg:text-display",
              titleClassName,
            )}
          >
            {title} <span className={cn("font-pixel-line text-accent-text", !accentInline && "block")}>{accent}</span>
          </h1>
          </HeroReveal>
          {description ? (
            <HeroReveal delay={0.3}>
              <p className="mx-auto mt-4 max-w-[692px] text-sm leading-5 text-muted sm:mt-5 sm:text-lead sm:leading-[27px]">{description}</p>
            </HeroReveal>
          ) : null}
        </div>

        {primaryCta || secondaryCta ? (
          <div className="mt-[42px] border-y border-dashed border-line py-8 lg:mt-9">
            <HeroReveal delay={0.4} className="flex flex-wrap justify-center gap-4 px-4">
              {primaryCta ? (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button href={secondaryCta.href} size="lg" variant="secondary">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </HeroReveal>
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
