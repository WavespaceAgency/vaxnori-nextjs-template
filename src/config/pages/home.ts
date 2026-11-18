/**
 * Home page content.
 * ------------------------------------------------------------
 * Every text, link and image on the home page comes from this file.
 * Edit the values here – you do not need to touch the components.
 *
 * Numbers, names and quotes below are SAMPLE content for the fictional
 * "Vaxnori AI" brand. Replace them with your own before you launch.
 */
import type { LineIconName } from "@/components/icons/line-icons";
import { siteConfig } from "@/config/site";

export const homePage = {
  meta: {
    title: undefined, // undefined = use the default title from src/app/layout.tsx
    description: siteConfig.description,
  },

  hero: {
    /** Background of the product preview (exported from Figma at 2x). */
    background: "/images/home/hero-background.webp",
    title: "From idea to launch,",
    accent: "handled for you",
    description:
      "It takes care of everything from your brand identity and domain to business paperwork and website launch,",
    descriptionHighlight: "built into every important step",
    primaryCta: { label: "Try it for Free", href: "/pricing" },
    secondaryCta: { label: "Watch a Demo", href: "/how-it-works" },
    /** The animated product preview under the hero. */
    mockup: {
      label: "Product preview: an AI agent managing a launch checklist",
      client: { label: "Client:", name: "Mobain", date: "3 Feb" },
      agent: { name: siteConfig.name, subtitle: "Managing launch progress", tags: ["Legal", "Domain", "Growth"] },
      tasks: [
        { title: "Task: Launch website", subtitle: "Assigned to agent + founder", tags: ["CMS", "SEO", "Domain"] },
        { title: "Task: Outreach", subtitle: "Assigned to agent" },
      ],
      detailsLabel: "Task Details",
      checklistTitle: "Launch To-Do's",
      /**
       * The preview plays these steps in a loop (about 3 seconds each), like the live site.
       * `bars` = progress per checklist row (0–100). `highlight` = which card glows.
       */
      rows: ["Website", "Brand kit", "LLC filing", "Domain", "Outreach"],
      steps: [
        {
          label: "Kickoff",
          progress: 18,
          highlight: "agent",
          bars: [20, 25, 0, 40, 0],
          toast: { title: "Checking domain...", subtitle: "mobain.co" },
        },
        {
          label: "Build",
          progress: 51,
          highlight: "launch",
          bars: [60, 70, 25, 100, 0],
          toast: { title: "Registering...", subtitle: "Mobain.co" },
        },
        {
          label: "Outreach",
          progress: 82,
          highlight: "outreach",
          bars: [90, 100, 70, 100, 45],
          toast: { title: "Filing LLC...", subtitle: "Delaware, US" },
        },
        {
          label: "Live",
          progress: 100,
          highlight: "none",
          bars: [100, 100, 100, 100, 100],
          toast: { title: "Launched", subtitle: "mobain.co is live" },
          live: true,
        },
      ] satisfies { label: string; progress: number; highlight: "agent" | "launch" | "outreach" | "none"; bars: number[]; toast: { title: string; subtitle: string }; live?: boolean }[],
      statusLabels: { todo: "To do", progress: "In progress", done: "Done" },
    },
  },

  logos: {
    title: "Vaxnori AI is trusted by teams like these",
    /** Placeholder logos. Replace with SVG files of your real customers (with permission). */
    items: [
      { name: "Acme", shape: "circle" },
      { name: "Logoipsum", shape: "square" },
      { name: "Northwind", shape: "triangle" },
      { name: "Lumen", shape: "spark" },
      { name: "Quanta", shape: "ring" },
      { name: "Orbit", shape: "circle" },
      { name: "Kite", shape: "diamond" },
    ] as const,
  },

  product: {
    eyebrow: "Product",
    title: "From one sentence to a",
    accent: "running company.",
    tabs: [
      {
        id: "team",
        label: "Your AI team",
        title: "Hire a department in an afternoon",
        description:
          "Sales, finance, marketing, design — each one a named agent with its own remit, tools and budget. You brief them the way you'd brief a person.",
        points: ["Start with one agent and add roles as the work grows.", "Agent keeps its own memory of your customers"],
        visual: {
          type: "image",
          src: "/images/home/product-workspace.webp",
          width: 1240,
          height: 803,
          alt: "Workspace showing an AI agent organising sales, finance, marketing and design teams",
        },
      },
      {
        id: "workflows",
        label: "Workflows",
        title: "Turn routine work into repeatable flows",
        description:
          "Chain agents together: a trigger starts the work, agents do it, and you approve anything that matters. Every step is logged.",
        points: ["Approve, hold or edit any step before it runs.", "Reuse a flow for every new customer or launch."],
        visual: {
          type: "workflow",
          title: "New lead flow",
          steps: [
            { icon: "mail", label: "New lead in your inbox", meta: "Trigger" },
            { icon: "sparkle", label: "Sales agent drafts a reply", meta: "Agent" },
            { icon: "check", label: "You approve the draft", meta: "Approval" },
            { icon: "bolt", label: "Reply sent, CRM updated", meta: "Done" },
          ] satisfies { icon: LineIconName; label: string; meta: string }[],
        },
      },
      {
        id: "canvas",
        label: "The Canvas",
        title: "See the whole company on one canvas",
        description:
          "Every department sits on one map. Open a team to see its agents, tasks and shared context — and how work moves between them.",
        points: ["Spot blocked work at a glance.", "Shared context keeps every agent on brand."],
        visual: {
          type: "canvas",
          center: siteConfig.name,
          nodes: [
            { icon: "chart", label: "Sales" },
            { icon: "sparkle", label: "Design" },
            { icon: "code", label: "Engineering" },
            { icon: "megaphone", label: "Marketing" },
            { icon: "bank", label: "Finance" },
            { icon: "scale", label: "Legal" },
            { icon: "list", label: "Operations" },
            { icon: "headset", label: "Support" },
          ] satisfies { icon: LineIconName; label: string }[],
        },
      },
    ],
  },

  stats: {
    eyebrow: "Stats",
    title: "The numbers behind",
    accent: "building smarter.",
    /** Example numbers – replace with your own data. */
    items: [
      { icon: "globe", value: "3 days", label: "Median time from first sentence to a live business." },
      { icon: "clock", value: "11 hrs", label: "Admin hours returned every week." },
      { icon: "list", value: "94%", label: "Tasks finished without a follow-up question." },
      { icon: "bank", value: "$2,140", label: "Average monthly spend replaced per business." },
    ] satisfies { icon: LineIconName; value: string; label: string }[],
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "From one sentence to a",
    accent: "running company.",
    steps: [
      {
        title: "Describe the idea",
        description: "One paragraph is enough. Vaxnori turns it into a roadmap of concrete tasks.",
        card: {
          type: "idea",
          label: "Your idea",
          text: "A premium cookie and spice brand for New York City",
          drafted: "12 tasks drafted",
          tasks: [
            { icon: "sparkle", label: "Branding identity", meta: "Task 01" },
            { icon: "globe", label: "Buy domain", meta: "Task 02" },
            { icon: "building", label: "File the LLC", meta: "Task 03" },
          ] satisfies { icon: LineIconName; label: string; meta: string }[],
        },
      },
      {
        title: "Approve the plan",
        description: "Every task shows what it will do and what it costs before it runs.",
        card: {
          type: "approve",
          title: "Register mobain.co",
          status: "Needs approval",
          approvedLabel: "Approved",
          rows: [
            ["Cost", "$14.00/yr"],
            ["Registrar", "Your registrar"],
            ["Reversible", "No"],
          ] as [string, string][],
          hold: "Hold",
          approve: "Approve",
        },
      },
      {
        title: "Watch it ship",
        description: "Agents execute in the background and report back to you.",
        card: {
          type: "activity",
          title: "Activity",
          /** Counter label: "{n} shipped". */
          shippedLabel: "shipped",
          items: [
            { icon: "sparkle", label: "Branding identity", meta: "9:00" },
            { icon: "globe", label: "Domain secured", meta: "9:12" },
            { icon: "building", label: "LLC filed in NY", meta: "9:28" },
          ] satisfies { icon: LineIconName; label: string; meta: string }[],
          progress: { icon: "globe" as LineIconName, label: "Website in progress", value: 75, liveLabel: "Website live" },
        },
      },
    ],
  },

  /** Sample testimonial with an AI-generated portrait. Replace with a real customer quote. */
  testimonial: {
    quote:
      "Vaxnori AI helped me turn an idea into a real business without getting buried in endless setup tasks. It gave me a clear roadmap, handled the execution, and kept me involved in every important decision.",
    name: "Alex Morgan",
    role: "Founder",
    image: { src: "/images/home/testimonial-portrait.webp", alt: "Portrait of Alex Morgan" },
    background: "/images/patterns/tiles-orange.webp",
  },

  features: [
    {
      eyebrow: "01 — Launch",
      title: "A brand, a domain, and an LLC",
      accent: "before your coffee cools.",
      description:
        "Vaxnori reads your idea and drafts positioning, brand voice, and a visual identity. It shortlists domains, incorporates the LLC, and asks for your sign-off at every irreversible step.",
      visual: {
        type: "launch",
        checklistTitle: "Launch checklist",
        tasks: [
          { label: "Positioning & brand voice", status: "Drafted", tone: "todo" },
          { label: "Visual identity", status: "Done", tone: "done" },
          { label: "Buy mobain.co · $14/yr", status: "Needs Sign off", tone: "progress" },
          { label: "File Delaware LLC", status: "Queued", tone: "queued" },
        ],
        queuedLabel: "Queued",
        identityTitle: "Identity",
        brand: "Mobain",
        voice: ["Warm · plain-spoken", "Never cute"],
        colors: ["#ff4820", "#ffcf00", "#e8e1d6", "#f7f5f1"],
      },
      image: {
        src: "/images/home/feature-launch.webp",
        alt: "Launch checklist with brand voice, visual identity, domain and LLC tasks, and a brand colour palette",
      },
    },
    {
      eyebrow: "02 — Grow",
      title: "It finds your first hundred",
      accent: "customers by name.",
      description:
        "Market research, prospect lists, and outreach written in your brand voice — coordinated so the story stays consistent from cold email to landing page. You review before anything sends.",
      visual: {
        type: "grow",
        funnel: [
          { label: "Buyers researched", value: 312 },
          { label: "Fit the brand", value: 104 },
          { label: "Emailed this week", value: 42 },
          { label: "Calls booked", value: 3 },
        ],
        draftLabel: "Draft · In your brand voice",
        draft: "\"Steve — you stock small-batch bakers. We make one cookie, very well. Six samples, no invoice?\"",
        hold: "Hold",
        approve: "Approve",
        sent: "Sent ✓",
      },
      image: {
        src: "/images/home/feature-grow.webp",
        alt: "Outreach funnel: 312 buyers researched, 104 fit the brand, 42 emailed, 3 calls booked, with a draft email waiting for approval",
      },
    },
    {
      eyebrow: "03 — Run",
      title: "The boring parts of every business,",
      accent: "on a schedule.",
      description:
        "Support inboxes triaged, analytics summarized every Monday, invoices chased, filings reminded. Recurring work becomes recurring tasks — with a human veto on all of it.",
      visual: {
        type: "run",
        recurringTitle: "Recurring",
        recurringNote: "This week",
        recurring: [
          { day: "Mon", label: "Positioning & brand voice", done: "Sent" },
          { day: "Tue", label: "Visual identity", done: "" },
        ],
        queuedLabel: "Queued",
        digestTitle: "Monday digest",
        metrics: [
          { value: 211, decimals: 0, suffix: "", label: "Signups" },
          { value: 9.2, decimals: 1, suffix: "k", label: "Weekly active" },
          { value: 14, decimals: 0, suffix: "", label: "Tickets closed" },
        ],
        /** Pairs of bars (orange, yellow), height in % of the chart. */
        bars: [[36, 58], [47, 68], [55, 68], [64, 97], [73, 88], [74, 83], [64, 47]],
      },
      image: {
        src: "/images/home/feature-run.webp",
        alt: "Recurring weekly tasks and a Monday digest with signups, weekly active users and closed tickets",
      },
    },
  ],

  cta: {
    title: "A smarter way to",
    accent: "build a company",
    description:
      "Skip the endless research, planning, and setup. Vaxnori AI works alongside you to create your brand, organize your launch, and handle the operational details.",
    secondary: { label: "Contact Us", href: "/contact" },
    primary: { label: "Try it for Free", href: "/pricing" },
  },

  integrations: {
    eyebrow: "Integrations",
    title: "It logs into the accounts",
    accent: "you already have.",
    /** Generic categories – swap in your real integrations. */
    items: [
      { icon: "mail", name: "Email", description: "Sends and triages outreach", from: "#fd7a77", to: "#fc413d" },
      { icon: "card", name: "Payments", description: "Invoices and chases payment", from: "#8a84ff", to: "#635bff" },
      { icon: "globe", name: "Domains", description: "Buys and points domains", from: "#f39a9a", to: "#ef7878" },
      { icon: "chat", name: "Team chat", description: "Asks you before it acts", from: "#6cd5f4", to: "#36c5f0" },
      { icon: "doc", name: "Docs & wiki", description: "Keeps the company wiki current", from: "#333333", to: "#000000" },
      { icon: "bag", name: "Storefront", description: "Lists products and fixes copy", from: "#95bf46", to: "#5e8e3e" },
      { icon: "receipt", name: "Accounting", description: "Files receipts weekly", from: "#46ac38", to: "#2ca01c" },
      { icon: "megaphone", name: "Ads", description: "Runs and trims campaigns", from: "#71a4f7", to: "#4285f4" },
    ] satisfies {
      icon: LineIconName;
      name: string;
      description: string;
      /** App-icon gradient. `to` is the brand colour from the Figma integration logo, `from` a lighter tint. */
      from: string;
      to: string;
    }[],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Your fair questions,",
    accent: "our straight answers.",
    cta: { label: "Contact Us", href: "/contact" },
    items: [
      {
        question: "Who owns what Vaxnori AI creates?",
        answer:
          "You do. The brand, the domain, the company, the content — everything is registered in your name. Vaxnori AI holds nothing hostage.",
      },
      {
        question: "What runs without my approval?",
        answer:
          "Only work you mark as routine, like summaries, reminders and drafts. Anything that spends money, signs a document or contacts a customer waits for your approval.",
      },
      {
        question: "Can I use it with a business I already run?",
        answer:
          "Yes. Connect the accounts you already use and Vaxnori AI picks up from where you are. You do not need to start a new company.",
      },
      {
        question: "Where can it incorporate?",
        answer:
          "It depends on the registration partners you connect. You can see the supported regions in your dashboard before you start.",
      },
      {
        question: "What happens if I cancel?",
        answer:
          "You keep everything. Your brand files, domain, company records and content stay in your name, and you can export your data at any time.",
      },
    ],
  },
} as const;

export type HomePage = typeof homePage;
