# Design and build decisions

This log lists every choice made where the Figma file was missing something, or where the
template rules needed a change. It will move into the README in Phase 8.

## Rights (Phase 0)
- Design owned by Wavespace, not sold anywhere, images are AI-made or our own → free MIT release is OK.
- Fonts: Inter, Google Sans Flex, Geist Pixel – all SIL Open Font License, loaded with `next/font/google` (self-hosted at build, no requests to Google).

## Phase 1 – Setup
- **Next.js 16.4.6**, App Router, Cache Components + Partial Prefetching (the new defaults), Tailwind CSS 4, TypeScript strict.
- **Inter Display** = Inter with the `opsz` axis set to 32 (body text).
- **Accessible orange.** Figma Primary `#FF4820` with white text gives only 3.4:1 contrast (WCAG needs 4.5:1).
  Buttons and small orange text use `--brand-strong: #D9380E` (4.6:1). `#FF4820` is kept for icons, shapes and fills.
  To go back to the exact Figma colour, change `--brand-strong` in `src/app/globals.css`.
- **Grey text.** Figma Grey 3 `#999` fails contrast for small text → `--subtle: #737373`. Large pixel accent words use `#949494` (3:1, allowed for large text).
- **"Log in" button removed** from the navbar (no log-in page in this template).
- **Nav label typos fixed:** "How it work" → "How it works", "Contact US" → "Contact".
- **Mobile menu:** Figma menu has no About link and no CTA. Added About (so every page is reachable) and a full-width "Get Started" button at the bottom.
- **One brand mark.** Figma uses two different marks (heart-"V" on desktop, a diamond on mobile). The template uses the heart mark everywhere: navbar, mobile menu, favicon, footer.
- **Footer**
  - "Subscribe our newsletter" → "Subscribe to our newsletter". Mobile Figma button said "Get Started" → "Subscribe" on all sizes.
  - Email `hello@vaxnori.co` / `hello@kickoff.co` (mismatch in Figma) → `hello@example.com` (a safe placeholder domain).
  - The giant "Vaxnori AI" wordmark is real text from `siteConfig.name` (not an SVG), so it changes when the template is rebranded.
  - The brand-mark cell grid is drawn with CSS; only the heart is an SVG (`public/brand/mark.svg`).
  - Social links point to the platform home pages as placeholders – change them in `src/config/site.ts`.
  - Tablet (768–1279px): no Figma frame. Layout = tagline + newsletter on top, then 3 columns (Explore, Company + socials, mark), then the legal row.
  - Mobile below 768px: social icons get their own full-width row (they did not fit next to the Company links at 320px).
- **Newsletter form:** browser-side check + a Server Action (`src/lib/actions.ts`) that only logs the email. Connect a provider at the `TODO`.
- **Navbar breakpoint:** desktop links from 1024px; below that, the logo + menu button (Figma mobile pattern).
- **Header** has a solid white background (a blur effect broke the full-screen mobile menu).

## Phase 2 – Home page
- **All 10 sections built** in Figma order: Hero, Logos, Product tabs, Stats, How it works, Testimonial, 3 feature rows, CTA banner, Integrations, FAQ. All text lives in `src/config/pages/home.ts`.
- **Images:** mockups exported from Figma at **2x**, saved as WebP (quality 88–90). `next/image` serves AVIF/WebP at the right size. The hero preview and How-it-works cards are **real HTML** (sharp at any size, animated, easy to edit).
- **Animations (CSS only, no animation library):**
  - Hero: cards pop in one after another, progress bars fill, "Registering…" pulses, connector lines flow, corner squares float.
  - Logo row scrolls slowly (pauses on hover).
  - Sections fade up as you scroll, using CSS scroll-driven animations. Browsers without support simply show the content.
  - Workflow steps light up in turn; Canvas departments float; Stats diamonds turn slowly; FAQ answers fade in.
  - Everything is switched off for visitors who turn on "reduce motion".
- **Pixel font style:** Geist Pixel "Line" = `ELSH` axis 80. Accent words use Figma Grey 1 (`#5E5E5E`).
- **Heading weight:** Google Sans Flex Medium (500), as in Figma.
- **Real brands removed:**
  - Logo row ("Fieldguide, Muzz, Gitbook, Pylon, Slope, Scope3") → neutral placeholder logos (Acme, Logoipsum, Northwind, …).
  - "Vaxnori AI is trusted by 100K+ partners" → "Built for founders and small teams everywhere".
  - Integrations (Gmail, Stripe, Porkbun, Slack, Notion, Shopify, QuickBooks, Google Ads) → generic categories with line icons (Email, Payments, Domains, Team chat, Docs & wiki, Storefront, Accounting, Ads).
  - "Porkbun" inside the How-it-works mockup → "Your registrar".
