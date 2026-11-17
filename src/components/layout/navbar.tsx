import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      {/* Desktop (1024px and up) */}
      <div className="mx-auto hidden h-nav max-w-[108rem] items-stretch justify-between lg:flex">
        <nav aria-label="Main" className="flex items-stretch">
          <div className="flex items-center border-r border-line px-4">
            <Logo />
          </div>
          <NavLinks links={siteConfig.nav.main} />
        </nav>
        <div className="flex items-center border-l border-line pr-1.5 pl-5">
          <Button href={siteConfig.cta.href}>{siteConfig.cta.label}</Button>
        </div>
      </div>

      {/* Mobile and tablet */}
      <div className="flex h-15 items-center justify-between px-4 sm:px-6 lg:hidden">
        <Logo showName size="xs" />
        <MobileMenu links={siteConfig.nav.mobile} cta={siteConfig.cta} />
      </div>
    </header>
  );
}
