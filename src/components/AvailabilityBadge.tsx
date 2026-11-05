import { availabilityLabel, type Availability } from "@/lib/availability";

const styles: Record<Availability, string> = {
  live: "border-sage/50 bg-sage/10 text-sage-lift",
  planned: "border-line-strong text-ink-muted",
  december: "border-blue/50 bg-blue/10 text-blue-pale",
  january: "border-blue/50 bg-blue/10 text-blue-pale",
  "on-request": "border-line-strong border-dashed text-ink-muted",
};

/** A small label that says, in words, whether something works today. */
export function AvailabilityBadge({ value }: { value: Availability }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11.5px] leading-[1.4] font-semibold whitespace-nowrap ${styles[value]}`}
    >
      {availabilityLabel[value]}
    </span>
  );
}
