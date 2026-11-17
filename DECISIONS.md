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
