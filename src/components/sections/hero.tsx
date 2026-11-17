import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { Tilt } from "@/components/motion/tilt";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { HomePage } from "@/config/pages/home";
import { HeroMockup } from "./hero-mockup";

/** Faint squares in the top corners of the hero (decorative). */
function CornerSquares({ side }: { side: "left" | "right" }) {
  const squares = [
    [0, 0], [0, 66], [66, 0], [58, 58], [70, 122], [122, 70], [130, 6], [6, 130],
  ];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-[74px] hidden size-[182px] lg:block ${side === "left" ? "left-0" : "right-0 -scale-x-100"}`}
    >
      {squares.map(([x, y], i) => (
        <span
          key={i}
          className="absolute size-[52px] bg-[linear-gradient(133deg,#f5f5f5_4%,#fff_100%)] motion-safe:animate-float"
          style={{ left: x, top: y, animationDelay: `${i * 0.4}s` } as CSSProperties}
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
        <div aria-hidden="true" className="bg-dots h-10 border-b border-line lg:h-[74px]" />
        <CornerSquares side="left" />
        <CornerSquares side="right" />

        <div className="relative px-4 pt-10 text-center sm:px-8 lg:pt-[52px]">
          <h1
            id="hero-title"
            className="mx-auto max-w-[642px] font-heading-flex text-[2.5rem] leading-[1.1] font-medium tracking-[-0.03em] text-ink sm:text-5xl lg:text-display"
          >
            <SplitWords text={content.title} />{" "}
            <SplitWords text={content.accent} delay={0.25} className="block font-pixel-line text-accent-text" />
          </h1>
          <Reveal delay={0.35} y={16}>
            <p className="mx-auto mt-5 max-w-[596px] text-base leading-6 text-muted sm:text-lead">
              {content.description}{" "}
              <strong className="font-medium text-ink">{content.descriptionHighlight}</strong>
            </p>
          </Reveal>
        </div>

        <div className="mt-8 border-y border-dashed border-line py-8">
          <Reveal delay={0.5} y={16} className="flex flex-wrap justify-center gap-3 px-4 sm:gap-4">
            <Button href={content.primaryCta.href} size="lg">
              {content.primaryCta.label}
            </Button>
            <Button href={content.secondaryCta.href} size="lg" variant="secondary">
              {content.secondaryCta.label}
            </Button>
          </Reveal>
        </div>

        <div className="p-4 sm:p-8 lg:p-[50px]">
          <Reveal delay={0.6} y={40} scale>
            <Tilt>
              <HeroMockup mockup={content.mockup} backgroundSrc={backgroundSrc} />
            </Tilt>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
