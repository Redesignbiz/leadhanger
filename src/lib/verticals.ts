import type { Availability } from "./availability";
import type { AuditIndustry, AuditRole } from "./audit";

/**
 * The two vertical pages, /windows-and-doors and /tires, from the website brief
 * (Drive, November 3, 2026, p.16): the same skeleton, each in its sector's own
 * language. The pages, llms.txt and the sitemap all read this list.
 *
 * Copy follows the brief as written (decided November 6, 2026: ask before any
 * deviation). Features that ship with the US demo in December stay. The
 * "Launching December" label goes only where the brief's confirmation list
 * (p.31) asks for it: texting and masked calling, the one conversation thread,
 * the satisfaction question. The window question set is shown as the brief
 * lists it, without a label (decided November 6, 2026). The tire question set
 * runs today.
 *
 * MISSING, on purpose for now: the problem cards carry no figures. The brief
 * wants each card backed by a figure with its source and date, from the two
 * market research reports in Drive ("01 Leadhanger") and the routing test.
 * Those were not reachable when the pages were written (November 6, 2026).
 * Add the figures with their sources when they are; until then the cards state
 * the problem without numbers. Tracked in the growth plan tracker.
 *
 * Also still placeholders: the product screens (real English screens are due
 * December 4) and the demo videos.
 *
 * FAQ: sector questions only, seven per page, within the brief's six to eight
 * (p.26). The first two on each page are the brief's own examples (p.16); the
 * rest were agreed with the team on November 6, 2026. Questions that apply to
 * every sector belong on /plans (commercial) or /how-it-works (product), not
 * here.
 */
export type VerticalItem = { text: string; availability?: Availability };

export type Vertical = {
  slug: "windows-and-doors" | "tires";
  name: string;
  /** One line for the header's Solutions menu. */
  audience: string;
  description: string;
  headline: string;
  lead: string;
  /**
   * The hero's buttons, one per buyer role. Each opens /audit with the role and
   * industry already chosen, where the role maps onto the form's options.
   */
  roles: readonly { label: string; audit: { role?: AuditRole; industry: AuditIndustry } }[];
  screenLabel: string;
  problemsTitle: string;
  problems: readonly { title: string; body: string }[];
  stepsTitle: string;
  steps: readonly {
    title: string;
    body: string;
    availability?: Availability;
    extra?: readonly VerticalItem[];
  }[];
  audiences: readonly { title: string; items: readonly VerticalItem[] }[];
  proof: { title: string; body: string; videoLabel: string };
  integrations: readonly { name: string; availability: Availability }[];
  faqs: readonly { q: string; a: string }[];
};

