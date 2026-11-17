import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { homePage } from "@/config/pages/home";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/" });

// Temporary hero for Phase 1. The full home page is built in Phase 2.
export default function HomePage() {
  const { hero } = homePage;
  return (
    <Container bordered className="py-16 lg:py-24">
      <SectionHeading
        as="h1"
        size="display"
        align="center"
        title={hero.title}
        accent={hero.accent}
        description={hero.description}
      />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
        <Button href={hero.secondaryCta.href} variant="secondary">
          {hero.secondaryCta.label}
        </Button>
      </div>
    </Container>
  );
}
