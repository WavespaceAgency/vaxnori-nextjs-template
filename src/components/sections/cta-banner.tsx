import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";

export function CtaBanner({ content }: { content: HomePage["cta"] }) {
  return (
    <section aria-labelledby="cta-title">
      <Container className="relative overflow-hidden bg-ink px-4 py-12 sm:px-8 lg:px-[50px] lg:py-[50px]">
        {/* Soft moving glow (decorative) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] size-80 rounded-full bg-brand/25 blur-3xl motion-safe:animate-float"
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            id="cta-title"
            title={content.title}
            accent={content.accent}
            description={content.description}
            tone="light"
            className="reveal max-w-[640px]"
            titleClassName="text-[1.75rem] lg:text-[2.25rem]"
          />
          <div className="reveal flex flex-wrap gap-4">
            <Button href={content.secondary.href} variant="dark-raised" size="lg">
              {content.secondary.label}
            </Button>
            <Button href={content.primary.href} size="lg">
              {content.primary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
