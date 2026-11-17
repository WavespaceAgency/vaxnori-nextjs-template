import Image from "next/image";
import Link from "next/link";
import { LineIcon, type LineIconName } from "@/components/icons/line-icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Job } from "@/lib/content-types";

const teamIcons: Record<string, LineIconName> = {
  Design: "pencil",
  Engineering: "code",
  Operations: "doc",
  Support: "headset",
  Marketing: "megaphone",
};

/** Open roles: a table on desktop, cards on phones. */
export function RolesTable({ jobs, title, note, viewRole }: { jobs: Job[]; title: string; note: string; viewRole: string }) {
  return (
    <section aria-labelledby="roles-title" id="roles">
      <Container bordered className="border-t border-dashed border-t-line bg-canvas px-6 py-14 sm:px-8 lg:px-[49px] lg:py-[49px]">
        <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="roles-title" className="font-heading-flex text-2xl leading-7 font-medium tracking-[-0.03em] text-ink lg:text-h2 lg:leading-[44px]">
            {title}
          </h2>
          <p className="text-sm text-muted">{note}</p>
        </Reveal>
        <Stagger as="ul" gap={0.06} className="mt-4">
          {jobs.map((job) => (
            <StaggerItem as="li" key={job.slug} className="lg:border-b lg:border-line lg:last:border-b-0">
              <Link
                href={`/careers/${job.slug}`}
                className="group relative grid gap-x-4 border border-line bg-surface p-4 max-lg:-mt-px lg:h-[95px] lg:grid-cols-[minmax(0,1fr)_200px_200px_120px] lg:items-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
              >
                {/* Phones: icon + arrow row, as in the mobile design */}
                <span className="mb-8 flex items-start justify-between lg:hidden">
                  <LineIcon name={teamIcons[job.team] ?? "sparkle"} className="size-6 text-ink" />
                  <span className="flex size-7 items-center justify-center rounded-full bg-brand-soft text-brand-strong transition-transform duration-300 group-hover:rotate-45">
                    <LineIcon name="arrowRight" className="size-3.5 -rotate-45" />
                  </span>
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-ink transition-colors group-hover:text-brand-strong lg:text-lg">{job.title}</span>
                  <span className="text-xs text-muted lg:text-sm">{job.summary}</span>
                </span>
                <span className="mt-4 flex justify-between border-t border-line pt-3 text-xs text-muted lg:contents lg:text-sm">
                  <span>{job.team}</span>
                  <span>{job.location}</span>
                </span>
                <span className="hidden items-center gap-1.5 justify-self-end text-sm font-semibold text-brand-strong lg:inline-flex">
                  {viewRole}
                  <LineIcon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

/** "What comes with it" – 3×2 grid of benefits. */
export function Benefits({ title, accent, items }: { title: string; accent: string; items: readonly { icon: LineIconName; title: string; description: string }[] }) {
  return (
    <section aria-labelledby="benefits-title">
      <Container bordered className="pt-14 lg:pt-[100px]">
        <Reveal className="px-6 pb-8 sm:px-8 lg:pb-[60px] lg:text-center">
          <h2 id="benefits-title" className="font-heading-flex text-[28px] leading-9 font-medium tracking-[-0.03em] text-ink lg:text-h2 lg:leading-[44px]">
            {title} <span className="font-pixel-line text-accent-text max-lg:block">{accent}</span>
          </h2>
        </Reveal>
        <Stagger as="ul" gap={0.08} className="grid border-t border-dashed border-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="flex flex-col gap-8 border-b border-dashed border-line px-6 py-7 sm:border-r lg:min-h-[272px] lg:gap-12 lg:px-10 lg:py-10 lg:[&:nth-child(3n)]:border-r-0"
            >
              <LineIcon name={item.icon} className="size-8 text-ink" />
              <div className="flex flex-col gap-2">
                <h3 className="font-heading-flex text-h4 font-medium text-ink">{item.title}</h3>
                <p className="text-sm leading-[22px] text-muted lg:text-base lg:leading-6">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

type HiringStep = { title: string; description: string; image: string; alt: string };

/** Hiring process – four numbered columns with a picture each. */
export function HiringProcess({ eyebrow, title, accent, steps }: { eyebrow: string; title: string; accent: string; steps: readonly HiringStep[] }) {
  return (
    <section aria-labelledby="hiring-title">
      <Container bordered className="pt-14 pb-14 lg:pt-[100px] lg:pb-[100px]">
        <Reveal className="px-6 sm:px-8 lg:px-[50px]">
          <SectionHeading id="hiring-title" eyebrow={eyebrow} title={title} accent={accent} titleClassName="max-w-[320px] lg:max-w-[440px]" />
        </Reveal>
        <div className="relative mt-6 lg:mt-12">
          <span aria-hidden="true" className="absolute inset-x-0 top-[50px] hidden border-t border-dashed border-line md:block" />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-[50px] hidden border-t border-dashed border-line md:block" />
          <Stagger as="ol" gap={0.12} className="relative grid px-6 sm:grid-cols-2 md:px-4 lg:grid-cols-4 lg:px-[50px]">
            {steps.map((step, index) => (
              <StaggerItem
                as="li"
                key={step.title}
                className="flex flex-col border-dashed border-line-strong max-md:border-x max-md:not-last:border-b md:border-r md:border-line md:first:border-l"
              >
                <p className="flex h-10 items-center px-4 font-heading-italic text-[13px] font-medium text-brand-strong md:h-[50px] md:items-start md:px-5 md:pt-3 md:text-lg">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="flex flex-col gap-4 border-y border-dashed border-line-strong p-4 md:gap-8 md:border-0 md:p-5">
                  <div className="bg-dots overflow-hidden">
                    <Image src={step.image} alt={step.alt} width={490} height={468} sizes="(min-width: 1024px) 245px, 50vw" className="h-auto w-full transition-transform duration-700 hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-col gap-1 md:min-h-[72px] md:gap-2">
                    <h3 className="font-heading-flex text-lg leading-6 font-medium tracking-[-0.03em] text-ink md:text-h4">{step.title}</h3>
                    <p className="text-sm leading-5 text-muted md:text-base md:leading-6">{step.description}</p>
                  </div>
                </div>
                <span aria-hidden="true" className="hidden h-[50px] md:block" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
