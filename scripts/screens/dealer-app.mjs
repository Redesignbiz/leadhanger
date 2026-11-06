/**
 * The dealer app (brisa-frontend/dealer-mobile), redrawn in English with
 * made-up US data. Layout, type scale, spacing and icons follow the app's
 * code: the request list is app/(tabs)/tasks.tsx with TaskCard, the request
 * detail is app/request/[id].tsx, the tablet layout is the wide (900pt and up)
 * version of the request list with TaskRow. Left out on purpose: the client's
 * brand badges and logos.
 *
 * The conversation thread (`thread`) is a December feature (texting and
 * masked calling from the brand's number) that the app does not have yet; it
 * is drawn in the app's own components so it reads as the same product.
 */
import { c, h, t, icon, chip, phone, tablet, PHONE } from "./kit.mjs";

/** The app's type scale and spacing, in points, scaled to the phone in the image. */
function scale(s) {
  const p = (n) => Math.round(n * s);
  const type = {
    display: (x, color = c.ink) => t(x, p(24), 600, color, { letterSpacing: -0.48 * s }),
    displayMobile: (x, color = c.ink) => t(x, p(22), 600, color, { letterSpacing: -0.22 * s }),
    appBar: (x, color = c.ink) => t(x, p(21), 700, color),
    headlineSm: (x, color = c.ink) => t(x, p(19), 600, color, { letterSpacing: -0.19 * s }),
    body: (x, color = c.ink, style = {}) => t(x, p(17), 400, color, style),
    bodyStrong: (x, color = c.ink) => t(x, p(17), 600, color),
    label: (x, color = c.muted, style = {}) => t(x, p(15), 500, color, { letterSpacing: 0.15 * s, ...style }),
    caption: (x, color = c.muted) => t(x, p(14), 500, color, { letterSpacing: 0.28 * s }),
  };
  const card = (children, style = {}) =>
    h("div", { style: { flexDirection: "column", background: c.panel, border: `1px solid ${c.line}`, borderRadius: p(12), padding: p(16), ...style } }, children);
  return { p, type, card };
}

/** Pixels per point on the phone screens: the whole device, see kit.mjs. */
const S = PHONE.scale;

/** The bottom tab bar, app/(tabs)/_layout.tsx. */
function tabBar({ p, type }, active) {
  const tabs = [
    ["insights", "Summary"],
    ["assignment", "Requests"],
    ["event", "Appointments"],
    ["person", "My account"],
  ];
  return h(
    "div",
    { style: { height: p(68), alignItems: "center", padding: `${p(6)}px 0`, borderTop: `1px solid ${c.line}` } },
    tabs.map(([glyph, label]) =>
      h(
        "div",
        { style: { flex: 1, flexDirection: "column", alignItems: "center", gap: p(2) } },
        icon(glyph, p(24), label === active ? c.bluePale : c.muted),
        type.caption(label, label === active ? c.bluePale : c.muted),
      ),
    ),
  );
}

/** The app bar of a pushed screen: back arrow, centred title. */
function appBar({ p, type }, title, sub, right) {
  return h(
    "div",
    { style: { height: p(sub ? 64 : 56), flexShrink: 0, alignItems: "center", justifyContent: "space-between", padding: `0 ${p(8)}px`, borderBottom: `1px solid ${c.line}` } },
    h("div", { style: { width: p(44), height: p(44), alignItems: "center", justifyContent: "center" } }, icon("arrow-back", p(24), c.ink)),
    h("div", { style: { flexDirection: "column", alignItems: "center" } }, type.appBar(title), sub ? type.caption(sub, c.dim) : null),
    h("div", { style: { width: p(44), height: p(44), alignItems: "center", justifyContent: "center" } }, right ?? null),
  );
}