export const verticals: readonly Vertical[] = [
  {
    slug: "windows-and-doors",
    name: "Windows & Doors",
    audience: "For window and door brands and franchise systems",
    description:
      "Dealer Lead Response for window and door brands and franchise systems: qualify each quote request on your site, route it to the right dealer, and see who answered, how fast and what it turned into.",
    headline: "Your site creates the request. See which dealer answers it.",
    lead: "LeadHanger qualifies each quote request on your website, routes it to the right dealer, and shows you who answered, how fast and what it turned into.",
    roles: [
      { label: "I'm a brand", audit: { role: "brand", industry: "windows-and-doors" } },
      // The form's roles have no franchise system, so only the industry is chosen.
      { label: "I run a franchise system", audit: { industry: "windows-and-doors" } },
    ],
    screenLabel: "A window request in the dealer app",
    problemsTitle: "Where window requests are lost",
    problems: [
      {
        title: "The locator ends at a list",
        body: "Many brand sites send a homeowner to a dealer list and stop there. The request leaves the brand's site, and the brand never learns whether anyone called back.",
      },
      {
        title: "Franchise response goes unmeasured",
        body: "A franchise system collects demand centrally but cannot see how fast each franchisee answers it, or which requests were never answered.",
      },
      {
        title: "Shared leads go to several companies",
        body: "Lead marketplaces sell the same homeowner to several companies at once, so the fastest caller wins and the brand's own demand competes with itself.",
      },
    ],
    stepsTitle: "How it works for windows and doors",
    steps: [
      {
        title: "Capture",
        body: "A form or chat on your site asks what the homeowner needs: how many windows, which type, when, and a photo.",
      },
      {
        title: "Route",
        body: "Each request goes to the right dealer by location.",
      },
      {
        title: "Respond",
        body: "The dealer sees the request in the LeadHanger app, calls with one touch and records the outcome. A request not answered in time moves to the next dealer.",
      },
      {
        title: "Report",
        body: "The brand sees response time and conversion by dealer and region in its dashboard.",
      },
    ],
    audiences: [
      {
        title: "For brands and franchise systems",
        items: [
          { text: "Response time and conversion by dealer and region" },
          { text: "Every request and its outcome in one dashboard" },
          { text: "Dealer scorecard" },
          { text: "A customer satisfaction question after the visit", availability: "december" },
        ],
      },
      {
        title: "For dealers",
        items: [
          { text: "Today's leads, with call times and reminders" },
          { text: "One-touch calling and outcome capture" },
          {
            text: "One conversation with the customer by text or call, from the brand's number",
            availability: "december",
          },
          { text: "Masked calling: the customer's number stays hidden", availability: "december" },
        ],
      },
    ],
    proof: {
      title: "Proven in a dealer network",
      body: "LeadHanger has routed web requests to the dealers of a leading tire manufacturer since 2023. The window flow runs on the same platform.",
      videoLabel: "Windows & Doors demo video",
    },
    integrations: [
      { name: "Salesforce", availability: "january" },
      { name: "Leap", availability: "on-request" },
      { name: "MarketSharp", availability: "on-request" },
    ],
    faqs: [
      {
        q: "Does the dealer keep the sale?",
        a: "Yes. LeadHanger routes the request to the brand's dealer and records how it was followed up. The sale is the dealer's, and we do not sell or share leads.",
      },
      {
        q: "How is consent recorded?",
        a: "The chat asks for consent in the brand's own words before the request is sent, and consent to calls and texts is a separate opt-in. A consent log for each lead, with the time and the wording shown, is planned.",
      },
      {
        q: "What do you ask a homeowner who wants new windows?",
        a: "How many windows they need, what type, when they want them installed, and a photo. The dealer sees the answers before calling. These window questions launch in December.",
      },
      {
        q: "How do you report on dealers?",
        a: "In the brand dashboard. For every request, it shows which dealer received it, how fast the dealer responded and whether the request became an appointment. It adds these up by dealer and region.",
      },
      {
        q: "How is this different from buying shared leads?",
        a: "Lead marketplaces sell the same homeowner to several companies at once. LeadHanger handles the requests from your own website and sends each one to one of your dealers.",
      },
      {
        q: "What happens if a dealer does not call back in time?",
        a: "The request moves to the next dealer after the time you set, so the homeowner is not left waiting.",
      },
      {
        q: "Do our dealers need new software?",
        a: "Nothing to install at the showroom. Dealers receive and call each request from the LeadHanger app on their phone.",
      },
    ],
  },
  {
    slug: "tires",
    name: "Tires",
    audience: "For tire chains and tire brands",
    description:
      "Dealer Lead Response for tire chains and tire brands: take the request on your site, send it to the store that can fit the tires, and see which store answered and how fast.",
    headline: "Right store, booked today, by text or call.",
    lead: "LeadHanger takes the tire request on your website, sends it to the store that can fit the tires, and shows the chain or the brand which store answered, and how fast.",
    roles: [
      { label: "I run a tire chain", audit: { role: "retail-chain", industry: "tires" } },
      { label: "I'm a tire brand", audit: { role: "brand", industry: "tires" } },
    ],
    screenLabel: "A tire request in the store app",
    problemsTitle: "Where tire requests are lost",
    problems: [
      {
        title: "Calls go unanswered",
        body: "Stores miss calls at busy hours, and a web request waiting for a call-back goes cold.",
      },
      {
        title: "Bookings that do not show",
        body: "Customers book a fitting and do not come, and the store finds out only at the appointment time.",
      },
      {
        title: "The chain cannot see its stores",
        body: "A chain does not see which store answered which web request, or how fast.",
      },
    ],
    stepsTitle: "How it works for tires",
    steps: [
      {
        title: "Capture",
        body: "A chat on your site finds the tire size, the quantity and the nearest store, and asks whether today works.",
        extra: [{ text: "Stock at each store", availability: "planned" }],
      },
      {
        title: "Route",
        body: "The request goes to the store that can fit the tires.",
      },
      {
        title: "Respond and book",
        body: "The store calls from the LeadHanger app with one touch and books the fitting. A request a store does not answer in time moves to the next store.",
      },
      {
        title: "Report",
        body: "The chain or the brand sees response time and bookings by store and region.",
      },
    ],
    audiences: [
      {
        title: "For chains and tire brands",
        items: [
          { text: "Response time and bookings by store and region" },
          { text: "Every request and its outcome in one dashboard" },
          { text: "Dealer scorecard" },
          { text: "A customer satisfaction question after the fitting", availability: "december" },
        ],
      },
      {
        title: "For stores",
        items: [
          { text: "Today's requests, with call times and reminders" },
          { text: "One-touch calling and outcome capture" },
          { text: "Text the customer from the brand's number", availability: "december" },
          { text: "Masked calling: the customer's number stays hidden", availability: "december" },
        ],
      },
    ],
    proof: {
      title: "Running at a leading tire manufacturer since 2023",
      body: "LeadHanger routes the manufacturer's web requests to its dealer network, and every follow-up is recorded.",
      videoLabel: "Tire Services demo video",
    },
    integrations: [
      { name: "TireConnect", availability: "on-request" },
      { name: "Tekmetric", availability: "on-request" },
      { name: "AutoLeap", availability: "on-request" },
    ],
    faqs: [
      {
        q: "Can customers text instead of call?",
        a: "Texting from the brand's number launches in December. Today the store calls the customer from the LeadHanger app.",
      },
      {
        q: "What if the store is busy today?",
        a: "If a store does not answer a request in time, the request moves to the next store, so another store can pick it up.",
      },
      {
        q: "What do you ask a customer who needs tires?",
        a: "The tire size, how many tires, the nearest store, and whether today works for a fitting. The store sees the answers before calling.",
      },
      {
        q: "Who books the fitting?",
        a: "The store calls the customer from the LeadHanger app and books the fitting. Letting the customer pick a slot online is planned.",
      },
      {
        q: "How do you report on stores?",
        a: "In the brand dashboard. For every request, it shows which store received it, how fast the store responded and whether the request became a booking. It adds these up by store and region, for the chain or the brand.",
      },
      {
        q: "Does it work with our shop management system?",
        a: "TireConnect, Tekmetric and AutoLeap connect on request. A pilot needs no connection.",
      },
      {
        q: "Does it work for a tire brand as well as a chain?",
        a: "Yes. A chain sends requests to its own stores; a tire brand sends them to the dealers that sell its tires.",
      },
    ],
  },
];

export function verticalBySlug(slug: Vertical["slug"]): Vertical {
  const found = verticals.find((vertical) => vertical.slug === slug);
  if (!found) throw new Error(`Unknown vertical: ${slug}`);
  return found;
}
