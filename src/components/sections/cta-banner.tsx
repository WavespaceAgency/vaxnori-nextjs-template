import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { HomePage } from "@/config/pages/home";

export function CtaBanner({ content }: { content: HomePage["cta"] }) {
  return (
    <section aria-labelledby="cta-title">
      <Container className="relative overflow-hidden bg-ink px-6 py-14 sm:px-8 lg:px-[50px] lg:py-[50px]">
        <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <Reveal className="max-w-[764px]">
          <div className="flex flex-col gap-4">
            {(() => {
              // Figma: desktop "A smarter way to | build a company", mobile "A smarter way to build | a company".
              const [firstAccent, ...restAccent] = content.accent.split(" ");
              return (
                <h2 id="cta-title" className="font-heading-flex text-[28px] leading-9 font-medium tracking-[-0.03em] text-white lg:text-h2 lg:leading-[44px]">
                  {content.title} <span className="lg:font-pixel-line lg:text-white/75">{firstAccent}</span>{" "}
                  <br className="lg:hidden" />
                  <span className="font-pixel-line text-white/75">{restAccent.join(" ")}</span>
                </h2>
              );
            })()}
            <p className="max-w-[582px] text-base leading-6 text-white/70">{content.description}</p>
          </div>
          </Reveal>
          <Reveal delay={0.15} className="flex gap-4 max-lg:[&>*]:flex-1">
            <Button href={content.secondary.href} variant="dark-raised" size="lg">
              {content.secondary.label}
            </Button>
            <Button href={content.primary.href} size="lg">
              {content.primary.label}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
