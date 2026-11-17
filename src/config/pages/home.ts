/**
 * Home page content.
 * Phase 2 fills in every section. Edit the text here, not in the components.
 */
export const homePage = {
  meta: {
    title: undefined, // uses the default title from layout.tsx
    description: undefined,
  },
  hero: {
    title: "From idea to launch,",
    accent: "handled for you",
    description:
      "It takes care of everything from your brand identity and domain to business paperwork and website launch, built into every important step.",
    primaryCta: { label: "Try it for Free", href: "/pricing" },
    secondaryCta: { label: "Watch a Demo", href: "/how-it-works" },
  },
} as const;
