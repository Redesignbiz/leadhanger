"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * The hero itself: one visitor becoming one dealer's customer, told in
 * three chapters that play on a loop.
 *
 * Modelled on the Mosey hero — a scene that builds itself under the page's
 * claim, and chapter tabs whose underline doubles as the timer. The visitor
 * is the one constant: they stay at the centre of the frame and the world moves
 * around them. They arrive on the brand's site and the camera follows them
 * into a chat; dealers appear around them and one matches; that dealer comes
 * to stand beside them and gets in touch.
 *
 * How it stays honest:
 *
 *   - The tab underline IS the clock. Each chapter advances on the bar's own
 *     `animationend`, and pausing (off screen, tab hidden) pauses every
 *     animation in the story at once, so the bar and the scene cannot drift.
 *   - Every animation lives behind `prefers-reduced-motion: no-preference` and
 *     defaults to its finished state. With motion off nothing advances on its
 *     own: each chapter shows complete, and the tabs still switch.
 *   - The scene is drawn twice, from two layouts: a near-square one for phones
 *     and tablets and a wide one from `lg` up, so the desktop picture spreads
 *     across the hero instead of being a phone picture scaled up. CSS shows
 *     one and removes the other, so there is no layout guess at hydration and
 *     the hidden copy costs nothing to animate.
 *   - Within a layout, geometry is one coordinate space, its viewBox. HTML
 *     pieces are placed by percentage of that same box, so lines and labels
 *     stay joined at every width. Each layout sets one base type size in
 *     container units (`cqw`) with a floor and a ceiling, and everything on
 *     stage is sized in `em` against it, so the picture scales as one.
 */

type Point = { x: number; y: number };
type Anchor = "center" | "left" | "right";

type Dealer = {
  p: Point;
  initials: string;
  name: string;
  note: string;
  d: number;
  match?: boolean;
};

type Layout = {
  id: string;
  W: number;
  H: number;
  /** Where the visitor stands, and where they step aside to in chapter 3. */
  center: Point;
  side: Point;
  /** Avatar and map-badge sizes, in viewBox units. */
  avatar: number;
  dealer: number;
  /**
   * The stage's base type size. Everything inside is sized in `em` against
   * it — text, padding, cards, icons — so one value scales the whole picture.
   */
  type: string;
  /** How far the camera travels in chapter 1, in viewBox units. */
  pan: number;
  /** Top-left corner of the brand's site (a 200 × 160 window). */
  site: Point;
  chat: Point[];
  consent: Point;
  /** The lead card: filling in beside the chat, then in the dealer's hands. Wide layout only. */
  profile?: Point;
  received?: Point;
  dealers: Dealer[];
  streets: string[];
  scan: number;
  qualified: Point;
  dealerSpot: Point;
  notified: Point;
  message: Point;
  messageWidth: string;
  called: Point;
};

const BR: Dealer = {
  p: { x: 0, y: 0 },
  initials: "BR",
  name: "Bay Ridge Tire & Auto",
  note: "2.1 mi · in stock",
  d: 3300,
  match: true,
};

const compact: Layout = {
  id: "compact",
  W: 440,
  H: 400,
  center: { x: 220, y: 190 },
  side: { x: 140, y: 190 },
  avatar: 52,
  dealer: 34,
  type: "text-[clamp(10px,2.6cqw,15px)]",
  pan: 440,
  site: { x: 120, y: 110 },
  chat: [
    { x: 200, y: 62 },
    { x: 246, y: 98 },
    { x: 186, y: 148 },
    { x: 256, y: 190 },
    { x: 186, y: 236 },
    { x: 246, y: 276 },
  ],
  consent: { x: 220, y: 336 },
  dealers: [
    { p: { x: 100, y: 150 }, initials: "FH", name: "Fort Hamilton Tires", note: "No stock", d: 2200 },
    { p: { x: 348, y: 66 }, initials: "PS", name: "Park Slope Auto", note: "8.4 mi", d: 2500 },
    { p: { x: 84, y: 264 }, initials: "SP", name: "Sunset Park Auto", note: "6.3 mi", d: 2800 },
    { ...BR, p: { x: 348, y: 258 } },
  ],
  streets: [
    "M -10 128 C 120 104 300 170 450 136",
    "M 156 -10 C 176 120 120 260 172 410",
    "M -10 332 C 140 300 300 364 450 318",
  ],
  scan: 210,
  qualified: { x: 220, y: 248 },
  dealerSpot: { x: 300, y: 190 },
  notified: { x: 220, y: 160 },
  message: { x: 220, y: 290 },
  messageWidth: "w-[15em]",
  called: { x: 220, y: 350 },
};

