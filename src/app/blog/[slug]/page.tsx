import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { socialIcons } from "@/components/icons";
import { LineIcon } from "@/components/icons/line-icons";
import { Reveal } from "@/components/motion/reveal";
import { CornerSquares } from "@/components/sections/hero";
import { Container } from "@/components/ui/container";
import { blogPage } from "@/config/pages/blog";
import { siteConfig } from "@/config/site";
import { formatDate, getPosts, getPostSlugs, headingsFromMdx, loadPost, readSource } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const { meta } = await loadPost(slug);
  return createMetadata({ path: `/blog/${slug}`, title: meta.title, description: meta.excerpt, type: "article", image: `/blog/${slug}/opengraph-image` });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  // Unknown slugs show the 404 page.
  if (!getPostSlugs().includes(slug)) notFound();
  const { default: Content, meta } = await loadPost(slug);
  const headings = headingsFromMdx(readSource("blog", slug));
  const related = (await getPosts()).filter((post) => post.slug !== slug).slice(0, 2);
  const url = `${siteConfig.url}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    image: `${siteConfig.url}${meta.image}`,
    author: { "@type": "Person", name: meta.author.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: url,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Header */}
      <Container bordered className="relative overflow-hidden">
        <div aria-hidden="true" className="bg-dots h-12 border-b border-line lg:h-[74px]" />
        <CornerSquares side="left" />
        <CornerSquares side="right" />
        <div className="relative px-6 pt-[72px] text-center sm:px-8 lg:pt-8">
          <Reveal delay={0.1}>
            <nav aria-label="Breadcrumb" className="flex justify-center gap-2 text-xs tracking-[0.02em] text-subtle uppercase lg:text-sm">
              <Link href="/blog" className="hover:text-ink">
                {blogPage.post.breadcrumb}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-brand-strong" aria-current="page">
                {meta.category}
              </span>
            </nav>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="mx-auto mt-3 max-w-[786px] font-heading-flex text-[32px] leading-10 font-medium tracking-[-0.03em] text-ink sm:text-5xl sm:leading-[1.1] lg:text-display">
              {meta.shortTitle ?? meta.title}{" "}
              {meta.accent ? <span className="block font-pixel-line text-accent-text">{meta.accent}</span> : null}
            </h1>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="mt-9 border-y border-dashed border-line py-8">
          <div className="flex items-center justify-center gap-3.5">
            <Image src={meta.author.avatar} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
            <div className="text-left">
              <p className="text-lg leading-6 font-semibold text-ink">{meta.author.name}</p>
              <p className="text-sm text-subtle">
                <time dateTime={meta.date}>{formatDate(meta.date)}</time> • {meta.readingTime.replace(" read", "")}
              </p>
            </div>
          </div>
        </Reveal>
        <div className="bg-dots p-4 sm:p-6 lg:p-9">
          <Reveal delay={0.4} y={20} scale>
            <Image
              src={meta.image}
              alt={meta.imageAlt}
              width={meta.imageWidth ?? 1456}
              height={meta.imageHeight ?? 800}
              priority
              quality={90}
              sizes="(min-width: 1280px) 1160px, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </Container>

      {/* Body + sidebar */}
      <Container bordered className="grid border-t border-dashed border-t-line lg:grid-cols-[minmax(0,806fr)_minmax(0,434fr)]">
        <div className="px-6 py-10 sm:px-8 lg:border-r lg:border-dashed lg:border-line lg:px-10 lg:py-10">
          <div className="max-w-[724px]">
            <Content />
          </div>

          {related.length ? (
            <section aria-labelledby="related-title" className="mt-16 max-w-[724px]">
              <div className="mb-6 flex items-center justify-between">
                <h2 id="related-title" className="font-heading-flex text-2xl font-medium tracking-[-0.03em] text-ink lg:text-[32px]">
                  {blogPage.post.keepReading}
                </h2>
                <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-strong">
                  {blogPage.post.allPosts}
                  <LineIcon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <ul className="grid gap-6 sm:grid-cols-2">
                {related.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} readMore={blogPage.list.readMore} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="hidden px-12 py-10 lg:block">
          <div className="sticky top-24 flex flex-col gap-10">
            <TableOfContents title={blogPage.post.onThisPage} headings={headings} />
            <div>
              <p className="sr-only">{blogPage.post.share}</p>
              <ul className="flex gap-3">
                {siteConfig.socials.map((social) => {
                  const Icon = socialIcons[social.platform];
                  return (
                    <li key={social.platform}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-canvas"
                      >
                        <Icon className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>
      </Container>
    </article>
  );
}
