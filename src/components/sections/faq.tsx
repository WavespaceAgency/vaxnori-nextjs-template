import { Reveal } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";

export function Faq({ content }: { content: HomePage["faq"] }) {
  return (
    <section aria-labelledby="faq-title">
      <Container bordered className="border-t border-dashed border-t-line">
        <div className="grid lg:grid-cols-[540fr_700fr]">
          <Reveal className="flex flex-col items-start gap-3 px-6 pt-14 sm:px-8 lg:gap-8 lg:px-[50px] lg:pt-8 lg:pb-10">
            <SectionHeading id="faq-title" eyebrow={content.eyebrow} title={content.title} accent={content.accent} titleClassName="max-w-[420px]" />
            <Button href={content.cta.href} size="lg">
              {content.cta.label}
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="border-dashed border-line lg:border-l">
            <Accordion items={content.items} variant="dashed" />
          </Reveal>
        </div>
        <div aria-hidden="true" className="bg-dots h-14 border-t border-dashed border-line lg:h-[100px]" />
      </Container>
    </section>
  );
}
