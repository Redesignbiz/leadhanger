/**
 * Writes the product screen mockups to public/images/screens as WebP.
 *   node scripts/screens/render.mjs            all screens
 *   node scripts/screens/render.mjs chat rules only the named ones
 * PREVIEW_DIR=<dir> also writes a JPEG of each, for checking by eye.
 * What each image is and where it is used: src/lib/screens.ts.
 */
import { save, PHONE } from "./kit.mjs";
import * as app from "./dealer-app.mjs";
import * as dashboard from "./dashboard.mjs";
import { chat } from "./chat.mjs";

const CHAT = { width: 768, height: 960 };
const DESKTOP = { width: 1200, height: 750 };
const screens = {
  "dealer-app-requests": [app.requests, PHONE],
  "dealer-app-lead-tire": [app.tireLead, PHONE],
  "dealer-app-lead-window": [app.windowLead, PHONE],
  "dealer-app-thread": [app.thread, PHONE],
  "dealer-app-tablet": [app.requestsTablet, { width: 1152, height: 864 }],
  "dashboard-rules": [dashboard.rules, DESKTOP],
  "dashboard-scorecard": [dashboard.scorecard, DESKTOP],
  "dashboard-overview-windows": [dashboard.overview, DESKTOP],
  "chat-tires": [chat, CHAT],
};

const only = process.argv.slice(2);
for (const [name, [draw, size]] of Object.entries(screens)) {
  if (only.length && !only.some((x) => name.includes(x))) continue;
  const { bytes } = await save(name, draw(), size);
  console.log(`${name}.webp  ${size.width}x${size.height}  ${Math.round(bytes / 1024)} KB`);
}
