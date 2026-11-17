import type { CSSProperties } from "react";
import { LineIcon } from "@/components/icons/line-icons";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const cell = "relative min-h-52 border-[#ededed] bg-surface p-6 lg:h-[264px]";

/** Brand mark drawn in light grey, using the logo file as a mask (follows your logo). */
function MarkCell() {
  return (
    <div aria-hidden="true" className={cn(cell, "hidden items-center justify-center sm:flex lg:col-span-3")}>
      <span
        className="block aspect-[167/141] w-2/3 max-w-44 bg-[#f1f1f1] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
        style={{ maskImage: `url(${siteConfig.footer.mark})` } as CSSProperties}
      />
    </div>
  );
}

function DiamondsCell() {
  return (
    <div aria-hidden="true" className={cn(cell, "hidden items-center justify-center overflow-hidden sm:flex lg:col-span-4")}>
      {[185, 150, 115, 80].map((size, i) => (
        <span
          key={size}
          className="absolute rotate-45 border border-line-strong motion-safe:animate-spin-slow"
          style={{ width: size, height: size, animationDuration: `${30 + i * 10}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
        />
      ))}
    </div>
  );
}

type StatItem = HomePage["stats"]["items"][number];

function Stat({ item, className }: { item: StatItem; className: string }) {
  return (
    <div className={cn(cell, "reveal-scale flex flex-col justify-between gap-10", className)}>
      <LineIcon name={item.icon} className="size-5 text-[#8a8a8a]" />
      <div className="flex flex-col gap-3">
        <p className="font-heading-flex text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] text-ink lg:text-h2">{item.value}</p>
        <p className="text-base leading-6 text-muted">{item.label}</p>
      </div>
    </div>
  );
}

export function Stats({ content }: { content: HomePage["stats"] }) {
  const [a, b, c, d] = content.items;

  return (
    <section aria-labelledby="stats-title">
      <Container bordered className="bg-canvas px-4 py-12 sm:px-8 lg:px-[50px] lg:py-[60px]">
        <SectionHeading
          id="stats-title"
          eyebrow={content.eyebrow}
          title={content.title}
          accent={content.accent}
          accentBreak
          className="reveal"
        />
        <div className="mt-10 grid grid-cols-1 gap-px border border-[#ededed] bg-[#ededed] sm:grid-cols-2 lg:mt-12 lg:grid-cols-12">
          <MarkCell />
          <Stat item={a} className="lg:col-span-6" />
          <Stat item={b} className="lg:col-span-3" />
          <Stat item={c} className="lg:col-span-4" />
          <Stat item={d} className="lg:col-span-4" />
          <DiamondsCell />
        </div>
      </Container>
    </section>
  );
}
