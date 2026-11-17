import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LogoStrip } from "@/components/sections/logo-strip";
import { PageHero } from "@/components/sections/page-hero";
import { StepRows } from "@/components/sections/step-rows";
import { VideoBlock } from "@/components/sections/video-block";
import { Reveal } from "@/components/motion/reveal";
import { homePage } from "@/config/pages/home";
import { howItWorksPage } from "@/config/pages/how-it-works";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/how-it-works", ...howItWorksPage.meta });

export default function HowItWorksPage() {
  return (
    <>
      <PageHero {...howItWorksPage.hero}>
        <div id="video" className="scroll-mt-20 p-6 sm:p-8 lg:px-[50px] lg:pt-[50px] lg:pb-[60px]">
          <Reveal delay={0.5} y={0}>
            <VideoBlock video={howItWorksPage.video} />
          </Reveal>
        </div>
      </PageHero>
      <LogoStrip content={homePage.logos} />
      {/* Desktop: large rows. Phones: the stacked step cards from the Figma mobile frame. */}
      <StepRows content={howItWorksPage.steps} />
      <div className="md:hidden">
        <HowItWorks content={homePage.howItWorks} />
      </div>
      <Faq content={howItWorksPage.faq} />
      <CtaBanner content={howItWorksPage.cta} bottomGap mobileSplit />
    </>
  );
}
