import type { HomePage } from "@/config/pages/home";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { StepCard } from "./how-it-works-cards";

type Row = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  card: HomePage["howItWorks"]["steps"][number]["card"];
};

/** How-it-works page: heading + three rows (text left, enlarged step card right). */
export function StepRows({ content }: { content: { eyebrow: string; title: string; accent: string; rows: readonly Row[] } }) {
  return (
    <section aria-labelledby="steps-title" id="steps" className="hidden md:block">
      <Container bordered className="pt-14 lg:pt-[50px]">
        <Reveal className="px-6 sm:px-8 lg:px-[50px]">
          <SectionHeading id="steps-title" eyebrow={content.eyebrow} title={content.title} accent={content.accent} titleClassName="max-w-[300px] lg:max-w-[420px]" />
        </Reveal>
        {content.rows.map((row, index) => (
          <article
            key={row.eyebrow}
            className={cn(
              "grid items-center gap-8 px-6 py-14 sm:px-8 lg:grid-cols-[556fr_504fr] lg:gap-20 lg:px-[50px]",
              index === 0 ? "lg:pt-0 lg:pb-[49px]" : "border-t border-dashed border-line-strong lg:py-12",
            )}
          >
            <Reveal className="flex max-w-[556px] flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Eyebrow line={false}>{row.eyebrow}</Eyebrow>
                <h3 className="font-heading-flex text-2xl leading-7 font-medium tracking-[-0.03em] text-ink lg:text-[32px] lg:leading-[38px]">
                  {row.title} <span className="block font-pixel-line text-accent-text">{row.accent}</span>
                </h3>
              </div>
              <p className="max-w-[473px] text-sm leading-5 text-muted lg:text-base lg:leading-6">{row.description}</p>
            </Reveal>
            <Reveal scale delay={0.1} className="w-full max-w-[504px] lg:justify-self-end">
              <div aria-hidden="true" className="bg-dots flex aspect-[504/400] w-full max-w-[504px] items-center justify-center overflow-hidden">
                <div className="w-[206px] scale-[1.15] sm:scale-150">
                  <StepCard card={row.card} />
                </div>
              </div>
            </Reveal>
          </article>
        ))}
      </Container>
    </section>
  );
}
