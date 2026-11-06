import type { Feature } from "@/components/FeatureList";
import type { ProofLine } from "@/components/Proof";
import { site } from "./site";

const ref = site.reference.name;
const [leadToSale, fasterResponse] = site.metrics;

/**
 * The two surface pages, /dealer-app and /brand-dashboard, from the website
 * brief (Drive, November 3, 2026, p.20: "two surfaces, two audiences"). The
 * brief lists what each page covers but gives no copy, so the wording here
 * is ours, kept to what the brief and the confirmation list (p.31) support:
 *   - live, as the confirmation list says: multi-location dealer accounts and
 *     roles, call center entry, moving a late lead to the next dealer;
 *   - "Launching December": texting and masked calling, the satisfaction
 *     question;
 *   - taken from the brief without confirmation, and on the product team's
 *     list in docs/leadhanger-us-brief.md: the dealer scorecard and the
 *     regional manager view.
 *
 * Screens are placeholders until the English screens from the US demo
 * account (December 4, 2026). The store badges wait for the US app's
 * approval.
 *
 * Proof (brief p.25: every section opens with a claim and a proof), naming
 * the client anonymously (`site.reference`): the published metrics in
 * `site.metrics` as they are, and the brief's October 2026 figures marked
 * `verify` until checked against the client's monthly reports. The sections
 * about December features have no proof yet.
 */
export type ProductSurface = {
  slug: "dealer-app" | "brand-dashboard";
  name: string;
  description: string;
  title: string;
  lead: string;
  screen: { label: string; kind: "screen" | "desktop" };
  /** A second screen, further down the page. */
  secondScreen?: { label: string; kind: "tablet" | "desktop" };
  sections: readonly { title: string; proof?: ProofLine; items: readonly Feature[] }[];
  /** The other surface, linked from the end of the page. */
  other: { lead: string; label: string; href: string };
};

export const dealerApp: ProductSurface = {
  slug: "dealer-app",
  name: "Dealer app",
  description:
    "The LeadHanger dealer app: each lead with the customer's answers, one-touch calling, outcome capture, multi-location accounts and owner and staff roles.",
  title: "Leads arrive in the dealer's app, ready to call",
  lead: "Dealers and stores receive each lead in the LeadHanger app with the customer's answers, call with one touch and record what happened. Owners see every location they run.",
  screen: { label: "Today's leads in the dealer app", kind: "screen" },
  secondScreen: { label: "The dealer app on a tablet", kind: "tablet" },
  sections: [
    {
      title: "Ready to call",
      proof: {
        value: fasterResponse.value,
        text: `faster dealer response to digital leads at ${ref}`,
      },
      items: [
        { text: "Today's leads, with call times and reminders" },
        { text: "A notification when a lead arrives" },
        { text: "One-touch calling and outcome capture" },
        { text: "A lead not answered in time moves to the next dealer" },
      ],
    },
    {
      title: "Built for dealer groups",
      proof: {
        value: "47 dealers in 20 regions",
        text: `work their leads in the app at ${ref}`,
        verify: true,
      },
      items: [
        { text: "One account for several locations" },
        { text: "Owner and staff roles" },
      ],
    },
    {
      title: "One conversation with the customer",
      items: [
        { text: "Text the customer from the brand's number", availability: "december" },
        { text: "Masked calling: the customer's number stays hidden", availability: "december" },
      ],
    },
  ],
  other: {
    lead: "What the brand sees:",
    label: "Brand dashboard",
    href: "/brand-dashboard",
  },
};

export const brandDashboard: ProductSurface = {
  slug: "brand-dashboard",
  name: "Brand dashboard",
  description:
    "The LeadHanger brand dashboard: every lead from the brand's site, the dealer it went to, response time and appointments by dealer and region, and the dealer scorecard.",
  title: "Which dealer answered, how fast, and what it became",
  lead: "The brand dashboard shows every lead from your site, the dealer it went to and what the dealer did with it, by dealer and region.",
  screen: { label: "The dealer scorecard in the brand dashboard", kind: "desktop" },
  sections: [
    {
      title: "By dealer and region",
      proof: {
        value: leadToSale.value,
        text: `lead-to-sale ratio across the dealer network at ${ref}`,
      },
      items: [
        { text: "Response time and appointments by dealer and region" },
        { text: "Every lead and its outcome in one place" },
        { text: "Dealer scorecard" },
        { text: "A view for regional managers" },
      ],
    },
    {
      title: "Call center",
      proof: {
        value: "805",
        text: `requests went to the call center at ${ref} in October 2026`,
        verify: true,
      },
      items: [{ text: "Leads your call center takes by phone, entered in the same place" }],
    },
    {
      title: "After the visit",
      items: [
        { text: "A customer satisfaction question after the visit", availability: "december" },
      ],
    },
  ],
  other: {
    lead: "What your dealers use:",
    label: "Dealer app",
    href: "/dealer-app",
  },
};

/**
 * Questions that apply to every sector, answered on /how-it-works and listed
 * in llms.txt (agreed with the team on November 6, 2026). Commercial
 * questions stay on /plans, sector questions on the vertical pages. The
 * answers follow the brief; the routing rules and the response time
 * definition are on the product team's list in docs/leadhanger-us-brief.md.
 */
export const productFaqs: readonly { q: string; a: string }[] = [
  {
    q: "What is dealer lead response?",
    a: "Dealer lead response is how fast and how well a dealer answers a request from the brand's website. LeadHanger measures it for every dealer, from the moment the request arrives to the first call, and records what the request turned into.",
  },
  {
    q: "How are leads routed to dealers?",
    a: "By the rules you set: region, ZIP code, brand and tier. If the dealer does not answer in time, the request moves to the next dealer. AI-assisted matching is planned.",
  },
  {
    q: "How do you measure response time?",
    a: "From the moment a lead reaches the dealer to the dealer's first call or message, as recorded in the LeadHanger app. The brand dashboard shows it for every lead, and by dealer and region.",
  },
];
