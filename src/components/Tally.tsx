/**
 * A published figure that counts up to itself as it scrolls into view.
 *
 * The metrics in `site.ts` are strings, because they are not all numbers:
 * "32%", "40%", "50%", "10K+". Only the leading digits can count, so the value
 * is split into a numeric head and whatever trails it, and the tail is printed
 * as ordinary text beside the counter.
 *
 * The counting itself is CSS — see `.tally` in globals.css. Two things follow
 * from that and both matter:
 *
 *   - With animation off, or on a browser without scroll timelines, the counter
 *     still prints the final value. There is no state in which this renders a
 *     zero or an empty box.
 *   - Generated content is not reliably announced, so the visual figure is
 *     hidden from assistive technology and the real string is carried beside it.
 *     A screen reader gets "32%", never "3" then "17" then "32".
 *
 * A value with no leading digit is passed through untouched rather than being
 * forced through the counter.
 */
export function Tally({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const parts = /^(\d+)(.*)$/.exec(value);

  if (!parts) {
    return <span className={className}>{value}</span>;
  }

  const [, digits, suffix] = parts;

  return (
    <span className={className}>
      <span aria-hidden>
        <span
          className="tally"
          style={{ "--to": digits } as React.CSSProperties}
        />
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
