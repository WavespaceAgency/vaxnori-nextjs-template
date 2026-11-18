import { Reveal, Stagger } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
export type FaqContent = {
  eyebrow: string;
  title: string;
  accent: string;
  cta: { label: string; href: string };
  items: readonly { question: string; answer: string }[];
};

export function Faq({ content, gapTop = false }: { content: FaqContent; gapTop?: boolean }) {
  return (
    <section aria-labelledby="faq-title">
      <Container bordered className={gapTop ? "pt-14 lg:pt-[100px]" : "border-t border-dashed border-t-line-strong"}>
        <div className={gapTop ? "grid border-t border-dashed border-line-strong lg:grid-cols-[540fr_700fr]" : "grid lg:grid-cols-[540fr_700fr]"}>
          <Reveal className="flex flex-col items-start gap-3 px-6 pt-14 sm:px-8 lg:gap-8 lg:px-[50px] lg:pt-8 lg:pb-10">
            <SectionHeading id="faq-title" eyebrow={content.eyebrow} title={content.title} accent={content.accent} titleClassName="max-w-[420px]" />
            <Button href={content.cta.href} size="lg">
              {content.cta.label}
            </Button>
          </Reveal>
          <Stagger gap={0.1} className="border-dashed border-line-strong lg:border-l">
            <Accordion items={content.items} variant="dashed" />
          </Stagger>
        </div>
        <div aria-hidden="true" className="bg-dots h-14 border-t border-dashed border-line-strong lg:h-[100px]" />
      </Container>
    </section>
  );
}
