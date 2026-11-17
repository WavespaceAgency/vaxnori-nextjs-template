import type { CSSProperties } from "react";
import { LineIcon, type LineIconName } from "@/components/icons/line-icons";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Every cell draws its own right + bottom line; the grid draws the top + left line. */
const cell = "relative h-[223px] border-r border-b border-[#ededed] bg-surface p-6 lg:h-[264px]";

type StatItem = { icon: LineIconName; value: string; label: string };

/** Brand mark drawn in light grey, using the logo file as a mask (follows your logo). */
function MarkCell() {
  return (
    <StaggerItem className={cn(cell, "flex items-center justify-center lg:col-span-1")}>
      <span
        aria-hidden="true"
        className="block aspect-[177/185] w-[150px] bg-[#f1f1f1] lg:w-[196px] transition-colors duration-500 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] hover:bg-brand-soft"
        style={{ maskImage: `url(${siteConfig.brand.markAlt})` } as CSSProperties}
      />
    </StaggerItem>
  );
}

/** Concentric diamonds that slowly turn together. */
function DiamondsCell() {
  return (
    <StaggerItem className={cn(cell, "flex items-center justify-center overflow-hidden lg:col-span-2")}>
      <span aria-hidden="true" className="relative flex size-[262px] scale-[0.85] items-center justify-center lg:scale-100">
        {[185, 150, 115, 80].map((size, i) => (
          <span
            key={size}
            className="absolute rotate-45 border-[0.5px] border-line-strong motion-safe:animate-pulse-soft"
            style={{ width: size, height: size, animationDelay: `${i * 0.35}s`, animationDuration: "3.2s" }}
          />
        ))}
      </span>
    </StaggerItem>
  );
}

function Stat({ item, className }: { item: StatItem; className: string }) {
  return (
    <StaggerItem className={cn(cell, "group flex flex-col justify-between gap-10 transition-colors duration-300 hover:bg-canvas", className)}>
      <LineIcon name={item.icon} className="size-6 text-[#8a8a8a] transition-colors duration-300 group-hover:text-brand" />
      <div className="flex flex-col gap-3">
        <p className="font-heading-flex text-[32px] leading-10 font-medium tracking-[-0.03em] text-ink lg:text-h2 lg:leading-[44px]">
          <CountUp value={item.value} />
        </p>
        <p className="text-sm leading-[22px] text-muted lg:text-base lg:leading-6">{item.label}</p>
      </div>
    </StaggerItem>
  );
}

type StatsContent = {
  eyebrow?: string;
  title?: string;
  accent?: string;
  items: readonly StatItem[];
};

export function Stats({ content }: { content: StatsContent }) {
  const [a, b, c, d] = content.items;

  return (
    <section aria-labelledby={content.title ? "stats-title" : undefined} aria-label={content.title ? undefined : "Key numbers"}>
      <Container bordered className="bg-canvas px-6 py-14 sm:px-8 lg:px-[50px] lg:py-[60px]">
        {content.title ? (
          <Reveal className="mb-6 lg:mb-12">
            <SectionHeading id="stats-title" eyebrow={content.eyebrow} title={content.title} accent={content.accent} titleClassName="max-w-[300px] lg:max-w-[420px]" />
          </Reveal>
        ) : null}
        <Stagger
          gap={0.1}
          className="grid grid-cols-1 border-t border-l border-[#ededed] sm:grid-cols-2 lg:grid-cols-[294fr_98fr_393fr_61fr_294fr]"
        >
          <MarkCell />
          <Stat item={a} className="max-sm:h-[205px] lg:col-span-3" />
          <Stat item={b} className="max-sm:h-[205px] lg:col-span-1" />
          <Stat item={c} className="lg:col-span-2" />
          <Stat item={d} className="lg:col-span-1" />
          <DiamondsCell />
        </Stagger>
      </Container>
    </section>
  );
}
