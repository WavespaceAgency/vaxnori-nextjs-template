import Image from "next/image";
import Link from "next/link";
import { socialIcons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn, isExternal } from "@/lib/utils";
import { NewsletterForm } from "./newsletter-form";

const { footer, socials } = siteConfig;

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "inline-flex min-h-6 items-center text-sm leading-5 break-all text-ink underline-offset-4 transition-colors hover:text-brand-strong hover:underline";
  return isExternal(href) ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("items-center justify-center gap-3 p-4 md:py-6", className)}>
      {socials.map((social) => {
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
              <Icon className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Footer() {
  const [explore, company] = footer.columns;

  return (
    <footer className="relative isolate overflow-hidden px-4 pb-4 md:px-8 md:pb-[100px]">
      {/* Decorative yellow tile background */}
      <Image
        src={footer.background.mobile}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover md:hidden"
      />
      <Image
        src={footer.background.desktop}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 hidden object-cover md:block"
      />

      <div className="@container relative mx-auto max-w-site overflow-hidden bg-surface p-3">
        <div className="relative z-10 grid grid-cols-2 border-line md:grid-cols-3 xl:grid-cols-[452fr_223fr_222fr_319fr]">
          {/* Tagline + newsletter */}
          <div className="col-span-2 flex flex-col gap-8 border border-line p-5 pt-10 md:col-span-3 md:gap-14 md:p-8 xl:col-span-1 xl:border-r-0 xl:pt-8">
            <p className="max-w-80 font-heading-flex text-h3 font-semibold text-ink">{footer.tagline}</p>
            <NewsletterForm {...footer.newsletter} />
          </div>

          {/* Explore */}
          <nav
            aria-labelledby="footer-explore"
            className="border-x border-b border-line p-5 md:border-r-0 xl:border-t"
          >
            <h2 id="footer-explore" className="text-sm leading-5 tracking-[0.02em] text-subtle uppercase">
              {explore.title}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {explore.links.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company + socials */}
          <div className="flex flex-col border-r border-b border-line md:border-l xl:border-t">
            <nav aria-labelledby="footer-company" className="flex-1 border-line p-5 md:border-b">
              <h2 id="footer-company" className="text-sm leading-5 tracking-[0.02em] text-subtle uppercase">
                {company.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {company.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
            <SocialLinks className="hidden md:flex" />
          </div>

          {/* Socials on small screens get their own row */}
          <SocialLinks className="col-span-2 flex border-x border-b border-line md:hidden" />

          {/* Brand mark */}
          <div className="relative col-span-2 flex aspect-[319/308] items-center justify-center border-x border-b border-line bg-[linear-gradient(to_right,var(--line-soft)_1px,transparent_1px),linear-gradient(to_bottom,var(--line-soft)_1px,transparent_1px)] bg-[size:20px_20px] md:col-span-1 md:aspect-auto md:min-h-64 md:border-l-0 xl:border-t">
            <Image src={footer.mark} alt="" width={167} height={141} className="h-auto w-[52%] max-w-44" />
          </div>

          {/* Bottom row */}
          <p className="flex items-center justify-center border-b border-l border-line px-3 py-6 text-center text-sm leading-5 text-ink md:justify-start md:px-5 md:py-8 md:text-left">
            {footer.copyright}
          </p>
          {footer.legal.map((link, index) => (
            <div
              key={link.href}
              className={
                index === 0
                  ? "flex items-center justify-center border-x border-b border-line px-4 py-6 md:justify-start md:border-r-0 md:px-5 md:py-8 xl:col-span-2"
                  : "col-span-2 flex items-center justify-center border-x border-b border-line px-4 py-6 md:col-span-1 md:justify-start md:px-5 md:py-8"
              }
            >
              <FooterLink href={link.href}>{link.label}</FooterLink>
            </div>
          ))}
        </div>

        {/* Giant wordmark with grid lines */}
        <div aria-hidden="true" className="relative -mx-3 -mb-3 h-[24cqw] min-h-20 overflow-hidden md:h-[19.5cqw]">
          <Image src="/images/footer/grid.svg" alt="" fill sizes="100vw" className="object-cover object-top" />
          <p className="absolute inset-x-3 -bottom-[0.18em] text-center font-heading-flex text-[22cqw] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap text-[#f5f5f5] select-none">
            {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
