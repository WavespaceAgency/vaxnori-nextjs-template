import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { HomePage } from "@/config/pages/home";

export function Testimonial({ content }: { content: HomePage["testimonial"] }) {
  return (
    <section aria-label="Customer story">
      <Container bordered className="bg-canvas px-4 py-12 sm:px-8 lg:px-[50px] lg:py-[60px]">
        <figure className="grid items-center gap-8 md:grid-cols-[280px_1fr] lg:gap-[100px] lg:pl-0">
          <Reveal scale className="relative mx-auto size-[280px] overflow-hidden md:mx-0">
            <Image src={content.background} alt="" fill sizes="280px" className="object-cover" />
            <div className="absolute inset-8 overflow-hidden bg-surface">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="216px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col gap-6 lg:pr-[60px]">
            <blockquote className="font-heading-flex text-xl leading-[1.45] font-medium tracking-[-0.01em] text-ink sm:text-2xl sm:leading-9">
              <p>&ldquo;{content.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="text-sm leading-5">
              <span className="font-semibold text-ink">{content.name},</span>{" "}
              <span className="text-subtle">{content.role}</span>
            </figcaption>
          </Reveal>
        </figure>
      </Container>
    </section>
  );
}
