import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Page not found", robots: { index: false } };

/** 404 page (no Figma frame – built from the inner-page hero pattern). */
export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="Error 404"
        title="This page wandered"
        accent="off the roadmap."
        description="The link may be old or the page may have moved. Head back home or tell us what you were looking for."
        primaryCta={{ label: "Back to home", href: "/" }}
        secondaryCta={{ label: "Contact us", href: "/contact" }}
      />
      <Container bordered className="bg-dots flex h-40 items-center justify-center lg:h-56">
        <p aria-hidden="true" className="font-pixel-line text-[96px] leading-none text-line-strong select-none lg:text-[160px]">
          404
        </p>
      </Container>
      <span className="sr-only">{siteConfig.name}</span>
    </>
  );
}
