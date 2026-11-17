import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/json-ld";
import { MotionProvider } from "@/components/motion/motion-provider";
import { siteConfig } from "@/config/site";
import { fontHeading, fontPixel, fontSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – From idea to launch, handled for you`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable} ${fontPixel.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${siteConfig.url}/#organization`,
                name: siteConfig.name,
                legalName: siteConfig.legalName,
                url: siteConfig.url,
                logo: `${siteConfig.url}/icon.svg`,
                email: siteConfig.email,
                sameAs: siteConfig.socials.map((s) => s.href),
              },
              {
                "@type": "WebSite",
                "@id": `${siteConfig.url}/#website`,
                url: siteConfig.url,
                name: siteConfig.name,
                description: siteConfig.description,
                publisher: { "@id": `${siteConfig.url}/#organization` },
              },
            ],
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-button focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