function header({ p, type }, title, sub) {
  return h(
    "div",
    { style: { padding: `${p(24)}px ${p(16)}px ${p(16)}px`, justifyContent: "space-between", alignItems: "center" } },
    h("div", { style: { flexDirection: "column", gap: p(4) } }, type.displayMobile(title), type.label(sub)),
    h(
      "div",
      { style: { alignItems: "center", gap: p(4) } },
      h(
        "div",
        { style: { height: p(36), alignItems: "center", gap: p(4), padding: `0 ${p(8)}px`, borderRadius: 999, border: `1px solid ${c.lineStrong}`, background: c.panelLow } },
        icon("place", p(16), c.bluePale),
        type.label("Newark", c.ink),
        icon("expand-more", p(18), c.muted),
      ),
      h(
        "div",
        { style: { width: p(44), height: p(44), alignItems: "center", justifyContent: "center", position: "relative" } },
        icon("notifications-none", p(24), c.ink),
        h(
          "div",
          { style: { position: "absolute", top: p(4), right: p(4), width: p(18), height: p(18), borderRadius: 99, background: c.rose, alignItems: "center", justifyContent: "center" } },
          t("3", p(12), 700, c.ink),
        ),
      ),
    ),
  );
}

function filterBar({ p, type }, pills) {
  return h(
    "div",
    { style: { gap: p(8), padding: `${p(8)}px ${p(16)}px`, borderBottom: `1px solid ${c.line}`, overflow: "hidden" } },
    pills.map((label, i) =>
      h(
        "div",
        {
          style: {
            flexShrink: 0,
            padding: `${p(8)}px ${p(16)}px`,
            borderRadius: 999,
            border: `1px solid ${i === 0 ? c.blue : c.lineStrong}`,
            background: i === 0 ? c.blue : c.panel,
          },
        },
        type.label(label, i === 0 ? c.ink : c.muted),
      ),
    ),
  );
}

const pills = ["All (12)", "New customers (3)", "Awaiting outcome (4)", "Completed (5)"];

/** One lead card, as TaskCard draws it. */
function leadCard(k, lead) {
  const { p, type, card } = k;
  const late = lead.late != null;
  return card(
    [
      lead.inProgress
        ? null
        : h(
            "div",
            { style: { justifyContent: "space-between", alignItems: "center" } },
            type.bodyStrong(lead.time),
            late
              ? type.caption(lead.late)
              : h(
                  "div",
                  { style: { padding: `${p(4)}px ${p(8)}px`, borderRadius: p(8), background: c.panelBlue } },
                  type.caption(lead.left, c.bluePale),
                ),
          ),
      h(
        "div",
        { style: { alignItems: "center", gap: p(8) } },
        type.headlineSm(lead.name),
        type.label("·"),
        type.label(lead.town),
      ),
      type.label(lead.tire),
      lead.inProgress
        ? h(
            "div",
            { style: { alignItems: "center", gap: p(8), padding: `${p(6)}px ${p(16)}px`, borderRadius: p(12), background: c.panelBlue } },
            icon("info-outline", p(20), c.bluePale),
            type.label("Awaiting outcome.", c.bluePale),
          )
        : null,
    ],
    {
      gap: p(8),
      borderLeft: late ? `${p(3)}px solid ${c.rose}` : `1px solid ${c.line}`,
    },
  );
}

const tireLeads = [
  { time: "2:30 PM", left: "45 minutes left", name: "Maria Garcia", town: "Ironbound", tire: "225/45R17 · 4 tires · All-season" },
  { time: "2:05 PM", left: "28 minutes left", name: "John Smith", town: "Harrison", tire: "205/55R16 · 2 tires · Winter" },
  { time: "1:20 PM", late: "Not called for 1 h", name: "Jane Doe", town: "Kearny", tire: "235/60R18 · 4 tires · All-season" },
  { inProgress: true, name: "David Miller", town: "Bayonne", tire: "215/60R16 · 4 tires · All-season" },
];

