import { Benefits, HiringProcess, RolesTable } from "@/components/careers/careers-sections";
import { ValuesScroller } from "@/components/careers/values-scroller";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { careersPage } from "@/config/pages/careers";
import { getJobs } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/careers", ...careersPage.meta });

export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <>
      <PageHero {...careersPage.hero} className="pb-[30px]" />
      <section aria-label="How we work">
        <Container bordered className="border-t border-dashed border-t-line">
          <ValuesScroller values={careersPage.values} />
        </Container>
      </section>
      {/* Phones show benefits first (as in the mobile design) */}
      <div className="flex flex-col">
        <div className="order-2 lg:order-1">
          <RolesTable jobs={jobs} {...careersPage.roles} />
        </div>
        <div className="order-1 lg:order-2">
          <Benefits {...careersPage.benefits} />
        </div>
      </div>
      <CtaBanner content={careersPage.cta} id="careers-cta" />
      <HiringProcess {...careersPage.hiring} />
    </>
  );
}
