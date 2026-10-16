import { STREETS } from "@/lib/streets";

/**
 * The street-map texture for the deep-blue surfaces: a fine rule grid, the
 * hero story's streets over it, and the edge of its search ring. Drawn in the
 * on-blue hairline, so it reads as depth in the blue rather than as a picture.
 *
 * The caller places it (absolutely, behind its content) and decides through
 * `className` where it fades out and where the light falls, so the texture
 * never sits at full strength behind text.
 *
 * The map always covers its box, so a large surface draws it larger. What
 * stays fixed is everything that makes it this map: the curves keep their
 * shape (the scaling is uniform) and the lines keep their weight, because
 * the strokes do not scale with the drawing (`non-scaling-stroke`). The
 * partner box and the proof section show the same streets at the same line
 * weight, at whatever size each needs.
 */
export function MapBackdrop({
  className = "",
  anchor = "xMidYMid",
  grid = true,
  omit = [],
}: {
  className?: string;
  /** Leave the grid out, for a surface that draws its own aligned grid. */
  grid?: boolean;
  /** Streets to leave out, by index, for a surface that places them itself. */
  omit?: number[];
  /** How the map is pinned when the box crops it; see `preserveAspectRatio`. */
  anchor?: "xMidYMid" | "xMaxYMid";
}) {
  const { width: w, height: h, paths } = STREETS;

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`} aria-hidden>
      {grid && <div className="map-grid absolute inset-0" />}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio={`${anchor} slice`}
        className="absolute inset-0 size-full"
        fill="none"
      >
        <g className="stroke-on-blue-line" strokeWidth="1.65">
          {paths.map((d, index) =>
            omit.includes(index) ? null : (
              <path key={d} d={d} vectorEffect="non-scaling-stroke" />
            ),
          )}
        </g>
        {/* The edge of the search ring, as it last passed. */}
        <circle
          cx="480"
          cy="200"
          r="430"
          className="stroke-on-blue-line"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
