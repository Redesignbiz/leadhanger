/**
 * The product screens on the site.
 *
 * Until the English screens from the US demo account arrive (December 4,
 * 2026, website brief p.29), these are English mockups drawn from the
 * product's own layout: the dealer app and the brand dashboard in
 * brisa-frontend, with made-up US customers, dealers and figures, no client
 * names, the LeadHanger logo where the product shows one, and the site's
 * dark palette (the product itself is light; chosen on November 6, 2026).
 * Each image is the whole device or window, nothing cropped. The thread and
 * the window request show December features. Regenerate them with
 * `node scripts/screens/render.mjs`; see docs/images.md. Replace each with the
 * real screen when it exists.
 *
 * The case study's screens stay placeholders: they show the client's own
 * site and wait for its permission.
 */
export type ScreenKind = "screen" | "tablet" | "desktop";

export type ScreenImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** The whole phone, nothing cropped. */
const phone = { width: 640, height: 1348 };
/** The chat window, in the site's 4:5 frame. */
const chat = { width: 768, height: 960 };
const desktop = { width: 1200, height: 750 };

export const screens = {
  chatTires: {
    src: "/images/screens/chat-tires.webp",
    ...chat,
    alt: "The chat on a tire brand's site: it asks for the tire size and the quantity, then which ways the store may get in touch.",
  },
  dealerAppRequests: {
    src: "/images/screens/dealer-app-requests.webp",
    ...phone,
    alt: "The dealer app's request list: new requests with the customer, the town, the tire size and the minutes left to call.",
  },
  dealerAppLeadTire: {
    src: "/images/screens/dealer-app-lead-tire.webp",
    ...phone,
    alt: "A tire request in the dealer app: the customer, a reminder to call within 45 minutes, the tire size and quantity, and the Call customer button.",
  },
  dealerAppLeadWindow: {
    src: "/images/screens/dealer-app-lead-window.webp",
    ...phone,
    alt: "A window request in the dealer app: the homeowner, a reminder to call within 45 minutes, the number and type of windows, two photos, and the Call customer button.",
  },
  dealerAppThread: {
    src: "/images/screens/dealer-app-thread.webp",
    ...phone,
    alt: "One conversation with a customer in the store app: texts and a call from the brand's number, with the booked appointment at the top.",
  },
  dealerAppTablet: {
    src: "/images/screens/dealer-app-tablet.webp",
    width: 1152,
    height: 864,
    alt: "The dealer app on a tablet: the day's requests in a table with the call time, customer, town, tire and status.",
  },
  dashboardRules: {
    src: "/images/screens/dashboard-rules.webp",
    ...desktop,
    alt: "Routing rules in the brand dashboard: each dealer's rules with the county, the brand, the tier, the wait time and the backup dealers.",
  },
  dashboardScorecard: {
    src: "/images/screens/dashboard-scorecard.webp",
    ...desktop,
    alt: "The dealer scorecard in the brand dashboard: the month's requests, completion, on-time calls and conversion, and each dealer's call rate and conversion.",
  },
  dashboardOverviewWindows: {
    src: "/images/screens/dashboard-overview-windows.webp",
    ...desktop,
    alt: "The brand dashboard for a window brand: the month's requests and conversion, and a chart of requests, calls and appointments by dealer.",
  },
} satisfies Record<string, ScreenImage>;

export type ScreenId = keyof typeof screens;

/** A screen slot on a page: what belongs there, its frame, and the image once there is one. */
export type Screen = { label: string; kind: ScreenKind; image?: ScreenId };
