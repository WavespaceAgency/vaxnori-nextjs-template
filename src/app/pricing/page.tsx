import { Faq } from "@/components/sections/faq";
import { FeatureRows } from "@/components/sections/feature-rows";
import { PageHero } from "@/components/sections/page-hero";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { ComparisonTable, PromiseBand } from "@/components/sections/pricing-sections";
import { pricingPage } from "@/config/pages/pricing";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/pricing", ...pricingPage.meta });

export default function PricingPage() {
  return (
    <>
      <PageHero {...pricingPage.hero}>
        <div className="mt-9 border-t border-dashed border-line-strong">
          <PricingPlans plans={pricingPage.plans} billing={pricingPage.billing} />
        </div>
      </PageHero>
      <ComparisonTable comparison={pricingPage.comparison} />
      <PromiseBand items={pricingPage.promises} />
      <FeatureRows content={[{ ...pricingPage.track, eyebrowLine: true }]} accentBreakMobile />
      <Faq content={pricingPage.faq} gapTop />
    </>
  );
}
