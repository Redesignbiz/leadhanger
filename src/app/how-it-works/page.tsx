import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { FeatureList, type Feature } from "@/components/FeatureList";
import { ProductHero, referenceLine } from "@/components/ProductPage";
import { Proof, type ProofLine } from "@/components/Proof";
import { AuditCall } from "@/components/AuditCall";
import { Faq } from "@/components/Faq";
import { productFaqs } from "@/lib/product";
import { site } from "@/lib/site";
import { homeShareImage } from "@/lib/share";

export const metadata: Metadata = {
  title: "How it works",
  description: `How ${site.name} works, in four steps: capture the request on the brand's site, route it to the right dealer, respond and book, and report back to the brand.`,
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    type: "website",
    url: `${site.url}/how-it-works`,
    title: `How it works · ${site.name}`,
    images: [homeShareImage],
  },
  robots: { index: true, follow: true },
};

/**
 * /how-it-works, from the website brief (Drive, November 3, 2026, p.20:
 * "four rings, four screens"): the four steps the home page's story and step
 * strip name (p.15), each with what it covers and a screen, then short notes
 * on how the metrics are defined.
 *
 * Labels follow the brief's confirmation list (p.31). The screens are
 * placeholders until the English screens from the US demo account (December
 * 4, 2026). The metric definitions are ours and need the product team's
 * confirmation (docs/leadhanger-us-brief.md, section 5).
 *
 * Each step opens with its claim and a proof (brief p.25), naming the client
 * anonymously (`site.reference`): a published metric from `site.metrics`, or
 * one of the brief's October 2026 figures marked to verify.
 */
const ref = site.reference.name;
const qualified = site.metrics[2];
const steps: {
  title: string;
  body: string;
  proof: ProofLine;
  items: readonly Feature[];
  screen: { label: string; kind: "screen" | "desktop" };
}[] = [
  {
    title: "Capture",
    body: "A form or chat on your site asks the questions your dealers need and captures consent before anything is sent.",
    proof: { value: qualified.value, text: "qualified lead ratio across the platform" },
    items: [
      { text: "Tire question set: tire size, quantity, store and same-day fitting" },
      { text: "Window question set: number of windows, type, timing and a photo" },
      { text: "Consent captured in your brand's own words" },
    ],
    screen: { label: "The chat on a brand's site", kind: "screen" },
  },
  {
    title: "Route",
    body: "Each request goes to the right dealer through a ladder of rules you set.",
    proof: {
      value: "4,085",
      text: `requests routed at ${ref} in October 2026, 3,280 to dealers and 805 to its call center`,
      verify: true,
    },
    items: [
      { text: "By region, ZIP code, brand and tier" },
      { text: "AI-assisted matching", availability: "planned" },
    ],
    screen: { label: "Routing rules in the brand dashboard", kind: "desktop" },
  },
  {
    title: "Respond and book",
    body: "The dealer contacts the customer the way the customer chose and books the appointment.",
    proof: {
      value: "86%",
      text: `of requests followed up by dealers at ${ref} in October 2026, up from 51% in September`,
      verify: true,
    },
    items: [
      { text: "One-touch calling and outcome capture in the dealer app" },
      { text: "A lead not answered in time moves to the next dealer" },
      { text: "Text or call, as the customer chooses", availability: "december" },
      { text: "One brand number and one conversation thread", availability: "december" },
      { text: "Masked calling: the customer's number stays hidden", availability: "december" },
    ],
    screen: { label: "A lead in the dealer app", kind: "screen" },
  },
  {
    title: "Report",
    body: "The brand sees what happened to every lead, dealer by dealer.",
    proof: {
      value: "39.6%",
      text: `conversion at the best dealer at ${ref}, October 2026`,
      verify: true,
    },
    items: [
      { text: "Response time and appointments by dealer and region" },
      { text: "Dealer scorecard" },
      { text: "A customer satisfaction question after the visit", availability: "december" },
    ],
    screen: { label: "The dealer scorecard in the brand dashboard", kind: "desktop" },
  },
];

const metrics = [
  {
    term: "Response time",
    definition: "From the moment a lead reaches the dealer to the dealer's first call or message.",
  },
  {
    term: "Follow-up rate",
    definition: "The share of leads the dealer called or messaged.",
  },
  {
    term: "Appointment rate",
    definition: "The share of leads that became a booked appointment.",
  },
  {
    term: "Reassigned lead",
    definition: "A lead the first dealer did not answer in time, moved to the next dealer.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <ProductHero
          eyebrow="How it works"
          title="From your website to a booked appointment, in four steps"
          lead="LeadHanger routes every inquiry to the right dealer, lets the dealer text or call from your brand's number, moves late leads to the next dealer, and reports what happened back to the brand."
          proof={referenceLine}
        />

        {steps.map((step, index) => (
          <Section key={step.title} className="border-line border-t">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className={`reveal ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <span className="text-blue-pale text-[14px] font-semibold tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-ink mt-2 text-[28px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[34px]">
                  {step.title}
                </h2>
                <p className="text-ink-muted mt-4 max-w-xl text-[16px] leading-[1.65]">
                  {step.body}
                </p>
                <Proof proof={step.proof} className="mt-5" />
                <div className="mt-6">
                  <FeatureList items={step.items} />
                </div>
              </div>
              <div className="reveal flex justify-center">
                <MediaPlaceholder label={step.screen.label} kind={step.screen.kind} />
              </div>
            </div>
          </Section>
        ))}

        <Section className="border-line border-t">
          <h2 className="text-ink text-[28px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[34px]">
            How we measure
          </h2>
          <dl className="reveal-stack mt-10 grid gap-4 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric.term} className="border-line bg-panel rounded-lg border p-6">
                <dt className="text-ink text-[17px] font-semibold">{metric.term}</dt>
                <dd className="text-ink-muted mt-2 text-[15px] leading-[1.6]">
                  {metric.definition}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section className="border-line border-t">
          <h2 className="text-ink text-[28px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[34px]">
            Frequently asked questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <Faq items={productFaqs} />
          </div>
        </Section>

        <AuditCall />
      </main>

      <Footer />
    </>
  );
}
