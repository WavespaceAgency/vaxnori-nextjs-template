import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { CSSProperties } from "react";
import { LineIcon } from "@/components/icons/line-icons";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";

export function Integrations({ content }: { content: HomePage["integrations"] }) {
  return (
    <section aria-labelledby="integrations-title">
      <Container bordered className="pt-14 lg:pt-[100px]">
        <Reveal className="px-5 sm:px-8 lg:px-[50px]">
        <SectionHeading
          id="integrations-title"
          eyebrow={content.eyebrow}
          title={content.title}
          accent={content.accent}
          titleClassName="max-w-[300px] lg:max-w-[420px]"
        />
        </Reveal>
        <Stagger as="ul" gap={0.06} className="mt-8 grid grid-cols-2 border-t border-dashed border-line-strong lg:mt-12 lg:grid-cols-4 lg:px-[50px]">
          {content.items.map((item) => (
            <StaggerItem
              as="li"
              key={item.name}
              className="group flex h-[177px] flex-col justify-between gap-6 border-r border-b border-dashed border-line-strong p-4 sm:p-5 lg:h-auto transition-colors duration-300 hover:bg-canvas lg:min-h-[216px] lg:[&:nth-child(4n+1)]:border-l"
            >
              {/* Generic "app icon": gradient tile, white glyph, glossy top edge and a soft shadow in the tile's own colour. */}
              <span
                className="relative flex size-10 items-center justify-center overflow-hidden rounded-[11px] bg-[linear-gradient(145deg,var(--from),var(--to))] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),inset_0_-1px_0_rgb(0_0_0/0.12),0_6px_14px_-6px_var(--to)] transition-[translate,rotate,box-shadow] duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),inset_0_-1px_0_rgb(0_0_0/0.12),0_12px_20px_-8px_var(--to)]"
                style={{ "--from": item.from, "--to": item.to } as CSSProperties}
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/25 to-transparent" />
                <LineIcon name={item.icon} strokeWidth={1.9} className="relative size-[22px]" />
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
