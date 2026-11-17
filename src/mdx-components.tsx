import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import type React from "react";
import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Styles for all MDX content (blog posts and job posts).
 * Write normal Markdown in src/content/*.mdx – these components style it.
 */
const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 mb-3 scroll-mt-24 font-heading-flex text-2xl leading-8 font-medium tracking-[-0.03em] text-ink"
      id={slugify(String(props.children))}
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-8 mb-2 font-heading-flex text-xl font-medium tracking-[-0.02em] text-ink" {...props} />,
  p: (props) => <p className="my-4 text-base leading-7 text-muted" {...props} />,
  ul: (props) => <ul className="my-4 flex list-disc flex-col gap-2 pl-5 text-base leading-7 text-muted marker:text-subtle" {...props} />,
  // Numbered lists show orange "01, 02, 03" numbers, as in the design
  ol: (props) => (
    <ol
      className="my-5 flex list-none flex-col gap-2 text-base leading-6 font-medium text-ink [counter-reset:item] [&>li]:[counter-increment:item] [&>li]:before:mr-3 [&>li]:before:font-normal [&>li]:before:text-brand-strong [&>li]:before:content-[counter(item,decimal-leading-zero)]"
      {...props}
    />
  ),
  li: (props) => <li {...props} />,
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} className="font-medium text-brand-strong underline underline-offset-4" {...props} />
    ) : (
      <a href={href} className="font-medium text-brand-strong underline underline-offset-4" target="_blank" rel="noopener noreferrer" {...props} />
    ),
  blockquote: (props) => (
    <blockquote
      className="my-8 rounded-card border border-line bg-surface px-6 py-5 shadow-card [&>p]:m-0 [&>p]:font-heading-flex [&>p]:text-[20px] [&>p]:leading-7 [&>p]:font-medium [&>p]:tracking-[-0.02em] [&>p]:text-ink [&>p]:italic"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  hr: () => <hr className="my-10 border-dashed border-line" />,
  /** Use <Figure src="/images/…" width={…} height={…} alt="…" /> for images in MDX. */
  Figure: ({ alt, ...props }: ImageProps) => (
    <Image sizes="(min-width: 1024px) 724px, 100vw" className="my-8 h-auto w-full border border-line" alt={alt} {...props} />
  ),
  /** Highlighted box (job posts: "Nice to have"). */
  Callout: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="my-8 rounded-card border border-line bg-canvas px-6 py-5">
      <p className="font-heading-italic text-lg font-medium text-brand-strong uppercase">{title}</p>
      <div className="mt-2 [&>p]:m-0 [&>p]:font-heading-flex [&>p]:text-lg [&>p]:leading-7 [&>p]:text-muted [&>p]:italic">{children}</div>
    </div>
  ),
  /** Timeline with calendar icons (job posts: first 90 days). */
  Timeline: ({ items }: { items: { when: string; text: string }[] }) => (
    <ol className="relative my-6 flex flex-col gap-8">
      <span aria-hidden="true" className="absolute top-6 bottom-6 left-[11px] w-px bg-line-strong" />
      {items.map((item) => (
        <li key={item.when} className="relative flex gap-3">
          <span className="relative flex size-6 shrink-0 items-start justify-center bg-surface pt-0.5">
            <svg viewBox="0 0 24 24" className="size-4 text-muted" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="4" y="5" width="16" height="15" rx="2" />
              <path d="M4 10h16M9 3v4M15 3v4" />
            </svg>
          </span>
          <div>
            <p className="text-sm text-[#6b6b6b]">{item.when}</p>
            <p className="mt-1 text-[15px] leading-6 font-semibold text-ink">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  ),
};

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function useMDXComponents(): MDXComponents {
  return components;
}
