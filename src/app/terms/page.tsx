import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { headingsFromMdx, loadLegal, readSource } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await loadLegal("terms");
  return createMetadata({ path: "/terms", title: `${meta.title} ${meta.accent}`, description: meta.description });
}

export default async function Page() {
  const { default: Content, meta } = await loadLegal("terms");
  return <LegalPage meta={meta} headings={headingsFromMdx(readSource("legal", "terms"))} Content={Content} />;
}
