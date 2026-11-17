import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { headingsFromMdx, loadLegal, readSource } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await loadLegal("privacy");
  return createMetadata({ path: "/privacy", title: `${meta.title} ${meta.accent}`, description: meta.description });
}

export default async function Page() {
  const { default: Content, meta } = await loadLegal("privacy");
  return <LegalPage meta={meta} headings={headingsFromMdx(readSource("legal", "privacy"))} Content={Content} />;
}
