/**
 * Marks where a product screen, a video or the booking calendar goes until
 * the real one exists (English screens are due December 4, 2026, see
 * lib/verticals.ts; the booking tool is an open item, see AuditForm.tsx). A dashed
 * frame with the name of what belongs there, so nobody mistakes it for a
 * drawing of the product. Replace the component with the image or the player
 * when it arrives.
 */
export function MediaPlaceholder({
  label,
  kind = "screen",
}: {
  label: string;
  kind?: "screen" | "tablet" | "desktop" | "video" | "calendar";
}) {
  const shape = {
    screen: "aspect-[4/5] max-w-sm",
    tablet: "aspect-[4/3] max-w-xl",
    desktop: "aspect-[16/10]",
    video: "aspect-video",
    calendar: "aspect-[16/9]",
  }[kind];

  return (
    <div
      role="img"
      aria-label={`${label}, coming soon`}
      className={`border-line-strong bg-panel/60 flex w-full items-center justify-center rounded-lg border border-dashed ${shape}`}
    >
      <div className="px-6 text-center">
        <svg
          viewBox="0 0 24 24"
          className="text-ink-dim mx-auto size-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {kind === "video" ? (
            <>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m10 9 5 3-5 3z" />
            </>
          ) : kind === "calendar" ? (
            <>
              <rect x="3" y="4.5" width="18" height="16" rx="2" />
              <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
            </>
          ) : kind === "tablet" ? (
            <>
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M11 17h2" />
            </>
          ) : kind === "desktop" ? (
            <>
              <rect x="2.5" y="4" width="19" height="12.5" rx="1.5" />
              <path d="M8.5 20h7M12 16.5V20" />
            </>
          ) : (
            <>
              <rect x="7" y="2.5" width="10" height="19" rx="2" />
              <path d="M11 18.5h2" />
            </>
          )}
        </svg>
        <p className="text-ink-muted mt-3 text-[14px] font-medium">{label}</p>
        <p className="text-ink-dim mt-1 text-[12.5px]">Coming soon</p>
      </div>
    </div>
  );
}
