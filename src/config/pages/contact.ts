/** Contact page content. Sample details – replace with your own. */
import type { LineIconName } from "@/components/icons/line-icons";

export const contactPage = {
  meta: {
    title: "Contact",
    description: "Support, sales, partnerships or press – one form, routed to whoever can actually answer.",
  },
  hero: {
    eyebrow: "Contact Us",
    title: "Talk to a",
    accent: "human about it.",
    description:
      "Support, sales, partnerships or press — one form, routed to whoever can actually answer. Median first reply: four hours on weekdays.",
  },
  channels: [
    { icon: "info", title: "Something's stuck", description: "A task that failed, an approval that won't clear, a bill that looks wrong needs quick attention.", link: { label: "support@example.com", href: "mailto:support@example.com" } },
    { icon: "building", title: "Studio & agency plans", description: "Multiple client workspaces, procurement, security review all in one secure platform.", link: { label: "Book 20 minutes", href: "mailto:sales@example.com?subject=Book%2020%20minutes" } },
    { icon: "puzzle", title: "Build on Vaxnori AI", description: "Tool integrations, referral partnerships, accountants and lawyers.", link: { label: "partners@example.com", href: "mailto:partners@example.com" } },
    { icon: "mic", title: "Story or interview", description: "Founder availability, brand assets, product screenshots ready for launch.", link: { label: "press@example.com", href: "mailto:press@example.com" } },
  ] satisfies { icon: LineIconName; title: string; description: string; link: { label: string; href: string } }[],
  docs: {
    eyebrow: "Faster than a form",
    title: "Most answers already",
    accent: "live in the docs.",
    description: "Explore guides, docs, and resources before reaching out for faster solutions and clearer answers every time.",
    office: {
      flag: "🇺🇸",
      place: "Bay Area, California",
      map: "/images/contact/office-map.webp",
      rows: [
        { label: "General", value: "hello@example.com" },
        { label: "Support Hours", value: "Mon-Fri, 7am-7pm PT • in-app chat on Operator and Studio" },
        { label: "Response Time", value: "4 hours median, 1 business day worst case" },
      ],
    },
  },
  form: {
    title: "Send us a note",
    accent: "anytime",
    fields: {
      name: { label: "Full Name", placeholder: "Enter your name" },
      email: { label: "Email Address", placeholder: "Add your email address" },
      company: { label: "Company", placeholder: "Your company" },
      topic: { label: "Topic", options: ["Product question", "Something's stuck", "Sales & plans", "Partnerships", "Press"] },
      message: { label: "What can we help with?", placeholder: "Tell us a bit about what you need" },
    },
    submit: "Send Message",
    sending: "Sending…",
    note: "A task that failed, an approval that won't clear, a bill that looks wrong – mention it here and we'll route it to support.",
    success: "Thanks! Your message is on its way. We usually reply within four hours on weekdays.",
  },
  locations: {
    eyebrow: "Our locations",
    title: "Built across cities,",
    accent: "connected everywhere",
    items: [
      { label: "San Francisco", city: "San Francisco", image: "/images/contact/san-francisco.webp", alt: "Map of the Mission District with a pin on 2118 Mission St.", rows: [{ icon: "globe", text: "2118 Mission St. San Francisco, CA 94110" }, { icon: "clock", text: "Front desk Mon-Thu, 10am-5pm" }] },
      { label: "Lisbon", city: "Lisbon", image: "/images/contact/lisbon.webp", alt: "Map of central Lisbon with a pin on Rua da Prata 80", rows: [{ icon: "globe", text: "Rua da Prata 80, 1100-066 Lisboa" }, { icon: "clock", text: "By appointment" }] },
      { label: "Remote", city: "Remote", image: "/images/contact/remote.webp", alt: "World map with team members working together from anywhere", rows: [{ icon: "users", text: "Team members 11" }, { icon: "clock", text: "9am - 1pm PT overlap" }] },
    ] satisfies { label: string; city: string; image: string; alt: string; rows: { icon: LineIconName; text: string }[] }[],
  },
} as const;
