import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LogoMarkAlt } from "@/components/icons";
import { LineIcon, type LineIconName } from "@/components/icons/line-icons";
import { HiringProcess } from "@/components/careers/careers-sections";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { careersPage } from "@/config/pages/careers";
import { siteConfig } from "@/config/site";
import { formatDate, getJobSlugs, loadJob } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!getJobSlugs().includes(slug)) return {};
  const { meta } = await loadJob(slug);
  return createMetadata({ path: `/careers/${slug}`, title: `${meta.title} – Careers`, description: `${meta.summary}. ${meta.location}, ${meta.type}.` });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  // Unknown slugs show the 404 page.
  if (!getJobSlugs().includes(slug)) notFound();
  const { default: Content, meta } = await loadJob(slug);
  const t = careersPage.job;
  const details: { icon: LineIconName; value: string; label: string }[] = [
    { icon: "building", value: siteConfig.name, label: t.companyLabel },
    { icon: "bag", value: meta.type, label: t.typeLabel },
    { icon: "sparkle", value: meta.function, label: t.functionLabel },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: meta.title,
    description: `${meta.summary}. ${meta.equity}`,
    datePosted: meta.posted,
    employmentType: "FULL_TIME",
    hiringOrganization: { "@type": "Organization", name: siteConfig.name, sameAs: siteConfig.url },
    jobLocationType: meta.location.toLowerCase().includes("remote") ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: meta.location.toLowerCase().includes("remote") ? [{ "@type": "Country", name: "US" }, { "@type": "Country", name: "EU" }] : undefined,
    jobLocation: meta.location.toLowerCase().includes("remote") ? undefined : { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: meta.location } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Container bordered className="px-4 pt-6 sm:px-8 lg:px-[50px] lg:pt-[30px]">
        <nav aria-label="Breadcrumb" className="flex gap-2 text-xs tracking-[0.02em] text-subtle uppercase lg:text-sm">
          <Link href="/careers" className="hover:text-ink">
            {t.breadcrumb}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-brand-strong" aria-current="page">
            {meta.team}
          </span>
        </nav>

        <Reveal y={20} scale className="relative mt-6 aspect-[1137/390] overflow-hidden rounded-[4px] max-sm:aspect-[16/9]">
          <Image src={t.cover} alt={t.coverAlt} fill priority sizes="(min-width: 1280px) 1137px, 100vw" className="object-cover" />
        </Reveal>
        <span aria-hidden="true" className="relative z-10 -mt-10 ml-6 flex size-20 items-center justify-center rounded-full border-4 border-surface bg-brand text-white lg:ml-[55px]">
          <LogoMarkAlt className="size-9" />
        </span>

        <div className="grid gap-10 pt-6 pb-14 lg:grid-cols-[minmax(0,732px)_288px] lg:justify-between lg:px-[55px] lg:pb-[100px]">
          <div>
            <Reveal className="border-b border-dashed border-line pb-8">
              <h1 className="font-heading-flex text-[32px] leading-10 font-medium tracking-[-0.03em] text-ink lg:text-[40px] lg:leading-[44px]">{meta.title}</h1>
              <p className="mt-2 text-base text-muted">{meta.location.includes("Remote") ? "Remote in US or EU unless noted" : meta.location}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {[meta.team, meta.location, meta.type, meta.salaryShort, `${t.postedLabel} ${formatDate(meta.posted)}`].map((tag) => (
                  <li key={tag} className="rounded-full bg-surface-muted px-3 py-1 text-sm text-ink">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="[&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:leading-7 [&_p]:my-2 [&_p]:text-[15px] [&_p]:leading-6 [&_ul]:my-2 [&_ul]:gap-1 [&_ul]:text-sm [&_ul]:leading-6">
              <Content />
            </div>
          </div>

          <aside className="max-lg:order-first">
            <Reveal delay={0.15} className="rounded-card lg:sticky lg:top-24 border border-line bg-surface p-5 shadow-card">
              <p className="text-xs tracking-[0.04em] text-subtle uppercase">{t.compensation}</p>
              <p className="mt-2 font-heading-flex text-2xl font-medium tracking-[-0.03em] text-ink">{meta.salary}</p>
              <p className="mt-1 text-xs leading-4 text-muted">{meta.equity}</p>
              <p className="mt-6 border-t border-line pt-4 text-xs text-subtle">{t.details}</p>
              <ul className="mt-3 flex flex-col gap-4">
                {details.map((d) => (
                  <li key={d.label} className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-canvas text-muted">
                      <LineIcon name={d.icon} className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-ink">{d.value}</span>
                      <span className="block text-xs text-subtle">{d.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Button href={t.apply.href} className="mt-6 w-full">
                {t.apply.label}
              </Button>
            </Reveal>
          </aside>
        </div>
      </Container>
      <HiringProcess {...careersPage.hiring} />
    </>
  );
}
