/**
 * About page content. Sample content for the fictional "Vaxnori AI" brand – replace with your own.
 * Team photos are AI-generated sample portraits.
 */
import type { LineIconName } from "@/components/icons/line-icons";

export const aboutPage = {
  meta: {
    title: "About",
    description: "Why we build Vaxnori AI: software should do the work, not describe the work.",
  },
  hero: {
    eyebrow: "About us",
    title: "Software should do the",
    accent: "work, not describe the work.",
    description:
      "Starting a company still means forty tabs, six logins and a week of admin before a single customer hears from you. We think that week belongs to you, not to paperwork.",
  },
  principles: [
    {
      icon: "gitFork",
      title: "Doing beats drafting",
      description:
        "A suggestion is not progress. Every agent in Vaxnori AI finishes the task - the file exists, the domain is registered, the filing is submitted.",
    },
    {
      icon: "pencil",
      title: "The founder holds the pen",
      description:
        "Autonomy without consent is a liability. Money, legal paperwork and anything public stop at an approval before they move.",
    },
    {
      icon: "rocket",
      title: "Small should feel large",
      description:
        "One person with the right operator should be able to look, ship and answer like a company of twenty.",
    },
  ] satisfies { icon: LineIconName; title: string; description: string }[],
  story: {
    eyebrow: "Our story",
    title: "How we got",
    accent: "here",
    description:
      "Vaxnori AI started as an internal script. We were running three small businesses between us and kept rebuilding the same launch checklist.",
    timeline: [
      { date: "Nov 2024", text: "First agent that files an LLC end to end, with a human approval gate in front of it." },
      { date: "Jun 2025", text: "The canvas ships - every task in flight visible on one board." },
      { date: "Feb 2026", text: "Workflows and recurring ops open to everyone. 4,000 companies launched." },
    ],
    image: { src: "/images/about/story.webp", alt: "Two founders reviewing a launch plan together at a desk" },
    frame: "/images/patterns/tiles-orange.webp",
  },
  /** Example numbers – replace with your own data. */
  stats: {
    items: [
      { icon: "rocket", value: "4,120", label: "Companies launched on Vaxnori AI" },
      { icon: "clock", value: "3 days", label: "Median idea to live site" },
      { icon: "hourglass", value: "11 hrs", label: "Admin hours saved per founder per week" },
      { icon: "doc", value: "94%", label: "Tasks approved without edits" },
    ] satisfies { icon: LineIconName; value: string; label: string }[],
  },
  team: {
    eyebrow: "Our team",
    title: "Fourteen people, three",
    accent: "time zones",
    members: [
      { name: "Olivia Mitchell", role: "Founder & CEO", image: "/images/about/team-1.webp" },
      { name: "Alexander Morgan", role: "AI Systems Engineer", image: "/images/about/team-2.webp" },
      { name: "Sophia Carter", role: "Product Designer", image: "/images/about/team-3.webp" },
      { name: "Benjamin Scott", role: "Engineering Lead", image: "/images/about/team-4.webp" },
    ],
  },
  cta: {
    title: "None of these",
    accent: "quite you?",
    description: "Tell us what you'd want to own. We've made roles for people twice, and both worked out.",
    secondary: { label: "Contact Us", href: "/contact" },
    primary: { label: "Try it for Free", href: "/pricing" },
  },
} as const;
