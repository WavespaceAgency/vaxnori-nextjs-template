import type { CSSProperties } from "react";
import { HeroReveal } from "@/components/motion/hero-reveal";
import { ScaleToFit } from "@/components/motion/scale-to-fit";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { HomePage } from "@/config/pages/home";
import { HeroMockup } from "./hero-mockup";

/** Faint squares in the top corners of the hero (decorative). 182px on desktop, 72px on phones (as in Figma). */
export function CornerSquares({ side }: { side: "left" | "right" }) {
  const squares = [
    [0, 0], [0, 66], [66, 0], [58, 58], [70, 122], [122, 70], [130, 6], [6, 130],
  ];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-12 size-[182px] scale-[0.396] lg:top-[74px] lg:scale-100 ${side === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right"}`}
    >
      {squares.map(([x, y], i) => (
        <span
          key={i}
          className="absolute size-[52px] bg-[linear-gradient(133deg,#f5f5f5_4%,#fff_100%)] motion-safe:animate-float"
          style={{ [side === "left" ? "left" : "right"]: x, top: y, animationDelay: `${i * 0.4}s` } as CSSProperties}
        />
      ))}
    </div>
  );
}

export function Hero({ content, backgroundSrc }: { content: HomePage["hero"]; backgroundSrc: string }) {
  return (
    <section aria-labelledby="hero-title">
      <Container bordered className="relative overflow-hidden">
        {/* Dotted band under the navbar */}
        <div aria-hidden="true" className="bg-dots h-12 border-b border-line lg:h-[74px]" />
        <CornerSquares side="left" />
        <CornerSquares side="right" />

        <div className="relative px-[21px] pt-[72px] text-center sm:px-8 lg:pt-8">
          <HeroReveal delay={0.1}>
          <h1
            id="hero-title"
            className="mx-auto max-w-[288px] font-heading-flex text-[32px] leading-10 font-medium tracking-[-0.03em] text-ink sm:max-w-[642px] sm:text-5xl sm:leading-[1.1] lg:text-display"
          >
            {content.title} <span className="block font-pixel-line text-accent-text">{content.accent}</span>
          </h1>
          </HeroReveal>
          <HeroReveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-[596px] text-sm leading-5 text-muted sm:mt-5 sm:text-lead sm:leading-[27px]">
              {content.description}{" "}
              <strong className="font-medium text-ink">{content.descriptionHighlight}</strong>
            </p>
          </HeroReveal>
        </div>

        <div className="mt-[42px] border-y border-dashed border-line py-8 lg:mt-9">
          <HeroReveal delay={0.3} className="flex flex-wrap justify-center gap-4 px-4">
            <Button href={content.primaryCta.href} size="lg">
              {content.primaryCta.label}
            </Button>
            <Button href={content.secondaryCta.href} size="lg" variant="secondary">
              {content.secondaryCta.label}
            </Button>
          </HeroReveal>
        </div>

        <div className="p-6 sm:p-8 lg:p-[50px]">
          <HeroReveal delay={0.5}>
            <ScaleToFit width={1140} className="aspect-[1140/648] lg:aspect-[1140/562]">
              <HeroMockup mockup={content.mockup} backgroundSrc={backgroundSrc} />
            </ScaleToFit>
          </HeroReveal>
        </div>
      </Container>
    </section>
  );
}
