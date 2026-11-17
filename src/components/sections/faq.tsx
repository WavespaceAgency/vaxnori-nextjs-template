import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";

export function Faq({ content }: { content: HomePage["faq"] }) {
  return (
    <section aria-labelledby="faq-title">
      <Container bordered className="border-t border-dashed border-t-line">
        <div className="grid lg:grid-cols-[540fr_700fr]">
          <div className="reveal flex flex-col items-start gap-8 px-4 py-10 sm:px-8 lg:px-[50px] lg:pt-8">
            <SectionHeading id="faq-title" eyebrow={content.eyebrow} title={content.title} accent={content.accent} titleClassName="max-w-[414px]" />
            <Button href={content.cta.href} size="lg">
              {content.cta.label}
            </Button>
          </div>
          <div className="border-t border-dashed border-line lg:border-t-0 lg:border-l">
            {content.items.map((item, index) => (
              <details key={item.question} name="home-faq" open={index === 0} className="group border-b border-dashed border-line last:border-b-0">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 px-4 py-6 transition-colors hover:bg-canvas sm:px-8 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-heading-flex text-h4 font-medium text-ink">{item.question}</h3>
                  <span aria-hidden="true" className="relative flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand text-brand">
                    <span className="absolute h-[1.5px] w-2 bg-current" />
                    <span className="absolute h-2 w-[1.5px] bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="-mt-3 px-4 pr-14 pb-6 text-base leading-6 text-muted motion-safe:group-open:animate-fade-up sm:px-8 sm:pr-20">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="bg-dots h-16 border-t border-dashed border-line lg:h-[100px]" />
      </Container>
    </section>
  );
}
