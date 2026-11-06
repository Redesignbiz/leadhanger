/**
 * The brand dashboard (brisa-frontend/admin-dashboard), redrawn in English
 * with made-up US data. The shell is components/Layout.tsx (sidebar and main
 * area, no top bar); routing rules are pages/admin/Rules.tsx (the read-only
 * view); the scorecard and the overview are components/PerformanceView.tsx,
 * which both the admin overview and the regional manager's performance page
 * render. Left out on purpose: the client's logo, its "users" menu item and
 * its brand names in the rules.
 *
 * Images are 1200 x 750, the site's 16:10 "desktop" frame, drawn at 1.2x the
 * dashboard's own sizes so the text survives being shown at half width.
 */
import { c, h, t, icon, logo, browser } from "./kit.mjs";

const k = 1.2;
const p = (n) => Math.round(n * k);
const SIZE = { width: 1200, height: 750 };

const text = {
  h1: (x) => t(x, p(22), 600, c.ink, { letterSpacing: -0.44 }),
  h3: (x) => t(x, p(17), 600, c.ink),
  title: (x) => t(x, p(15), 600, c.ink),
  body: (x, color = c.muted, style = {}) => t(x, p(15), 400, color, style),
  cell: (x, color = c.ink, weight = 400) => t(x, p(14), weight, color),
  small: (x, color = c.dim, style = {}) => t(x, p(13), 400, color, style),
  tiny: (x, color = c.dim) => t(x, p(12), 500, color),
};

const card = (children, style = {}) =>
  h("div", { style: { flexDirection: "column", background: c.panel, border: `1px solid ${c.line}`, borderRadius: p(12), padding: p(16), ...style } }, children);

/** The LeadHanger logo where the dashboard shows the client's (104px wide). */
const mark = logo(p(26));

