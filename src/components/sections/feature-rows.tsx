import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";
import { ScaleToFit } from "@/components/motion/scale-to-fit";
import { FeatureMockup } from "./feature-mockups";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";
import { cn } from "@/lib/utils";

/** Alternating text + image rows ("01 — Launch", "02 — Grow", ...). */
type Feature = HomePage["features"][number] | {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: { src: string; alt: string };
  eyebrowLine?: boolean;
};

export function FeatureRows({ content, accentBreakMobile = false }: { content: readonly Feature[]; accentBreakMobile?: boolean }) {
  return (
    <section aria-label="Features">
      <Container bordered>
        {content.map((feature, index) => {
          const flipped = index % 2 === 1;
          return (
            <article
              key={feature.eyebrow}
              className={cn("grid items-center gap-8 border-t border-dashed border-line px-6 py-14 first:border-t-0 sm:px-8 lg:gap-20 lg:px-[50px] lg:py-[100px]", flipped ? "lg:grid-cols-[504fr_556fr]" : "lg:grid-cols-[556fr_504fr]")}
            >
              <Reveal className={cn("max-w-[556px]", flipped && "lg:order-2")}>
              <SectionHeading
                eyebrow={feature.eyebrow}
                title={feature.title}
                accent={feature.accent}
                description={feature.description}
                as="h2"
                accentBreakMobile={accentBreakMobile}
                eyebrowLine={"eyebrowLine" in feature ? Boolean(feature.eyebrowLine) : false}
                descriptionClassName="max-lg:leading-5"
              />
              </Reveal>
              <Reveal
                scale
                delay={0.1}
                className={cn(
                  "w-full max-w-[504px] overflow-hidden rounded-[2px] border border-line-soft",
                  flipped ? "lg:order-1" : "lg:justify-self-end",
                )}
              >
                {"visual" in feature && feature.visual ? (
                  <div role="img" aria-label={feature.image.alt}>
                    <ScaleToFit width={504} height={400}>
                      <FeatureMockup visual={feature.visual} />
                    </ScaleToFit>
                  </div>
                ) : (
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    width={1008}
                    height={800}
                    sizes="(min-width: 1280px) 504px, (min-width: 1024px) 40vw, 100vw"
                    className="h-auto w-full transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                )}
              </Reveal>
            </article>
          );
        })}
      </Container>
    </section>
  );
}
