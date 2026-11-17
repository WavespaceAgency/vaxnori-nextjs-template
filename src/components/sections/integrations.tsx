import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { CSSProperties } from "react";
import { LineIcon } from "@/components/icons/line-icons";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";

export function Integrations({ content }: { content: HomePage["integrations"] }) {
  return (
    <section aria-labelledby="integrations-title">
      <Container bordered className="pt-16 lg:pt-[100px]">
        <Reveal className="px-4 sm:px-8 lg:px-[50px]">
        <SectionHeading
          id="integrations-title"
          eyebrow={content.eyebrow}
          title={content.title}
          accent={content.accent}
          accentBreak
        />
        </Reveal>
        <Stagger as="ul" gap={0.06} className="mt-10 grid grid-cols-2 border-t border-dashed border-line lg:mt-12 lg:grid-cols-4 lg:px-[50px]">
          {content.items.map((item) => (
            <StaggerItem
              as="li"
              key={item.name}
              className="group flex min-h-40 flex-col justify-between gap-6 border-r border-b border-dashed border-line p-4 sm:p-5 transition-colors duration-300 hover:bg-canvas lg:min-h-[216px] lg:[&:nth-child(4n+1)]:border-l"
            >
              <span
                className="flex size-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                style={{ color: item.color, backgroundColor: `color-mix(in srgb, ${item.color} 12%, white)` } as CSSProperties}
              >
                <LineIcon name={item.icon} className="size-5" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading-flex text-lg font-medium tracking-[-0.02em] text-ink sm:text-h4">{item.name}</h3>
                <p className="text-sm leading-5 text-muted sm:text-base sm:leading-6">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div aria-hidden="true" className="bg-dots h-16 lg:h-[100px]" />
      </Container>
    </section>
  );
}
