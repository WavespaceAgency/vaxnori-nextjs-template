import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export type CtaContent = {
  title: string;
  accent: string;
  description: string;
  secondary: { label: string; href: string };
  primary: { label: string; href: string };
};

/**
 * Black call-to-action band.
 * - `mobileSplit`: on phones move the first accent word up to line one (Home in Figma).
 * - `bottomGap`: 50px of white space under the band (inner pages in Figma).
 */
export function CtaBanner({
  content,
  id = "cta-title",
  mobileSplit = false,
  bottomGap = false,
  wideText = false,
}: {
  content: CtaContent;
  /** Description up to 582px wide (Home) instead of 421px. */
  wideText?: boolean;
  id?: string;
  mobileSplit?: boolean;
  bottomGap?: boolean;
}) {
  const [firstAccent, ...restAccent] = content.accent.split(" ");
  return (
    <section aria-labelledby={id}>
      <Container bordered={bottomGap} className={cn(bottomGap && "lg:pb-[50px]")}>
        <div className="relative overflow-hidden bg-ink px-6 py-14 sm:px-8 lg:px-[50px] lg:py-[50px]">
          <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <Reveal className="flex max-w-[764px] flex-col gap-4">
              <h2 id={id} className="font-heading-flex text-[28px] leading-9 font-medium tracking-[-0.03em] text-white lg:text-h2 lg:leading-[44px]">
                {mobileSplit ? (
                  <>
                    {content.title} <span className="lg:font-pixel-line lg:text-white/75">{firstAccent}</span>{" "}
                    <br className="lg:hidden" />
                    <span className="font-pixel-line text-white/75">{restAccent.join(" ")}</span>
                  </>
                ) : (
                  <>
                    {content.title} <span className="font-pixel-line text-white/75">{content.accent}</span>
                  </>
                )}
              </h2>
              <p className={cn("text-base leading-6 text-white/70", mobileSplit || wideText ? "max-w-[582px]" : "max-w-[421px]")}>{content.description}</p>
            </Reveal>
            <Reveal delay={0.15} className="flex gap-4 max-lg:[&>*]:flex-1">
              <Button href={content.secondary.href} variant="dark-raised" size="lg">
                {content.secondary.label}
              </Button>
              <Button href={content.primary.href} size="lg">
                {content.primary.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
