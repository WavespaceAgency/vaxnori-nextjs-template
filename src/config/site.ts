/**
 * Site-wide settings.
 * ------------------------------------------------------------
 * Edit this file to rebrand the template: name, URL, navigation,
 * footer links, social profiles and the main call to action.
 * Page text lives in src/config/pages/*.ts.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type SocialPlatform = "linkedin" | "x" | "youtube";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

/**
 * The public URL of the site. Used for canonical links, Open Graph and the sitemap.
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically, so no setup is needed.
 * Set NEXT_PUBLIC_SITE_URL only if you use a custom domain elsewhere.
 */
function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

const year = new Date().getFullYear();
const name = "Vaxnori AI";
const legalName = "Vaxnori AI Inc.";

export const siteConfig = {
  name,
  legalName,
  url: getSiteUrl(),
  description:
    "Vaxnori AI takes care of everything from your brand identity and domain to business paperwork and website launch, built into every important step.",
  email: "hello@vaxnori.co",
  locale: "en_US",

  /**
   * Brand marks (SVG files in /public/brand). Figma uses two marks:
   * `mark` (navbar, desktop footer) and `markAlt` (mobile navbar, mobile footer, stats).
   * Use the same file twice if your brand has one mark.
   */
  brand: { mark: "/brand/mark.svg", markAlt: "/brand/mark-alt.svg" },

  /** Main call to action, used in the navbar and mobile menu. */
  cta: { label: "Get Started", href: "/pricing" },

  nav: {
    /** Desktop navbar links. */
    main: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
    /** Mobile menu links (as in the Figma mobile menu). */
    mobile: [
      { label: "Home", href: "/" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Careers", href: "/careers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  } satisfies Record<string, NavLink[]>,

  footer: {
    tagline: "An AI teammate that runs the company around you",
    newsletter: {
      label: "Subscribe to our newsletter",
      placeholder: "Enter email address",
      button: "Subscribe",
      success: "Thanks! Please check your inbox to confirm.",
    },
    columns: [
      {
        title: "Explore",
        links: [
          { label: "How it works", href: "/how-it-works" },
          { label: "Careers", href: "/careers" },
          { label: "Pricing", href: "/pricing" },
          { label: "Blog", href: "/blog" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "hello@vaxnori.co", href: "mailto:hello@vaxnori.co" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    legal: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms & conditions", href: "/terms" },
    ],
    copyright: `© ${year} ${legalName}`,
    background: {
      desktop: "/images/patterns/tiles-yellow.webp",
      mobile: "/images/patterns/tiles-yellow-tall.webp",
    },
  },

  socials: [
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
    { platform: "x", label: "X (Twitter)", href: "https://x.com/" },
    { platform: "youtube", label: "YouTube", href: "https://www.youtube.com/" },
  ] satisfies SocialLink[],
} as const;

export type SiteConfig = typeof siteConfig;
