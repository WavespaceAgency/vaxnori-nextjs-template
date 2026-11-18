import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";
import { StepCard } from "./how-it-works-cards";

/**
 * Figma geometry (desktop): dashed lines run the full width 50px from the top and bottom
 * of the step grid; columns are 380px wide and start 50px in.
 */
export function HowItWorks({ content }: { content: HomePage["howItWorks"] }) {
  return (
    <section aria-label={content.eyebrow}>
      <Container bordered className="pt-14 pb-14 lg:pt-[100px] lg:pb-[100px]">
        <Reveal className="px-[25px] sm:px-8 lg:px-[50px]">
          <SectionHeading id="how-title" eyebrow={content.eyebrow} title={content.title} accent={content.accent} titleClassName="max-w-[420px]" />
        </Reveal>

        <div className="relative mt-6 lg:mt-12">
          {/* Full-width dashed lines (desktop) */}
          <span aria-hidden="true" className="absolute inset-x-0 top-[50px] hidden border-t border-dashed border-line-strong md:block" />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-[50px] hidden border-t border-dashed border-line-strong md:block" />

          <Stagger as="ol" gap={0.15} className="relative grid px-[25px] md:grid-cols-3 md:px-4 lg:px-[50px]">
            {content.steps.map((step, index) => (
              <StaggerItem
                as="li"
                key={step.title}
                className="flex flex-col border-dashed border-line-strong max-md:border-x md:border-r md:border-line-strong md:first:border-l"
              >
                <p className="flex h-10 items-center px-4 font-heading-italic text-[13px] leading-[26px] font-medium text-brand-strong md:h-[50px] md:items-start md:px-5 md:pt-3 md:text-lg">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="flex flex-col gap-4 border-y border-dashed border-line-strong p-4 md:gap-8 md:border-0 md:p-5">
                  <div aria-hidden="true" className="bg-dots flex h-[234px] items-center justify-center overflow-hidden">
                    <div className="flex w-full justify-center max-md:scale-[0.854]">
                      <StepCard card={step.card} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 md:min-h-20 md:gap-3">
                    <h3 className="font-heading-flex text-lg leading-6 font-medium tracking-[-0.03em] text-ink md:text-h4">{step.title}</h3>
                    <p className="text-base leading-6 text-muted">{step.description}</p>
                  </div>
                </div>
                <span aria-hidden="true" className="hidden h-[50px] md:block" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
