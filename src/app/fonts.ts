import { Geist_Pixel, Google_Sans_Flex, Inter } from "next/font/google";

/**
 * All fonts are free and open source (SIL Open Font License 1.1)
 * and are self-hosted by next/font at build time.
 * To change a font, swap the import and keep the `variable` name.
 */

/** Body text. The `opsz` axis gives the "Inter Display" look. */
export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-inter",
});

/** Headings. */
export const fontHeading = Google_Sans_Flex({
  subsets: ["latin"],
  axes: ["opsz", "slnt"], // opsz: display cut for big headings (as in Figma); slnt: italic
  display: "swap",
  variable: "--font-google-sans-flex",
  // Next.js has no fallback metrics for this font yet.
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** Pixel accent words in headings (e.g. "running company."). */
export const fontPixel = Geist_Pixel({
  subsets: ["latin"],
  axes: ["ELSH"], // element shape: 80 = "Line" style used in the design
  display: "swap",
  variable: "--font-geist-pixel",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "monospace"],
});
