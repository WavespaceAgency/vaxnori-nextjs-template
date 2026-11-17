import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";
import { StepCard } from "./how-it-works-cards";

export function HowItWorks({ content }: { content: HomePage["howItWorks"] }) {
  return (
    <section aria-labelledby="how-title">
      <Container bordered className="pt-16 pb-12 lg:pt-[100px] lg:pb-[50px]">
        <Reveal className="px-4 sm:px-8 lg:px-[50px]">
        <SectionHeading
          id="how-title"
          eyebrow={content.eyebrow}
          title={content.title}
          accent={content.accent}
          accentBreak
        />
        </Reveal>
        <Stagger as="ol" gap={0.15} className="mt-10 grid border-y border-dashed border-line md:grid-cols-3 lg:mt-12 lg:px-[50px]">
          {content.steps.map((step, index) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="flex flex-col border-dashed border-line max-md:not-last:border-b md:border-r md:first:border-l"
            >
              <p className="border-b border-dashed border-line px-5 py-3 font-heading-flex text-2xl leading-[26px] font-medium text-brand-strong italic">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="flex flex-col gap-8 p-5">
                <div aria-hidden="true" className="bg-dots flex h-[260px] items-center justify-center rounded-[2px] p-5">
                  <StepCard card={step.card} />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-heading-flex text-h4 font-medium text-ink">{step.title}</h3>
                  <p className="text-base leading-6 text-muted">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
