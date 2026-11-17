import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import type { HomePage } from "@/config/pages/home";

type LogoItem = HomePage["logos"]["items"][number];

/** Neutral placeholder logo: a simple shape + a wordmark. */
function PlaceholderLogo({ name, shape }: LogoItem) {
  const mark = {
    circle: <circle cx="12" cy="12" r="9" />,
    square: <rect x="4" y="4" width="16" height="16" rx="4" />,
    triangle: <path d="M12 3 21 20H3L12 3Z" />,
    spark: <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z" />,
    ring: (
      <path
        fillRule="evenodd"
        d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      />
    ),
    diamond: <path d="M12 2 22 12 12 22 2 12 12 2Z" />,
  }[shape];
  return (
    <span className="flex items-center gap-2 text-[#9a9a9a] transition-colors duration-300 hover:text-ink">
      <svg viewBox="0 0 24 24" className="size-5 lg:size-6" fill="currentColor" aria-hidden="true">
        {mark}
      </svg>
      <span className="font-heading-flex text-xl leading-none font-semibold tracking-[-0.03em] lg:text-[26px]">{name}</span>
    </span>
  );
}

/** Row of placeholder customer logos that scrolls slowly (pauses on hover). */
export function LogoStrip({ content }: { content: HomePage["logos"] }) {
  return (
    <section aria-labelledby="logos-title">
      <Container bordered className="bg-canvas pt-6 pb-6 lg:pt-[60px] lg:pb-[64px]">
        <Reveal>
          <h2 id="logos-title" className="px-4 text-center text-base leading-6 text-subtle">
            {content.title}
          </h2>
        </Reveal>
        {/* Marquee on every screen size (as on the live site). Pauses on hover; static for reduced motion. */}
        <div className="group mt-5 flex h-[26px] items-center overflow-hidden motion-safe:[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] lg:mt-8 lg:h-[29px]">
          {[false, true].map((copy) => (
            <ul
              key={String(copy)}
              aria-hidden={copy || undefined}
              className={`flex shrink-0 items-center gap-12 pr-12 motion-safe:animate-marquee group-hover:[animation-play-state:paused] lg:gap-[88px] lg:pr-[88px] ${copy ? "motion-reduce:hidden" : "motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-6 motion-reduce:px-4"}`}
            >
              {content.items.map((logo) => (
                <li key={logo.name}>
                  <PlaceholderLogo {...logo} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Container>
    </section>
  );
}