- **Personal name removed:** "Hi Saeid" in the product screenshot → "Hi there".
- **Typos fixed:** "Vaxnora AI" → "Vaxnori AI" (hero mockup), "Kickoff holds nothing hostage" → "Vaxnori AI holds nothing hostage".
- **Duplicate heading fixed:** How it works is now "Three steps from idea to launch." (Product keeps "From one sentence to a running company.").
- **Product tabs:** Figma only designs "Your AI team". "Workflows" and "The Canvas" got new copy and code-drawn, animated visuals in the same style.
- **FAQ:** Figma/Framer only had the first answer. Answers 2–5 were written for the template.
- **Testimonial:** sample quote with an AI-generated portrait (marked as sample in the config).
- **Stats numbers** are example data for the fictional brand (marked in the config).
- **Responsive choices (no tablet frame):**
  - Hero preview uses exact Figma positions from 1280px; below that the cards stack (less important cards hidden on phones).
  - Stats: 2 columns on tablet, 1 on phones (decorative cells hidden on phones).
  - How it works: 3 columns from 768px. Integrations: 2 columns on phones/tablet, 4 on desktop.
  - Product tabs scroll sideways on small phones.

## Phase 2 fixes – Motion animations
- **Motion (`motion` 14, MIT)** added for animations CSS cannot do. Vercel Templates allows any MIT dependency.
  It loads once through `LazyMotion` + `m` components (`src/components/motion/motion-provider.tsx`), and
  `MotionConfig reducedMotion="user"` turns movement off for visitors who ask for less motion.
- **Reusable animation parts** in `src/components/motion/`: `Reveal`, `Stagger`/`StaggerItem` (blur + fade + lift on scroll),
  `CountUp` (stats), `Tilt` (3D mouse tilt), `Parallax`, `SplitWords` (word-by-word heading), `GrowBar` (progress bars).
- Where Motion is used: hero heading (words, no opacity change so LCP is not delayed), hero mockup tilt, section reveals,
  sliding nav hover + active line, sliding tab underline + animated tab panels, counting stats, parallax feature images,
  FAQ open/close (height animation), mobile menu (wipe-in + staggered links), footer reveal.
- Small looping effects (marquee, floating squares, pulses, workflow glow) stay in CSS – cheaper than JavaScript.
- **Bugs fixed:** Stats grid borders (each cell now draws its own lines), pointer cursor on all buttons/tabs (Tailwind 4 removed it),
  tab buttons no longer jump (a hidden medium-weight copy keeps each tab's width fixed).
- **FAQ accordion** is now a button-based accordion (`aria-expanded`, `aria-controls`). Closed answers stay in the HTML for SEO.
- Product image renamed to `product-workspace.webp` so no old cached copy (with the personal name) can be served.

## Pixel-perfect pass (Home, desktop 1440 + mobile 402)
- Method: every section was screenshotted side by side with the Figma frame and measured. Result: each section is
  within 0–5px of the Figma height on desktop and within 0–9px on mobile.
- **Font fix:** Google Sans Flex now loads its `opsz` axis (and `slnt` for italic step numbers). Without it the
  headings were ~2.5% wider than Figma and wrapped differently. Now "It logs into the accounts" = 406.5px (Figma 407px).
- Removed `text-wrap: balance/pretty` – Figma does not balance lines.
- **Content now follows Figma exactly** (owner's choice "Figma, but legal-safe, typos fixed"):
  - How it works heading is again "From one sentence to a running company." (same as Product, as in Figma).
  - Nav "Contact Us", email hello@vaxnori.co, mobile menu = Figma list (no extra About link / button).
  - Kept legal fixes only: placeholder logos, generic integration icons, "Hi there" instead of a personal name,
    "trusted by teams like these" instead of "100K+ partners", no Log in button (no log-in page).
  - Figma copy-paste slips on mobile were NOT copied: the mobile FAQ and feature rows reuse the How-it-works heading in Figma;
    the template keeps the real headings. The mobile footer button says "Get Started" in Figma; the template uses "Subscribe" everywhere.
- **Two brand marks, as in Figma:** heart (`/brand/mark.svg`) on desktop nav + desktop footer; diamond (`/brand/mark-alt.svg`)
  on mobile nav, mobile menu, mobile footer and the stats cell.
- **Hero preview:** one fixed 1140×562 composition (exact Figma positions), scaled down on small screens by `ScaleToFit`
  (taller 1140×648 frame on phones, as in the Figma mobile frame). Background is the exact Figma crop at 2x.
- Active tab: black 1px bottom border inside the tab, above the dashed line (Figma).
- Stats grid uses Figma's exact column widths (294/552/294 and 392/393/355).
- Footer: fixed 308px top row, left-aligned socials, Figma background crop, grid behind the mark, wordmark at the exact
  Figma size (1216×207, real text so it changes with the brand name).
- Feature images: parallax removed (it enlarged the images vs Figma); hover zoom kept.
