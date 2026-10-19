/**
 * The street map drawn behind the hero story's dealer chapter, in a 960 × 400
 * box. Shared so the partner box can carry the same lines as its backdrop
 * without a second copy drifting from the first.
 */
/** Index of the lower cross street in `STREETS.paths`. */
export const LOWER_STREET = 3;

export const STREETS = {
  width: 960,
  height: 400,
  paths: [
    "M -10 132 C 260 100 660 178 970 134",
    "M 262 -10 C 288 120 232 262 282 410",
    "M 742 -10 C 718 140 780 262 748 410",
    "M -10 338 C 300 302 660 372 970 322",
  ],
};
