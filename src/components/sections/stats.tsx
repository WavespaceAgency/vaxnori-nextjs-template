import type { CSSProperties } from "react";
import { LineIcon } from "@/components/icons/line-icons";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Every cell draws its own right + bottom line; the grid draws the top + left line. */
const cell = "relative min-h-48 border-r border-b border-[#ededed] bg-surface p-6 lg:h-[264px]";

type StatItem = HomePage["stats"]["items"][number];

/** Brand mark drawn in light grey, using the logo file as a mask (follows your logo). */
function MarkCell() {
  return (
    <StaggerItem className={cn(cell, "hidden items-center justify-center sm:flex lg:col-span-3")}>
      <span
        aria-hidden="true"
        className="block aspect-[167/141] w-2/3 max-w-44 bg-[#f1f1f1] transition-colors duration-500 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] hover:bg-brand-soft"
        style={{ maskImage: `url(${siteConfig.footer.mark})` } as CSSProperties}
      />
    </StaggerItem>
  );
}

/** Concentric diamonds that slowly turn together. */
function DiamondsCell() {
  return (
    <StaggerItem className={cn(cell, "hidden items-center justify-center overflow-hidden sm:flex lg:col-span-4")}>
      <span aria-hidden="true" className="relative flex size-[262px] items-center justify-center motion-safe:animate-spin-slow [animation-duration:60s]">
        {[185, 150, 115, 80].map((size, i) => (
          <span
            key={size}
            className="absolute rotate-45 border border-line-strong motion-safe:animate-pulse-soft"
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
      <LineIcon name={item.icon} className="size-5 text-[#8a8a8a] transition-colors duration-300 group-hover:text-brand" />
      <div className="flex flex-col gap-3">
        <p className="font-heading-flex text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] text-ink lg:text-h2">
          <CountUp value={item.value} />
        </p>
        <p className="text-base leading-6 text-muted">{item.label}</p>
      </div>
    </StaggerItem>
  );
}

export function Stats({ content }: { content: HomePage["stats"] }) {
  const [a, b, c, d] = content.items;

  return (
    <section aria-labelledby="stats-title">
      <Container bordered className="bg-canvas px-4 py-12 sm:px-8 lg:px-[50px] lg:py-[60px]">
        <Reveal>
          <SectionHeading id="stats-title" eyebrow={content.eyebrow} title={content.title} accent={content.accent} accentBreak />
        </Reveal>
        <Stagger
          gap={0.1}
          className="mt-10 grid grid-cols-1 border-t border-l border-[#ededed] sm:grid-cols-2 lg:mt-12 lg:grid-cols-12"
        >
          <MarkCell />
          <Stat item={a} className="lg:col-span-6" />
          <Stat item={b} className="lg:col-span-3" />
          <Stat item={c} className="lg:col-span-4" />
          <Stat item={d} className="lg:col-span-4" />
          <DiamondsCell />
        </Stagger>
      </Container>
    </section>
  );
}
