import Image from "next/image";
import { LineIcon, type LineIconName } from "@/components/icons/line-icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/** Three principles in dashed columns (About). */
export function Principles({ items }: { items: readonly { icon: LineIconName; title: string; description: string }[] }) {
  return (
    <section aria-label="What we believe">
      <Container bordered className="pt-[30px]">
        <Stagger as="ul" gap={0.12} className="grid border-y border-dashed border-line-strong md:grid-cols-3">
          {items.map((item) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="flex flex-col gap-8 border-dashed border-line-strong px-6 py-10 not-last:border-b md:gap-12 md:not-last:border-r md:not-last:border-b-0 lg:px-12 lg:py-[72px]"
            >
              <LineIcon name={item.icon} className="size-9 text-ink" />
              <div className="flex flex-col gap-2">
                <h2 className="font-heading-flex text-h4 font-medium text-ink">{item.title}</h2>
                <p className="text-[15px] leading-5 text-muted">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

type Story = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  timeline: readonly { date: string; text: string }[];
  image: { src: string; alt: string };
  frame: string;
};

/** "How we got here" – text, timeline and a framed photo (About). */
export function StorySection({ story }: { story: Story }) {
  return (
    <section aria-labelledby="story-title">
      <Container bordered className="grid items-center gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,556px)_minmax(0,400px)] lg:justify-between lg:px-[50px] lg:py-12">
        <Reveal className="flex flex-col gap-10 lg:gap-14">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3">
              <Eyebrow line={false}>{story.eyebrow}</Eyebrow>
              <h2 id="story-title" className="font-heading-flex text-2xl leading-7 font-medium tracking-[-0.03em] text-ink lg:text-h3 lg:leading-[38px]">
                {story.title} <span className="block font-pixel-line text-accent-text">{story.accent}</span>
              </h2>
            </div>
            <p className="max-w-[386px] text-sm leading-[22px] text-muted lg:text-base lg:leading-6">{story.description}</p>
          </div>
          <ol className="relative flex flex-col gap-6">
            <span aria-hidden="true" className="absolute top-6 bottom-6 left-4 w-px bg-line-strong" />
            {story.timeline.map((item) => (
              <li key={item.date} className="relative flex items-center gap-2">
                <span className="flex size-8 shrink-0 items-start justify-center bg-surface pt-1.5">
                  <LineIcon name="calendar" className="size-4 text-muted" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <time className="text-xs text-[#6b6b6b]">{item.date}</time>
                  <p className="text-[13px] font-semibold tracking-[0.02em] text-ink">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal scale delay={0.1} className="relative mx-auto aspect-square w-full max-w-[400px]">
          <Image src={story.frame} alt="" fill sizes="400px" className="object-cover" />
          <div className="absolute inset-[11.43%] overflow-hidden">
            <Image
              src={story.image.src}
              alt={story.image.alt}
              fill
              sizes="(min-width: 1024px) 310px, 80vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

type Team = {
  eyebrow: string;
  title: string;
  accent: string;
  members: readonly { name: string; role: string; image: string }[];
};

/** Team photo grid (About). */
export function TeamSection({ team }: { team: Team }) {
  return (
    <section aria-labelledby="team-title">
      <Container bordered className="px-6 py-14 sm:px-8 lg:px-[50px]">
        <Reveal>
          <SectionHeading id="team-title" eyebrow={team.eyebrow} title={team.title} accent={team.accent} titleClassName="max-w-[300px] lg:max-w-[420px]" />
        </Reveal>
        <Stagger as="ul" gap={0.1} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-6">
          {team.members.map((member) => (
            <StaggerItem as="li" key={member.name} className="group flex flex-col gap-4">
              <div className="relative aspect-[266/338] overflow-hidden bg-canvas">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(min-width: 1024px) 267px, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base leading-[19px] font-semibold tracking-[0.02em] text-ink lg:text-lg lg:leading-[22px]">{member.name}</h3>
                <p className="text-sm leading-[17px] text-[#6b6b6b] lg:text-base lg:leading-[19px]">{member.role}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
