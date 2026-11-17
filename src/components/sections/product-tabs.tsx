"use client";

import { m } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CheckCircle } from "@/components/icons/line-icons";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type ProductTab = {
  id: string;
  label: string;
  title: string;
  description: string;
  points: readonly string[];
  visual: ReactNode;
  /** True for code-drawn visuals that need extra height on phones. */
  tallOnMobile?: boolean;
};

/** Accessible tabs (arrow keys, Home/End) with a sliding underline and animated panels. */
export function ProductTabs({ tabs }: { tabs: ProductTab[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(tabs.length - 1),
    };
    if (keys[event.key]) {
      event.preventDefault();
      keys[event.key]();
    }
  };

  return (
    <div>
      <div className="border-y border-dashed border-line">
        <div
          role="tablist"
          aria-label="Product features"
          onKeyDown={onKeyDown}
          className="flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:gap-4 lg:px-[50px]"
        >
          {tabs.map((tab, index) => {
            const selected = index === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "relative shrink-0 px-4 py-5 text-base leading-6 whitespace-nowrap transition-colors duration-300 focus-visible:-outline-offset-4",
                  selected ? "text-ink" : "text-subtle hover:text-ink",
                )}
              >
                {/* Both layers share one grid cell: the hidden medium-weight copy keeps the width fixed, so nothing jumps. */}
                <span className="grid">
                  <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-medium">
                    {tab.label}
                  </span>
                  <span className={cn("col-start-1 row-start-1 text-center", selected && "font-medium")}>{tab.label}</span>
                </span>
                {selected ? (
                  <m.span
                    layoutId={`${baseId}-underline`}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute inset-x-0 -bottom-px h-px bg-ink"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab, index) => {
        const selected = index === active;
        return (
          <div
            key={tab.id}
            role="tabpanel"
            id={`${baseId}-panel-${tab.id}`}
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            hidden={!selected}
            tabIndex={0}
            className="grid items-center gap-10 px-4 py-12 focus-visible:-outline-offset-4 sm:px-8 lg:grid-cols-[minmax(0,421px)_minmax(0,619px)] lg:justify-between lg:px-[50px] lg:py-[100px]"
          >
            {/* The key changes when a tab opens, so its animation plays again. Content of hidden tabs stays in the HTML. */}
                <m.div
                  key={`${tab.id}-text-${selected}`}
                  initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-3">
                    <h3 className="font-heading-flex text-h4 font-medium text-ink">{tab.title}</h3>
                    <p className="text-base leading-6 text-muted">{tab.description}</p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {tab.points.map((point, i) => (
                      <m.li
                        key={point}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
                        className="flex items-start gap-2.5 text-base leading-6 text-muted"
                      >
                        <CheckCircle className="mt-0.5 size-5 shrink-0 text-brand" />
                        {point}
                      </m.li>
                    ))}
                  </ul>
                </m.div>
              <m.div
                key={`${tab.id}-visual-${selected}`}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
                className={cn(
                  "aspect-[619/401] w-full overflow-hidden border border-[#e6e6e6] bg-surface shadow-frame",
                  tab.tallOnMobile && "max-sm:aspect-auto max-sm:min-h-80",
                )}
              >
                {tab.visual}
              </m.div>
          </div>
        );
      })}
    </div>
  );
}
