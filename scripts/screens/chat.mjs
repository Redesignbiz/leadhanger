/**
 * The chat on a brand's site (brisa-frontend/chatbot), redrawn in English for
 * a made-up tire brand. Layout follows chatbot/src/frame (header, message log,
 * quick replies, consent picker, input bar); the questions follow the default
 * tire flow in shared/src/chatbot.ts: tire size, quantity, then consent for
 * each way the store may get in touch. The widget's colours are set per
 * brand; here they are LeadHanger's. The client's title and colours are left
 * out.
 *
 * 768 x 960, the site's 4:5 "screen" frame at 2x. The widget uses the
 * visitor's system font; Inter stands in for it.
 */
import { c, h, t, icon } from "./kit.mjs";

const k = 1.42;
const p = (n) => Math.round(n * k);
const font = { fontFamily: "Inter" };
const say = (x, size = 15, weight = 400, color = c.ink, style = {}) => t(x, p(size), weight, color, { ...font, lineHeight: 1.45, ...style });

const gradient = `linear-gradient(120deg, ${c.blue}, ${c.blueDeep})`;

function bubble(text, from) {
  const bot = from === "bot";
  return h(
    "div",
    { style: { justifyContent: bot ? "flex-start" : "flex-end" } },
    h(
      "div",
      {
        style: {
          maxWidth: "84%",
          padding: `${p(10)}px ${p(14)}px`,
          borderRadius: p(18),
          borderTopLeftRadius: bot ? p(6) : p(18),
          borderTopRightRadius: bot ? p(18) : p(6),
          background: bot ? c.panelHigh : gradient,
        },
      },
      say(text),
    ),
  );
}

function svgIcon(d, size, color) {
  return h(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
    h("path", { d }),
  );
}

function consent() {
  const option = (label, checked) =>
    h(
      "div",
      { style: { alignItems: "center", gap: p(10), padding: `${p(8)}px ${p(12)}px`, borderRadius: p(12), border: `1px solid ${c.line}` } },
      h(
        "div",
        {
          style: {
            width: p(18),
            height: p(18),
            borderRadius: p(4),
            alignItems: "center",
            justifyContent: "center",
            background: checked ? c.blue : "transparent",
            border: checked ? "none" : `2px solid ${c.lineStrong}`,
          },
        },
        checked ? icon("check", p(14), c.ink) : null,
      ),
      say(label),
    );
  return h(
    "div",
    { style: { flexDirection: "column", gap: p(8), alignItems: "flex-end" } },
    h(
      "div",
      { style: { width: "84%", flexDirection: "column", gap: p(6), padding: p(10), borderRadius: p(14), border: `1px solid ${c.line}`, background: c.panelLow } },
      option("Phone call", true),
      option("Text message", true),
      option("Email", false),
    ),
    h("div", { style: { padding: `${p(9)}px ${p(20)}px`, borderRadius: p(22), border: `2px solid ${c.bluePale}` } }, say("I agree", 15, 500, c.bluePale)),
  );
}

export function chat() {
  return h(
    "div",
    { style: { width: 768, height: 960, alignItems: "center", justifyContent: "center" } },
    h(
      "div",
      { style: { width: p(380), height: 930, flexDirection: "column", borderRadius: p(18), overflow: "hidden", background: c.panel, border: `2px solid ${c.lineStrong}` } },
      h(
        "div",
        { style: { flexShrink: 0, alignItems: "center", justifyContent: "space-between", padding: `${p(18)}px ${p(16)}px ${p(18)}px ${p(20)}px`, background: gradient } },
        say("Tire Assistant", 20, 600),
        h(
          "div",
          { style: { alignItems: "center", gap: p(4) } },
          h("div", { style: { width: p(9), height: p(9), borderRadius: 99, background: c.sageLift, marginRight: p(6) } }),
          h("div", { style: { width: p(36), height: p(36), alignItems: "center", justifyContent: "center" } }, svgIcon("M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5", p(22), c.ink)),
          h("div", { style: { width: p(36), height: p(36), alignItems: "center", justifyContent: "center" } }, svgIcon("M6 9l6 6 6-6", p(22), c.ink)),
        ),
      ),
      h(
        "div",
        { style: { flex: 1, flexDirection: "column", justifyContent: "flex-end", gap: p(10), padding: `${p(18)}px ${p(16)}px ${p(8)}px`, overflow: "hidden" } },
        bubble("What's your tire size? It's on the sidewall, for example 205/55R16.", "bot"),
        bubble("225/45R17", "user"),
        bubble("How many tires do you need?", "bot"),
        bubble("4", "user"),
        bubble("How may the store get in touch about your quote?", "bot"),
        consent(),
      ),
      h(
        "div",
        { style: { flexShrink: 0, alignItems: "center", gap: p(10), padding: `${p(10)}px ${p(12)}px`, borderTop: `1px solid ${c.line}` } },
        h("div", { style: { flex: 1, padding: `${p(12)}px ${p(14)}px`, borderRadius: p(22), background: c.ground, border: `1px solid ${c.line}` } }, say("Choose an option", 15, 400, c.dim)),
        h("div", { style: { width: p(46), height: p(46), borderRadius: 99, alignItems: "center", justifyContent: "center", background: c.lineStrong } }, icon("send", p(22), c.dim)),
      ),
    ),
  );
}
