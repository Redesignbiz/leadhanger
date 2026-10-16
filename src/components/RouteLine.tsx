/**
 * The handoff, drawn as the four steps themselves.
 *
 * One track, four stops, and a pulse running the length of it, with each stop
 * carrying its step in full. The picture and the detail used to be two blocks,
 * one above the other, saying the same thing twice; this is the one block.
 *
 * It is CSS, not SVG, for one reason: below `lg` the track turns and runs
 * vertically. An SVG would need a second copy of the artwork to do that, and
 * the two copies would drift. The breakpoint is `lg` rather than `sm` because
 * each stop now carries a list, and four lists side by side need the width.
 */
export type RouteStep = { title: string; points: string[] };

export function RouteLine({ steps }: { steps: RouteStep[] }) {
  return (
    <div className="relative">
      {/*
        Two rails, one per orientation, each showing only in its own layout.
        The pulse is a gradient segment sliding inside a clipped rail — the dots
        carry the page ground, so the rail passes behind them cleanly.
      */}
      <div
        className="route-rail route-rail-y top-[5px] bottom-0 left-[5px] w-px lg:hidden"
        aria-hidden
      >
        <span className="route-pulse route-pulse-y" />
      </div>
      <div
        className="route-rail top-[5px] right-0 left-0 hidden h-px lg:block"
        aria-hidden
      >
        <span className="route-pulse" />
      </div>

      <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-5 lg:block">
            <span
              className="border-blue-pale bg-ground size-2.5 shrink-0 rounded-full border"
              aria-hidden
            />
            <div className="-mt-1 lg:mt-6">
              <span
                className="text-blue-pale text-[11px] tracking-[0.1em] tabular-nums"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-ink mt-1.5 text-[17px] leading-snug font-bold tracking-[-0.015em]">
                {step.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {step.points.map((point) => (
                  <li
                    key={point}
                    className="text-ink-muted text-[14px] leading-[1.6]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