const chevrons = (dir) =>
  h(
    "svg",
    { width: p(18), height: p(18), viewBox: "0 0 24 24", fill: "none", stroke: c.muted, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
    h("path", { d: dir === "left" ? "M11 17l-5-5 5-5M18 17l-5-5 5-5" : "M13 17l5-5-5-5M6 17l5-5-5-5" }),
  );

function shell({ section, items, active, user, role, main }) {
  return browser({
    ...SIZE,
    screen: h(
      "div",
      { style: { width: "100%", height: "100%", background: c.ground } },
      h(
        "div",
        { style: { width: p(236), flexShrink: 0, flexDirection: "column", gap: p(24), padding: `${p(24)}px ${p(16)}px`, background: c.panel, borderRight: `1px solid ${c.line}` } },
        h(
          "div",
          { style: { justifyContent: "space-between", alignItems: "center", padding: `0 ${p(8)}px` } },
          mark,
          h("div", { style: { width: p(32), height: p(32), borderRadius: p(8), border: `1px solid ${c.line}`, alignItems: "center", justifyContent: "center" } }, chevrons("left")),
        ),
        h(
          "div",
          { style: { flexDirection: "column", gap: 2 } },
          t(section, p(12), 500, c.dim, { padding: `${p(8)}px ${p(8)}px ${p(4)}px`, letterSpacing: 0.3 }),
          items.map((item) =>
            h(
              "div",
              { style: { padding: `${p(7)}px ${p(8)}px`, borderRadius: p(8), background: item === active ? c.panelBlue : "transparent" } },
              t(item, p(14), item === active ? 600 : 500, item === active ? c.bluePale : c.muted),
            ),
          ),
        ),
        h(
          "div",
          { style: { marginTop: "auto", flexDirection: "column", gap: p(8), paddingTop: p(16), borderTop: `1px solid ${c.line}` } },
          t(user, p(14), 600, c.ink),
          text.tiny(role),
          h("div", { style: { height: p(32), alignSelf: "flex-start", alignItems: "center", padding: `0 ${p(12)}px`, borderRadius: p(12), border: `1px solid ${c.line}` } }, t("Sign out", p(13), 500, c.muted)),
        ),
      ),
      h("div", { style: { flex: 1, flexDirection: "column", gap: p(20), padding: `${p(26)}px ${p(24)}px`, overflow: "hidden" } }, main),
    ),
  });
}

const adminItems = ["Overview", "Requests", "Reports", "Communication center", "Chatbot", "Dealers", "Team", "Routing rules", "Dealer applications"];

function pageHead(title, sub) {
  return h("div", { style: { flexDirection: "column", gap: p(4) } }, text.h1(title), text.body(sub));
}

/* ------------------------------------------------------------ routing rules */

const ruleCols = [48, 166, 170, 80, 110, 48, 50];
function ruleRow(cells, { head = false, tint = false } = {}) {
  return h(
    "div",
    {
      style: {
        alignItems: "flex-start",
        background: head ? c.panelHigh : tint ? "#181d27" : "transparent",
        borderBottom: `1px solid ${head ? c.line : "#1f2430"}`,
      },
    },
    cells.map((cell, i) =>
      h(
        "div",
        {
          style: {
            width: p(ruleCols[i]),
            flexShrink: 0,
            flexDirection: "column",
            gap: 2,
            padding: head ? `${p(10)}px ${p(10)}px` : `${p(12)}px ${p(10)}px`,
            alignItems: i === 0 || i === 5 ? "flex-end" : "flex-start",
          },
        },
        cell,
      ),
    ),
  );
}

function dealerGroup(name, count, open, inactive) {
  return h(
    "div",
    { style: { alignItems: "center", gap: p(8), padding: `${p(12)}px ${p(10)}px ${p(12)}px ${p(ruleCols[0] + 10)}px`, borderBottom: `1px solid #1f2430` } },
    icon(open ? "arrow-drop-down" : "arrow-right", p(18), c.dim),
    t(name, p(14), 600, c.ink),
    inactive ? text.small("inactive") : null,
    text.small(count),
  );
}

function rule({ order, wait, backup, location, detail, brand, tier, tierLabel }) {
  return ruleRow(
    [
      text.small(order),
      [text.small(wait), backup ? t(backup, p(13), 400, c.muted, { marginTop: 2 }) : null],
      [text.cell(location, c.ink, 600), detail ? t(detail, p(13), 400, detail.startsWith("Shared") ? c.dim : c.muted) : null],
      brand === "All brands" ? text.small(brand) : text.cell(brand),
      h("div", { style: { gap: p(6), alignItems: "flex-start" } }, text.cell(String(tier), c.ink, 700), text.small(tierLabel, c.dim, { marginTop: 1 })),
      text.cell("10"),
      text.cell("Active"),
    ],
    { tint: true },
  );
}

export function rules() {
  return shell({
    section: "Management",
    items: adminItems,
    active: "Routing rules",
    user: "Alex Morgan",
    role: "Admin",
    main: [
      pageHead("Routing rules", "Every rule in the system that decides which dealer an incoming request goes to."),
      h(
        "div",
        { style: { gap: p(16), borderBottom: `1px solid ${c.line}` } },
        h("div", { style: { padding: `${p(8)}px 2px ${p(14)}px`, borderBottom: `2px solid ${c.bluePale}`, marginBottom: -1 } }, t("Rules", p(17), 600, c.bluePale)),
        h("div", { style: { padding: `${p(8)}px 2px ${p(14)}px` } }, t("County coverage", p(17), 600, c.muted)),
      ),
      card(
        [
          h("div", { style: { justifyContent: "space-between", alignItems: "baseline", marginBottom: p(12) } }, text.title("Defined rules"), text.small("5 rules · 6 counties · 5 active")),
          h(
            "div",
            { style: { flexDirection: "column", borderRadius: p(12), border: `1px solid ${c.line}`, overflow: "hidden" } },
            ruleRow(["Order", "Assigned dealer", "Location", "Brand", "Tier", "Priority", "Status"].map((x) => t(x, p(12), 600, c.muted, { letterSpacing: 0.24 })), { head: true }),
            dealerGroup("Harbor Tire Center", "2 rules · 3 counties", true),
            rule({ order: "1", wait: "Wait 2 h", backup: "Backup: Newark Tire & Auto (1 h)", location: "NJ · Hudson County", brand: "Sample Tires", tier: 1, tierLabel: "County + brand" }),
            rule({ order: "5", wait: "Wait 4 h", location: "NJ · 2 counties", detail: "Bergen, Passaic", brand: "All brands", tier: 2, tierLabel: "County" }),
            dealerGroup("Maple Ave Tire", "1 rule · 1 county", false),
            dealerGroup("Newark Tire & Auto", "2 rules · 2 counties", false),
          ),
        ],
        { gap: 0 },
      ),
    ],
  });
}

/* ---------------------------------------------------- scorecard and overview */

function pills(active) {
  return h(
    "div",
    { style: { gap: p(8) } },
    ["This week", "This month", "All"].map((label) =>
      h(
        "div",
        {
          style: {
            height: p(32),
            alignItems: "center",
            padding: `0 ${p(12)}px`,
            borderRadius: 999,
            border: `1px solid ${label === active ? c.panelBlue : c.line}`,
            background: label === active ? c.panelBlue : c.panel,
          },
        },
        t(label, p(13), label === active ? 600 : 500, label === active ? c.bluePale : c.muted),
      ),
    ),
  );
}

function tiles(items) {
  return h(
    "div",
    { style: { gap: p(14) } },
    items.map(([label, value, hint]) =>
      card(
        [
          t(label, p(13), 500, c.muted),
          t(value, p(28), 600, c.ink, { letterSpacing: -0.56, marginTop: p(4), lineHeight: 1.2 }),
          hint ? text.tiny(hint) : h("div", { style: { height: p(16) } }),
        ],
        { flex: 1, padding: p(14) },
      ),
    ),
  );
}

function rateCell(value) {
  return h(
    "div",
    { style: { alignItems: "center", gap: p(8), width: "100%" } },
    h("div", { style: { flex: 1, height: p(8), borderRadius: 99, background: c.panelHigh } }, h("div", { style: { width: `${value}%`, height: "100%", borderRadius: 99, background: c.blueBright } })),
    h("div", { style: { width: p(38), justifyContent: "flex-end" } }, text.cell(`${value}%`, c.ink)),
  );
}

/** "The dealer scorecard in the brand dashboard": the regional manager's performance page. */
export function scorecard() {
  const cols = [108, 177, 110, 160, 160];
  const row = (cells, head) =>
    h(
      "div",
      { style: { alignItems: "center", background: head ? c.panelHigh : "transparent", borderBottom: `1px solid ${head ? c.line : "#1f2430"}` } },
      cells.map((cell, i) =>
        h("div", { style: { width: p(cols[i]), flexShrink: 0, padding: head ? `${p(10)}px ${p(14)}px` : `${p(13)}px ${p(14)}px`, justifyContent: i === 2 ? "flex-end" : "flex-start" } }, cell),
      ),
    );
  const dealers = [
    ["Newark", "Newark Tire & Auto", 132, 91, 24],
    ["Jersey City", "Harbor Tire Center", 118, 86, 21],
    ["Paterson", "Maple Ave Tire", 97, 78, 17],
    ["Elizabeth", "Union Tire & Brake", 84, 64, 12],
    ["Hackensack", "Hillside Tire Co.", 55, 52, 9],
  ];
  return shell({
    section: "My region",
    items: ["Performance", "Requests"],
    active: "Performance",
    user: "Dana Brooks",
    role: "Regional manager",
    main: [
      pageHead("Performance", "Dana Brooks · dealers reporting to you"),
      pills("This month"),
      tiles([
        ["Total requests", "486", "This month"],
        ["Completion", "84%", "142 of 169 closed"],
        ["On-time calls", "71%", "Within 120 min"],
        ["Conversion", "18%", "Serviced"],
        ["Pending calls", "9", ""],
      ]),
      h(
        "div",
        { style: { flexDirection: "column", borderRadius: p(12), border: `1px solid ${c.line}`, background: c.panel, overflow: "hidden" } },
        row(["City", "Dealer", "Requests received", "Call rate", "Conversion"].map((x) => t(x, p(12), 600, c.muted, { letterSpacing: 0.24 })), true),
        dealers.map(([city, dealer, received, called, converted]) =>
          row([text.cell(city, c.muted), text.cell(dealer, c.ink, 600), text.cell(String(received)), rateCell(called), rateCell(converted)]),
        ),
      ),
    ],
  });
}

/** "The brand dashboard" for a window brand: the admin overview with the dealer comparison chart. */
export function overview() {
  const dealers = [
    ["Ridgeview Windows", 78, 92, 31],
    ["Bluestone Windows", 66, 85, 26],
    ["Kettle Creek Exteriors", 61, 79, 22],
    ["Northgate Windows", 57, 70, 18],
    ["Cedar Point Home", 50, 58, 12],
  ];
  const series = [
    ["Requests received", "#2b3650"],
    ["Called", c.blueBright],
    ["Appointment set", c.bluePale],
  ];
  const chartH = p(136);
  const max = 100;
  const bar = (value, color, label) =>
    h(
      "div",
      { style: { flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: p(30), height: "100%" } },
      label ? text.small(label, c.dim, { fontSize: p(11), marginBottom: p(4) }) : null,
      h("div", { style: { width: "100%", height: Math.round((value / max) * chartH), borderRadius: `${p(4)}px ${p(4)}px 0 0`, background: color } }),
    );
  return shell({
    section: "Management",
    items: adminItems,
    active: "Overview",
    user: "Alex Morgan",
    role: "Admin",
    main: [
      pageHead("Overview", "All dealers' performance"),
      pills("This month"),
      tiles([
        ["Total requests", "312", "This month"],
        ["Completion", "81%", "118 of 146 closed"],
        ["On-time calls", "76%", "Within 120 min"],
        ["Conversion", "22%", "Appointment set"],
        ["Pending calls", "6", ""],
      ]),
      card([
        h(
          "div",
          { style: { justifyContent: "space-between", alignItems: "center" } },
          text.h3("Dealer comparison"),
          h("div", { style: { height: p(40), alignItems: "center", gap: p(24), padding: `0 ${p(12)}px`, borderRadius: p(12), border: `1px solid ${c.line}` } }, text.cell("All cities"), icon("expand-more", p(18), c.dim)),
        ),
        h(
          "div",
          { style: { gap: p(16), margin: `${p(12)}px 0 ${p(8)}px` } },
          series.map(([label, color]) => h("div", { style: { alignItems: "center", gap: p(6) } }, h("div", { style: { width: p(9), height: p(9), borderRadius: 99, background: color } }), text.small(label, c.muted))),
        ),
        h(
          "div",
          { style: { position: "relative", height: chartH + p(48), paddingLeft: p(32) } },
          [0, 25, 50, 75, 100].map((v) =>
            h(
              "div",
              { style: { position: "absolute", left: 0, right: 0, top: chartH - Math.round((v / max) * chartH) - p(9), height: p(18), alignItems: "center", gap: p(8) } },
              h("div", { style: { width: p(24), justifyContent: "flex-end" } }, text.small(String(v), c.dim, { fontSize: p(12) })),
              h("div", { style: { flex: 1, height: 1, background: "#1f2430" } }),
            ),
          ),
          h(
            "div",
            { style: { flex: 1, justifyContent: "space-around" } },
            dealers.map(([name, received, called, appointment]) =>
              h(
                "div",
                { style: { flexDirection: "column", alignItems: "center", width: p(130) } },
                h(
                  "div",
                  { style: { height: chartH, alignItems: "flex-end", gap: p(4) } },
                  bar(received, series[0][1]),
                  bar(Math.round((received * called) / 100), series[1][1], `${called}%`),
                  bar(Math.round((received * appointment) / 100), series[2][1], `${appointment}%`),
                ),
                text.small(name, c.dim, { fontSize: p(12), marginTop: p(8), textAlign: "center" }),
              ),
            ),
          ),
        ),
      ]),
    ],
  });
}
