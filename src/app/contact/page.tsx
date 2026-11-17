import Image from "next/image";
import { ContactForm } from "@/components/contact/contact-form";
import { LineIcon } from "@/components/icons/line-icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactPage } from "@/config/pages/contact";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/contact", ...contactPage.meta });

export default function ContactPage() {
  const { channels, docs, form, locations } = contactPage;
  return (
    <>
      <PageHero {...contactPage.hero} className="pb-[30px]" />

      {/* Ways to reach us */}
      <section aria-label="Ways to reach us">
        <Container bordered className="border-t border-dashed border-t-line">
          <Stagger as="ul" gap={0.08} className="grid sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => (
              <StaggerItem
                as="li"
                key={c.title}
                className="group flex flex-col gap-6 border-b border-dashed border-line px-6 py-8 sm:border-r lg:gap-8 lg:py-10 lg:min-h-[356px] lg:justify-between lg:border-b-0 lg:px-8 lg:last:border-r-0"
              >
                <LineIcon name={c.icon} className="size-8 text-ink" />
                <div className="flex flex-col gap-2">
                  <h2 className="font-heading-flex text-h4 font-medium text-ink">{c.title}</h2>
                  <p className="text-[15px] leading-5 text-muted">{c.description}</p>
                  <a href={c.link.href} className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-strong">
                    {c.link.label}
                    <LineIcon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Docs + office card | form */}
      <section aria-labelledby="form-title">
        <Container bordered className="grid border-t border-dashed border-t-line lg:grid-cols-2">
          <div className="flex flex-col gap-10 px-6 py-14 sm:px-8 lg:px-[49px] lg:py-12">
            <Reveal>
              <SectionHeading eyebrow={docs.eyebrow} title={docs.title} accent={docs.accent} description={docs.description} titleClassName="max-w-[300px] lg:max-w-[440px]" accentBreak />
            </Reveal>
            <Reveal scale delay={0.1} className="relative overflow-hidden border border-line bg-canvas p-4 pt-16 lg:-mx-[49px] lg:border-0 lg:bg-transparent lg:px-[49px] lg:pt-20 lg:pb-2">
              <Image src={docs.office.map} alt="" width={822} height={555} sizes="300px" className="pointer-events-none absolute top-0 right-0 h-auto w-[62%] max-w-[360px]" />
              <p className="relative flex items-center gap-3 text-lg font-semibold text-ink">
                <span aria-hidden="true">{docs.office.flag}</span>
                {docs.office.place}
              </p>
              <dl className="relative mt-8 flex flex-col gap-6">
                {docs.office.rows.map((r) => (
                  <div key={r.label}>
                    <dt className="text-base font-medium text-ink">{r.label}</dt>
                    <dd className="mt-1 text-sm text-muted">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <div className="border-dashed border-line px-6 pb-14 sm:px-8 lg:border-l lg:px-[41px] lg:py-12">
            <Reveal className="mb-8">
              <h2 id="form-title" className="font-heading-flex text-2xl leading-7 font-medium tracking-[-0.03em] text-ink lg:text-h3 lg:leading-[38px]">
                {form.title} <span className="block font-pixel-line text-accent-text">{form.accent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm labels={form} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Locations */}
      <section aria-labelledby="locations-title">
        <Container bordered className="border-t border-dashed border-t-line pt-14 pb-14 lg:pt-[100px] lg:pb-[100px]">
          <Reveal className="px-6 sm:px-8 lg:px-[50px]">
            <SectionHeading id="locations-title" eyebrow={locations.eyebrow} title={locations.title} accent={locations.accent} titleClassName="max-w-[300px] lg:max-w-[440px]" accentBreak />
          </Reveal>
          <div className="relative mt-8 lg:mt-12">
            <span aria-hidden="true" className="absolute inset-x-0 top-[50px] hidden border-t border-dashed border-line md:block" />
            <Stagger as="ul" gap={0.12} className="relative grid px-6 md:grid-cols-3 md:px-4 lg:px-[50px]">
              {locations.items.map((l) => (
                <StaggerItem as="li" key={l.city} className="flex flex-col border-dashed border-line-strong max-md:border-x max-md:not-last:border-b md:border-r md:border-line md:first:border-l">
                  <p className="flex h-10 items-center px-4 font-heading-italic text-[15px] font-medium text-brand-strong md:h-[50px] md:px-5">{l.label}</p>
                  <div className="flex flex-col gap-6 border-t border-dashed border-line-strong p-4 md:border-0 md:p-5">
                    <div className="bg-dots overflow-hidden p-4 lg:p-5">
                      <Image src={l.image} alt={l.alt} width={846} height={540} sizes="(min-width: 1024px) 282px, 90vw" className="h-auto w-full transition-transform duration-700 hover:scale-[1.03]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-heading-flex text-h4 font-medium text-ink">{l.city}</h3>
                      {l.rows.map((r) => (
                        <p key={r.text} className="flex items-center gap-2 text-sm text-muted">
                          <LineIcon name={r.icon} className="size-4 shrink-0" />
                          {r.text}
                        </p>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>
    </>
  );
}
