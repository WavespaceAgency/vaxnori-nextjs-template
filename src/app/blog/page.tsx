import Link from "next/link";
import { BlogList } from "@/components/blog/blog-list";
import { CtaBanner } from "@/components/sections/cta-banner";
import { LineIcon } from "@/components/icons/line-icons";
import { Reveal } from "@/components/motion/reveal";
import { ScaleToFit } from "@/components/motion/scale-to-fit";
import { FeatureMockup } from "@/components/sections/feature-mockups";
import { PageHero } from "@/components/sections/page-hero";
import { Eyebrow } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { blogPage } from "@/config/pages/blog";
import { homePage } from "@/config/pages/home";
import { formatDate, getPosts } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/blog", ...blogPage.meta });

export default async function BlogPage() {
  const posts = await getPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured.slug);

  return (
    <>
      <PageHero {...blogPage.hero} titleClassName="sm:max-w-[936px]" className="pb-[30px]" />

      {/* Featured post */}
      <section aria-labelledby="featured-title">
        <Container bordered className="border-t border-dashed border-t-line bg-canvas">
          <div className="grid items-center gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,556fr)_minmax(0,504fr)] lg:gap-20 lg:px-[50px] lg:py-[50px]">
            <Reveal className="flex flex-col gap-4">
              <Eyebrow>
                {featured.category}
                <span aria-hidden="true">·</span>
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span aria-hidden="true">·</span>
                {featured.readingTime}
              </Eyebrow>
              <h2 id="featured-title" className="max-w-[460px] font-heading-flex text-2xl leading-8 font-medium tracking-[-0.03em] text-ink lg:text-[36px] lg:leading-[42px]">
                {featured.title}
              </h2>
              <p className="max-w-[473px] text-sm leading-[22px] text-muted lg:text-base lg:leading-6">{featured.excerpt}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-strong"
              >
                {blogPage.featuredCta}
                <LineIcon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="sr-only">: {featured.title}</span>
              </Link>
            </Reveal>
            <Reveal scale delay={0.1} className="w-full max-w-[504px] lg:justify-self-end">
              <div role="img" aria-label={featured.imageAlt}>
                <ScaleToFit width={504} height={400}>
                  <FeatureMockup visual={homePage.features[0].visual} />
                </ScaleToFit>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* All posts */}
      <section aria-labelledby="posts-title">
        <Container bordered className="border-t border-dashed border-t-line pt-14 lg:pt-[50px]">
          <Reveal className="mb-6 px-6 sm:px-8 lg:mb-[50px] lg:px-[50px]">
            <SectionHeading id="posts-title" eyebrow={blogPage.list.eyebrow} title={blogPage.list.title} accent={blogPage.list.accent} titleClassName="max-w-[300px] lg:max-w-[420px]" />
          </Reveal>
          <BlogList posts={rest} labels={blogPage.list} />
        </Container>
      </section>

      <CtaBanner content={homePage.cta} id="blog-cta" mobileSplit />
    </>
  );
}
