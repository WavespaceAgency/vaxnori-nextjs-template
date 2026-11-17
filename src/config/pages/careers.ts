/** Careers page text. Job posts live in src/content/careers/*.mdx. Sample content – replace with your own. */
import type { LineIconName } from "@/components/icons/line-icons";
import { homePage } from "./home";

const launchVisual = homePage.features[0].visual;

export const careersPage = {
  meta: {
    title: "Careers",
    description: "Fourteen people, six open roles, remote-first with overlap hours. Build the thing that builds companies.",
  },
  hero: {
    eyebrow: "Careers",
    title: "Build the thing",
    accent: "that builds companies.",
    description:
      "Fourteen people, six open roles, remote-first with overlap hours. Everyone here ships and everyone here talks to founders.",
  },
  /** "How we work" – the left list scrolls through these. */
  values: [
    {
      id: "pace",
      label: "Pace",
      eyebrow: "01 — Pace",
      title: "Ship on",
      accent: "Thursday",
      description: "One weekly release train. Small changes go out the day they're done; nothing waits a month for a launch moment.",
      visual: launchVisual,
    },
    {
      id: "scope",
      label: "Scope",
      eyebrow: "02 — Scope",
      title: "Own a whole",
      accent: "surface",
      description: "Everyone owns something end to end – from the first sketch to the support reply after it ships.",
      visual: homePage.features[1].visual,
    },
    {
      id: "contact",
      label: "Contact",
      eyebrow: "03 — Contact",
      title: "Talk to",
      accent: "founders weekly",
      description: "Every person on the team joins customer calls. You hear the problem before you write the ticket.",
      visual: homePage.features[2].visual,
    },
  ],
  roles: {
    title: "Six open roles",
    note: "Remote in US or EU unless noted",
    viewRole: "View Role",
  },
  benefits: {
    title: "What comes",
    accent: "with it",
    items: [
      { icon: "moneyBag", title: "Salary bands, published", description: "Every role lists its range on the posting. No negotiation lottery, reviewed annually against market with complete transparency" },
      { icon: "chart", title: "Real equity", description: "Four-year vest, one-year cliff, ten-year exercise window and a plain-English explainer for every employee." },
      { icon: "laptop", title: "Remote with overlap", description: "Work where you like; keep 9am-1pm PT free for the two days we do live review with the team together." },
      { icon: "users", title: "Quarterly offsites", description: "Four days together every quarter, planned by rotation. Travel and everything on site covered for all team members." },
      { icon: "heart", title: "Health cover", description: "Medical, dental and vision for you and dependents, or a local-equivalent stipend outside the US" },
      { icon: "rocket", title: "Start your own thing", description: "A free Studio workspace and one Friday a month to run your own side business on it with full creative freedom." },
    ] satisfies { icon: LineIconName; title: string; description: string }[],
  },
  cta: {
    title: "None of these",
    accent: "quite you?",
    description: "Tell us what you'd want to own. We've made roles for people twice, and both worked out.",
    secondary: { label: "Contact Us", href: "/contact" },
    primary: { label: "Try it for Free", href: "/pricing" },
  },
  hiring: {
    eyebrow: "Hiring process",
    title: "Four conversations, two",
    accent: "weeks, paid exercise.",
    steps: [
      { title: "Intro call", description: "30 minutes with the hiring lead. What you want to own next.", image: "/images/careers/hiring-1.webp", alt: "Intro call, 30 minutes, scheduled" },
      { title: "Craft conversation", description: "90 minutes on real work you've shipped, with two people from the team.", image: "/images/careers/hiring-2.webp", alt: "Craft conversation, 90 minutes, with two team members" },
      { title: "Paid exercise", description: "A scoped problem from our actual backlog. Paid at your day rate.", image: "/images/careers/hiring-3.webp", alt: "Paid exercise: fix onboarding drop-off, 2-4 hours, paid at your day rate" },
      { title: "Founder chat + offer", description: "45 minutes, then a decision within two working days.", image: "/images/careers/hiring-4.webp", alt: "Founder chat, 45 minutes, decision within two working days" },
    ],
  },
  job: {
    breadcrumb: "Careers",
    cover: "/images/how-it-works/video-poster.webp",
    coverAlt: "Founder smiling at a laptop next to a whiteboard sketch",
    compensation: "Compensation",
    details: "Details",
    companyLabel: "Company",
    typeLabel: "Employment Type",
    functionLabel: "Job Functions",
    postedLabel: "Posted",
    apply: { label: "Apply for this role", href: "/contact" },
  },
} as const;
