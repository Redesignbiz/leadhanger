/**
 * Shared parts for the product screen mockups: the palette, the fonts, a tiny
 * element helper, the device frames and the file output. The screens are in
 * dealer-app.mjs, dashboard.mjs and chat.mjs; `node scripts/screens/render.mjs`
 * writes them to public/images/screens.
 *
 * Rendered with satori (the copy bundled in next/og, the same renderer as the
 * share cards in src/lib/og.tsx), so no browser is needed. Satori lays out
 * flexbox only: every div here is `display: flex` unless it says otherwise.
 *
 * Fonts and icons come from the product's own repository, next to this one
 * (../brisa-frontend, with its node_modules installed; set BRISA_FRONTEND to
 * point elsewhere): Nunito Sans, the typeface of the dealer app and the brand
 * dashboard; MaterialIcons, the dealer app's icon font; and Inter for what
 * stands in for the system font (the chat on a brand's site, the phone's
 * status bar).
 */
import { readFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// No network, ever: when a character is missing from the fonts below, the
// renderer would fetch a fallback font from Google Fonts. Fail instead, and
// add the character's font (or use an icon) here.
globalThis.fetch = () => Promise.reject(new Error("Network is off: a character is missing from the bundled fonts."));

const here = dirname(fileURLToPath(import.meta.url));
export const root = resolve(here, "../..");
const require = createRequire(join(root, "package.json"));
const { ImageResponse } = await import(require.resolve("next/dist/compiled/@vercel/og/index.node.js"));
const sharp = require("sharp");

const modules = join(process.env.BRISA_FRONTEND ?? resolve(root, "../brisa-frontend"), "node_modules");
const iconDir = join(modules, "@expo/vector-icons/build/vendor/react-native-vector-icons");
const weights = { 400: "Regular", 500: "Medium", 600: "SemiBold", 700: "Bold" };

const fonts = [];
for (const [family, dir, file] of [
  ["Nunito", "@expo-google-fonts/nunito-sans", "NunitoSans"],
  ["Inter", "@expo-google-fonts/inter", "Inter"],
]) {
  for (const [weight, name] of Object.entries(weights)) {
    fonts.push({
      name: family,
      weight: Number(weight),
      style: "normal",
      data: readFileSync(join(modules, dir, `${weight}${name}`, `${file}_${weight}${name}.ttf`)),
    });
  }
}
fonts.push({ name: "MaterialIcons", weight: 400, style: "normal", data: readFileSync(join(iconDir, "Fonts/MaterialIcons.ttf")) });
const glyphs = JSON.parse(readFileSync(join(iconDir, "glyphmaps/MaterialIcons.json"), "utf8"));

/**
 * The site's dark palette (src/app/globals.css). The product is light; the
 * user chose the site's palette for these mockups (November 6, 2026). Each
 * light token of the product maps to one of these; see docs/images.md.
 */
export const c = {
  ground: "#0b101b",
  groundDeep: "#080b12",
  panel: "#151a24",
  panelLow: "#11161f",
  panelHigh: "#21262f",
  panelBlue: "#121e3d",
  line: "#282e3b",
  lineStrong: "#3a4253",
  ink: "#f5f6f8",
  muted: "#c0d3ea",
  dim: "#8792a6",
  blue: "#144ee4",
  blueBright: "#3686fe",
  blueLight: "#579ee4",
  bluePale: "#85c8ff",
  blueDeep: "#11389e",
  sage: "#78b082",
  sageLift: "#9ed4a8",
  rose: "#c5598e",
  roseLift: "#e888b4",
  amber: "#d9a94e",
  amberLift: "#ecc77f",
  orange: "#e0915a",
};

/**
 * The LeadHanger logo, public/images/leadhanger-logo.svg as supplied: the
 * two-blue mark and the wordmark. The wordmark is drawn in #161A25 for light
 * surfaces; on the dark screens it is drawn in the site's ink instead, the
 * only change (there is no light variant of the file yet, see docs/images.md).
 */
const logoSvg = readFileSync(join(root, "public/images/leadhanger-logo.svg"), "utf8");
export function logo(height, wordmark = c.ink) {
  const svg = logoSvg.replaceAll('fill="#161A25"', `fill="${wordmark}"`);
  const width = Math.round((height * 140) / 30);
  return h("img", { src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`, width, height, style: { width, height } });
}

/** An element. Divs default to flex, as satori requires. */
export function h(type, props = {}, ...children) {
  const style = type === "div" ? { display: "flex", ...(props.style ?? {}) } : props.style;
  return { type, props: { ...props, style, children: children.flat(Infinity).filter((x) => x != null && x !== false) } };
}

/** Text, in Nunito Sans unless `style.fontFamily` says otherwise. */
export function t(text, size, weight = 400, color = c.ink, style = {}) {
  return h(
    "div",
    { style: { fontFamily: "Nunito", fontSize: size, fontWeight: weight, color, lineHeight: 1.32, ...style } },
    text,
  );
}

/** A MaterialIcons glyph, the icon set the dealer app uses. */
export function icon(name, size, color = c.ink, style = {}) {
  const code = glyphs[name];
  if (code == null) throw new Error(`No MaterialIcons glyph named "${name}"`);
  return h(
    "div",
    { style: { fontFamily: "MaterialIcons", fontSize: size, color, lineHeight: 1, width: size, height: size, ...style } },
    String.fromCodePoint(code),
  );
}

/** A status chip as the product draws it: tinted fill, a dot, the label. */
export function chip(label, color, size, { dot = true, style = {} } = {}) {
  return h(
    "div",
    {
      style: {
        alignItems: "center",
        flexShrink: 0,
        gap: Math.round(size * 0.45),
        padding: `${Math.round(size * 0.3)}px ${Math.round(size * 0.6)}px`,
        borderRadius: Math.round(size * 0.55),
        background: `${color}26`,
        ...style,
      },
    },
    dot && h("div", { style: { width: Math.round(size * 0.45), height: Math.round(size * 0.45), borderRadius: 99, background: color } }),
    t(label, size, 600, color, { whiteSpace: "nowrap" }),
  );
}

/**
 * A whole phone: the device, its 390 x 844 pt screen with the status bar at the
 * top, `screen` in the middle and `footer` (a tab bar, an action bar, a
 * message composer) above the home indicator. Nothing is cropped: the image is
 * the device and nothing else, at PHONE.width pixels wide. Draw the screen with
 * PHONE.scale pixels per point.
 */
const PHONE_WIDTH = 640;
const PHONE_EDGE = 16; // bezel 14 + border 2
const phoneScale = (PHONE_WIDTH - 2 * PHONE_EDGE) / 390;
export const PHONE = {
  width: PHONE_WIDTH,
  height: Math.round(844 * phoneScale) + 2 * PHONE_EDGE,
  scale: phoneScale,
};

export function phone({ screen, footer, footerBackground = c.panel }) {
  const s = PHONE.scale;
  const p = (n) => Math.round(n * s);
  return h(
    "div",
    { style: { width: PHONE.width, height: PHONE.height, padding: 14, borderRadius: p(55), background: "#04060a", border: `2px solid ${c.lineStrong}` } },
    h(
      "div",
      { style: { flex: 1, flexDirection: "column", borderRadius: p(47), overflow: "hidden", background: c.ground } },
      statusBar(p),
      h("div", { style: { flex: 1, flexDirection: "column", overflow: "hidden" } }, screen),
      h(
        "div",
        { style: { flexShrink: 0, flexDirection: "column", background: footer ? footerBackground : c.ground } },
        footer ?? null,
        h("div", { style: { height: p(34), alignItems: "flex-end", justifyContent: "center", paddingBottom: p(8) } },
          h("div", { style: { width: p(134), height: p(5), borderRadius: 99, background: c.ink, opacity: 0.85 } })),
      ),
    ),
  );
}

function statusBar(p) {
  return h(
    "div",
    { style: { height: p(54), flexShrink: 0, alignItems: "center", justifyContent: "space-between", padding: `${p(4)}px ${p(30)}px 0 ${p(36)}px`, position: "relative" } },
    t("9:41", p(17), 600, c.ink, { fontFamily: "Inter" }),
    h("div", { style: { position: "absolute", left: "50%", top: p(11), width: p(126), height: p(37), marginLeft: -p(63), borderRadius: 999, background: "#000" } }),
    h("div", { style: { gap: p(5), alignItems: "center" } }, icon("signal-cellular-alt", p(18)), icon("wifi", p(18)), icon("battery-full", p(18), c.ink, { transform: "rotate(90deg)" })),
  );
}

/** A tablet in landscape, whole. */
export function tablet({ width, height, screen }) {
  return h(
    "div",
    { style: { width, height, padding: Math.round(width * 0.03), alignItems: "center", justifyContent: "center" } },
    h(
      "div",
      { style: { flex: 1, height: "100%", padding: 20, borderRadius: 44, background: "#04060a", border: `2px solid ${c.lineStrong}` } },
      h("div", { style: { flex: 1, borderRadius: 26, overflow: "hidden", background: c.ground } }, screen),
    ),
  );
}

/** A browser window around the brand dashboard. */
export function browser({ width, height, url = "app.leadhanger.com", screen }) {
  return h(
    "div",
    { style: { width, height, flexDirection: "column", borderRadius: 18, overflow: "hidden", background: c.ground, border: `2px solid ${c.lineStrong}` } },
    h(
      "div",
      { style: { height: 54, flexShrink: 0, alignItems: "center", gap: 10, padding: "0 22px", background: c.groundDeep, borderBottom: `1px solid ${c.line}` } },
      [0, 1, 2].map(() => h("div", { style: { width: 14, height: 14, borderRadius: 7, background: c.lineStrong } })),
      h(
        "div",
        { style: { marginLeft: 24, width: 440, height: 34, borderRadius: 8, background: c.panel, alignItems: "center", padding: "0 14px", gap: 8 } },
        icon("lock", 17, c.dim),
        t(url, 17, 500, c.dim, { fontFamily: "Inter" }),
      ),
    ),
    h("div", { style: { flex: 1, overflow: "hidden" } }, screen),
  );
}

/** Renders one element to public/images/screens/<name>.webp. */
export async function save(name, element, { width, height, quality = 82 }) {
  const png = Buffer.from(await new ImageResponse(element, { width, height, fonts }).arrayBuffer());
  const dir = join(root, "public/images/screens");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${name}.webp`);
  const info = await sharp(png).webp({ quality, alphaQuality: 90, effort: 6 }).toFile(file);
  // A JPEG on the site's ground colour, for checking a screen by eye.
  if (process.env.PREVIEW_DIR) {
    mkdirSync(process.env.PREVIEW_DIR, { recursive: true });
    await sharp(png).flatten({ background: c.ground }).jpeg({ quality: 88 }).toFile(join(process.env.PREVIEW_DIR, `${name}.jpg`));
  }
  return { file, bytes: info.size };
}
