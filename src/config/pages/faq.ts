/** FAQ page content. Every answer here is visible on the page, so it is also added as FAQPage structured data. */
export const faqPage = {
  meta: {
    title: "FAQ",
    description: "Everything you need to know about how Vaxnori AI builds and runs your company.",
  },
  hero: {
    eyebrow: "FAQ",
    title: "Frequently",
    accent: "asked questions.",
    description: "Everything you need to know about how Vaxnori AI builds and runs your company.",
  },
  groups: [
    {
      id: "getting-started",
      label: "Getting Started",
      items: [
        { question: "What does Vaxnori AI actually do?", answer: "Vaxnori AI turns your idea into a structured roadmap with tasks, timelines, and actions needed to launch and grow your business." },
        { question: "How does Vaxnori create my launch plan?", answer: "It reads your idea, asks a few short questions, then drafts the tasks a new business needs – brand, domain, company filing, website and first customers – in the right order." },
        { question: "Do I have control over the tasks?", answer: "Yes. You can edit, reorder or remove any task, and nothing that costs money, signs a document or contacts a customer runs without your approval." },
        { question: "Can Vaxnori complete tasks automatically?", answer: "Routine tasks like drafts, research and summaries run on their own. Anything irreversible waits for your yes first." },
        { question: "What kind of businesses can use Vaxnori?", answer: "Solo founders, small teams and agencies – from online shops and local services to software and consulting businesses." },
      ],
    },
    {
      id: "control-and-trust",
      label: "Control & Trust",
      items: [
        { question: "How much control do I have over decisions?", answer: "All of it. You set spend limits, choose which tasks can run on their own, and approve everything that touches money, paperwork or the public." },
        { question: "Can I cancel or pause at any time?", answer: "Yes. Pause a single agent or the whole workspace from settings. Cancelling keeps your brand, domain and documents in your name." },
        { question: "Is my business data secure?", answer: "Data is encrypted in transit and at rest, credentials live in a separate secret store, and every action is written to an audit log you can export." },
      ],
    },
    {
      id: "after-launch",
      label: "After Launch",
      items: [
        { question: "What happens after my company launches?", answer: "Vaxnori AI moves on to growth and operations: outreach, recurring tasks like invoices and reports, and a weekly digest of what happened." },
        { question: "Can I bring in my own team later?", answer: "Yes. Invite teammates with their own roles and permissions, and hand any task to a person instead of an agent." },
        { question: "What if I need something Vaxnori AI can't automate?", answer: "The agent hands the task back with notes and suggestions, so you or a teammate can finish it without starting from scratch." },
      ],
    },
  ],
} as const;
