"use client";

import { m } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { EASE } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type AccordionItem = { question: string; answer: ReactNode };

const variants = {
  /** Dashed rows with large questions (home page FAQ). */
  dashed: {
    root: "",
    item: "border-b border-dashed border-line px-6 py-6 last:border-b-0 lg:px-8 lg:py-8",
    hit: "before:-inset-x-6 before:-top-6 before:-bottom-3 lg:before:-inset-x-8 lg:before:-top-8 lg:before:-bottom-4",
    question: "font-heading-flex text-lg leading-6 font-medium tracking-[-0.03em] text-ink lg:text-h4",
    answer: "pt-2 pr-[72px] text-sm leading-[22px] lg:pr-[56px] lg:text-base lg:leading-6",
    icon: "top-6 right-6 lg:top-1/2 lg:right-8 lg:-translate-y-1/2",
  },
  /** Simple rows with solid lines. */
  simple: {
    root: "border-y border-line",
    item: "border-b border-line py-5 last:border-b-0",
    hit: "before:-inset-x-2 before:-top-5 before:-bottom-2.5",
    question: "text-base leading-6 font-medium text-ink",
    answer: "pt-2 pr-10 text-base leading-6",
    icon: "top-5 right-0",
  },
} as const;

/**
 * Accessible accordion (one item open at a time).
 * Answers stay in the HTML when closed, so search engines can read them.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  variant = "simple",
  headingLevel = 3,
  className,
}: {
  items: readonly AccordionItem[];
  defaultOpen?: number | null;
  variant?: keyof typeof variants;
  headingLevel?: 2 | 3 | 4;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const v = variants[variant];
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={cn(v.root, className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question} className={cn("relative transition-colors hover:bg-canvas", v.item)}>
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  // The ::before layer makes the whole row clickable (44px+ touch target).
                  "relative flex w-full items-center justify-between gap-6 pr-10 text-left before:absolute before:content-[''] focus-visible:outline-offset-4",
                  v.hit,
                )}
              >
                <span className={v.question}>{item.question}</span>
              </button>
            </Heading>
            {/* Icon stays vertically centred in the whole row (as in Figma) */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute flex size-6 items-center justify-center rounded-full border-[1.5px] border-brand text-brand",
                v.icon,
              )}
            >
              <span className="absolute h-[1.5px] w-2.5 bg-current" />
              <m.span
                className="absolute h-2.5 w-[1.5px] bg-current"
                animate={{ scaleY: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </span>

            <m.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <m.div
                animate={{ y: isOpen ? 0 : -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={cn("text-muted", v.answer)}
              >
                {item.answer}
              </m.div>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