/** "Today's leads in the dealer app": the request list. */
export function requests() {
  const k = scale(S);
  const { p, type } = k;
  return phone({
    footer: tabBar(k, "Requests"),
    screen: h(
      "div",
      { style: { flexDirection: "column" } },
      header(k, "Requests", "Friday, November 6"),
      filterBar(k, pills),
      h(
        "div",
        { style: { flexDirection: "column", padding: `0 ${p(16)}px` } },
        h("div", { style: { padding: `${p(24)}px 0 ${p(8)}px` } }, type.label("New customers (3)")),
        h("div", { style: { flexDirection: "column", gap: p(8) } }, tireLeads.slice(0, 3).map((lead) => leadCard(k, lead))),
        h("div", { style: { padding: `${p(24)}px 0 ${p(8)}px` } }, type.label("Awaiting outcome (4)")),
        leadCard(k, tireLeads[3]),
      ),
    ),
  });
}

/** The amber notice with the response countdown ring, as on the request detail. */
function countdown({ p, type }) {
  const ring = p(56);
  return h(
    "div",
    { style: { alignItems: "center", gap: p(12), padding: p(16), borderRadius: p(12), background: `${c.amber}1c`, border: `1px solid ${c.amber}44` } },
    h(
      "div",
      { style: { width: ring, height: ring, flexShrink: 0, alignItems: "center", justifyContent: "center", position: "relative" } },
      h("svg", { width: ring, height: ring, viewBox: "0 0 56 56", style: { position: "absolute", top: 0, left: 0 } },
        h("circle", { cx: 28, cy: 28, r: 25.5, fill: "none", stroke: c.amber, strokeOpacity: 0.25, strokeWidth: 5 }),
        // 45 of 60 minutes left: three quarters of the ring, clockwise from 12 o'clock.
        h("path", { d: "M28 2.5 A25.5 25.5 0 1 1 2.5 28", fill: "none", stroke: c.amber, strokeWidth: 5, strokeLinecap: "round" })),
      h("div", { style: { width: p(40), height: p(40), borderRadius: 99, background: c.panel, alignItems: "center", justifyContent: "center" } }, icon("phone", p(20), c.amber)),
    ),
    h(
      "div",
      { style: { flexDirection: "column", gap: p(2), flex: 1 } },
      type.bodyStrong("Call within 45 minutes", c.amberLift),
      type.label("Requests not called in time can move to the next dealer.", c.amberLift, { lineHeight: 1.3 }),
    ),
  );
}

function detailCard({ p, type }, rows) {
  return h(
    "div",
    { style: { flexDirection: "column", background: c.panel, border: `1px solid ${c.line}`, borderRadius: p(12) } },
    rows.map(([label, value, extra], i) =>
      h(
        "div",
        {
          style: {
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: p(16),
            padding: p(16),
            borderTop: i ? `1px solid ${c.line}` : "none",
          },
        },
        type.label(label),
        h(
          "div",
          { style: { flexDirection: "column", alignItems: "flex-end", gap: p(4) } },
          typeof value === "string" ? t(value, p(17), 500, c.ink) : value,
          extra ?? null,
        ),
      ),
    ),
  );
}

function identity({ p, type }, { initials, name, place }) {
  return h(
    "div",
    { style: { flexDirection: "column", alignItems: "center", gap: p(8) } },
    h("div", { style: { width: p(56), height: p(56), borderRadius: 99, background: c.panelHigh, alignItems: "center", justifyContent: "center" } }, t(initials, p(20), 600, c.ink)),
    type.display(name),
    type.label(place),
    chip("New", c.muted, p(13)),
  );
}

function actionBar({ p }) {
  const button = (children, style) =>
    h("div", { style: { height: p(44), borderRadius: p(12), alignItems: "center", justifyContent: "center", gap: p(8), padding: `0 ${p(16)}px`, ...style } }, children);
  return h(
    "div",
    { style: { gap: p(8), padding: p(16), borderTop: `1px solid ${c.line}` } },
    button(t("Set outcome", p(15), 600, c.ink), { flex: 1, border: `1px solid ${c.dim}` }),
    button([icon("call", p(20), c.ink), t("Call customer", p(15), 600, c.ink)], { flex: 1.5, background: c.blue }),
    button(icon("sms", p(22), c.ink), { width: p(48), padding: 0, border: `1px solid ${c.dim}` }),
  );
}

