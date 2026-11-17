/** Pricing page content. Sample prices for the fictional "Vaxnori AI" brand – replace with your own. */
import type { LineIconName } from "@/components/icons/line-icons";

export type Plan = {
  name: string;
  monthly: number;
  /** Price per month when billed yearly. */
  yearly: number;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
};

export const pricingPage = {
  meta: {
    title: "Pricing",
    description: "Simple plans for founders, operators and agencies. Start free and grow without limits.",
  },
  hero: {
    eyebrow: "Pricing",
    title: "Start simple,",
    accent: "grow without limits",
    description: "Build and scale without managing the systems behind it.",
  },
  billing: { monthly: "Monthly", yearly: "Annual", yearlyNote: "save 20%", perMonth: "/ month" },
  /** Shown in this order (featured plan in the middle, as in the design). */
  plans: [
    {
      name: "Founder",
      monthly: 39,
      yearly: 31,
      description: "Getting the first company out the door.",
      features: [
        "1 company workspace",
        "Launch tasks: brand, domain, LLC",
        "50 agent tasks / month",
        "Approvals inbox",
        "Email support",
        "Design system builder",
      ],
      cta: { label: "Start free", href: "/contact" },
    },
    {
      name: "Studio",
      monthly: 249,
      yearly: 199,
      description: "Agencies and holding companies.",
      features: [
        "Everything in Operator",
        "Up to 25 client workspaces",
        "Shared brand kits & templates",
        "Roles, audit log, SSO",
        "SEO analysis",
        "ICP analysis",
        "Multiple agents",
      ],
      cta: { label: "Talk to us", href: "/contact" },
      featured: true,
      badge: "Most Popular",
    },
    {
      name: "Operator",
      monthly: 99,
      yearly: 79,
      description: "Running the whole business on Vaxnori AI.",
      features: [
        "Unlimited companies & tasks",
        "Growth: research, outreach, campaigns",
        "Recurring ops & weekly digests",
        "Workflow builder",
        "Priority support + onboarding call",
        "SEO analysis",
        "ICP analysis",
        "Multiple Agents",
      ],
      cta: { label: "Start 14-day trial", href: "/contact" },
    },
  ] satisfies Plan[],
  comparison: {
    title: "What's in each plan",
    columns: ["Feature", "Founder", "Operator", "Studio"],
    /** Index of the highlighted column (0 = first plan column). */
    highlight: 1,
    rows: [
      ["Company workspaces", "1", "Unlimited", "25 client spaces"],
      ["Agent tasks per month", "50", "Unlimited", "Unlimited"],
      ["Launch pack (brand, domain, LLC)", "Included", "Included", "Included"],
      ["Growth work (research, outreach)", "-", "Included", "Included"],
      ["Recurring ops & weekly digest", "-", "Included", "Included"],
      ["Workflow builder", "-", "Included", "Included"],
      ["Approvals inbox", "Included", "Included", "Included"],
      ["Integrations", "12", "All 40+", "All 40+ • Custom"],
      ["Roles, audit log, SSO", "-", "-", "Included"],
      ["Support", "Email", "Priority + Onboarding", "Named partner"],
    ] as [string, string, string, string][],
  },
  promises: [
    { icon: "shield", title: "Approval-first by default", description: "Every task waits for your yes before it touches money, paperwork or the public internet." },
    { icon: "sliders", title: "Bring your own tools", description: "Vaxnori AI signs in and works your stack instead of asking you to move into a new one." },
    { icon: "users", title: "Human hand-off", description: "Anything an agent can't finish arrives back with notes, not a dead end." },
    { icon: "shieldLock", title: "Own your work", description: "Files, domains and filings are registered to you from day one. Export any time." },
  ] satisfies { icon: LineIconName; title: string; description: string }[],
  track: {
    eyebrow: "Track",
    title: "You always know exactly",
    accent: "what you spent",
    description:
      "Every task, approval, and integration call is metered in the open. Track every cost clearly as your business grows. No surprise overage invoice at the end of the month.",
    image: {
      src: "/images/pricing/track.webp",
      alt: "Spend this month: $93.00 of $300.00 used, with a list of recent tasks and their costs",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Your fair questions,",
    accent: "our straight answers.",
    cta: { label: "Try it for Free", href: "/contact" },
    items: [
      {
        question: "What counts as an agent task?",
        answer:
          "One finished piece of work – for example a drafted email sequence, a registered domain or a filed form. Drafts you throw away and approvals do not count.",
      },
      {
        question: "Do I pay for the domain, filings and ad spend?",
        answer:
          "Yes. Third-party costs like domains, state filing fees and ad budgets are passed through at cost and always shown before you approve them.",
      },
      { question: "Can I switch plans later?", answer: "Any time. Upgrades apply right away; downgrades start at your next billing date." },
      { question: "Is there a free tier?", answer: "The Founder plan starts free, so you can launch your first company before you pay anything." },
      {
        question: "What happens to my work if I cancel?",
        answer:
          "You keep everything. The brand, the domain, the company, the content – everything is registered in your name. Vaxnori AI holds nothing hostage.",
      },
      { question: "Do you offer annual invoicing?", answer: "Yes. Annual plans save 20% and can be paid by invoice." },
      { question: "Is my data used to train models?", answer: "No. Your data is only used to do your work and is never used to train shared models." },
    ],
  },
} as const;
