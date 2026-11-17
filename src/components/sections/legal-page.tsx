import type { ComponentType } from "react";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Container } from "@/components/ui/container";
import { formatDate } from "@/lib/content-types";
import { PageHero } from "./page-hero";

export type LegalMeta = { title: string; accent: string; description: string; updated: string };

/** Shared layout for Privacy and Terms: hero + sticky contents list + MDX body. */
export function LegalPage({ meta, headings, Content }: { meta: LegalMeta; headings: string[]; Content: ComponentType }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={meta.title} accent={meta.accent} description={`Last updated: ${formatDate(meta.updated, "long")}`} className="pb-[44px]" />
      <Container bordered className="grid border-t border-dashed border-t-line lg:grid-cols-[minmax(0,355px)_minmax(0,885px)]">
        <aside className="hidden pt-10 pl-10 lg:block">
          <div className="sticky top-24">
            <TableOfContents title="Contents" headings={headings} size="lg" showTitle={false} />
          </div>
        </aside>
        <article className="border-dashed border-line px-6 pt-4 pb-14 lg:border-l lg:px-8 lg:pb-16 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:leading-8 [&_h2]:font-medium [&_p]:my-3 [&_p]:text-base [&_p]:leading-6">
          <div className="max-w-[735px]">
            <Content />
          </div>
        </article>
      </Container>
    </>
  );
}
