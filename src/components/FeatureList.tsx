import type { Availability } from "@/lib/availability";
import { AvailabilityBadge } from "./AvailabilityBadge";

export type Feature = { text: string; availability?: Availability };

/**
 * A list of what a surface does, each item with its label when it is not
 * live, as the website brief's confirmation list (p.31) asks: "Launching
 * December" for what ships with the US demo, "Planned" for the roadmap.
 */
export function FeatureList({ items }: { items: readonly Feature[] }) {
  return (
    <ul className="text-ink space-y-3 text-[15px] leading-[1.5]">
      {items.map((item) => (
        <li key={item.text} className="flex gap-3">
          <span className="bg-blue-pale mt-[0.55em] size-1.5 shrink-0 rounded-full" aria-hidden />
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{item.text}</span>
            {item.availability && item.availability !== "live" && (
              <AvailabilityBadge value={item.availability} />
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