function leadDetail(person, rows) {
  const k = scale(S);
  const { p } = k;
  return phone({
    footer: actionBar(k),
    screen: [
      appBar(k, "Request details"),
      h(
        "div",
        { style: { flexDirection: "column", gap: p(18), padding: `${p(18)}px ${p(16)}px ${p(16)}px` } },
        identity(k, person),
        countdown(k),
        detailCard(k, rows),
      ),
    ],
  });
}

const phoneRow = (p) => [
  "Phone",
  t("(201) 555-••••", p(17), 500, c.ink, { letterSpacing: 0.5 }),
  t("Show number", p(15), 600, c.bluePale),
];

/** "A lead in the dealer app" and "A tire request in the store app". */
export function tireLead() {
  const { p } = scale(S);
  return leadDetail(
    { initials: "MG", name: "Maria Garcia", place: "Newark · Ironbound" },
    [
      ["Requested service", "Tire quote"],
      ["Tire size", "225/45R17"],
      ["Quantity", "4 tires"],
      ["Channel", "Website chat"],
      phoneRow(p),
    ],
  );
}

/** "A window request in the dealer app": the window question set (December). */
export function windowLead() {
  const { p } = scale(S);
  const photos = h(
    "div",
    { style: { gap: p(6) } },
    [0, 1].map(() =>
      h("div", { style: { width: p(40), height: p(40), borderRadius: p(8), background: c.panelHigh, border: `1px solid ${c.lineStrong}`, alignItems: "center", justifyContent: "center" } }, icon("image", p(20), c.dim)),
    ),
  );
  return leadDetail(
    { initials: "EJ", name: "Emily Johnson", place: "Paramus, NJ · 07652" },
    [
      ["Requested service", "Window replacement"],
      ["Windows", "6"],
      ["Window type", "Double-hung"],
      ["Photos", photos],
      phoneRow(p),
    ],
  );
}

/** "One conversation thread in the store app" (December: texting and masked calling from the brand's number). */
export function thread() {
  const k = scale(S);
  const { p, type } = k;
  const bubble = (text, out) =>
    h(
      "div",
      { style: { justifyContent: out ? "flex-end" : "flex-start" } },
      h(
        "div",
        {
          style: {
            maxWidth: "80%",
            padding: `${p(10)}px ${p(14)}px`,
            borderRadius: p(18),
            borderTopRightRadius: out ? p(6) : p(18),
            borderTopLeftRadius: out ? p(18) : p(6),
            background: out ? c.blue : c.panelHigh,
          },
        },
        type.body(text, c.ink, { lineHeight: 1.35 }),
      ),
    );
  const note = (glyph, text) =>
    h("div", { style: { justifyContent: "center", alignItems: "center", gap: p(6) } }, icon(glyph, p(16), c.dim), type.caption(text, c.dim));
  const composer = h(
    "div",
    { style: { alignItems: "center", gap: p(8), padding: `${p(10)}px ${p(12)}px`, borderTop: `1px solid ${c.line}` } },
    h("div", { style: { flex: 1, padding: `${p(10)}px ${p(14)}px`, borderRadius: p(22), background: c.ground, border: `1px solid ${c.line}` } }, type.body("Text from the brand's number", c.dim)),
    h("div", { style: { width: p(40), height: p(40), borderRadius: 99, background: c.blue, alignItems: "center", justifyContent: "center" } }, icon("send", p(20), c.ink)),
  );
  return phone({
    footer: composer,
    screen: [
      appBar(k, "Maria Garcia", "Brand number · customer's number hidden", icon("call", p(24), c.bluePale)),
      h(
        "div",
        { style: { flexShrink: 0, alignItems: "center", gap: p(8), margin: `${p(12)}px ${p(16)}px 0`, padding: p(12), borderRadius: p(12), background: c.panelBlue } },
        icon("event-available", p(20), c.bluePale),
        type.bodyStrong("Appointment: Tomorrow, 10:00 AM", c.bluePale),
      ),
      h(
        "div",
        { style: { flex: 1, flexDirection: "column", justifyContent: "flex-end", gap: p(10), padding: `${p(16)}px ${p(16)}px` } },
        note("chat-bubble-outline", "Request from the website chat · 2:30 PM"),
        note("schedule", "Today, 2:34 PM"),
        bubble("Hi Maria, this is Route 9 Tire & Service. Your 225/45R17 all-season tires are in stock. Does tomorrow at 10 AM work for fitting?", true),
        bubble("Yes, 10 works. Can I pay at the store?", false),
        note("phone-in-talk", "Call · 2 min"),
        bubble("Booked for tomorrow at 10 AM. Card or cash at the counter is fine.", true),
        bubble("Great, thank you!", false),
      ),
    ],
  });
}

