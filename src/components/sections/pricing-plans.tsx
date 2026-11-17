"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { EASE, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/config/pages/pricing";
import { cn } from "@/lib/utils";

type Billing = { monthly: string; yearly: string; yearlyNote: string; perMonth: string };

function Check({ featured }: { featured?: boolean }) {
  return (
    <span className={cn("flex size-[18px] shrink-0 items-center justify-center rounded-full", featured ? "bg-white/15 text-white" : "bg-line text-ink")}>
      <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden="true">
        <path d="m3 6.2 2 2 4-4.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Monthly / annual switch + plan cards. Prices animate when you switch. */
export function PricingPlans({ plans, billing }: { plans: readonly Plan[]; billing: Billing }) {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="relative">
      {/* Full-height dashed dividers between the plans (desktop) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden grid-cols-3 gap-8 px-12 lg:grid">
        <span />
        <span className="relative before:absolute before:inset-y-0 before:-left-4 before:border-l before:border-dashed before:border-line" />
        <span className="relative before:absolute before:inset-y-0 before:-left-4 before:border-l before:border-dashed before:border-line" />
      </div>
      <div className="flex justify-center border-b border-dashed border-line px-4 py-8 lg:border-b-0 lg:pt-[37px] lg:pb-[73px]">
        <div role="radiogroup" aria-label="Billing period" className="relative flex rounded-full bg-surface-muted p-1">
          {[false, true].map((isYearly) => {
            const active = yearly === isYearly;
            return (
              <button
                key={String(isYearly)}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setYearly(isYearly)}
                className={cn("relative z-10 min-h-9 rounded-full px-4 text-sm leading-5 font-semibold transition-colors duration-300", active ? "text-white" : "text-ink")}
              >
                {active ? (
                  <m.span layoutId="billing-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} className="absolute inset-0 -z-10 rounded-full bg-brand-strong" />
                ) : null}
                {isYearly ? (
                  <>
                    {billing.yearly} <span className={active ? "text-white" : "text-ink"}>{billing.yearlyNote}</span>
                  </>
                ) : (
                  billing.monthly
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Stagger
        as="ul"
        gap={0.12}
        className="relative grid border-b border-dashed border-line sm:px-8 lg:grid-cols-3 lg:gap-8 lg:px-12 lg:pb-[75px]"
      >
        {plans.map((plan, index) => {
          const price = yearly ? plan.yearly : plan.monthly;
          const featured = Boolean(plan.featured);
          return (
            <StaggerItem
              as="li"
              key={plan.name}
              className="flex border-dashed border-line px-6 py-16 not-last:border-b sm:px-0 lg:border-0 lg:p-0"
            >
              <article
                className={cn(
                  "relative flex min-h-[530px] w-full flex-col justify-between rounded-[4px] transition-transform duration-500 hover:-translate-y-1 lg:min-h-[600px]",
                  featured ? "bg-ink text-white shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)]" : "border-[0.5px] border-line-soft bg-[#f9f9f9]",
                )}
              >
                <div>
                  <div className="flex flex-col gap-2 p-6">
                    <h2 className={cn("font-pixel-line text-lg leading-10", featured ? "text-white" : "text-ink")}>{plan.name}</h2>
                    <p className="-mt-2 flex items-baseline gap-1.5">
                      <span className="relative inline-flex overflow-hidden font-heading-flex text-[32px] leading-10 font-medium tracking-[-0.03em]">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <m.span
                            key={price}
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                          >
                            ${price}
                          </m.span>
                        </AnimatePresence>
                      </span>
                      <span className={cn("font-heading-flex text-lg", featured ? "text-white/60" : "text-subtle")}>{billing.perMonth}</span>
                    </p>
                    <p className={cn("text-base leading-[27px]", featured ? "text-white/60" : "text-[#6b6b6b]")}>{plan.description}</p>
                    {plan.badge ? (
                      <span className="absolute top-9 right-6 rounded-[4px] bg-white px-1.5 pt-px pb-0.5 text-[10px] leading-4 font-semibold tracking-[0.02em] text-brand-strong">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>
                  <ul className="flex flex-col gap-3 px-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className={cn("flex items-center gap-2 text-sm leading-[27px] font-medium", featured ? "text-white" : "text-ink")}>
                        <Check featured={featured} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6">
                  {featured ? (
                    <Button href={plan.cta.href} className="w-full min-h-12 lg:min-h-12">
                      {plan.cta.label}
                    </Button>
                  ) : (
                    <Button href={plan.cta.href} variant="outline-brand" className="w-full min-h-[46px] lg:min-h-[46px]">
                      {plan.cta.label}
                    </Button>
                  )}
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
