import Image from "next/image";
import Link from "next/link";
import { socialIcons } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";
import { cn, isExternal } from "@/lib/utils";
import { NewsletterForm } from "./newsletter-form";

const { footer, socials, brand } = siteConfig;

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "inline-flex items-center text-sm leading-5 break-all text-ink underline-offset-4 transition-colors hover:text-brand-strong hover:underline";
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

function LinkColumn({ title, links, id }: { title: string; links: readonly { label: string; href: string }[]; id: string }) {
  return (
    <nav aria-labelledby={id} className="p-5 xl:p-[19px]">
      <h2 id={id} className="text-sm leading-5 tracking-[0.02em] text-subtle uppercase">
        {title}
      </h2>
      <ul className="mt-5 flex flex-col gap-3 text-sm leading-5">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center", className)}>
      {socials.map((social) => {
        const Icon = socialIcons[social.platform];
        return (
          <li key={social.platform}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex size-[35px] items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-canvas md:size-11"
            >
              <Icon className="size-[13px] md:size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Big brand name at the bottom. Real text from siteConfig.name, drawn at the exact Figma size (1216×207). */
function Wordmark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1216 207" className={cn("block overflow-visible", className)}>
      <text
        x="0"
        y="204.2"
        textLength="1216"
        lengthAdjust="spacingAndGlyphs"
        className="fill-[#f5f5f5] font-heading-flex font-semibold"
        style={{ fontSize: "276.4px" }}
      >
        {siteConfig.name}
      </text>
    </svg>
  );
}

export function Footer() {
  const [explore, company] = footer.columns;
  const [privacy, terms] = footer.legal;

  return (
    <footer className="relative isolate overflow-hidden px-4 pb-4 md:px-8 md:pb-[100px]">
      {/* Decorative tile background (same crop as Figma) */}
      <Image
        src={footer.background.mobile}
        alt=""
        width={804}
        height={2583}
        sizes="100vw"
        className="absolute top-[-2.96%] left-0 -z-10 h-[126.29%] w-full max-w-none object-cover md:hidden"
      />
      <Image
        src={footer.background.desktop}
        alt=""
        width={1672}
        height={941}
        sizes="100vw"
        className="absolute top-[-15.6%] left-0 -z-10 hidden h-[116.65%] w-full max-w-none object-cover md:block"
      />

      <Reveal y={40} className="@container relative mx-auto max-w-site overflow-hidden bg-surface p-3">
        <div className="relative z-10 grid grid-cols-2 border border-line px-3 md:grid-cols-3 md:border-0 md:px-0 xl:grid-cols-[452fr_223fr_222fr_319fr] xl:grid-rows-[308px_auto]">
          {/* Tagline + newsletter */}
          <div className="col-span-2 flex flex-col gap-8 pt-10 pb-8 md:col-span-3 md:gap-14 md:border md:border-line md:p-8 xl:col-span-1 xl:border-r-0 xl:pt-[31px] xl:pl-[37px]">
            <p className="max-w-[307px] font-heading-flex text-h3 font-semibold text-ink">{footer.tagline}</p>
            <NewsletterForm {...footer.newsletter} />
          </div>

          {/* Explore */}
          <div className="border-t border-r border-line md:border-t-0 md:border-b md:border-l xl:border-t xl:border-r-0">
            <LinkColumn id="footer-explore" title={explore.title} links={explore.links} />
          </div>

          {/* Company + socials */}
          <div className="flex flex-col border-t border-line md:border-t-0 md:border-r md:border-b md:border-l xl:border-t xl:border-r-0">
            <div className="h-[214px] border-b border-line">
              <LinkColumn id="footer-company" title={company.title} links={company.links} />
            </div>
            <div className="flex flex-1 items-center p-4 max-[359px]:p-2 md:items-start md:px-8 md:pt-[25px]">
              <SocialLinks className="w-full justify-between md:w-auto md:justify-start md:gap-3" />
            </div>
          </div>

          {/* Brand mark on a grid (heart on desktop, diamond on phones – as in Figma) */}
          <div className="relative col-span-2 aspect-[314/303] border-t border-line md:col-span-1 md:aspect-auto md:min-h-64 md:border-t-0 md:border-r md:border-b xl:border-t">
            <Image src="/images/patterns/mark-grid.svg" alt="" fill sizes="(min-width: 1280px) 320px, 100vw" className="object-cover" />
            <Image
              src={brand.mark}
              alt=""
              width={167}
              height={141}
              className="absolute top-1/2 left-1/2 hidden h-auto w-[52%] max-w-[166px] -translate-1/2 md:block"
            />
            <Image
              src={brand.markAlt}
              alt=""
              width={177}
              height={185}
              className="absolute top-1/2 left-1/2 h-auto w-[56%] -translate-1/2 md:hidden"
            />
          </div>

          {/* Bottom row: copyright | privacy | terms */}
          <p className="flex items-center justify-center border-t border-r border-line px-2 py-6 text-sm leading-5 whitespace-nowrap text-ink md:justify-start md:border-t-0 md:border-b md:border-l md:px-[19px] md:py-8">
            {footer.copyright}
          </p>
          <div className="flex items-center justify-center border-t border-line px-4 py-6 md:justify-start md:border-t-0 md:border-r md:border-b md:px-[19px] md:py-8 xl:col-span-2 xl:border-r-0 xl:border-l">
            <FooterLink href={privacy.href}>{privacy.label}</FooterLink>
          </div>
          <div className="col-span-2 flex items-center justify-center border-t border-line p-6 md:col-span-1 md:justify-start md:border-t-0 md:border-r md:border-b md:px-[19px] md:py-8 xl:border-l">
            <FooterLink href={terms.href}>{terms.label}</FooterLink>
          </div>
        </div>

        {/* Giant wordmark over a faint grid */}
        <div aria-hidden="true" className="relative -mx-3 -mb-3 h-[26cqw] overflow-hidden md:h-[20cqw]">
          <Image src="/images/patterns/grid.svg" alt="" fill sizes="100vw" className="object-cover object-top" />
          <Wordmark className="absolute top-[11cqw] left-1/2 w-[97.3cqw] -translate-x-1/2 md:top-[5cqw] md:w-[calc(100cqw-24px)]" />
        </div>
      </Reveal>
    </footer>
  );
}
