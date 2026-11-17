import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { HomePage } from "@/config/pages/home";

export function Testimonial({ content }: { content: HomePage["testimonial"] }) {
  return (
    <section aria-label="Customer story">
      <Container bordered className="bg-canvas p-6 sm:px-8 lg:px-[50px] lg:py-[60px]">
        <figure className="grid items-center gap-8 md:grid-cols-[280px_1fr] lg:gap-[138px]">
          <Reveal scale className="relative aspect-square w-full overflow-hidden md:size-[280px]">
            <Image src={content.background} alt="" fill sizes="280px" className="object-cover" />
            <div className="absolute inset-[11.4%] overflow-hidden bg-surface">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(min-width: 768px) 216px, 80vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col gap-4 lg:gap-6 lg:pr-12">
            <blockquote className="font-heading-flex text-xl leading-8 font-medium tracking-[-0.03em] text-ink lg:text-[28px] lg:leading-10">
              <p>&quot;{content.quote}&quot;</p>
            </blockquote>
            <figcaption className="text-sm leading-6 lg:text-lg">
              <span className="font-medium text-ink">{content.name},</span>{" "}
              <span className="text-subtle">{content.role}</span>
            </figcaption>
          </Reveal>
        </figure>
      </Container>
    </section>
  );
}
