import { Principles, StorySection, TeamSection } from "@/components/sections/about-sections";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Stats } from "@/components/sections/stats";
import { aboutPage } from "@/config/pages/about";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/about", ...aboutPage.meta });

export default function AboutPage() {
  return (
    <>
      <PageHero {...aboutPage.hero} />
      <Principles items={aboutPage.principles} />
      <StorySection story={aboutPage.story} />
      <Stats content={aboutPage.stats} />
      <TeamSection team={aboutPage.team} />
      <CtaBanner content={aboutPage.cta} />
    </>
  );
}
