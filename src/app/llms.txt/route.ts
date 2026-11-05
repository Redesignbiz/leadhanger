import { site } from "@/lib/site";
import { planFaqs } from "@/lib/plans";

/**
 * /llms.txt: a plain summary of LeadHanger for AI assistants, in the llms.txt
 * format (a title, a one-line summary, then sections of links). The website
 * brief asks for the product, the category, the page list and short FAQ
 * answers.
 *
 * Built from site.ts and lib/plans.ts, so it says nothing the site does not.
 * Add a page here when it ships (the brief's vertical pages, /insights, /audit),
 * not before. Static: generated once at build time.
 */
export const dynamic = "force-static";

const pages: { name: string; path: string; about: string }[] = [
  { name: "Home", path: "/", about: "what LeadHanger does and how it works" },
  { name: "Plans", path: "/plans", about: "three plans compared, without prices" },
  { name: "Integrations", path: "/integrations", about: "what connects today and what is planned" },
  { name: "Security & Compliance", path: "/trust", about: "access control, authentication, encryption, consent capture, SMS compliance and subprocessors" },
  { name: "Privacy Policy", path: "/privacy", about: "how personal information is handled on the website, in the app and in text messages" },
  { name: "SMS Terms", path: "/sms-terms", about: "terms for text messages about a request" },
  { name: "SMS Consent", path: "/sms-consent", about: "how consumers opt in to text messages" },
  { name: "Support", path: "/support", about: "help with the LeadHanger app and with running LeadHanger for a brand" },
  { name: "Delete Your Account", path: "/delete-account", about: "how to request deletion of a LeadHanger app account" },
];

function body() {
  const link = (path: string) => `${site.url}${path === "/" ? "" : path}`;
  return [
    `# ${site.name}`,
    "",
    `> ${site.category}. ${site.description}`,
    "",
    `${site.name} is operated by ${site.company.legalName}, with a team in New York.`,
    "",
    "## What it does",
    "",
    "- Capture and qualify: a chat on the brand's website engages visitors through conversation paths and asks for consent before data is shared.",
    "- Route: each lead goes to the right dealer by location, expertise and availability.",
    "- Follow up: dealers receive leads in the LeadHanger app, call with one touch and record the outcome. A lead that is not followed up in time can move to the next dealer.",
    "- Report: the brand sees volume, response time and conversion by dealer and region in its dashboard.",
    "",
    "## Pages",
    "",
    ...pages.map((page) => `- [${page.name}](${link(page.path)}): ${page.about}`),
    "",
    "## FAQ",
    "",
    ...planFaqs.map((faq) => `- ${faq.q} ${faq.a}`),
    "",
    "## Contact",
    "",
    `- Sales: ${site.contact.sales}`,
    `- Support: ${site.contact.support}`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(body(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
