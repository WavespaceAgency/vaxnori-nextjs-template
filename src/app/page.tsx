import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { FeatureRows } from "@/components/sections/feature-rows";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Integrations } from "@/components/sections/integrations";
import { LogoStrip } from "@/components/sections/logo-strip";
import { Product } from "@/components/sections/product";
import { Stats } from "@/components/sections/stats";
import { Testimonial } from "@/components/sections/testimonial";
import { JsonLd } from "@/components/json-ld";
import { homePage } from "@/config/pages/home";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  path: "/",
  title: homePage.meta.title,
  description: homePage.meta.description,
});

export default function HomePage() {
  return (
    <>
      {/* The home FAQ answers are visible on the page, so FAQPage data is allowed here. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homePage.faq.items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
        }}
      />
      <Hero content={homePage.hero} backgroundSrc={homePage.hero.background} />
      <LogoStrip content={homePage.logos} />
      <Product content={homePage.product} />
      <Stats content={homePage.stats} />
      <HowItWorks content={homePage.howItWorks} />
      <Testimonial content={homePage.testimonial} />
      <FeatureRows content={homePage.features} />
      <CtaBanner content={homePage.cta} mobileSplit />
      <Integrations content={homePage.integrations} />
      <Faq content={homePage.faq} />
    </>
  );
}