/** "The dealer app on a tablet": the wide layout of the request list. 1152 x 864, the site's 4:3 frame at 2x. */
export function requestsTablet() {
  const s = 1.1;
  const k = scale(s);
  const { p, type } = k;
  const tab = (glyph, label, active) =>
    h(
      "div",
      { style: { flexDirection: "column", alignItems: "center", gap: p(4), padding: `${p(14)}px 0` } },
      icon(glyph, p(24), active ? c.bluePale : c.muted),
      type.caption(label, active ? c.bluePale : c.muted),
    );
  const cols = [140, 130, 95, 175];
  const row = (cells, head) =>
    h(
      "div",
      {
        style: {
          alignItems: "center",
          padding: head ? `${p(8)}px ${p(16)}px` : p(14),
          paddingLeft: p(16),
          background: head ? "transparent" : c.panel,
          borderBottom: head ? "none" : `1px solid ${c.line}`,
        },
      },
      cells.map((cell, i) => h("div", { style: cols[i] ? { width: p(cols[i]), flexShrink: 0 } : { flex: 1 } }, cell)),
    );
  const headRow = row(["Call time", "Customer", "Town", "Tire", "Status"].map((x) => type.caption(x)), true);
  const leadRow = (lead, status) =>
    row([
      type.bodyStrong(lead.time ?? "1:05 PM"),
      type.bodyStrong(lead.name),
      type.body(lead.town, c.muted),
      type.body(lead.tire.split(" · ").slice(0, 2).join(" · "), c.muted),
      status,
    ]);
  const section = (title, rows) =>
    h(
      "div",
      { style: { flexDirection: "column" } },
      h("div", { style: { padding: `${p(20)}px 0 ${p(8)}px` } }, type.label(title)),
      headRow,
      h("div", { style: { flexDirection: "column", borderRadius: p(12), overflow: "hidden", border: `1px solid ${c.line}` } }, rows),
    );
  return tablet({
    width: 1152,
    height: 864,
    screen: h(
      "div",
      { style: { flex: 1 } },
      h(
        "div",
        { style: { width: p(180), flexShrink: 0, flexDirection: "column", paddingTop: p(16), background: c.panel, borderRight: `1px solid ${c.line}` } },
        tab("insights", "Summary"),
        tab("assignment", "Requests", true),
        tab("event", "Appointments"),
        tab("person", "My account"),
      ),
      h(
        "div",
        { style: { flex: 1, flexDirection: "column", overflow: "hidden" } },
        header(k, "Requests", "Friday, November 6"),
        filterBar(k, pills),
        h(
          "div",
          { style: { flexDirection: "column", padding: `0 ${p(16)}px` } },
          section("New customers (3)", [
            leadRow(tireLeads[0], chip("New", c.muted, p(12))),
            leadRow(tireLeads[1], chip("New", c.muted, p(12))),
            leadRow(tireLeads[2], type.caption("Not called for 1 h")),
          ]),
          section("Upcoming (2)", [
            leadRow({ time: "Nov 7, 10:00 AM", name: "David Miller", town: "Elizabeth", tire: "245/40R18 · 4 tires" }, chip("Appointment set", c.bluePale, p(12))),
            leadRow({ time: "Nov 7, 3:30 PM", name: "Emily Johnson", town: "Hoboken", tire: "205/55R16 · 4 tires" }, chip("Appointment set", c.bluePale, p(12))),
          ]),
        ),
      ),
    ),
  });
}
