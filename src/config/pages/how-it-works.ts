/** How it works page content. Sample content for the fictional "Vaxnori AI" brand. */
import { demoVideo } from "@/config/demo-video";
import { homePage } from "./home";

const [ideaStep, approveStep, shipStep] = homePage.howItWorks.steps;

export const howItWorksPage = {
  meta: {
    title: "How it works",
    description: "Vaxnori AI turns one paragraph into a roadmap, asks for approval, then ships the work in the background.",
  },
  hero: {
    mobileEyebrow: "How it works",
    accentInline: true,
    title: "Turn your idea into action,",
    accent: "automatically.",
    description: "Vaxnori transforms simple ideas into structured plans, completed tasks, and real business progress.",
    primaryCta: { label: "Try it for Free", href: "/pricing" },
    /** Opens the demo video popup (src/config/demo-video.ts). Without JavaScript it jumps to the video block. */
    secondaryCta: { label: "Watch a Demo", href: "#video", video: demoVideo },
  },
  /** The video block under the hero – edit the video in src/config/demo-video.ts. */
  video: demoVideo,
  steps: {
    eyebrow: "How it works",
    title: "From one sentence to a",
    accent: "running company.",
    rows: [
      {
        eyebrow: "01 — Discover",
        title: "Describe the idea clearly",
        accent: "and briefly.",
        description:
          "One paragraph is enough. Vaxnori turns it into a roadmap of concrete tasks with clear steps and smart recommendations.",
        card: ideaStep.card,
      },
      {
        eyebrow: "02 — Approve",
        title: "Approve the plan with",
        accent: "full confidence.",
        description:
          "Every task shows what it will do and what it costs before it runs so you always understand the impact, value, and expected outcome clearly.",
        card: approveStep.card,
      },
      {
        eyebrow: "03 — Launch",
        title: "Watch it ship with real",
        accent: "progress updates.",
        description:
          "One paragraph is enough. Vaxnori turns it into a roadmap of concrete tasks with clear steps, timelines, priorities, and smart AI-powered recommendations.",
        card: shipStep.card,
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Your questions,",
    accent: "answered clearly.",
    cta: { label: "Contact Us", href: "/contact" },
    items: [
      {
        question: "What does Vaxnori AI actually do?",
        answer:
          "Vaxnori AI turns your idea into a structured roadmap with tasks, timelines, and actions needed to launch and grow your business.",
      },
      {
        question: "How does Vaxnori create my launch plan?",
        answer:
          "It reads your idea, asks a few short questions, then drafts the tasks a new business needs – brand, domain, company filing, website and first customers – in the right order.",
      },
      {
        question: "Do I have control over the tasks?",
        answer:
          "Yes. You can edit, reorder or remove any task, and nothing that costs money, signs a document or contacts a customer runs without your approval.",
      },
      {
        question: "Can Vaxnori complete tasks automatically?",
        answer:
          "Routine tasks like drafts, research and summaries run on their own. Anything irreversible waits for your yes first.",
      },
      {
        question: "What kind of businesses can use Vaxnori?",
        answer:
          "Solo founders, small teams and agencies – from online shops and local services to software and consulting businesses.",
      },
    ],
  },
  cta: {
    title: "A smarter way to",
    accent: "build a company",
    description:
      "Skip the endless research, planning, and setup. Vaxnori AI works alongside you to create your brand, organize your launch, and handle the operational details.",
    secondary: { label: "Contact Us", href: "/contact" },
    primary: { label: "Try it for Free", href: "/pricing" },
  },
} as const;
