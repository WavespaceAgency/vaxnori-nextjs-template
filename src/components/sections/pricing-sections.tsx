import { LineIcon, type LineIconName } from "@/components/icons/line-icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type Comparison = {
  title: string;
  columns: readonly string[];
  highlight: number;
  rows: readonly (readonly string[])[];
};

/** "What's in each plan" comparison table. Scrolls sideways on small screens. */
export function ComparisonTable({ comparison }: { comparison: Comparison }) {
  const hi = comparison.highlight + 1; // +1 for the feature column
  return (
    <section aria-labelledby="compare-title">
      <Container bordered>
        <Reveal className="px-6 py-10 sm:px-8 lg:px-12 lg:pt-[62px] lg:pb-[35px]">
          <h2 id="compare-title" className="font-heading-flex text-2xl leading-7 font-medium tracking-[-0.03em] text-ink lg:text-h2 lg:leading-[44px]">
            {comparison.title}
          </h2>
        </Reveal>
        <div>
          <table className="w-full table-fixed border-collapse text-left text-[11px] leading-4 sm:text-sm lg:text-base">
            <colgroup>
              <col className="w-[30.7%]" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className="border-y border-line">
                {comparison.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={cn(
                      "h-[52px] px-2 font-normal tracking-[0.02em] uppercase sm:px-4 lg:h-[76px] lg:px-5",
                      i === 0 ? "pl-4 sm:pl-6 lg:pl-12" : "border-l border-dashed border-line-strong",
                      i === hi ? "text-brand-strong" : "text-ink",
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row[0]} className="border-b border-line transition-colors hover:bg-canvas">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="h-[60px] pr-2 pl-4 font-normal text-ink sm:pl-6 lg:h-[76px] lg:pl-12">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className={cn("h-[60px] border-l border-dashed border-line-strong px-2 sm:px-4 lg:h-[76px] lg:px-5", i === hi ? "font-semibold text-ink" : "text-ink")}>
                        {cell === "-" ? <span aria-label="Not included">-</span> : cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
              {/* Empty row: the column lines continue below the table, as in the design */}
              <tr aria-hidden="true" className="hidden lg:table-row">
                <td className="h-[75px]" />
                <td className="border-l border-dashed border-line-strong" />
                <td className="border-l border-dashed border-line-strong" />
                <td className="border-l border-dashed border-line-strong" />
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

/** Black band with four promises. */
export function PromiseBand({ items }: { items: readonly { icon: LineIconName; title: string; description: string }[] }) {
  return (
    <section aria-label="Our promises">
      <Container className="bg-ink">
        <Stagger as="ul" gap={0.1} className="grid sm:grid-cols-2 lg:grid-cols-[331fr_287fr_287fr_287fr]">
          {items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className={cn(
                "flex flex-col justify-between gap-12 border-dashed border-white/20 [border-image:none] px-6 pt-10 pb-8 not-last:border-b sm:not-last:border-b-0 lg:h-[264px] lg:pr-6 lg:pb-[26px]",
                i === 0 ? "lg:pl-12" : "lg:border-l lg:pl-6",
              )}
            >
              <LineIcon name={item.icon} className="size-8 text-white" />
              <div className="flex flex-col gap-2">
                <h3 className="font-heading-flex text-h4 font-medium text-white">{item.title}</h3>
                <p className="text-base leading-6 text-white/60">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
