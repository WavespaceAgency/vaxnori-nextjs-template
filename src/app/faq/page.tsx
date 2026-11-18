import { homePage } from "@/config/pages/home";
import { CtaBanner } from "@/components/sections/cta-banner";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { Eyebrow } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { faqPage } from "@/config/pages/faq";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/faq", ...faqPage.meta });

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPage.groups.flatMap((g) =>
      g.items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
    ),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero {...faqPage.hero} className="pb-[44px]" />
      <Container bordered className="grid border-t border-dashed border-t-line-strong lg:grid-cols-[minmax(0,399px)_minmax(0,800px)] lg:pr-[41px] lg:pb-[65px]">
        <aside className="hidden px-[40px] pt-10 lg:block">
          <div className="sticky top-24">
            <TableOfContents title="FAQ topics" headings={faqPage.groups.map((g) => g.label)} size="lg" showTitle={false} />
          </div>
        </aside>
        <div className="border-dashed border-line-strong pb-6 lg:self-start lg:border-l lg:pb-0">
          {faqPage.groups.map((group) => (
            <section key={group.id} id={slug(group.label)} aria-label={group.label} className="scroll-mt-20">
              <Reveal className="px-6 pt-10 pb-2 lg:px-8 lg:pt-[48px]">
                <Eyebrow as="h2">{group.label}</Eyebrow>
              </Reveal>
              <Accordion items={group.items} variant="dashed" lastBorder defaultOpen={group.id === "getting-started" ? 0 : null} />
            </section>
          ))}
        </div>
      </Container>
      {/* Black CTA band + 50px gap before the footer (Figma FAQ page) */}
      <CtaBanner content={homePage.cta} id="faq-cta" bottomGap mobileSplit />
    </>
  );
}
