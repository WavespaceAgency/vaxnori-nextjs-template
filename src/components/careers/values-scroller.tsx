"use client";

import { AnimatePresence, m } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { EASE } from "@/components/motion/reveal";
import { ScaleToFit } from "@/components/motion/scale-to-fit";
import { FeatureMockup } from "@/components/sections/feature-mockups";
import { Eyebrow } from "@/components/ui/badge";
import type { HomePage } from "@/config/pages/home";
import { cn } from "@/lib/utils";

type Value = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  visual: NonNullable<HomePage["features"][number]["visual"]>;
};

/** "How we work": vertical tabs (Pace / Scope / Contact) on the left, one animated panel on the right. */
export function ValuesScroller({ values }: { values: readonly Value[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const value = values[active];

  const select = (index: number) => {
    const next = (index + values.length) % values.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => select(active + 1),
      ArrowRight: () => select(active + 1),
      ArrowUp: () => select(active - 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(values.length - 1),
    };
    if (keys[event.key]) {
      event.preventDefault();
      keys[event.key]();
    }
  };

  return (
    <div className="grid gap-6 px-6 pb-14 sm:px-8 lg:grid-cols-[226px_minmax(0,800px)] lg:justify-between lg:gap-0 lg:px-[57px] lg:pt-[110px] lg:pb-[40px]">
      <div
        role="tablist"
        aria-label="How we work"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-6 flex border-y border-dashed border-line-strong sm:-mx-8 lg:mx-0 lg:flex-col lg:gap-2 lg:self-start lg:border-y-0 lg:border-l lg:border-solid"
      >
        {values.map((v, i) => {
          const selected = i === active;
          return (
            <button
              key={v.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${v.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative flex-1 px-4 py-4 text-center text-[15px] leading-6 transition-colors duration-500 lg:flex-none lg:px-3 lg:py-1 lg:text-left lg:font-heading-flex lg:text-[22px] lg:leading-8 lg:tracking-[-0.03em]",
                selected ? "text-ink" : "text-subtle hover:text-ink",
              )}
            >
              {selected ? (
                <m.span
                  layoutId={`${baseId}-marker`}
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-px h-px bg-ink lg:inset-x-auto lg:inset-y-0 lg:bottom-auto lg:-left-px lg:h-auto lg:w-px"
                />
              ) : null}
              {v.label}
            </button>
          );
        })}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${value.id}`} tabIndex={0}>
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={value.id}
            initial={{ opacity: 0.001, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex max-w-[556px] flex-col gap-3">
              <Eyebrow line={false}>{value.eyebrow}</Eyebrow>
              <h2 className="font-heading-flex text-2xl leading-7 font-medium tracking-[-0.03em] text-ink lg:text-h3 lg:leading-[38px]">
                {value.title} <span className="font-pixel-line text-accent-text max-lg:block">{value.accent}</span>
              </h2>
              <p className="max-w-[473px] text-sm leading-[22px] text-muted lg:text-base lg:leading-6">{value.description}</p>
            </div>
            <div className="bg-dots mt-6 flex justify-center lg:mt-8 lg:h-[534px] lg:items-center">
              <div aria-hidden="true" className="w-full max-w-[504px] lg:max-w-[670px]">
                <ScaleToFit width={504} height={400}>
                  <FeatureMockup visual={value.visual} />
                </ScaleToFit>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