/*
 * The wide layout keeps the visitor dead centre and uses the extra width for
 * things that belong at the edges: the arrow trailing back to the site, the
 * lead card filling in on the right, a wider map with more dealers on it, and
 * the lead card again in chapter 3, now on the dealer's side.
 */
const wide: Layout = {
  id: "wide",
  W: 960,
  H: 400,
  center: { x: 480, y: 195 },
  side: { x: 220, y: 195 },
  avatar: 68,
  dealer: 44,
  type: "text-[clamp(12px,1.5cqw,17px)]",
  pan: 640,
  site: { x: 380, y: 115 },
  chat: [
    { x: 440, y: 60 },
    { x: 530, y: 100 },
    { x: 420, y: 150 },
    { x: 530, y: 195 },
    { x: 420, y: 245 },
    { x: 530, y: 290 },
  ],
  consent: { x: 480, y: 350 },
  profile: { x: 700, y: 195 },
  dealers: [
    { p: { x: 160, y: 100 }, initials: "FH", name: "Fort Hamilton Tires", note: "No stock", d: 2100 },
    { p: { x: 110, y: 290 }, initials: "GA", name: "Gravesend Auto", note: "9.1 mi", d: 2300 },
    { p: { x: 320, y: 300 }, initials: "SP", name: "Sunset Park Auto", note: "6.3 mi", d: 2500 },
    { p: { x: 690, y: 80 }, initials: "PS", name: "Park Slope Auto", note: "8.4 mi", d: 2700 },
    { p: { x: 850, y: 260 }, initials: "DB", name: "Dyker Beach Tires", note: "Closed today", d: 2900 },
    { ...BR, p: { x: 650, y: 290 } },
  ],
  streets: [
    "M -10 132 C 260 100 660 178 970 134",
    "M 262 -10 C 288 120 232 262 282 410",
    "M 742 -10 C 718 140 780 262 748 410",
    "M -10 338 C 300 302 660 372 970 322",
  ],
  scan: 520,
  qualified: { x: 480, y: 258 },
  dealerSpot: { x: 560, y: 195 },
  notified: { x: 390, y: 165 },
  message: { x: 390, y: 295 },
  messageWidth: "w-[17em]",
  called: { x: 390, y: 355 },
  received: { x: 664, y: 195 },
};

/** The chapters, and how long each runs before the next one starts. */
const chapters = [
  { tab: "Engage", ms: 8500 },
  { tab: "Qualify", ms: 7000 },
  { tab: "Connect", ms: 7500 },
];

const chat: { text: string; from: "bot" | "visitor"; d: number }[] = [
  { text: "Which tire size?", from: "bot", d: 3600 },
  { text: "4 × 235/55R19", from: "visitor", d: 4050 },
  { text: "Your ZIP code?", from: "bot", d: 4500 },
  { text: "Brooklyn, 11209", from: "visitor", d: 4950 },
  { text: "When do you need them?", from: "bot", d: 5400 },
  { text: "This week", from: "visitor", d: 5850 },
];

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/** A point in the layout's viewBox, as a CSS position on the stage. */
function at(L: Layout, { x, y }: Point, anchor: Anchor = "center"): CSSProperties {
  const shift = { center: "-50%", left: "0", right: "-100%" }[anchor];
  return { left: pct(x, L.W), top: pct(y, L.H), transform: `translate(${shift}, -50%)` };
}

/** A line from `a` to `b`, stopping short of each end by the given radius. */
function between(a: Point, ra: number, b: Point, rb: number) {
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const ux = (b.x - a.x) / len;
  const uy = (b.y - a.y) / len;
  return { x1: a.x + ux * ra, y1: a.y + uy * ra, x2: b.x - ux * rb, y2: b.y - uy * rb };
}

/**
 * A soft S between two points: a cubic whose two handles sit a third of the
 * way along the straight line, pushed to opposite sides of it by `amp`. The
 * connectors that carry something (the visitor, the lead) share it.
 */
