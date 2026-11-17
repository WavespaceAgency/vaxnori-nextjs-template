import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";
import { cn } from "@/lib/utils";

/** Alternating text + image rows ("01 — Launch", "02 — Grow", ...). */
export function FeatureRows({ content }: { content: HomePage["features"] }) {
  return (
    <section aria-label="Features">
      <Container bordered>
        {content.map((feature, index) => {
          const flipped = index % 2 === 1;
          return (
            <article
              key={feature.eyebrow}
              className="grid items-center gap-10 border-t border-dashed border-line px-4 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-[50px] lg:py-[100px]"
            >
              <Reveal className={cn("max-w-[556px]", flipped && "lg:order-2 lg:justify-self-end")}>
              <SectionHeading
                eyebrow={feature.eyebrow}
                title={feature.title}
                accent={feature.accent}
                description={feature.description}
                as="h2"
                accentBreak
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
                <Parallax offset={18}>
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt}
                  width={1008}
                  height={800}
                  sizes="(min-width: 1280px) 504px, (min-width: 1024px) 40vw, 100vw"
                  className="h-auto w-full scale-[1.06] transition-transform duration-700 ease-out hover:scale-[1.09]"
                />
                </Parallax>
              </Reveal>
            </article>
          );
        })}
      </Container>
    </section>
  );
}
