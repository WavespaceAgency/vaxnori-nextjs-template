import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePage } from "@/config/pages/home";
import { CanvasVisual, ImageVisual, WorkflowVisual } from "./product-visuals";
import { ProductTabs, type ProductTab } from "./product-tabs";

export function Product({ content }: { content: HomePage["product"] }) {
  const tabs: ProductTab[] = content.tabs.map((tab) => {
    const v = tab.visual;
    const visual =
      v.type === "image" ? (
        <ImageVisual src={v.src} alt={v.alt} width={v.width} height={v.height} />
      ) : v.type === "workflow" ? (
        <WorkflowVisual title={v.title} steps={v.steps} />
      ) : (
        <CanvasVisual center={v.center} nodes={v.nodes} />
      );
    return { id: tab.id, label: tab.label, title: tab.title, description: tab.description, points: tab.points, visual, tallOnMobile: v.type !== "image" };
  });

  return (
    <section aria-labelledby="product-title">
      <Container bordered className="pt-16 lg:pt-[100px]">
        <SectionHeading
          id="product-title"
          eyebrow={content.eyebrow}
          title={content.title}
          accent={content.accent}
          accentBreak
          className="reveal mb-10 px-4 sm:px-8 lg:mb-[50px] lg:px-[50px]"
        />
        <ProductTabs tabs={tabs} />
      </Container>
    </section>
  );
}