function sCurve(a: Point, b: Point, amp: number) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const c1 = { x: a.x + dx / 3 + nx * amp, y: a.y + dy / 3 + ny * amp };
  const c2 = { x: a.x + (2 * dx) / 3 - nx * amp, y: a.y + (2 * dy) / 3 - ny * amp };
  return {
    d: `M ${a.x} ${a.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${b.x} ${b.y}`,
    /** The direction the curve arrives in, for an arrowhead at `b`. */
    end: { x: b.x - c2.x, y: b.y - c2.y },
  };
}

/** An open arrowhead with its tip at `tip`, pointing along `dir`. */
function arrowhead(tip: Point, dir: Point, size = 8) {
  const len = Math.hypot(dir.x, dir.y);
  const ux = dir.x / len;
  const uy = dir.y / len;
  const back = { x: tip.x - ux * size, y: tip.y - uy * size };
  const half = size * 0.875;
  return `M ${back.x - uy * half} ${back.y + ux * half} L ${tip.x} ${tip.y} L ${back.x + uy * half} ${back.y - ux * half}`;
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * A positioned piece of the scene. Placement and motion are on two elements on
 * purpose: the outer one is centred with a transform, and the inner one is free
 * to animate its own transform without undoing that.
 */
function Piece({
  L,
  p,
  anchor,
  motion = "s-pop",
  d = 0,
  className = "",
  children,
}: {
  L: Layout;
  p: Point;
  anchor?: Anchor;
  motion?: string;
  d?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="absolute" style={at(L, p, anchor)}>
      <div className={`${motion} ${className}`} style={delay(d)}>
        {children}
      </div>
    </div>
  );
}

function Check({ className = "size-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function Phone({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

function Badge({ initials, match = false }: { initials: string; match?: boolean }) {
  return (
    <span
      className={`story-badge flex aspect-square w-full items-center justify-center rounded-sm text-[0.85em] font-bold ${
        match ? "bg-blue text-white" : "bg-panel-high text-ink-muted"
      }`}
    >
      {initials}
    </span>
  );
}

function Chip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="text-sage-lift border-sage/40 bg-sage/10 inline-flex items-center gap-[0.4em] rounded-full border px-[0.7em] py-[0.3em] text-[0.92em] font-medium whitespace-nowrap tabular-nums">
      {icon}
      {children}
    </span>
  );
}

/**
 * The lead record. In chapter 1 it fills in answer by answer (`filling`); in
 * chapter 3 it arrives complete, on the dealer's side of the hand-over.
 */
function LeadCard({ title, filling = false }: { title: string; filling?: boolean }) {
  const rows: [string, string, number][] = [
    ["Size", "4 × 235/55R19", 4250],
    ["Area", "Brooklyn 11209", 5150],
    ["Timing", "This week", 6050],
  ];

  return (
    <div className="border-line bg-panel w-[15em] rounded-md border">
      <div className="border-line flex items-center justify-between gap-[1em] border-b px-[1em] py-[0.65em]">
        <span className="eyebrow text-ink-dim whitespace-nowrap" style={{ fontSize: "0.72em" }}>
          {title}
        </span>
        <span className="text-ink-dim text-[0.8em]">brand.com/tires</span>
      </div>
      <dl className="divide-line divide-y text-[0.88em]">
        {rows.map(([label, value, d]) => (
          <div key={label} className="flex items-baseline gap-[0.8em] px-[1.15em] py-[0.55em]">
            <dt className="text-ink-dim w-[4.6em] shrink-0 text-[0.92em]">{label}</dt>
            <dd className={`text-ink font-medium ${filling ? "s-fade" : ""}`} style={delay(d)}>
              {value}
            </dd>
          </div>
        ))}
        <div className="flex items-baseline gap-[0.8em] px-[1.15em] py-[0.55em]">
          <dt className="text-ink-dim w-[4.6em] shrink-0 text-[0.92em]">Consent</dt>
          <dd
            className={`text-sage-lift inline-flex items-center gap-[0.4em] font-medium ${filling ? "s-pop" : ""}`}
            style={delay(6550)}
          >
            <Check className="size-[0.9em]" />
            Captured
          </dd>
        </div>
      </dl>
    </div>
  );
}

/* --------------------------------------------- chapter 1 · Engage */

function Engage({ L }: { L: Layout }) {
  const { site, center, pan, W, H } = L;
  const track = W + pan;
  const arrow = sCurve(
    { x: site.x + 210, y: center.y },
    { x: center.x + pan - L.avatar / 2 - 28, y: center.y },
    pan / 22,
  );
  const tip = { x: center.x + pan - L.avatar / 2 - 28, y: center.y };

  return (
    <>
      {/*
        The camera. A track wider than the stage by the pan distance: the
        brand's site at the start, the conversation at the end. It pans left
        while the visitor holds still, which reads as the visitor following the
        arrow out of the site and into the chat.
      */}
      <div className="story-frame absolute inset-0 overflow-hidden">
        <div
          className="s-pan absolute inset-y-0 left-0"
          style={
            {
              width: pct(track, W),
              "--pan": `-${(pan / track) * 100}%`,
              ...delay(2400),
            } as CSSProperties
          }
        >
          <svg viewBox={`0 0 ${track} ${H}`} className="absolute inset-0 size-full">
            <defs>
              <mask id={`story-arrow-${L.id}`} maskUnits="userSpaceOnUse">
                <path
                  d={arrow.d}
                  pathLength={1}
                  className="s-draw"
                  fill="none"
                  stroke="white"
                  strokeWidth="20"
                  strokeLinecap="square"
                  style={delay(1700)}
                />
              </mask>
            </defs>

            {/* The way in: a faint line from the edge of the frame to the site. */}
            <path
              d={`M -20 ${center.y} H ${site.x + 6}`}
              pathLength={1}
              className="s-draw stroke-line-strong"
              strokeWidth="1.5"
              fill="none"
              style={delay(200)}
            />

            {/* The brand's site, drawn as a browser window. */}
            <g className="s-fade" style={delay(0)} transform={`translate(${site.x} ${site.y})`}>
              <rect width="200" height="160" rx="6" className="fill-panel stroke-line-strong" />
              <path d="M 0 20 H 200" className="stroke-line-strong" />
              <circle cx="12" cy="10" r="2.5" className="fill-line-strong" />
              <circle cx="21" cy="10" r="2.5" className="fill-line-strong" />
              <circle cx="30" cy="10" r="2.5" className="fill-line-strong" />
              <text x="44" y="13.5" className="fill-ink-dim text-[9px]">
                brand.com/tires
              </text>
              <rect x="16" y="32" width="96" height="8" rx="2" className="fill-line-strong" />
              <rect x="16" y="46" width="64" height="5" rx="2" className="fill-line" />
              <rect x="16" y="114" width="52" height="32" rx="3" className="fill-panel-high" />
              <rect x="74" y="114" width="52" height="32" rx="3" className="fill-panel-high" />
              <rect x="132" y="114" width="52" height="32" rx="3" className="fill-panel-high" />
              {/* The chat launcher the visitor opens. */}
              <circle
                cx="184"
                cy={center.y - site.y + 8}
                r="8"
                className="s-pulse fill-blue"
                style={delay(1400)}
              />
            </g>

            {/* The arrow the camera follows, drawn out from the site's edge. */}
            <g
              mask={`url(#story-arrow-${L.id})`}
              className="stroke-blue-pale"
              fill="none"
              strokeWidth="1.5"
            >
              <path d={arrow.d} strokeDasharray="5 6" />
              <path
                d={arrowhead(tip, arrow.end)}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>

      {chat.map((line, index) => (
        <Piece
          key={line.text}
          L={L}
          p={L.chat[index]}
          anchor={line.from === "bot" ? "right" : "left"}
          motion="s-rise"
          d={line.d}
        >
          <p
            className={`rounded-[0.6em] px-[0.8em] py-[0.4em] whitespace-nowrap ${
              line.from === "bot"
                ? "border-line bg-panel text-ink-muted rounded-br-[0.15em] border"
                : "bg-blue rounded-bl-[0.15em] font-medium text-white"
            }`}
          >
            {line.text}
          </p>
        </Piece>
      ))}

      {/* What the answers add up to: a lead record, filling in as they arrive. */}
      {L.profile && (
        <Piece L={L} p={L.profile} anchor="left" d={3300}>
          <LeadCard title="New lead" filling />
        </Piece>
      )}

      <Piece L={L} p={L.consent} d={6400}>
        <Chip icon={<Check className="size-[0.9em]" />}>Consent captured</Chip>
      </Piece>
    </>
  );
}

/* --------------------------------------------- chapter 2 · Qualify */

function Qualify({ L }: { L: Layout }) {
  const match = L.dealers.find((dealer) => dealer.match)!;

  return (
    <>
      <svg viewBox={`0 0 ${L.W} ${L.H}`} className="absolute inset-0 size-full overflow-visible">
        {/* A few streets, so the dealers read as places on a map. */}
        <g className="s-fade stroke-line" fill="none" style={delay(0)}>
          {L.streets.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* The search: one ring sweeping out from the visitor. */}
        <circle
          cx={L.center.x}
          cy={L.center.y}
          r={L.scan}
          className="s-scan stroke-blue-pale"
          fill="none"
          strokeWidth="1.5"
          style={delay(1200)}
        />

        {/* The match stays a straight line: the one connector that is a decision. */}
        <line
          {...between(L.center, L.avatar / 2 + 6, match.p, L.dealer / 2 + 8)}
          pathLength={1}
          className="s-draw stroke-blue-pale"
          strokeWidth="1.5"
          style={delay(3500)}
        />
      </svg>

      {L.dealers.map((dealer, index) => (
        <div
          key={dealer.name}
          className="absolute"
          style={{ ...at(L, dealer.p), width: pct(L.dealer, L.W) }}
        >
          <div className="s-pop" style={delay(300 + index * 120)}>
            <div className={dealer.match ? "s-match" : "s-dim"} style={delay(dealer.d)}>
              <Badge initials={dealer.initials} match={dealer.match} />
            </div>
          </div>
          <div
            className="s-pop absolute top-full left-1/2 mt-[0.4em] w-max max-w-[11em] -translate-x-1/2 text-center leading-tight"
            style={delay(400 + index * 120)}
          >
            <span className={dealer.match ? "" : "s-dim block"} style={delay(dealer.d)}>
              <span className="text-ink block text-[0.92em] font-semibold">
                {dealer.name}
              </span>
            </span>
            <span
              className={`s-pop block text-[0.8em] ${dealer.match ? "text-sage-lift" : "text-ink-dim"}`}
              style={delay(dealer.d)}
            >
              {dealer.note}
            </span>
          </div>
        </div>
      ))}

      <Piece L={L} p={L.qualified} d={3900}>
        <Chip icon={<Check className="size-[0.9em]" />}>Qualified</Chip>
      </Piece>
    </>
  );
}

/* --------------------------------------------- chapter 3 · Connect */

function Connect({ L }: { L: Layout }) {
  const match = L.dealers.find((dealer) => dealer.match)!;
  const spot = L.dealerSpot;
  const path = sCurve(
    { x: L.side.x + L.avatar / 2 + 8, y: spot.y },
    { x: spot.x - L.avatar / 2 - 8, y: spot.y },
    18,
  ).d;

  return (
    <>
      <svg viewBox={`0 0 ${L.W} ${L.H}`} className="absolute inset-0 size-full overflow-visible">
        <path
          d={path}
          pathLength={1}
          className="s-draw stroke-blue-pale"
          strokeWidth="1.5"
          fill="none"
          style={delay(1000)}
        />
        {/* The lead itself, handed across. */}
        <path
          d={path}
          pathLength={1}
          className="s-travel stroke-blue-pale"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          style={delay(1500)}
        />
      </svg>

      {/*
        The matched dealer, walking in from where it stood on the map. It is a
        separate element from the one in chapter 2, starting from that one's
        spot and size, so the hand-over between layers is invisible.
      */}
      <div
        className="s-move absolute"
        style={
          {
            ...at(L, spot),
            width: pct(L.avatar, L.W),
            "--from-x": pct(match.p.x, L.W),
            "--from-y": pct(match.p.y, L.H),
            "--from-w": pct(L.dealer, L.W),
          } as CSSProperties
        }
      >
        <Badge initials={match.initials} match />
        {/* The call: it appears once the lead has arrived, then rings. */}
        <span className="s-pop absolute -top-[0.6em] -right-[0.6em]" style={delay(2100)}>
          <span
            className="s-ring bg-sage flex size-[1.8em] items-center justify-center rounded-full text-white"
            style={delay(2500)}
          >
            <Phone className="size-[0.9em]" />
          </span>
        </span>
        <span className="text-ink absolute top-full left-1/2 mt-[0.5em] w-max -translate-x-1/2 text-center text-[0.92em] leading-tight font-semibold">
          {match.name}
        </span>
      </div>

      <Piece L={L} p={L.notified} motion="s-rise" d={1500}>
        <span className="text-ink-dim text-[0.88em] whitespace-nowrap tabular-nums">
          Notified <span className="text-ink">12:04</span>
        </span>
      </Piece>

      <Piece L={L} p={L.message} motion="s-rise" d={3100}>
        <p
          className={`border-line bg-panel text-ink-muted ${L.messageWidth} rounded-[0.6em] rounded-tr-[0.15em] border px-[0.8em] py-[0.55em] leading-snug`}
        >
          Hi, your tires are in stock. Want to book a fitting?
        </p>
      </Piece>

      {L.received && (
        <Piece L={L} p={L.received} anchor="left" d={2300}>
          <LeadCard title="Lead received" />
        </Piece>
      )}

      <Piece L={L} p={L.called} d={4000}>
        <Chip icon={<Phone className="size-[0.9em]" />}>Called back 12:08</Chip>
      </Piece>
    </>
  );
}

/* ------------------------------------------------------------------ stage */

const scenes = [Engage, Qualify, Connect];

function Stage({ L, chapter, className }: { L: Layout; chapter: number; className: string }) {
  const visitor = chapter === 2 ? L.side : L.center;

  return (
    <div
      className={`@container relative mx-auto ${className}`}
      style={{ aspectRatio: `${L.W} / ${L.H}` }}
      aria-hidden
    >
      {/* The base size lives one level in: `cqw` on the container itself
          would measure the container's parent, not the stage. */}
      <div className={`absolute inset-0 ${L.type}`}>
        {scenes.map((Scene, index) => (
          <div
            key={index}
            className={`story-scene absolute inset-0 ${index === chapter ? "is-active" : ""}`}
          >
            <Scene L={L} />
          </div>
        ))}

        {/* The visitor: the one thing on stage in every chapter. */}
        <div
          className="story-visitor absolute"
          style={{ ...at(L, visitor), width: pct(L.avatar, L.W) }}
        >
          <span className="story-visitor-dot border-blue-pale bg-panel-blue text-ink flex aspect-square w-full items-center justify-center rounded-full border-[1.5px] text-[1.1em] font-semibold">
            MR
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroStory() {
  const [chapter, setChapter] = useState(0);
  const [onScreen, setOnScreen] = useState(true);
  const [pageShown, setPageShown] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  // Hold the clock while the story is off screen or the tab is in the
  // background, so nobody comes back to the middle of a chapter they missed.
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(node);
    const onVisibility = () => setPageShown(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const paused = !onScreen || !pageShown;

  return (
    <div
      ref={root}
      className="story"
      data-chapter={chapter}
      data-paused={paused || undefined}
    >
      <p className="sr-only">
        How a lead moves through LeadHanger: a visitor arrives on the
        brand&apos;s site and answers a few questions in a chat, gives consent,
        is matched to the nearest dealer with their tires in stock, and that
        dealer calls them back four minutes after being notified.
      </p>

      <Stage
        L={compact}
        chapter={chapter}
        className="w-[min(100%,40rem,max(20rem,calc((100svh-27rem)*1.1)))] lg:hidden"
      />
      <Stage
        L={wide}
        chapter={chapter}
        className="hidden w-[min(100%,calc((100svh-27rem)*2.4))] lg:block"
      />

      <div className="border-line mx-auto mt-6 grid max-w-[40rem] grid-cols-3 border-t">
        {chapters.map((c, index) => (
          <button
            key={c.tab}
            type="button"
            onClick={() => setChapter(index)}
            aria-pressed={index === chapter}
            className={`relative pt-3 text-center text-[12px] font-medium transition-colors sm:text-[13px] ${
              index === chapter ? "text-ink font-semibold" : "text-ink-dim hover:text-ink-muted"
            }`}
          >
            <span className="absolute inset-x-0 -top-px h-px overflow-hidden" aria-hidden>
              <span
                className={`story-progress bg-blue-pale block h-full ${
                  index === chapter ? "is-current" : index < chapter ? "is-done" : ""
                }`}
                style={{ "--chapter-ms": `${c.ms}ms` } as CSSProperties}
                onAnimationEnd={(event) => {
                  if (event.target !== event.currentTarget) return;
                  setChapter((current) => (current + 1) % chapters.length);
                }}
              />
            </span>
            {/* Only the current step takes the accent; the others recede whole. */}
            <span
              className={`mr-2 tabular-nums transition-colors ${
                index === chapter ? "text-blue-pale" : ""
              }`}
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {c.tab}
          </button>
        ))}
      </div>
    </div>
  );
}
